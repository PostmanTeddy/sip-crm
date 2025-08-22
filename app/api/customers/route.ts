import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function GET() {
  const { data, error } = await supabaseAdmin
    .from("customers")
    .select("id,company,contact_name,email,phone,created_at")
    .order("company", { ascending: true });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ customers: data ?? [] });
}

export async function POST(req: Request) {
  try {
    const { company, contact_name, email, phone } = await req.json();
    if (!company || !String(company).trim()) {
      return NextResponse.json({ error: "Företagsnamn är obligatoriskt." }, { status: 400 });
    }
    const { data, error } = await supabaseAdmin
      .from("customers")
      .insert([{ company: String(company).trim(), contact_name, email, phone }])
      .select()
      .single();

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ customer: data }, { status: 201 });
  } catch (e:any) {
    return NextResponse.json({ error: e?.message ?? "Okänt fel" }, { status: 500 });
  }
}
