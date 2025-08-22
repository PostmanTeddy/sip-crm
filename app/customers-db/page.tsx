"use client";
import { useEffect, useState } from "react";

type Customer = {
  id: string;
  company: string;
  contact_name?: string | null;
  email?: string | null;
  phone?: string | null;
  notes?: string | null;
};

export default function CustomersDbPage() {
  const [rows, setRows] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(false);

  const [company, setCompany] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  async function load() {
    setLoading(true);
    const r = await fetch("/api/customers/search?q=");
    const data = await r.json();
    setRows(data.customers ?? []);
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  async function add(e: React.FormEvent) {
    e.preventDefault();
    const r = await fetch("/api/customers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        company: company.trim(),
        contact_name: contact.trim() || null,
        email: email.trim() || null,
        phone: phone.trim() || null,
        name: "LEGACY", // API:en kräver name -> vi skickar placeholder men company är "sanningen"
      }),
    });
    const res = await r.json();
    if (!r.ok) return alert(res.error || "Kunde inte spara.");
    setCompany(""); setContact(""); setEmail(""); setPhone("");
    await load();
  }

  async function save(row: Customer) {
    const r = await fetch(`/api/customers/${row.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(row),
    });
    const res = await r.json();
    if (!r.ok) return alert(res.error || "Kunde inte uppdatera.");
    await load();
  }

  async function remove(id: string) {
    if (!confirm("Ta bort kunden?")) return;
    const r = await fetch(`/api/customers/${id}`, { method: "DELETE" });
    const res = await r.json();
    if (!r.ok) return alert(res.error || "Kunde inte ta bort.");
    await load();
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Kunddatabas</h1>

      <form onSubmit={add} className="grid gap-3 sm:grid-cols-2 md:grid-cols-4 border rounded-xl p-4 bg-white">
        <input className="rounded border px-3 py-2" placeholder="Företag *" required value={company} onChange={e=>setCompany(e.target.value)} />
        <input className="rounded border px-3 py-2" placeholder="Kontaktperson" value={contact} onChange={e=>setContact(e.target.value)} />
        <input className="rounded border px-3 py-2" placeholder="E-post" value={email} onChange={e=>setEmail(e.target.value)} />
        <input className="rounded border px-3 py-2" placeholder="Telefon" value={phone} onChange={e=>setPhone(e.target.value)} />
        <div className="sm:col-span-2 md:col-span-4">
          <button className="rounded-lg border px-3 py-2 hover:bg-neutral-100">Lägg till kund</button>
        </div>
      </form>

      <div className="rounded-xl border bg-white overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-neutral-50">
            <tr className="text-left">
              <th className="p-3 border-b">Företag</th>
              <th className="p-3 border-b">Kontakt</th>
              <th className="p-3 border-b">E-post</th>
              <th className="p-3 border-b">Telefon</th>
              <th className="p-3 border-b w-32"></th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td className="p-3" colSpan={5}>Laddar…</td></tr>
            ) : rows.length === 0 ? (
              <tr><td className="p-3" colSpan={5}>Inga kunder än.</td></tr>
            ) : rows.map(row => (
              <tr key={row.id} className="border-t">
                <td className="p-3">
                  <input className="w-full bg-transparent outline-none" value={row.company} onChange={e=>setRows(rs=>rs.map(r=>r.id===row.id?{...r,company:e.target.value}:r))} />
                </td>
                <td className="p-3">
                  <input className="w-full bg-transparent outline-none" value={row.contact_name||""} onChange={e=>setRows(rs=>rs.map(r=>r.id===row.id?{...r,contact_name:e.target.value}:r))} />
                </td>
                <td className="p-3">
                  <input className="w-full bg-transparent outline-none" value={row.email||""} onChange={e=>setRows(rs=>rs.map(r=>r.id===row.id?{...r,email:e.target.value}:r))} />
                </td>
                <td className="p-3">
                  <input className="w-full bg-transparent outline-none" value={row.phone||""} onChange={e=>setRows(rs=>rs.map(r=>r.id===row.id?{...r,phone:e.target.value}:r))} />
                </td>
                <td className="p-3 flex gap-2">
                  <button onClick={()=>save(row)} className="px-2 py-1 border rounded hover:bg-neutral-100">Spara</button>
                  <button onClick={()=>remove(row.id)} className="px-2 py-1 border rounded hover:bg-neutral-100">Ta bort</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
