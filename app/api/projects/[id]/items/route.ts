import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function GET(_: Request, { params }: { params: { id: string }}) {
  const pid = params.id;
  const { data: lines, error } = await supabaseAdmin
    .from("project_items")
    .select("id,item_id,quantity,price_override,created_at")
    .eq("project_id", pid)
    .order("created_at", { ascending: true });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const ids = Array.from(new Set((lines ?? []).map(l => l.item_id)));
  let map: Record<string, any> = {};
  if (ids.length) {
    const { data: items, error: e2 } = await supabaseAdmin
      .from("items")
      .select("id,name,kind,unit,cost_price,sale_price")
      .in("id", ids);
    if (e2) return NextResponse.json({ error: e2.message }, { status: 500 });
    map = Object.fromEntries((items ?? []).map(i => [i.id, i]));
  }

  const enriched = (lines ?? []).map(l => ({ ...l, item: map[l.item_id] || null }));
  return NextResponse.json({ items: enriched });
}

export async function POST(req: Request, { params }: { params: { id: string }}) {
  const pid = params.id;
  const body = await req.json();
  const item_id = String(body.item_id || "");
  const quantity = Number(body.quantity ?? 1);
  const price_override = body.price_override == null ? null : Number(body.price_override);

  if (!item_id) return NextResponse.json({ error: "item_id saknas" }, { status: 400 });
  if (!(quantity > 0)) return NextResponse.json({ error: "quantity måste vara > 0" }, { status: 400 });

  const { data, error } = await supabaseAdmin
    .from("project_items")
    .insert([{ project_id: pid, item_id, quantity, price_override }])
    .select("id,item_id,quantity,price_override,created_at")
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ line: data }, { status: 201 });
}
