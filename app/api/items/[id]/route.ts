import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function GET(_: Request, { params }: { params: { id: string }}) {
  const { data, error } = await supabaseAdmin.from("items").select("*").eq("id", params.id).single();
  if (error) return NextResponse.json({ error: error.message }, { status: 404 });
  return NextResponse.json({ item: data });
}

export async function PATCH(req: Request, { params }: { params: { id: string }}) {
  try {
    const body = await req.json();
    if (body.name && !String(body.name).trim()) {
      return NextResponse.json({ error: "Namn kan inte vara tomt." }, { status: 400 });
    }
    const { data, error } = await supabaseAdmin
      .from("items")
      .update({
        name: body.name?.trim(),
        unit: body.unit ?? null,
        cost_price: body.cost_price == null || body.cost_price === "" ? null : Number(body.cost_price),
        sale_price: body.sale_price == null || body.sale_price === "" ? null : Number(body.sale_price),
      })
      .eq("id", params.id)
      .select()
      .single();
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ item: data });
  } catch (e:any) {
    return NextResponse.json({ error: e?.message ?? "Okänt fel" }, { status: 500 });
  }
}

export async function DELETE(_: Request, { params }: { params: { id: string }}) {
  // rensa ev. bundle-komponenter där item är parent
  await supabaseAdmin.from("item_components").delete().eq("parent_id", params.id);
  const { error } = await supabaseAdmin.from("items").delete().eq("id", params.id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
