import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function GET(_: Request, { params }: { params: { id: string }}) {
  const { data, error } = await supabaseAdmin.from("projects").select("*").eq("id", params.id).single();
  if (error) return NextResponse.json({ error: error.message }, { status: 404 });
  return NextResponse.json({ project: data });
}

export async function PATCH(req: Request, { params }: { params: { id: string }}) {
  try {
    const body = await req.json();
    if (body.name && !String(body.name).trim()) {
      return NextResponse.json({ error: "Namn kan inte vara tomt." }, { status: 400 });
    }
    const { data, error } = await supabaseAdmin
      .from("projects")
      .update({ name: body.name?.trim() })
      .eq("id", params.id)
      .select()
      .single();
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ project: data });
  } catch (e:any) {
    return NextResponse.json({ error: e?.message ?? "Okänt fel" }, { status: 500 });
  }
}

export async function DELETE(_: Request, { params }: { params: { id: string }}) {
  const { error } = await supabaseAdmin.from("projects").delete().eq("id", params.id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
