import { notFound } from "next/navigation";
import { MedicineForm } from "@/features/medicines/components/medicine-form";
import { mockMedicines } from "@/lib/mock-data";

export default async function EditMedicinePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const medicine = mockMedicines.find((m) => m.id === id);
  if (!medicine) notFound();

  return (
    <div>
      <div className="border-b border-border px-6 py-5">
        <h1 className="text-lg font-semibold tracking-tight text-foreground">Edit Medicine</h1>
        <p className="text-sm text-muted">
          {medicine.brandName} · {medicine.sku}
        </p>
      </div>
      <div className="max-w-2xl px-6 py-5">
        <MedicineForm mode="edit" initialValue={medicine} />
      </div>
    </div>
  );
}
