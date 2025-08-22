import CustomersTable from "./_components/CustomersTable";

export default function KunddatabasPage() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-xl font-semibold">Kunddatabas</h1>
      <CustomersTable />
    </div>
  );
}