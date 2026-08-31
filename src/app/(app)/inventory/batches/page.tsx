"use client";

import { useMemo, useState } from "react";
import { type ColumnDef } from "@tanstack/react-table";
import { Search, Layers, PackageCheck, AlertTriangle } from "lucide-react";
import { DataTable } from "@/components/shared/data-table";
import { EmptyState } from "@/components/shared/empty-state";
import { StatusBadge } from "@/components/shared/status-badge";
import { PageHeader } from "@/components/shared/page-header";
import { StatCard } from "@/components/shared/stat-card";
import { Button } from "@/components/ui/button";
import { mockBatches, mockMedicines } from "@/lib/mock-data";
import { formatCurrency, formatDate } from "@/lib/utils";
import type { Batch } from "@/types/domain";

const medicineById = new Map(mockMedicines.map((m) => [m.id, m]));

function batchStatus(batch: Batch): "in-stock" | "expired" | "expiring-soon" | "out-of-stock" {
  if (batch.quantityRemaining === 0) return "out-of-stock";
  const daysToExpiry = Math.ceil((new Date(batch.expiryDate).getTime() - Date.now()) / 86_400_000);
  if (daysToExpiry < 0) return "expired";
  if (daysToExpiry <= 60) return "expiring-soon";
  return "in-stock";
}

const columns: ColumnDef<Batch, unknown>[] = [
  {
    accessorKey: "batchNumber",
    header: "Batch",
    cell: ({ row }) => (
      <div>
        <p className="font-mono text-sm font-medium text-foreground">{row.original.batchNumber}</p>
        <p className="text-xs text-subtle">{medicineById.get(row.original.medicineId)?.brandName ?? "—"}</p>
      </div>
    ),
  },
  { accessorKey: "supplierName", header: "Supplier" },
  {
    accessorKey: "quantityRemaining",
    header: "Remaining",
    cell: ({ row }) => (
      <span className="tabular-nums">
        {row.original.quantityRemaining} / {row.original.quantityReceived}
      </span>
    ),
  },
  {
    accessorKey: "costPerUnit",
    header: "Unit Cost",
    cell: ({ row }) => <span className="tabular-nums text-muted">{formatCurrency(row.original.costPerUnit)}</span>,
  },
  {
    accessorKey: "expiryDate",
    header: "Expiry",
    cell: ({ row }) => <span className="tabular-nums">{formatDate(row.original.expiryDate)}</span>,
  },
  {
    id: "status",
    header: "Status",
    cell: ({ row }) => <StatusBadge status={batchStatus(row.original)} />,
  },
];

export default function BatchesPage() {
  const [query, setQuery] = useState("");

  const stats = useMemo(() => {
    const inStock = mockBatches.filter((b) => batchStatus(b) === "in-stock").length;
    const expiring = mockBatches.filter((b) => batchStatus(b) === "expiring-soon").length;
    const expired = mockBatches.filter((b) => batchStatus(b) === "expired").length;
    return { total: mockBatches.length, inStock, expiring, expired };
  }, []);

  const filtered = useMemo(() => {
    if (!query) return mockBatches;
    return mockBatches.filter((b) => {
      const medicine = medicineById.get(b.medicineId);
      return (
        b.batchNumber.toLowerCase().includes(query.toLowerCase()) ||
        b.supplierName.toLowerCase().includes(query.toLowerCase()) ||
        medicine?.brandName.toLowerCase().includes(query.toLowerCase()) ||
        medicine?.genericName.toLowerCase().includes(query.toLowerCase())
      );
    });
  }, [query]);

  return (
    <div>
      <PageHeader title="Batches" subtitle={`${stats.total} batches across all received stock`} />

      <div className="grid grid-cols-3 gap-4 px-6 pt-5">
        <StatCard label="Healthy" value={stats.inStock} icon={PackageCheck} tone="bg-success-50 text-success-text" />
        <StatCard label="Expiring Soon" value={stats.expiring} icon={AlertTriangle} tone="bg-warning-50 text-warning-text" />
        <StatCard label="Expired" value={stats.expired} icon={Layers} tone="bg-danger-50 text-danger-text" />
      </div>

      <div className="space-y-4 px-6 py-5">
        <div className="relative max-w-xs">
          <Search className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-subtle" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search batch, medicine, or supplier…"
            className="h-9 w-full rounded-md border border-border-strong bg-surface pl-8 pr-3 text-sm placeholder:text-subtle focus:outline-none"
          />
        </div>

        <DataTable
          columns={columns}
          data={filtered}
          emptyState={
            <EmptyState
              icon={Search}
              title="No batches found"
              description="Try a different search term."
              action={
                <Button variant="secondary" size="sm" onClick={() => setQuery("")}>
                  Clear search
                </Button>
              }
            />
          }
        />
      </div>
    </div>
  );
}
