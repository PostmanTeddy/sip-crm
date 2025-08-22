import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function bad(msg: string, status = 400, extra?: any) {
  return NextResponse.json({ ok: false, error: msg, details: extra ?? null }, { status });
}

export async function GET(req: NextRequest) {
  if (process.env.ALLOW_SCHEMA_INTROSPECTION !== "true") return bad("disabled", 403);

  const provided = req.headers.get("x-introspect-key") || "";
  const expected = process.env.INTROSPECT_KEY || "";
  if (!expected || provided !== expected) return bad("unauthorized", 401);

  const withCounts = new URL(req.url).searchParams.get("counts") === "1";

  const { data, error } = await supabaseAdmin.rpc("introspect_all", { with_counts: withCounts });
  if (error) {
    console.error("INTROSPECT RPC ERROR:", error);
    return bad(error.message || "rpc failed", 500, { code: (error as any)?.code });
  }
  return NextResponse.json(data);
}