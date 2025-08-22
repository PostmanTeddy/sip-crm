"use client";

import { useEffect, useState } from "react";

export default function AdminSettingsPage() {
  const [loading, setLoading] = useState(true);
  const [dashboard, setDashboard] = useState(true);
  const [customers, setCustomers] = useState(true);

  useEffect(() => {
    fetch("/api/settings").then(r=>r.json()).then(res=>{
      setDashboard(!!res.settings?.dashboard_enabled);
      setCustomers(!!res.settings?.customers_enabled);
      setLoading(false);
    });
  }, []);

  async function save() {
    const r = await fetch("/api/settings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ dashboard_enabled: dashboard, customers_enabled: customers }),
    });
    const res = await r.json();
    if (!r.ok) alert(res.error || "Kunde inte spara");
  }

  if (loading) return <div>Laddar…</div>;
  return (
    <div className="space-y-6 max-w-xl">
      <h1 className="text-2xl font-semibold">Inställningar</h1>
      <label className="flex items-center gap-3">
        <input type="checkbox" checked={dashboard} onChange={e=>setDashboard(e.target.checked)} />
        <span>Aktivera Dashboard</span>
      </label>
      <label className="flex items-center gap-3">
        <input type="checkbox" checked={customers} onChange={e=>setCustomers(e.target.checked)} />
        <span>Aktivera Kundkort</span>
      </label>
      <button onClick={save} className="rounded-lg border px-3 py-2 hover:bg-black/5 dark:hover:bg-white/10">
        Spara
      </button>
    </div>
  );
}
