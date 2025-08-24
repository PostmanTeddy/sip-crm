import ProjectItems from "../_components/ProjectItems";
import ProjectPicker from "../_components/ProjectPicker";

export default function CustomerPage({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: Record<string, string | string[] | undefined>;
}) {
  const customerId = params.id;
  const projectId = (searchParams?.projectId as string) || "";

  return (
    <div className="p-6 space-y-6">
      {/* Här kan du lägga en rubrik / kundinfo senare */}
      <ProjectPicker customerId={customerId} />
      {!projectId ? (
        <div className="rounded-xl border p-4 bg-amber-50">
          Välj eller skapa ett projekt ovan.
        </div>
      ) : (
        <ProjectItems projectId={projectId} />
      )}
    </div>
  );
}