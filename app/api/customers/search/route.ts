import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = (searchParams.get("q") || "").trim();

  let query = supabaseAdmin.from("customers")
    .select("id,company,contact_name,email,phone")
    .order("company", { ascending: true })
    .limit(50);

  if (q) {
    const like = `%${q}%`;
    query = query.or(
      [
        `company.ilike.${like}`,
        `contact_name.ilike.${like}`,
        `email.ilike.${like}`,
        `phone.ilike.${like}`,
      ].join(",")
    );
  }

  const { data, error } = await query;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ customers: data ?? [] });
}
