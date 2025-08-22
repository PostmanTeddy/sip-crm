import { redirect } from "next/navigation";
import ProjectItems from "./_components/ProjectItems";
import ProjectPicker from "./_components/ProjectPicker";

export default function CustomersPage({ searchParams }: { searchParams: Record<string, string | string[] | undefined> }) {
  const customerId = (searchParams?.id as string) || "";
  const projectId  = (searchParams?.projectId as string) || "";

  if (!customerId) {
    // Ingen kund vald -> hoppa till listan
    redirect("/kunddatabas");
  }

  return (
    <div className="p-6 space-y-6">
      <ProjectPicker customerId={customerId} />
      {!projectId ? (
        <div className="rounded-xl border p-4 bg-amber-50">Välj eller skapa ett projekt ovan.</div>
      ) : (
        <ProjectItems projectId={projectId} />
      )}
    </div>
  );
}