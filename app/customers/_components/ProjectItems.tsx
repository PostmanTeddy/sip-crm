"use client";

import { useEffect, useMemo, useState } from "react";
import { fetchJSON } from "@/lib/api";

type Item = {
  id: string;
  name: string;
  kind: "product" | "service" | "bundle";
  unit: string | null;
  cost_price: number | null;
  sale_price: number | null;
};
type ProjectLine = {
  id: string;
  item_id: string;
  quantity: number;
  price_override: number | null;
  created_at: string;
  item?: Item | null;
};

type Props = { projectId: string; };

export default function ProjectItems({ projectId }: Props) {
  const [lines, setLines] = useState<ProjectLine[]>([]);
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);

  const [search, setSearch] = useState("");
  const [selectedItemId, setSelectedItemId] = useState<string>("");
  const [qty, setQty] = useState<number>(1);
  const [override, setOverride] = useState<string>("");

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        setLoading(true);
        const data = await fetchJSON<{ items: ProjectLine[] }>(`/api/projects/${projectId}/items`, { cache: "no-store" });
        const all = await fetchJSON<{ items: Item[] } | Item[]>(`/api/items`, { cache: "no-store" });
        const itemList = Array.isArray(all) ? all : (all as any)?.items ?? [];
        if (!alive) return;
        setLines(data.items ?? []);
        setItems(itemList);
      } catch (e) {
        console.error(e);
        alert(`Kunde inte ladda projekt: ${String(e)}`);
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => { alive = false; };
  }, [projectId]);

  const filteredItems = useMemo(() => {
    const q = search.trim().toLowerCase();
    const arr = items ?? [];
    if (!q) return arr.slice(0, 50);
    return arr.filter(i =>
      i.name?.toLowerCase().includes(q) ||
      i.id?.toLowerCase().includes(q)
    ).slice(0, 50);
  }, [items, search]);

  const pricePerUnit = (l: ProjectLine) => l.price_override ?? (l.item?.sale_price ?? 0);
  const lineTotal = (l: ProjectLine) => pricePerUnit(l) * (l.quantity ?? 0);
  const grandTotal = useMemo(() => lines.reduce((s, l) => s + lineTotal(l), 0), [lines]);

  async function addLine() {
    if (!selectedItemId) { alert("Välj en produkt/tjänst"); return; }
    try {
      setAdding(true);
      const body: any = { item_id: selectedItemId, quantity: qty };
      if (override.trim() !== "") body.price_override = Number(override.replace(",", "."));
      const res = await fetchJSON<{ line: ProjectLine }>(`/api/projects/${projectId}/items`, {
        method: "POST",
        body: JSON.stringify(body)
      });
      const item = items.find(i => i.id === res.line.item_id) ?? null;
      setLines(prev => [...prev, { ...res.line, item }]);
      setSelectedItemId(""); setQty(1); setOverride(""); setSearch("");
    } catch (e) {
      console.error(e);
      alert(`Kunde inte lägga till rad: ${String(e)}`);
    } finally {
      setAdding(false);
    }
  }

  async function updateQty(line: ProjectLine, delta: number) {
    const next = Math.max(1, (line.quantity ?? 1) + delta);
    try {
      const updated = await fetchJSON<{ line: ProjectLine }>(`/api/project-items/${line.id}`, {
        method: "PATCH",
        body: JSON.stringify({ quantity: next })
      });
      setLines(prev => prev.map(l => l.id === line.id ? { ...l, quantity: updated.line.quantity } : l));
    } catch (e) {
      console.error(e);
      alert(`Uppdatering misslyckades: ${String(e)}`);
    }
  }

  async function updateOverride(line: ProjectLine, value: string) {
    const num = value.trim() === "" ? null : Number(value.replace(",", "."));
    try {
      const updated = await fetchJSON<{ line: ProjectLine }>(`/api/project-items/${line.id}`, {
        method: "PATCH",
        body: JSON.stringify({ price_override: num })
      });
      setLines(prev => prev.map(l => l.id === line.id ? { ...l, price_override: updated.line.price_override } : l));
    } catch (e) {
      console.error(e);
      alert(`Prisoverride misslyckades: ${String(e)}`);
    }
  }

  async function removeLine(line: ProjectLine) {
    if (!confirm("Ta bort raden?")) return;
    try {
      await fetchJSON<{ ok: true }>(`/api/project-items/${line.id}`, { method: "DELETE" });
      setLines(prev => prev.filter(l => l.id !== line.id));
    } catch (e) {
      console.error(e);
      alert(`Kunde inte ta bort: ${String(e)}`);
    }
  }

  if (loading) return <div className="text-sm text-gray-500">Laddar projekt…</div>;

  return (
    <div className="space-y-4">
      <div className="rounded-2xl border p-4 bg-white">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 items-end">
          <div className="md:col-span-2">
            <label className="block text-sm text-gray-600 mb-1">Sök produkt/tjänst</label>
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Sök…" className="w-full rounded-xl border px-3 py-2" />
            <select value={selectedItemId} onChange={e => setSelectedItemId(e.target.value)} className="mt-2 w-full rounded-xl border px-3 py-2">
              <option value="">Välj…</option>
              {filteredItems.map(i => (
                <option key={i.id} value={i.id}>
                  {i.name} {i.sale_price != null ? `– ${i.sale_price} kr` : ""}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Antal</label>
            <input type="number" min={1} value={qty} onChange={e => setQty(Math.max(1, Number(e.target.value)))} className="w-full rounded-xl border px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Prisoverride (kr/st)</label>
            <input type="text" inputMode="decimal" value={override} onChange={e => setOverride(e.target.value)} placeholder="valfritt" className="w-full rounded-xl border px-3 py-2" />
          </div>
          <div>
            <button onClick={addLine} disabled={adding} className="w-full rounded-xl bg-emerald-500 text-white px-4 py-2 hover:opacity-95 disabled:opacity-60">
              {adding ? "Lägger till…" : "Lägg till i projekt"}
            </button>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border overflow-hidden bg-white">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr className="[&>th]:text-left [&>th]:px-3 [&>th]:py-2 text-gray-600">
              <th>Artikel</th><th>Antal</th><th>Enhet</th><th>Pris/st</th><th>Radbelopp</th><th></th>
            </tr>
          </thead>
          <tbody className="[&>tr>td]:px-3 [&>tr>td]:py-2">
            {lines.map(l => (
              <tr key={l.id} className="border-t">
                <td className="max-w-[320px]">
                  <div className="font-medium">{l.item?.name ?? l.item_id}</div>
                  <div className="text-xs text-gray-500">{l.item?.kind ?? ""}</div>
                </td>
                <td>
                  <div className="inline-flex items-center gap-1">
                    <button onClick={() => updateQty(l, -1)} className="rounded-lg border px-2">−</button>
                    <span className="w-10 text-center">{l.quantity}</span>
                    <button onClick={() => updateQty(l, +1)} className="rounded-lg border px-2">+</button>
                  </div>
                </td>
                <td>{l.item?.unit ?? ""}</td>
                <td>
                  <input className="w-28 rounded-lg border px-2 py-1" defaultValue={l.price_override ?? ""} placeholder={l.item?.sale_price?.toString() ?? ""} onBlur={(e) => updateOverride(l, e.target.value)} />
                </td>
                <td>{lineTotal(l).toLocaleString("sv-SE")} kr</td>
                <td className="text-right">
                  <button onClick={() => removeLine(l)} className="rounded-lg border px-3 py-1">Ta bort</button>
                </td>
              </tr>
            ))}
            {lines.length === 0 && (<tr><td colSpan={6} className="text-center text-gray-500 py-6">Inga rader ännu</td></tr>)}
          </tbody>
          <tfoot>
            <tr className="border-t bg-gray-50 font-semibold">
              <td colSpan={4} className="text-right px-3 py-2">Totalt</td>
              <td className="px-3 py-2">{grandTotal.toLocaleString("sv-SE")} kr</td>
              <td></td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}