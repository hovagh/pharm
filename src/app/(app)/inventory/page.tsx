"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { type ColumnDef } from "@tanstack/react-table";
import { Search, PackageSearch, SlidersHorizontal, Download, Layers, RotateCcw } from "lucide-react";
import { DataTable } from "@/components/shared/data-table";
import { StatusBadge } from "@/components/shared/status-badge";
import { EmptyState } from "@/components/shared/empty-state";
import { Button } from "@/components/ui/button";
import { StockHealthBar } from "@/features/inventory/components/stock-health-bar";
import { AdjustStockModal } from "@/features/inventory/components/adjust-stock-modal";
import { BatchDrawer } from "@/features/inventory/components/batch-drawer";
import { mockInventory, mockBatches } from "@/lib/mock-data";
import { cn, formatCurrency, formatDate, formatNumber } from "@/lib/utils";
import type { InventoryItem } from "@/types/domain";

function buildColumns(
  onAdjust: (item: InventoryItem) => void,
  onViewBatches: (item: InventoryItem) => void
): ColumnDef<InventoryItem, unknown>[] {
  return [
  {
    accessorKey: "medicine.genericName",
    header: "Medicine",
    cell: ({ row }) => (
      <div>
        <p className="font-medium text-foreground">
          {row.original.medicine.genericName} {row.original.medicine.strength}
        </p>
        <p className="text-xs text-subtle">
          {row.original.medicine.brandName} · {row.original.medicine.sku}
        </p>
      </div>
    ),
  },
  {
    accessorKey: "medicine.category",
    header: "Category",
    cell: ({ row }) => <span className="text-muted">{row.original.medicine.category}</span>,
  },
  {
    accessorKey: "quantityOnHand",
    header: "Stock Level",
    cell: ({ row }) => (
      <div className="w-32">
        <p className="tabular-nums">
          {formatNumber(row.original.quantityOnHand)}
          {row.original.quantityReserved > 0 && (
            <span className="ml-1 text-xs text-subtle">({row.original.quantityReserved} reserved)</span>
          )}
        </p>
        <StockHealthBar
          quantityOnHand={row.original.quantityOnHand}
          minimumStock={row.original.minimumStock}
          className="mt-1.5"
        />
      </div>
    ),
  },
  {
    accessorKey: "nearestExpiry",
    header: "Nearest Expiry",
    cell: ({ row }) =>
      row.original.nearestExpiry === "—" ? (
        <span className="text-subtle">—</span>
      ) : (
        <span className="tabular-nums">{formatDate(row.original.nearestExpiry)}</span>
      ),
  },
  {
    accessorKey: "margin",
    header: "Margin",
    cell: ({ row }) => <span className="tabular-nums">{row.original.margin.toFixed(1)}%</span>,
  },
  {
    accessorKey: "medicine.sellingPrice",
    header: "Price",
    cell: ({ row }) => <span className="tabular-nums">{formatCurrency(row.original.medicine.sellingPrice)}</span>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <StatusBadge status={row.original.status} />,
  },
  {
    id: "actions",
    header: "",
    cell: ({ row }) => (
      <div className="flex items-center gap-1">
        <button
          onClick={() => onViewBatches(row.original)}
          title="View batches"
          className="flex h-7 w-7 items-center justify-center rounded-md text-subtle transition-colors hover:bg-gray-100 hover:text-foreground"
        >
          <Layers className="h-3.5 w-3.5" />
        </button>
        <button
          onClick={() => onAdjust(row.original)}
          title="Adjust stock"
          className="flex h-7 w-7 items-center justify-center rounded-md text-subtle transition-colors hover:bg-gray-100 hover:text-foreground"
        >
          <RotateCcw className="h-3.5 w-3.5" />
        </button>
      </div>
    ),
  },
  ];
}

const statusFilters = [
  { value: "all", label: "All" },
  { value: "in-stock", label: "In Stock" },
  { value: "low-stock", label: "Low Stock" },
  { value: "critical", label: "Critical" },
  { value: "out-of-stock", label: "Out of Stock" },
  { value: "expiring-soon", label: "Expiring Soon" },
] as const;

export default function InventoryPage() {
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [adjusting, setAdjusting] = useState<InventoryItem | null>(null);
  const [viewingBatchesFor, setViewingBatchesFor] = useState<InventoryItem | null>(null);

  const columns = useMemo(() => buildColumns(setAdjusting, setViewingBatchesFor), []);

  const filtered = useMemo(() => {
    return mockInventory.filter((item) => {
      const matchesQuery =
        !query ||
        item.medicine.genericName.toLowerCase().includes(query.toLowerCase()) ||
        item.medicine.brandName.toLowerCase().includes(query.toLowerCase()) ||
        item.medicine.sku.toLowerCase().includes(query.toLowerCase());
      const matchesStatus = statusFilter === "all" || item.status === statusFilter;
      return matchesQuery && matchesStatus;
    });
  }, [query, statusFilter]);

  return (
    <div>
      <div className="flex flex-col gap-4 border-b border-border px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-lg font-semibold tracking-tight text-foreground">Inventory</h1>
          <p className="text-sm text-muted">{mockInventory.length} SKUs at Accra Central Pharmacy</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="secondary" size="sm">
            <Download className="h-3.5 w-3.5" />
            Export
          </Button>
          <Button asChild variant="secondary" size="sm">
            <Link href="/inventory/medicines">Catalog</Link>
          </Button>
          <Button asChild size="sm">
            <Link href="/inventory/medicines/new">Add Medicine</Link>
          </Button>
        </div>
      </div>

      <div className="space-y-4 px-6 py-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1 sm:max-w-xs">
            <Search className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-subtle" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name, brand, or SKU…"
              className="h-9 w-full rounded-md border border-border-strong bg-surface pl-8 pr-3 text-sm placeholder:text-subtle focus:outline-none"
            />
          </div>
          <div className="flex flex-wrap items-center gap-1.5">
            {statusFilters.map((f) => (
              <button
                key={f.value}
                onClick={() => setStatusFilter(f.value)}
                className={cn(
                  "rounded-full border px-3 py-1 text-xs font-medium transition-colors",
                  statusFilter === f.value
                    ? "border-primary-600 bg-primary-50 text-success-text"
                    : "border-border-strong text-muted hover:bg-gray-50"
                )}
              >
                {f.label}
              </button>
            ))}
            <Button variant="ghost" size="sm" className="ml-1">
              <SlidersHorizontal className="h-3.5 w-3.5" />
              More filters
            </Button>
          </div>
        </div>

        <DataTable
          columns={columns}
          data={filtered}
          emptyState={
            <EmptyState
              icon={PackageSearch}
              title="No medicines found"
              description="Try a different search term or clear your filters."
              action={
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => {
                    setQuery("");
                    setStatusFilter("all");
                  }}
                >
                  Clear filters
                </Button>
              }
            />
          }
        />
      </div>

      <AdjustStockModal item={adjusting} onClose={() => setAdjusting(null)} />
      <BatchDrawer
        batches={
          viewingBatchesFor
            ? mockBatches.filter((b) => b.medicineId === viewingBatchesFor.medicine.id)
            : []
        }
        medicineName={
          viewingBatchesFor
            ? `${viewingBatchesFor.medicine.genericName} ${viewingBatchesFor.medicine.strength}`
            : ""
        }
        onClose={() => setViewingBatchesFor(null)}
      />
    </div>
  );
}
