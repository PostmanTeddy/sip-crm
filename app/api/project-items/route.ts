import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const project_id = searchParams.get("project_id");
  if (!project_id) return NextResponse.json({ rows: [] });

  const { data, error } = await supabaseAdmin
    .from("project_items")
    .select("id,quantity,item:items(id,name,kind,unit,cost_price,sale_price)")
    .eq("project_id", project_id)
    .order("id");
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ rows: data ?? [] });
}

export async function POST(req: Request) {
  try {
    const { project_id, item_id, quantity } = await req.json();
    if (!project_id || !item_id || !Number(quantity)) {
      return NextResponse.json({ error: "project_id, item_id och quantity krävs." }, { status: 400 });
    }
    const { data, error } = await supabaseAdmin
      .from("project_items")
      .insert([{ project_id, item_id, quantity: Number(quantity) }])
      .select()
      .single();
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ row: data }, { status: 201 });
  } catch (e:any) {
    return NextResponse.json({ error: e?.message ?? "Okänt fel" }, { status: 500 });
  }
}
