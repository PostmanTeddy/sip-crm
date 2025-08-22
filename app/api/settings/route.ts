import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

const KEY = "default";

export async function GET() {
  const { data, error } = await supabaseAdmin
    .from("settings")
    .select("*")
    .eq("id", KEY)
    .maybeSingle();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  if (!data) {
    const { data: created, error: insErr } = await supabaseAdmin
      .from("settings")
      .insert([{ id: KEY }])
      .select()
      .single();
    if (insErr) return NextResponse.json({ error: insErr.message }, { status: 500 });
    return NextResponse.json({ settings: created });
  }

  return NextResponse.json({ settings: data });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const payload = {
      id: KEY,
      dashboard_enabled: !!body.dashboard_enabled,
      customers_enabled: !!body.customers_enabled,
    };

    const { data, error } = await supabaseAdmin
      .from("settings")
      .upsert(payload, { onConflict: "id" })
      .select()
      .single();

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ settings: data });
  } catch (e:any) {
    return NextResponse.json({ error: e?.message ?? "Okänt fel" }, { status: 500 });
  }
}
