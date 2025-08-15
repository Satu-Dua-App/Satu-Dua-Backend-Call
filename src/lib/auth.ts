export function requireOperatorAuth(req: Request) {
  const key = process.env.OPERATOR_API_KEY!;
  const header = req.headers.get("x-operator-key") || req.headers.get("authorization")?.replace(/^Bearer\s+/i, "");
  if (!header || header !== key) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { "content-type": "application/json" },
    });
  }
  return null; // OK
}

