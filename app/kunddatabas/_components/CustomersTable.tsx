"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { fetchJSON } from "@/lib/api";

type Customer = {
  id: string;
  company: string;
  contact_name?: string | null;
  email?: string | null;
  phone?: string | null;
};

export default function CustomersTable() {
  const [rows, setRows] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        setLoading(true);
        const data = await fetchJSON<{ customers: Customer[] } | Customer[]>(`/api/customers?limit=200`, { cache: "no-store" });
        const list = Array.isArray(data) ? data : (data as any)?.customers ?? [];
        if (!alive) return;
        setRows(list);
      } catch (e) {
        console.error(e);
        alert(`Kunde inte hämta kunder: ${String(e)}`);
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => { alive = false; };
  }, []);

  function open(id: string) {
    router.push(`/customers/${encodeURIComponent(id)}`);
  }

  // Bygg headern utan whitespace-noder
  const headerCells = [
    <th key="h1">Företag</th>,
    <th key="h2">Kontakt</th>,
    <th key="h3">E-post</th>,
    <th key="h4">Telefon</th>,
  ];
  const header = (
    <thead key="thead" className="bg-gray-50">
      {[
        <tr key="hr" className="[&>th]:text-left [&>th]:px-3 [&>th]:py-2 text-gray-600">{headerCells}</tr>
      ]}
    </thead>
  );

  // Bygg body-rader som ren array
  const bodyRows: JSX.Element[] = [];
  if (loading) {
    bodyRows.push(
      <tr key="loading"><td colSpan={4} className="py-6 text-center text-gray-500">Laddar…</td></tr>
    );
  } else if (rows.length === 0) {
    bodyRows.push(
      <tr key="empty"><td colSpan={4} className="py-6 text-center text-gray-500">Inga kunder</td></tr>
    );
  } else {
    for (const r of rows) {
      const cells = [
        <td key="c1" className="font-medium">{r.company}</td>,
        <td key="c2">{r.contact_name ?? ""}</td>,
        <td key="c3">{r.email ?? ""}</td>,
        <td key="c4">{r.phone ?? ""}</td>,
      ];
      bodyRows.push(
        <tr
          key={r.id}
          onClick={() => open(r.id)}
          className="border-t hover:bg-gray-50 cursor-pointer"
          title="Öppna kundkort"
        >
          {cells}
        </tr>
      );
    }
  }

  return (
    <div className="rounded-2xl border overflow-hidden bg-white">
      <table className="w-full text-sm">
        {[
          header,
          <tbody key="tbody" className="[&>tr>td]:px-3 [&>tr>td]:py-2">{bodyRows}</tbody>,
        ]}
      </table>
    </div>
  );
}