import { NextResponse } from "next/server";
import { Client } from "pg";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function cfgFromEnv(url: string) {
  const u = new URL(url);
  const hostOverride = process.env.DB_IP || u.hostname;
  return {
    host: hostOverride,
    port: Number(u.port || 5432),
    user: decodeURIComponent(u.username),
    password: decodeURIComponent(u.password),
    database: u.pathname.slice(1),
    ssl: { rejectUnauthorized: false, servername: u.hostname },
  };
}

export async function GET() {
  const url = process.env.SUPABASE_DB_URL;
  if (!url) return NextResponse.json({ ok:false, error:"SUPABASE_DB_URL missing" }, { status:500 });

  const client = new Client(cfgFromEnv(url));
  try {
    await client.connect();
    const r = await client.query("select version(), current_database() as db, current_user as user, now()");
    return NextResponse.json({ ok:true, info: r.rows[0] });
  } catch (e:any) {
    return NextResponse.json({ ok:false, error: e?.message || String(e), code: e?.code, detail: e?.detail, hint: e?.hint }, { status:500 });
  } finally {
    try { await client.end(); } catch {}
  }
}