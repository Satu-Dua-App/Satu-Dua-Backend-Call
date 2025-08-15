import { NextRequest } from "next/server";
import { withCors, ok } from "@/lib/cors";
import { v4 as uuid } from "uuid";
import { buildRtcToken } from "@/lib/token";
import { putCall } from "@/lib/calls";
import type { CallRecord } from "@/types";

export const runtime = "nodejs";

export async function OPTIONS() { return ok(); }

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    // Optional: accept a custom channelName from client; otherwise generate one.
    const channelName = body?.channelName || `call-${uuid()}`;
    const callerUid = 0; // you can randomize if you prefer
    const token = buildRtcToken(channelName, callerUid, 3600);
    const now = Date.now();

    const record: CallRecord = {
      channelName,
      status: "waiting",
      createdAt: now,
      lastHeartbeatAt: now,
      callerUid,
    };

    await putCall(record);

    return withCors({
      appId: process.env.AGORA_APP_ID,
      channelName,
      token,
      uid: callerUid,
      ttlSeconds: 3600,
    });
  } catch (e: any) {
    return withCors({ error: e?.message || "Internal error" }, { status: 500 });
  }
}

