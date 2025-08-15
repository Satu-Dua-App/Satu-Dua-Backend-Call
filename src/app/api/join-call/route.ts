import { NextRequest } from "next/server";
import { withCors, ok } from "@/lib/cors";
import { buildRtcToken } from "@/lib/token";
import { getCall, updateCall } from "@/lib/calls";
import { requireOperatorAuth } from "@/lib/auth";

export const runtime = "nodejs";

export async function OPTIONS() { return ok(); }

export async function POST(req: NextRequest) {
  const unauthorized = requireOperatorAuth(req);
  if (unauthorized) return unauthorized;

  const { channelName, operatorUid = 1 } = await req.json();

  if (!channelName) {
    return withCors({ error: "channelName is required" }, { status: 400 });
  }

  const call = await getCall(channelName);
  if (!call) return withCors({ error: "Call not found" }, { status: 404 });
  if (call.status === "ended") return withCors({ error: "Call already ended" }, { status: 409 });

  const token = buildRtcToken(channelName, operatorUid, 3600);

  await updateCall(channelName, { status: "in-progress", operatorUid });

  return withCors({
    appId: process.env.AGORA_APP_ID,
    channelName,
    token,
    uid: operatorUid,
    ttlSeconds: 3600,
  });
}

