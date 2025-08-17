import { redis } from "./redis";
import type { CallRecord, CallStatus } from "@/types";

const CALLS_KEY = "calls"; // Redis hash channelName -> JSON

export async function putCall(call: CallRecord): Promise<void> {
  await redis.hset(CALLS_KEY, { [call.channelName]: JSON.stringify(call) });
}

export async function getCall(channelName: string): Promise<CallRecord | null> {
  const raw = await redis.hget(CALLS_KEY, channelName) as string | null;
  return raw ? (JSON.parse(raw) as CallRecord) : null;
}

export async function deleteCall(channelName: string): Promise<void> {
  await redis.hdel(CALLS_KEY, channelName);
}

export async function listCalls(status?: CallStatus, maxAgeMs?: number): Promise<CallRecord[]> {
  const all = await redis.hgetall(CALLS_KEY) as Record<string, string> | null;
  const now = Date.now();
  const items = Object.values(all || {}).map((raw) => {
    if (typeof raw === "string") {
      return JSON.parse(raw) as CallRecord;
    }
    return raw as unknown as CallRecord; // already parsed object
  });


  return items.filter((c) => {
    const statusOk = status ? c.status === status : true;
    const ageOk = typeof maxAgeMs === "number" ? now - c.lastHeartbeatAt <= maxAgeMs : true;
    return statusOk && ageOk;
  }).sort((a, b) => b.createdAt - a.createdAt);
}

export async function updateCall(channelName: string, patch: Partial<CallRecord>): Promise<CallRecord | null> {
  const current = await getCall(channelName);
  if (!current) return null;

  const updated: CallRecord = { ...current, ...patch };
  await putCall(updated);
  return updated;
}
