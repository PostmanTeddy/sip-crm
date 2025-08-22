import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const customer_id = searchParams.get("customer_id");

  let query = supabaseAdmin
    .from("projects")
    .select("id,customer_id,name,created_at");

  if (customer_id) query = query.eq("customer_id", customer_id);

  const { data, error } = await query.order("created_at", { ascending: true });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ projects: data ?? [] });
}

export async function POST(req: Request) {
  const body = await req.json();
  const customer_id = String(body.customer_id || "").trim();
  const name = String(body.name || "").trim();

  if (!customer_id) return NextResponse.json({ error: "customer_id saknas" }, { status: 400 });
  if (!name) return NextResponse.json({ error: "name saknas" }, { status: 400 });

  const { data, error } = await supabaseAdmin
    .from("projects")
    .insert([{ customer_id, name }])
    .select("id,customer_id,name,created_at")
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ project: data }, { status: 201 });
}