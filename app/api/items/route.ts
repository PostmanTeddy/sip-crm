import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function GET() {
  const { data, error } = await supabaseAdmin
    .from("items")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ items: data ?? [] });
}

export async function POST(req: Request) {
  try {
    const { name, kind, unit, cost_price, sale_price } = await req.json();
    if (!name || typeof name !== "string" || !name.trim()) {
      return NextResponse.json({ error: "Namn är obligatoriskt." }, { status: 400 });
    }
    if (!["product","service"].includes(kind)) {
      return NextResponse.json({ error: "kind måste vara 'product' eller 'service'." }, { status: 400 });
    }
    const insert = {
      name: name.trim(),
      kind,
      unit: unit || null,
      cost_price: cost_price == null || cost_price === "" ? null : Number(cost_price),
      sale_price: sale_price == null || sale_price === "" ? null : Number(sale_price),
    };
    const { data, error } = await supabaseAdmin.from("items").insert([insert]).select().single();
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ item: data }, { status: 201 });
  } catch (e:any) {
    return NextResponse.json({ error: e?.message ?? "Okänt fel" }, { status: 500 });
  }
}
