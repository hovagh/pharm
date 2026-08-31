import { MedicineForm } from "@/features/medicines/components/medicine-form";

export default function NewMedicinePage() {
  return (
    <div>
      <div className="border-b border-border px-6 py-5">
        <h1 className="text-lg font-semibold tracking-tight text-foreground">Add Medicine</h1>
        <p className="text-sm text-muted">Add a new product to the medicine catalog.</p>
      </div>
      <div className="max-w-2xl px-6 py-5">
        <MedicineForm mode="create" />
      </div>
    </div>
  );
}
