"use client";

import { useEffect, useMemo, useState } from "react";

type Item = {
  id: string;
  name: string;
  kind: "product" | "service" | "bundle";
  unit: string | null;
  cost_price: number | null;
  sale_price: number | null;
  created_at: string;
};

export default function ItemsPage() {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(false);

  // Nytt item
  const [name, setName] = useState("");
  const [kind, setKind] = useState<"product" | "service">("product");
  const [unit, setUnit] = useState("");
  const [cost, setCost] = useState<string>("");
  const [price, setPrice] = useState<string>("");

  // Redigera item (enkel inline)
  const [editId, setEditId] = useState<string | null>(null);
  const [edit, setEdit] = useState({ name: "", unit: "", cost_price: "", sale_price: "" });

  // Paket
  const [bundleName, setBundleName] = useState("");
  const [selected, setSelected] = useState<Record<string, number>>({}); // id -> qty

  const load = async () => {
    setLoading(true);
    const r = await fetch("/api/items");
    const data = await r.json();
    setItems(data.items ?? []);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const nonBundles = useMemo(() => items.filter(i => i.kind !== "bundle"), [items]);

  async function createItem(e: React.FormEvent) {
    e.preventDefault();
    const body = {
      name: name.trim(),
      kind,
      unit: unit || null,
      cost_price: cost === "" ? null : Number(cost),
      sale_price: price === "" ? null : Number(price),
    };
    const r = await fetch("/api/items", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const res = await r.json();
    if (r.ok) {
      setName(""); setUnit(""); setCost(""); setPrice(""); setKind("product");
      await load();
    } else { alert(res.error || "Kunde inte skapa item"); }
  }

  async function createBundle(e: React.FormEvent) {
    e.preventDefault();
    const components = Object.entries(selected)
      .filter(([, qty]) => qty && Number(qty) > 0)
      .map(([id, qty]) => ({ item_id: id, quantity: Number(qty) }));

    if (!bundleName.trim() || components.length === 0) {
      alert("Ange namn och välj minst en komponent med kvantitet.");
      return;
    }

    const r = await fetch("/api/bundles", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: bundleName.trim(), components }),
    });
    const res = await r.json();
    if (r.ok) {
      setBundleName(""); setSelected({});
      await load();
    } else { alert(res.error || "Kunde inte skapa paket"); }
  }

  function startEdit(it: Item) {
    setEditId(it.id);
    setEdit({
      name: it.name,
      unit: it.unit ?? "",
      cost_price: it.cost_price == null ? "" : String(it.cost_price),
      sale_price: it.sale_price == null ? "" : String(it.sale_price),
    });
  }

  async function saveEdit(id: string) {
    const r = await fetch(`/api/items/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: edit.name.trim(),
        unit: edit.unit || null,
        cost_price: edit.cost_price === "" ? null : Number(edit.cost_price),
        sale_price: edit.sale_price === "" ? null : Number(edit.sale_price),
      }),
    });
    const res = await r.json();
    if (!r.ok) { alert(res.error || "Kunde inte uppdatera"); return; }
    setEditId(null);
    await load();
  }

  async function remove(id: string) {
    if (!confirm("Ta bort? Detta går inte att ångra.")) return;
    const r = await fetch(`/api/items/${id}`, { method: "DELETE" });
    const res = await r.json().catch(()=>({}));
    if (!r.ok) { alert((res as any)?.error || "Kunde inte ta bort"); return; }
    await load();
  }

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-semibold">Produkter & tjänster</h1>

      {/* Skapa nytt item */}
      <section className="rounded-xl border p-4 space-y-3">
        <h2 className="font-medium">Lägg till item (produkt eller tjänst)</h2>
        <form onSubmit={createItem} className="grid gap-3 sm:grid-cols-2">
          <input className="rounded border px-3 py-2" placeholder="Namn" value={name} onChange={e=>setName(e.target.value)} required />
          <select className="rounded border px-3 py-2" value={kind} onChange={e=>setKind(e.target.value as any)}>
            <option value="product">Produkt</option>
            <option value="service">Tjänst</option>
          </select>
          <input className="rounded border px-3 py-2" placeholder="Enhet (t.ex. st, h, m²)" value={unit} onChange={e=>setUnit(e.target.value)} />
          <input className="rounded border px-3 py-2" placeholder="Inköpspris (kr)" value={cost} onChange={e=>setCost(e.target.value)} type="number" step="0.01" />
          <input className="rounded border px-3 py-2" placeholder="Pris till kund (kr)" value={price} onChange={e=>setPrice(e.target.value)} type="number" step="0.01" />
          <button className="rounded-lg border px-3 py-2 hover:bg-black/5 dark:hover:bg-white/10">Spara item</button>
        </form>
      </section>

      {/* Skapa paket */}
      <section className="rounded-xl border p-4 space-y-3">
        <h2 className="font-medium">Lägg till paket (bundle)</h2>
        <form onSubmit={createBundle} className="space-y-3">
          <input className="rounded border px-3 py-2 w-full" placeholder="Paketnamn (t.ex. Attefallstuga)" value={bundleName} onChange={e=>setBundleName(e.target.value)} required />
          <div className="border rounded-lg divide-y">
            {nonBundles.length === 0 ? (
              <div className="p-3 text-sm text-neutral-600">Lägg först till några produkter/tjänster ovan.</div>
            ) : nonBundles.map(it => (
              <div key={it.id} className="p-3 flex items-center gap-3">
                <div className="flex-1">
                  <div className="font-medium">{it.name}</div>
                  <div className="text-xs text-neutral-600">{it.kind}{it.unit ? ` • ${it.unit}` : ""} {it.sale_price ? `• ${it.sale_price} kr` : ""}</div>
                </div>
                <input
                  className="w-24 rounded border px-2 py-1"
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="Antal"
                  value={selected[it.id] ?? ""}
                  onChange={(e) => {
                    const v = e.target.value;
                    setSelected((s) => ({ ...s, [it.id]: v === "" ? (undefined as any) : Number(v) }));
                  }}
                />
              </div>
            ))}
          </div>
          <button className="rounded-lg border px-3 py-2 hover:bg-black/5 dark:hover:bg-white/10">Spara paket</button>
        </form>
      </section>

      {/* Lista och redigera/ta bort */}
      <section className="rounded-xl border p-4 space-y-3">
        <h2 className="font-medium">Items</h2>
        {loading ? <div>Laddar…</div> : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left border-b">
                  <th className="py-2 pr-2">Namn</th>
                  <th className="py-2 pr-2">Typ</th>
                  <th className="py-2 pr-2">Enhet</th>
                  <th className="py-2 pr-2">Inköp</th>
                  <th className="py-2 pr-2">Pris</th>
                  <th className="py-2">Åtgärder</th>
                </tr>
              </thead>
              <tbody>
                {items.map(it => (
                  <tr key={it.id} className="border-b">
                    <td className="py-2 pr-2">
                      {editId === it.id ? (
                        <input className="rounded border px-2 py-1 w-full" value={edit.name} onChange={e=>setEdit(s=>({...s, name:e.target.value}))} />
                      ) : it.name}
                    </td>
                    <td className="py-2 pr-2">{it.kind}</td>
                    <td className="py-2 pr-2">
                      {editId === it.id ? (
                        <input className="rounded border px-2 py-1 w-24" value={edit.unit} onChange={e=>setEdit(s=>({...s, unit:e.target.value}))} />
                      ) : (it.unit ?? "—")}
                    </td>
                    <td className="py-2 pr-2">
                      {editId === it.id ? (
                        <input className="rounded border px-2 py-1 w-24" type="number" step="0.01" value={edit.cost_price} onChange={e=>setEdit(s=>({...s, cost_price:e.target.value}))} />
                      ) : (it.cost_price ?? "—")}
                    </td>
                    <td className="py-2 pr-2">
                      {editId === it.id ? (
                        <input className="rounded border px-2 py-1 w-24" type="number" step="0.01" value={edit.sale_price} onChange={e=>setEdit(s=>({...s, sale_price:e.target.value}))} />
                      ) : (it.sale_price ?? "—")}
                    </td>
                    <td className="py-2">
                      {it.kind === "bundle" ? (
                        <div className="flex gap-2">
                          <button className="rounded border px-2 py-1 opacity-50 cursor-not-allowed" title="Redigering av paket kommer senare">Redigera</button>
                          <button className="rounded border px-2 py-1 hover:bg-black/5" onClick={()=>remove(it.id)}>Ta bort</button>
                        </div>
                      ) : editId === it.id ? (
                        <div className="flex gap-2">
                          <button className="rounded border px-2 py-1 hover:bg-black/5" onClick={()=>saveEdit(it.id)}>Spara</button>
                          <button className="rounded border px-2 py-1 hover:bg-black/5" onClick={()=>setEditId(null)}>Avbryt</button>
                        </div>
                      ) : (
                        <div className="flex gap-2">
                          <button className="rounded border px-2 py-1 hover:bg-black/5" onClick={()=>startEdit(it)}>Redigera</button>
                          <button className="rounded border px-2 py-1 hover:bg-black/5" onClick={()=>remove(it.id)}>Ta bort</button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
                {items.length === 0 && (
                  <tr><td className="py-3 text-neutral-600" colSpan={6}>Inga items ännu.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
