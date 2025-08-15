import { NextRequest } from "next/server";
import { withCors, ok } from "@/lib/cors";
import { getCall, updateCall } from "@/lib/calls";

export const runtime = "nodejs";

export async function OPTIONS() { return ok(); }

export async function POST(req: NextRequest) {
  const { channelName } = await req.json();
  if (!channelName) return withCors({ error: "channelName is required" }, { status: 400 });

  const found = await getCall(channelName);
  if (!found) return withCors({ error: "Call not found" }, { status: 404 });

  await updateCall(channelName, { lastHeartbeatAt: Date.now() });
  return withCors({ ok: true });
}

