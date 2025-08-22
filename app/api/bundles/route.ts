import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function POST(req: Request) {
  try {
    const { name, components } = await req.json();
    if (!name || typeof name !== "string" || !name.trim()) {
      return NextResponse.json({ error: "Paketnamn saknas." }, { status: 400 });
    }
    if (!Array.isArray(components) || components.length === 0) {
      return NextResponse.json({ error: "Välj minst en komponent." }, { status: 400 });
    }

    const ids = components.map((c: any) => c.item_id);
    const { data: baseItems, error: selErr } = await supabaseAdmin
      .from("items")
      .select("id,cost_price,sale_price")
      .in("id", ids);
    if (selErr) return NextResponse.json({ error: selErr.message }, { status: 500 });

    const findPrice = (id: string) => baseItems?.find(i => i.id === id) ?? null;
    let costSum = 0, saleSum = 0;
    for (const c of components) {
      const found = findPrice(c.item_id);
      if (!found) continue;
      const qty = Number(c.quantity ?? 1);
      costSum += Number(found.cost_price ?? 0) * qty;
      saleSum += Number(found.sale_price ?? 0) * qty;
    }

    const { data: bundle, error: insErr } = await supabaseAdmin
      .from("items")
      .insert([{ name: name.trim(), kind: "bundle", unit: "paket", cost_price: costSum, sale_price: saleSum }])
      .select()
      .single();
    if (insErr) return NextResponse.json({ error: insErr.message }, { status: 500 });

    const rows = components.map((c: any) => ({
      parent_id: bundle.id,
      child_id: c.item_id,
      quantity: Number(c.quantity ?? 1),
    }));
    const { error: compErr } = await supabaseAdmin.from("item_components").insert(rows);
    if (compErr) return NextResponse.json({ error: compErr.message }, { status: 500 });

    return NextResponse.json({ bundle }, { status: 201 });
  } catch (e:any) {
    return NextResponse.json({ error: e?.message ?? "Okänt fel" }, { status: 500 });
  }
}
