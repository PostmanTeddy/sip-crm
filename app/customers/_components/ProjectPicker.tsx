"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { fetchJSON } from "@/lib/api";

type Project = {
  id: string;
  customer_id: string;
  name: string;
  status?: string | null;
  created_at: string;
};

export default function ProjectPicker({ customerId }: { customerId: string }) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [newName, setNewName] = useState("");

  const router = useRouter();
  const pathname = usePathname();
  const sp = useSearchParams();

  const selected = sp.get("projectId") ?? "";

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        setLoading(true);
        const data = await fetchJSON<{ projects: Project[] }>(`/api/projects?customer_id=${encodeURIComponent(customerId)}`, { cache: "no-store" });
        if (!alive) return;
        setProjects(data.projects ?? []);
      } catch (e) {
        console.error(e);
        alert(`Kunde inte hÃ¤mta projekt: ${String(e)}`);
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => { alive = false; };
  }, [customerId]);

  const options = useMemo(() => projects.map(p => ({ value: p.id, label: p.name })), [projects]);

  function setProjectId(id: string) {
    const params = new URLSearchParams(sp.toString());
    if (id) params.set("projectId", id); else params.delete("projectId");
    // behÃ¥ll t.ex. ?id=<customerId> i URL:en
    router.replace(`${pathname}?${params.toString()}`);
  }

  async function createProject() {
    const name = newName.trim();
    if (!name) return;
    try {
      setCreating(true);
      const res = await fetchJSON<{ project: Project }>(`/api/projects`, {
        method: "POST",
        body: JSON.stringify({ customer_id: customerId, name })
      });
      setProjects(prev => [...prev, res.project]);
      setNewName("");
      setProjectId(res.project.id);
    } catch (e) {
      console.error(e);
      alert(`Kunde inte skapa projekt: ${String(e)}`);
    } finally {
      setCreating(false);
    }
  }

  return (
    <div className="rounded-2xl border p-4 bg-white space-y-3">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-end">
        <div className="md:col-span-2">
          <label className="block text-sm text-gray-600 mb-1">VÃ¤lj projekt</label>
          <select
            value={selected}
            onChange={(e) => setProjectId(e.target.value)}
            className="w-full rounded-xl border px-3 py-2"
            disabled={loading}
          >
            <option value="">{loading ? "Laddarâ€¦" : "â€” VÃ¤lj â€”"}</option>
            {options.map(o => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm text-gray-600 mb-1">Skapa nytt projekt</label>
          <div className="flex gap-2">
            <input
              value={newName}
              onChange={e => setNewName(e.target.value)}
              placeholder="Projektnamn"
              className="flex-1 rounded-xl border px-3 py-2"
            />
            <button
              onClick={createProject}
              disabled={creating || !newName.trim()}
              className="rounded-xl bg-emerald-500 text-white px-4 py-2 hover:opacity-95 disabled:opacity-60"
            >
              {creating ? "Skaparâ€¦" : "Skapa"}
            </button>
          </div>
        </div>
      </div>

      {selected && (
        <div className="text-xs text-gray-500">Valt projekt-ID: <code>{selected}</code></div>
      )}
    </div>
  );
}
