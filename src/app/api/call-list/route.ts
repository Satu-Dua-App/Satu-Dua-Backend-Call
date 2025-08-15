import { NextRequest } from "next/server";
import { withCors, ok } from "@/lib/cors";
import { listCalls } from "@/lib/calls";
import { requireOperatorAuth } from "@/lib/auth";

export const runtime = "nodejs";
const STALE_MS = 2 * 60 * 1000; // hide calls with no heartbeat for 2 minutes

export async function OPTIONS() { return ok(); }

export async function GET(req: NextRequest) {
  const unauthorized = requireOperatorAuth(req);
  if (unauthorized) return unauthorized;

  const waiting = await listCalls("waiting", STALE_MS);
  return withCors(waiting);
}

