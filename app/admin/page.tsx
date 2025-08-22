import Link from "next/link";

export default function AdminPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Admin</h1>
      <div className="grid sm:grid-cols-2 gap-4">
        <Link href="/admin/items" className="block rounded-xl border p-4 hover:bg-black/5 dark:hover:bg-white/10">
          <div className="font-medium">Produkter & tjänster</div>
          <div className="text-sm text-neutral-600 dark:text-neutral-400">Hantera items och paket</div>
        </Link>
        <Link href="/admin/settings" className="block rounded-xl border p-4 hover:bg-black/5 dark:hover:bg-white/10">
          <div className="font-medium">Inställningar</div>
          <div className="text-sm text-neutral-600 dark:text-neutral-400">Aktivera/inaktivera sidor</div>
        </Link>
      </div>
    </div>
  );
}
