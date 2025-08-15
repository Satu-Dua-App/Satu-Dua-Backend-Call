import { NextRequest } from "next/server";
import { withCors, ok } from "@/lib/cors";
import { deleteCall, getCall, updateCall } from "@/lib/calls";
import { requireOperatorAuth } from "@/lib/auth";

export const runtime = "nodejs";

export async function OPTIONS() { return ok(); }

export async function POST(req: NextRequest) {
  const unauthorized = requireOperatorAuth(req);
  if (unauthorized) return unauthorized;

  const { channelName } = await req.json();
  if (!channelName) return withCors({ error: "channelName is required" }, { status: 400 });

  const found = await getCall(channelName);
  if (!found) return withCors({ ok: true, message: "Already removed" });

  await updateCall(channelName, { status: "ended" });
  await deleteCall(channelName);

  return withCors({ ok: true });
}

