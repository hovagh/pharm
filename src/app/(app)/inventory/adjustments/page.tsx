"use client";

import { useMemo } from "react";
import { type ColumnDef } from "@tanstack/react-table";
import { RotateCcw, TrendingDown, TrendingUp } from "lucide-react";
import { DataTable } from "@/components/shared/data-table";
import { EmptyState } from "@/components/shared/empty-state";
import { PageHeader } from "@/components/shared/page-header";
import { StatCard } from "@/components/shared/stat-card";
import { mockStockAdjustments } from "@/lib/mock-data";
import { cn, formatDateTime } from "@/lib/utils";
import type { StockAdjustment, StockAdjustmentType } from "@/types/domain";

const typeStyles: Record<StockAdjustmentType, string> = {
  restock: "bg-success-50 text-success-text",
  adjustment: "bg-info-50 text-info-text",
  wastage: "bg-danger-50 text-danger-text",
  return: "bg-warning-50 text-warning-text",
};

const columns: ColumnDef<StockAdjustment, unknown>[] = [
  { accessorKey: "medicineName", header: "Medicine" },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => (
      <span className={cn("rounded-full px-2.5 py-0.5 text-xs font-medium capitalize", typeStyles[row.original.type])}>
        {row.original.type}
      </span>
    ),
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
    cell: ({ row }) => (
      <span className={cn("tabular-nums font-medium", row.original.quantity < 0 ? "text-danger-text" : "text-success-text")}>
        {row.original.quantity > 0 ? "+" : ""}
        {row.original.quantity}
      </span>
    ),
  },
  { accessorKey: "reason", header: "Reason" },
  { accessorKey: "performedBy", header: "Performed By" },
  {
    accessorKey: "timestamp",
    header: "When",
    cell: ({ row }) => <span className="tabular-nums text-muted">{formatDateTime(row.original.timestamp)}</span>,
  },
  {
    accessorKey: "balanceAfter",
    header: "Balance After",
    cell: ({ row }) => <span className="tabular-nums text-muted">{row.original.balanceAfter}</span>,
  },
];

export default function AdjustmentsPage() {
  const stats = useMemo(() => {
    const increases = mockStockAdjustments.filter((a) => a.quantity > 0).length;
    const decreases = mockStockAdjustments.filter((a) => a.quantity < 0).length;
    return { total: mockStockAdjustments.length, increases, decreases };
  }, []);

  return (
    <div>
      <PageHeader title="Stock Adjustments" subtitle={`${stats.total} adjustments logged across all branches`} />

      <div className="grid grid-cols-3 gap-4 px-6 pt-5">
        <StatCard label="Total Logged" value={stats.total} icon={RotateCcw} tone="bg-primary-50 text-primary-700" />
        <StatCard label="Increases" value={stats.increases} icon={TrendingUp} tone="bg-success-50 text-success-text" />
        <StatCard label="Decreases" value={stats.decreases} icon={TrendingDown} tone="bg-danger-50 text-danger-text" />
      </div>

      <div className="px-6 py-5">
        <DataTable
          columns={columns}
          data={mockStockAdjustments}
          emptyState={<EmptyState icon={RotateCcw} title="No adjustments yet" description="Stock adjustments will be logged here." />}
        />
      </div>
    </div>
  );
}
