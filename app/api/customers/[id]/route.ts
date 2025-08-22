import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function GET(_: Request, { params }: { params: { id: string }}) {
  const { data, error } = await supabaseAdmin.from("customers").select("*").eq("id", params.id).single();
  if (error) return NextResponse.json({ error: error.message }, { status: 404 });
  return NextResponse.json({ customer: data });
}

export async function PATCH(req: Request, { params }: { params: { id: string }}) {
  try {
    const body = await req.json();
    if (body.company && !String(body.company).trim()) {
      return NextResponse.json({ error: "Företagsnamn kan inte vara tomt." }, { status: 400 });
    }
    const { data, error } = await supabaseAdmin
      .from("customers")
      .update({
        company: body.company?.trim(),
        contact_name: body.contact_name ?? null,
        email: body.email ?? null,
        phone: body.phone ?? null,
        notes: body.notes ?? null,
      })
      .eq("id", params.id)
      .select()
      .single();
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ customer: data });
  } catch (e:any) {
    return NextResponse.json({ error: e?.message ?? "Okänt fel" }, { status: 500 });
  }
}

export async function DELETE(_: Request, { params }: { params: { id: string }}) {
  const { error } = await supabaseAdmin.from("customers").delete().eq("id", params.id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
