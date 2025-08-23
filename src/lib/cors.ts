const ALLOW_ORIGIN = "*"; // tighten for production

export const corsHeaders = {
  "access-control-allow-origin": ALLOW_ORIGIN,
  "access-control-allow-methods": "GET,POST,OPTIONS",
  "access-control-allow-headers": "content-type,authorization,x-operator-key",
  "content-type": "application/json",
};

export function withCors(json: unknown, init?: ResponseInit) {
  return new Response(JSON.stringify(json), {
    ...init,
    headers: { ...corsHeaders, ...(init?.headers || {}) },
  });
}

export function ok() {
  return new Response(null, {
    status: 200,
    headers: corsHeaders,
  });
}

