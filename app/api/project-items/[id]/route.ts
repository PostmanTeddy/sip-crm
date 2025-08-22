import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function PATCH(req: Request, { params }: { params: { id: string }}) {
  const body = await req.json();
  const patch: any = {};
  if (body.quantity != null) patch.quantity = Number(body.quantity);
  if (body.price_override !== undefined) patch.price_override = body.price_override === null ? null : Number(body.price_override);

  const { data, error } = await supabaseAdmin
    .from("project_items")
    .update(patch)
    .eq("id", params.id)
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ line: data });
}

export async function DELETE(_: Request, { params }: { params: { id: string }}) {
  const { error } = await supabaseAdmin.from("project_items").delete().eq("id", params.id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
