import { supabaseAdmin } from "../../lib/supabaseAdmin";
import { createAccount } from "./actions";

export default async function AccountsPage() {
  const { data: accounts, error } = await supabaseAdmin
    .from("accounts")
    .select("id, name, contact_email, phone, org_no, created_at")
    .order("created_at", { ascending: false });

  return (
    <div className="p-6 space-y-6">
      <header>
        <h1 className="text-3xl font-heading font-semibold">Kunder</h1>
        <p className="mt-1 text-sm text-neutral-500">Skapa nya kunder och se lista nedan</p>
      </header>

      <form action={createAccount} className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <input name="name" placeholder="Företagsnamn *" className="rounded border px-3 py-2 text-sm dark:border-neutral-800" required />
        <input name="email" placeholder="E-post" className="rounded border px-3 py-2 text-sm dark:border-neutral-800" type="email" />
        <input name="phone" placeholder="Telefon" className="rounded border px-3 py-2 text-sm dark:border-neutral-800" />
        <input name="orgno" placeholder="Org.nr" className="rounded border px-3 py-2 text-sm dark:border-neutral-800" />
        <div className="sm:col-span-2 lg:col-span-4">
          <button type="submit" className="rounded bg-black px-4 py-2 text-sm font-medium text-white dark:bg-white dark:text-black">Spara kund</button>
        </div>
      </form>

      <div className="overflow-hidden rounded-xl border dark:border-neutral-800">
        <table className="min-w-full text-sm">
          <thead className="bg-neutral-50 dark:bg-neutral-900">
            <tr>
              <th className="px-4 py-2 text-left font-medium">Namn</th>
              <th className="px-4 py-2 text-left font-medium">E-post</th>
              <th className="px-4 py-2 text-left font-medium">Telefon</th>
              <th className="px-4 py-2 text-left font-medium">Org.nr</th>
              <th className="px-4 py-2 text-left font-medium">Skapad</th>
            </tr>
          </thead>
          <tbody>
            {error && (
              <tr><td className="px-4 py-3 text-red-600" colSpan={5}>Fel: {error.message}</td></tr>
            )}
            {accounts?.length ? (
              accounts.map((a) => (
                <tr key={a.id} className="border-t dark:border-neutral-800">
                  <td className="px-4 py-2">{a.name}</td>
                  <td className="px-4 py-2">{a.contact_email ?? "—"}</td>
                  <td className="px-4 py-2">{a.phone ?? "—"}</td>
                  <td className="px-4 py-2">{a.org_no ?? "—"}</td>
                  <td className="px-4 py-2">{new Date(a.created_at).toLocaleString("sv-SE")}</td>
                </tr>
              ))
            ) : (
              <tr className="border-t dark:border-neutral-800">
                <td className="px-4 py-6 text-neutral-500" colSpan={5}>Inga kunder ännu – skapa din första ovan.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
