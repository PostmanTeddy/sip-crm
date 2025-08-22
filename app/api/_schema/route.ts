import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { Client } from "pg";

export const runtime = "nodejs";
export const dynamic = "force-dynamic"; // ingen cache

function bad(msg: string, status = 400) {
  return NextResponse.json({ error: msg }, { status });
}
function qIdent(id: string) {
  return '"' + id.replace(/"/g, '""') + '"';
}

export async function GET(req: NextRequest) {
  // 1) Gatekeepers
  if (process.env.ALLOW_SCHEMA_INTROSPECTION !== "true") {
    return bad("disabled", 403);
  }
  const provided = req.headers.get("x-introspect-key") || "";
  const expected = process.env.INTROSPECT_KEY || "";
  if (!expected || provided !== expected) {
    return bad("unauthorized", 401);
  }
  const dbUrl = process.env.SUPABASE_DB_URL;
  if (!dbUrl) return bad("SUPABASE_DB_URL missing in env", 500);

  const { searchParams } = new URL(req.url);
  const withCounts = searchParams.get("counts") === "1";
  // valfritt ?samples=1 (hämta 5 rader/tabell) – AV pga risk
  const withSamples = false;

  const client = new Client({ connectionString: dbUrl });
  await client.connect();

  try {
    const tablesRes = await client.query(`
      select table_name
      from information_schema.tables
      where table_schema = 'public' and table_type = 'BASE TABLE'
      order by table_name
    `);
    const tables: string[] = tablesRes.rows.map(r => r.table_name);

    const columnsRes = await client.query(`
      select table_name,
             ordinal_position as pos,
             column_name,
             data_type,
             is_nullable,
             column_default
      from information_schema.columns
      where table_schema = 'public'
      order by table_name, pos
    `);

    const pksRes = await client.query(`
      select tc.table_name,
             kcu.column_name,
             tc.constraint_name
      from information_schema.table_constraints tc
      join information_schema.key_column_usage kcu
        on tc.constraint_name = kcu.constraint_name
       and tc.table_schema   = kcu.table_schema
      where tc.table_schema = 'public'
        and tc.constraint_type = 'PRIMARY KEY'
      order by tc.table_name, kcu.ordinal_position
    `);

    const fksRes = await client.query(`
      select tc.table_name,
             kcu.column_name,
             ccu.table_name as references_table,
             ccu.column_name as references_column,
             tc.constraint_name
      from information_schema.table_constraints tc
      join information_schema.key_column_usage kcu
        on tc.constraint_name = kcu.constraint_name
       and tc.table_schema   = kcu.table_schema
      join information_schema.constraint_column_usage ccu
        on ccu.constraint_name = tc.constraint_name
       and ccu.table_schema   = tc.table_schema
      where tc.table_schema = 'public'
        and tc.constraint_type = 'FOREIGN KEY'
      order by tc.table_name, kcu.ordinal_position
    `);

    let counts: Array<{ table: string; rows: number }> | undefined;
    if (withCounts) {
      counts = [];
      for (const t of tables) {
        const c = await client.query(`select count(*)::bigint as n from ${qIdent(t)}`);
        counts.push({ table: t, rows: Number(c.rows[0].n) });
      }
    }

    // samples är avstängt av säkerhetsskäl. Slå på om du vill.
    let samples: Record<string, unknown[]> | undefined;
    if (withSamples) {
      samples = {};
      for (const t of tables) {
        try {
          const s = await client.query(`select * from ${qIdent(t)} limit 5`);
          samples[t] = s.rows;
        } catch { /* ignorera */ }
      }
    }

    return NextResponse.json({
      ok: true,
      tables,
      columns: columnsRes.rows,
      primary_keys: pksRes.rows,
      foreign_keys: fksRes.rows,
      counts,
      samples,
      generated_at: new Date().toISOString(),
    });
  } catch (err: any) {
    return bad(err?.message || String(err), 500);
  } finally {
    await client.end();
  }
}