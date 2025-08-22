"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

type Props = { children: React.ReactNode };
type Settings = { dashboard_enabled: boolean; customers_enabled: boolean };

function Icon({ name }: { name: "home"|"user"|"users"|"admin"|"box"|"gear" }) {
  const common = "w-5 h-5";
  switch (name) {
    case "home": return (<svg className={common} viewBox="0 0 24 24" fill="none"><path d="M3 10L12 3l9 7v10a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1V10z" stroke="currentColor" strokeWidth="1.5"/></svg>);
    case "user": return (<svg className={common} viewBox="0 0 24 24" fill="none"><path d="M12 12a5 5 0 1 0-5-5 5 5 0 0 0 5 5Zm7 9a7 7 0 1 0-14 0" stroke="currentColor" strokeWidth="1.5"/></svg>);
    case "users": return (<svg className={common} viewBox="0 0 24 24" fill="none"><path d="M16 11a4 4 0 1 0-4-4M8 13a4 4 0 1 0-4-4M22 21a6 6 0 0 0-12 0M10 21a6 6 0 0 0-8 0" stroke="currentColor" strokeWidth="1.5"/></svg>);
    case "admin": return (<svg className={common} viewBox="0 0 24 24" fill="none"><path d="M12 3l8 4v5c0 5-3.5 9.5-8 10-4.5-.5-8-5-8-10V7l8-4Z" stroke="currentColor" strokeWidth="1.5"/></svg>);
    case "box": return (<svg className={common} viewBox="0 0 24 24" fill="none"><path d="M3 7l9 4 9-4M3 7v10l9 4 9-4V7" stroke="currentColor" strokeWidth="1.5"/></svg>);
    case "gear": return (<svg className={common} viewBox="0 0 24 24" fill="none"><path d="M12 15a3 3 0 1 0-3-3 3 3 0 0 0 3 3Zm8-3a2 2 0 0 0-1.5-1.94 8.05 8.05 0 0 0-.62-1.5 2 2 0 0 0 .4-2.03 2 2 0 0 0-2.45-1.06 8.05 8.05 0 0 0-1.3-.75 2 2 0 0 0-3.06-1.42 8.07 8.07 0 0 0-1.5.62A2 2 0 0 0 7 2.5 2 2 0 0 0 5.97 5a8.05 8.05 0 0 0-.75 1.3 2 2 0 0 0-1.41 3.06 8.07 8.07 0 0 0-.62 1.5A2 2 0 0 0 2.5 12a2 2 0 0 0 1.69 1.95 8.05 8.05 0 0 0 .62 1.5 2 2 0 0 0-.4 2.03A2 2 0 0 0 7 18.54a8.05 8.05 0 0 0 1.3.75 2 2 0 0 0 3.06 1.42 8.07 8.07 0 0 0 1.5-.62 2 2 0 0 0 2.14.98A2 2 0 0 0 18.03 19a8.05 8.05 0 0 0 .75-1.3 2 2 0 0 0 1.41-3.06 8.07 8.07 0 0 0 .62-1.5A2 2 0 0 0 20 12Z" stroke="currentColor" strokeWidth="1.5"/></svg>);
    default: return null;
  }
}

export default function Shell({ children }: Props) {
  const [pinned, setPinned] = useState(false);
  const [adminOpen, setAdminOpen] = useState(true);
  const [settings, setSettings] = useState<Settings>({ dashboard_enabled: true, customers_enabled: true });
  const pathname = usePathname();

  useEffect(() => {
    fetch("/api/settings").then(r => r.json()).then(res => {
      if (res?.settings) setSettings(res.settings);
    }).catch(() => {});
  }, []);

  const expanded = pinned; // vid hover-expansion hanteras via CSS, pinned = låst
  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-800">
      {/* SIDOMENY */}
      <aside
        className={[
          "group/sidebar fixed inset-y-0 left-0 z-40 border-r border-neutral-200 bg-white/80 backdrop-blur",
          pinned ? "w-64" : "w-16 hover:w-64",
          "transition-all duration-300 ease-in-out"
        ].join(" ")}
      >
        {/* Header med pil + logga */}
        <div className="h-14 border-b border-neutral-200 flex items-center gap-2 px-3">
          <button
            aria-label="Lås upp/fast sidomeny"
            className="p-1 rounded hover:bg-neutral-100"
            onClick={() => setPinned(v => !v)}
            title={pinned ? "Lås upp" : "Lås fast"}
          >
            {/* liten pil */}
            <svg className={"w-5 h-5 " + (pinned ? "rotate-180" : "")} viewBox="0 0 24 24" fill="none">
              <path d="M15 19l-7-7 7-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <div className="overflow-hidden">
            <div className="font-semibold tracking-wide text-sm opacity-0 group-hover/sidebar:opacity-100 transition-opacity duration-200 whitespace-nowrap">
              SIP CRM
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="py-2">
          <NavItem href="/dashboard" active={pathname.startsWith("/dashboard")} icon="home" label="Dashboard" show={settings.dashboard_enabled}/>
          <NavItem href="/customers" active={pathname.startsWith("/customers")} icon="user" label="Kundkort" show={settings.customers_enabled}/>
          <NavItem href="/customers-db" active={pathname.startsWith("/customers-db")} icon="users" label="Kunddatabas" show={true}/>

          {/* Admin-grupp */}
          <div className="mt-2">
            <button
              onClick={() => setAdminOpen(v => !v)}
              className="w-full flex items-center gap-3 px-3 py-2 hover:bg-neutral-100"
            >
              <span className="w-6 flex items-center justify-center"><Icon name="admin" /></span>
              <span className="flex-1 text-sm opacity-0 group-hover/sidebar:opacity-100 transition-opacity">Admin</span>
              <svg className={"w-4 h-4 opacity-0 group-hover/sidebar:opacity-100 transition-transform " + (adminOpen ? "rotate-90" : "")} viewBox="0 0 24 24" fill="none"><path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="1.5"/></svg>
            </button>
            <div className={(adminOpen ? "max-h-40" : "max-h-0") + " overflow-hidden transition-all duration-300"}>
              <NavItem href="/admin/items" active={pathname.startsWith("/admin/items")} icon="box" label="Produkter & tjänster" nested/>
              <NavItem href="/admin/settings" active={pathname.startsWith("/admin/settings")} icon="gear" label="Inställningar" nested/>
            </div>
          </div>
        </nav>
      </aside>

      {/* INNEHÅLL */}
      <div className="pl-16 md:pl-16">
        <main className="max-w-6xl mx-auto px-4 py-6">
          {children}
        </main>
      </div>
    </div>
  );
}

function NavItem({
  href, active, icon, label, show = true, nested = false,
}: { href: string; active: boolean; icon: any; label: string; show?: boolean; nested?: boolean; }) {
  if (!show) return null;
  return (
    <Link
      href={href}
      className={[
        "flex items-center gap-3 px-3 py-2 border-l-2",
        active ? "bg-neutral-100/70 border-neutral-800" : "border-transparent hover:bg-neutral-100",
        nested ? "ml-6" : ""
      ].join(" ")}
    >
      <span className="w-6 flex items-center justify-center"><Icon name={icon} /></span>
      <span className="text-sm opacity-0 group-hover/sidebar:opacity-100 transition-opacity whitespace-nowrap">{label}</span>
    </Link>
  );
}
