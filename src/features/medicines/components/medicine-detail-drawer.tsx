"use client";

import Link from "next/link";
import { Pill, Package, MapPin, Shield, Building2, Barcode, ArrowUpRight, X } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import type { Medicine } from "@/types/domain";

export function MedicineDetailDrawer({
  medicine,
  onClose,
}: {
  medicine: Medicine | null;
  onClose: () => void;
}) {
  if (!medicine) return null;

  const margin =
    medicine.sellingPrice > 0
      ? ((medicine.sellingPrice - medicine.costPrice) / medicine.sellingPrice) * 100
      : 0;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-foreground/30 backdrop-blur-sm" onClick={onClose} />
      <div className="relative h-full w-full max-w-md overflow-y-auto bg-surface shadow-2xl">
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-border bg-surface px-6 py-4">
          <h2 className="text-base font-semibold text-foreground">Medicine Details</h2>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-md text-muted transition-colors hover:bg-gray-100"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="space-y-6 p-6">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary-50">
              <Pill className="h-6 w-6 text-primary-600" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-foreground">{medicine.brandName}</h3>
              <p className="text-sm text-muted">
                {medicine.genericName} {medicine.strength}
              </p>
              <span className="mt-2 inline-block rounded bg-surface-sunken px-2 py-1 font-mono text-xs text-subtle">
                {medicine.sku}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Stat label="Selling Price" value={formatCurrency(medicine.sellingPrice)} />
            <Stat label="Cost Price" value={formatCurrency(medicine.costPrice)} />
            <Stat label="Margin" value={`${margin.toFixed(1)}%`} tone={margin >= 0 ? "success" : "danger"} />
            <Stat label="Dosage Form" value={medicine.dosageForm} />
          </div>

          <div className="space-y-3">
            <DetailItem icon={Package} label="Category" value={`${medicine.category} · ${medicine.therapeuticClass}`} />
            <DetailItem icon={Building2} label="Manufacturer" value={medicine.manufacturer} />
            <DetailItem icon={MapPin} label="Storage Requirement" value={medicine.storageRequirement} />
            <DetailItem icon={Barcode} label="Barcode" value={medicine.barcode || "—"} />
            <DetailItem
              icon={Shield}
              label="Prescription & Controls"
              value={[
                medicine.requiresPrescription ? "Prescription required" : "OTC",
                medicine.isControlled ? "Controlled substance" : null,
              ]
                .filter(Boolean)
                .join(" · ")}
            />
          </div>

          <div className="flex gap-3 border-t border-border pt-4">
            <Button asChild className="flex-1">
              <Link href={`/inventory?medicine=${medicine.id}`}>
                View Inventory
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="secondary" className="flex-1">
              <Link href={`/inventory/medicines/${medicine.id}/edit`}>Edit Medicine</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value, tone }: { label: string; value: string; tone?: "success" | "danger" }) {
  return (
    <div className="rounded-lg border border-border bg-surface-sunken p-3">
      <p className="mb-1 text-xs text-subtle">{label}</p>
      <p
        className={
          tone === "success"
            ? "text-lg font-bold text-success-text"
            : tone === "danger"
            ? "text-lg font-bold text-danger-text"
            : "text-lg font-bold text-foreground"
        }
      >
        {value}
      </p>
    </div>
  );
}

function DetailItem({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <Icon className="mt-0.5 h-4 w-4 shrink-0 text-subtle" />
      <div>
        <p className="text-xs text-subtle">{label}</p>
        <p className="mt-0.5 text-sm text-foreground">{value}</p>
      </div>
    </div>
  );
}
