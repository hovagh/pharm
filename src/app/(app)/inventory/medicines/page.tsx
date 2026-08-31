"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { type ColumnDef } from "@tanstack/react-table";
import { Search, Pill, Package, ShieldAlert, ClipboardCheck } from "lucide-react";
import { DataTable } from "@/components/shared/data-table";
import { EmptyState } from "@/components/shared/empty-state";
import { Button } from "@/components/ui/button";
import { MedicineDetailDrawer } from "@/features/medicines/components/medicine-detail-drawer";
import { mockMedicines } from "@/lib/mock-data";
import { cn, formatCurrency } from "@/lib/utils";
import type { Medicine } from "@/types/domain";

function buildColumns(onSelect: (m: Medicine) => void): ColumnDef<Medicine, unknown>[] {
  return [
  {
    accessorKey: "brandName",
    header: "Product",
    cell: ({ row }) => (
      <button
        onClick={() => onSelect(row.original)}
        className="flex items-center gap-3 text-left"
      >
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary-50">
          <Pill className="h-4 w-4 text-primary-600" />
        </div>
        <div>
          <p className="font-medium text-foreground hover:underline">{row.original.brandName}</p>
          <p className="text-xs text-subtle">
            {row.original.genericName} {row.original.strength} · {row.original.sku}
          </p>
        </div>
      </button>
    ),
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => (
      <span className="rounded-md border border-border bg-surface-sunken px-2 py-1 text-xs text-muted">
        {row.original.category}
      </span>
    ),
  },
  {
    accessorKey: "dosageForm",
    header: "Form",
    cell: ({ row }) => <span className="text-muted">{row.original.dosageForm}</span>,
  },
  {
    accessorKey: "costPrice",
    header: "Cost",
    cell: ({ row }) => <span className="tabular-nums text-muted">{formatCurrency(row.original.costPrice)}</span>,
  },
  {
    accessorKey: "sellingPrice",
    header: "Price",
    cell: ({ row }) => <span className="tabular-nums font-medium">{formatCurrency(row.original.sellingPrice)}</span>,
  },
  {
    id: "flags",
    header: "Flags",
    cell: ({ row }) => (
      <div className="flex flex-wrap gap-1.5">
        {row.original.requiresPrescription && (
          <span className="inline-flex items-center gap-1 rounded-full bg-info-50 px-2 py-0.5 text-[11px] font-medium text-info-text">
            Rx
          </span>
        )}
        {row.original.isControlled && (
          <span className="inline-flex items-center gap-1 rounded-full bg-danger-50 px-2 py-0.5 text-[11px] font-medium text-danger-text">
            Controlled
          </span>
        )}
      </div>
    ),
  },
  ];
}

export default function MedicinesCatalogPage() {
  const [query, setQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [selected, setSelected] = useState<Medicine | null>(null);
  const columns = useMemo(() => buildColumns(setSelected), []);

  const categories = useMemo(
    () => ["All", ...Array.from(new Set(mockMedicines.map((m) => m.category)))],
    []
  );

  const stats = useMemo(() => {
    const total = mockMedicines.length;
    const rx = mockMedicines.filter((m) => m.requiresPrescription).length;
    const controlled = mockMedicines.filter((m) => m.isControlled).length;
    return { total, rx, controlled };
  }, []);

  const filtered = useMemo(() => {
    return mockMedicines.filter((m) => {
      const matchesQuery =
        !query ||
        m.brandName.toLowerCase().includes(query.toLowerCase()) ||
        m.genericName.toLowerCase().includes(query.toLowerCase()) ||
        m.sku.toLowerCase().includes(query.toLowerCase());
      const matchesCategory = categoryFilter === "All" || m.category === categoryFilter;
      return matchesQuery && matchesCategory;
    });
  }, [query, categoryFilter]);

  return (
    <div>
      <div className="flex flex-col gap-4 border-b border-border px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-lg font-semibold tracking-tight text-foreground">Medicine Catalog</h1>
          <p className="text-sm text-muted">
            {stats.total} products · {stats.rx} require prescription · {stats.controlled} controlled
          </p>
        </div>
        <Button asChild size="sm">
          <Link href="/inventory/medicines/new">Add Medicine</Link>
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-4 px-6 pt-5 sm:grid-cols-3">
        <StatCard label="Total Products" value={stats.total} icon={Package} tone="bg-primary-50 text-primary-700" />
        <StatCard label="Prescription Only" value={stats.rx} icon={ClipboardCheck} tone="bg-info-50 text-info-text" />
        <StatCard label="Controlled" value={stats.controlled} icon={ShieldAlert} tone="bg-danger-50 text-danger-text" />
      </div>

      <div className="space-y-4 px-6 py-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1 sm:max-w-xs">
            <Search className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-subtle" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name, generic, or SKU…"
              className="h-9 w-full rounded-md border border-border-strong bg-surface pl-8 pr-3 text-sm placeholder:text-subtle focus:outline-none"
            />
          </div>
          <div className="flex flex-wrap items-center gap-1.5">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={cn(
                  "rounded-full border px-3 py-1 text-xs font-medium transition-colors",
                  categoryFilter === cat
                    ? "border-primary-600 bg-primary-50 text-success-text"
                    : "border-border-strong text-muted hover:bg-gray-50"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <DataTable
          columns={columns}
          data={filtered}
          emptyState={
            <EmptyState
              icon={Search}
              title="No medicines found"
              description="Try a different search term or clear your filters."
              action={
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => {
                    setQuery("");
                    setCategoryFilter("All");
                  }}
                >
                  Clear filters
                </Button>
              }
            />
          }
        />
        <p className="text-xs text-subtle">Click a medicine name to view full details.</p>
      </div>

      <MedicineDetailDrawer medicine={selected} onClose={() => setSelected(null)} />
    </div>
  );
}

function StatCard({
  label,
  value,
  icon: Icon,
  tone,
}: {
  label: string;
  value: number;
  icon: React.ElementType;
  tone: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-lg border border-border bg-surface p-4">
      <div className={cn("flex h-9 w-9 items-center justify-center rounded-lg", tone)}>
        <Icon className="h-4 w-4" />
      </div>
      <div>
        <p className="text-xl font-bold text-foreground">{value}</p>
        <p className="text-xs text-subtle">{label}</p>
      </div>
    </div>
  );
}
