"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Medicine } from "@/types/domain";

const DOSAGE_FORMS: Medicine["dosageForm"][] = [
  "Tablet",
  "Capsule",
  "Syrup",
  "Injection",
  "Cream",
  "Drops",
  "Inhaler",
];

type MedicineDraft = Omit<Medicine, "id">;

const emptyDraft: MedicineDraft = {
  genericName: "",
  brandName: "",
  strength: "",
  dosageForm: "Tablet",
  route: "Oral",
  manufacturer: "",
  category: "",
  therapeuticClass: "",
  sku: "",
  barcode: "",
  requiresPrescription: false,
  isControlled: false,
  storageRequirement: "Room temperature",
  sellingPrice: 0,
  costPrice: 0,
};

export function MedicineForm({
  initialValue,
  mode,
}: {
  initialValue?: Medicine;
  mode: "create" | "edit";
}) {
  const router = useRouter();
  const [form, setForm] = useState<MedicineDraft>(
    initialValue ? { ...initialValue } : emptyDraft
  );
  const [errors, setErrors] = useState<Record<string, string>>({});

  function set<K extends keyof MedicineDraft>(key: K, value: MedicineDraft[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function validate(): boolean {
    const next: Record<string, string> = {};
    if (!form.genericName.trim()) next.genericName = "Generic name is required";
    if (!form.brandName.trim()) next.brandName = "Brand name is required";
    if (!form.sku.trim()) next.sku = "SKU is required";
    if (!form.strength.trim()) next.strength = "Strength is required";
    if (form.sellingPrice <= 0) next.sellingPrice = "Enter a selling price above 0";
    if (form.costPrice < 0) next.costPrice = "Cost price can't be negative";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    // No write endpoint yet — see src/services/medicine.service.ts. Frontend
    // just navigates back to the catalog once the form is valid.
    router.push("/inventory/medicines");
  }

  const margin =
    form.sellingPrice > 0 ? ((form.sellingPrice - form.costPrice) / form.sellingPrice) * 100 : 0;

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <section className="space-y-4 rounded-lg border border-border bg-surface p-5">
        <h2 className="text-sm font-semibold text-foreground">Basic Information</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field label="SKU *" error={errors.sku}>
            <input
              value={form.sku}
              onChange={(e) => set("sku", e.target.value)}
              className={inputClass}
              placeholder="MED-1013"
            />
          </Field>
          <Field label="Barcode">
            <input
              value={form.barcode}
              onChange={(e) => set("barcode", e.target.value)}
              className={inputClass}
              placeholder="6001234510000"
            />
          </Field>
          <Field label="Brand Name *" error={errors.brandName}>
            <input
              value={form.brandName}
              onChange={(e) => set("brandName", e.target.value)}
              className={inputClass}
              placeholder="Paralex"
            />
          </Field>
          <Field label="Generic Name *" error={errors.genericName}>
            <input
              value={form.genericName}
              onChange={(e) => set("genericName", e.target.value)}
              className={inputClass}
              placeholder="Paracetamol"
            />
          </Field>
          <Field label="Strength *" error={errors.strength}>
            <input
              value={form.strength}
              onChange={(e) => set("strength", e.target.value)}
              className={inputClass}
              placeholder="500mg"
            />
          </Field>
          <Field label="Dosage Form">
            <select
              value={form.dosageForm}
              onChange={(e) => set("dosageForm", e.target.value as Medicine["dosageForm"])}
              className={inputClass}
            >
              {DOSAGE_FORMS.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Route">
            <input
              value={form.route}
              onChange={(e) => set("route", e.target.value)}
              className={inputClass}
              placeholder="Oral"
            />
          </Field>
          <Field label="Storage Requirement">
            <input
              value={form.storageRequirement}
              onChange={(e) => set("storageRequirement", e.target.value)}
              className={inputClass}
              placeholder="Room temperature"
            />
          </Field>
        </div>
      </section>

      <section className="space-y-4 rounded-lg border border-border bg-surface p-5">
        <h2 className="text-sm font-semibold text-foreground">Classification</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field label="Category">
            <input
              value={form.category}
              onChange={(e) => set("category", e.target.value)}
              className={inputClass}
              placeholder="Analgesic"
            />
          </Field>
          <Field label="Therapeutic Class">
            <input
              value={form.therapeuticClass}
              onChange={(e) => set("therapeuticClass", e.target.value)}
              className={inputClass}
              placeholder="Antipyretic"
            />
          </Field>
          <Field label="Manufacturer">
            <input
              value={form.manufacturer}
              onChange={(e) => set("manufacturer", e.target.value)}
              className={inputClass}
              placeholder="Ernest Chemists"
            />
          </Field>
        </div>
        <div className="flex flex-wrap gap-6 pt-1">
          <label className="flex items-center gap-2 text-sm text-foreground">
            <input
              type="checkbox"
              checked={form.requiresPrescription}
              onChange={(e) => set("requiresPrescription", e.target.checked)}
              className="h-4 w-4 rounded border-border-strong text-primary-600 focus:ring-primary-500/30"
            />
            Requires prescription
          </label>
          <label className="flex items-center gap-2 text-sm text-foreground">
            <input
              type="checkbox"
              checked={form.isControlled}
              onChange={(e) => set("isControlled", e.target.checked)}
              className="h-4 w-4 rounded border-border-strong text-primary-600 focus:ring-primary-500/30"
            />
            Controlled substance
          </label>
        </div>
      </section>

      <section className="space-y-4 rounded-lg border border-border bg-surface p-5">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-foreground">Pricing</h2>
          <span className="text-xs text-subtle">
            Margin: <span className={cn("font-medium", margin >= 0 ? "text-success-text" : "text-danger-text")}>{margin.toFixed(1)}%</span>
          </span>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field label="Cost Price (GH₵) *" error={errors.costPrice}>
            <input
              type="number"
              step="0.01"
              value={form.costPrice}
              onChange={(e) => set("costPrice", parseFloat(e.target.value) || 0)}
              className={inputClass}
            />
          </Field>
          <Field label="Selling Price (GH₵) *" error={errors.sellingPrice}>
            <input
              type="number"
              step="0.01"
              value={form.sellingPrice}
              onChange={(e) => set("sellingPrice", parseFloat(e.target.value) || 0)}
              className={inputClass}
            />
          </Field>
        </div>
      </section>

      <div className="flex items-center justify-end gap-3">
        <Button type="button" variant="secondary" onClick={() => router.back()}>
          Cancel
        </Button>
        <Button type="submit">{mode === "create" ? "Add Medicine" : "Save Changes"}</Button>
      </div>
    </form>
  );
}

const inputClass =
  "w-full rounded-md border border-border-strong bg-surface px-3 py-2 text-sm text-foreground placeholder:text-subtle focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-colors";

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-medium text-muted">{label}</label>
      {children}
      {error && <p className="mt-1 text-xs text-danger-text">{error}</p>}
    </div>
  );
}
