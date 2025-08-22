"use server";

import { revalidatePath } from "next/cache";
import { supabaseAdmin } from "../../lib/supabaseAdmin";

export async function createAccount(formData: FormData) {
  const name = String(formData.get("name") ?? "").trim();
  const contact_email = String(formData.get("email") ?? "").trim() || null;
  const phone = String(formData.get("phone") ?? "").trim() || null;
  const org_no = String(formData.get("orgno") ?? "").trim() || null;

  if (!name) return { error: "Ange namn" };

  const { error } = await supabaseAdmin.from("accounts").insert([
    { name, contact_email, phone, org_no }
  ]);

  if (error) return { error: error.message };

  revalidatePath("/accounts");
  return { ok: true };
}
