"use client";

import { useMemo } from "react";
import { type ColumnDef } from "@tanstack/react-table";
import { ArrowRightLeft, Truck, Clock3, CheckCircle2 } from "lucide-react";
import { DataTable } from "@/components/shared/data-table";
import { EmptyState } from "@/components/shared/empty-state";
import { StatusBadge } from "@/components/shared/status-badge";
import { PageHeader } from "@/components/shared/page-header";
import { StatCard } from "@/components/shared/stat-card";
import { Button } from "@/components/ui/button";
import { mockBranches, mockStockTransfers } from "@/lib/mock-data";
import { formatDate } from "@/lib/utils";
import type { StockTransfer } from "@/types/domain";

const branchById = new Map(mockBranches.map((b) => [b.id, b]));

const columns: ColumnDef<StockTransfer, unknown>[] = [
  {
    accessorKey: "transferNumber",
    header: "Transfer",
    cell: ({ row }) => <span className="font-mono text-xs font-medium text-foreground">{row.original.transferNumber}</span>,
  },
  { accessorKey: "medicineName", header: "Medicine" },
  {
    accessorKey: "quantity",
    header: "Qty",
    cell: ({ row }) => <span className="tabular-nums">{row.original.quantity}</span>,
  },
  {
    id: "route",
    header: "Route",
    cell: ({ row }) => (
      <span className="flex items-center gap-1.5 text-muted">
        {branchById.get(row.original.fromBranchId)?.name ?? row.original.fromBranchId}
        <ArrowRightLeft className="h-3 w-3 text-subtle" />
        {branchById.get(row.original.toBranchId)?.name ?? row.original.toBranchId}
      </span>
    ),
  },
  { accessorKey: "requestedBy", header: "Requested By" },
  {
    accessorKey: "requestedDate",
    header: "Date",
    cell: ({ row }) => <span className="tabular-nums text-muted">{formatDate(row.original.requestedDate)}</span>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <StatusBadge status={row.original.status} />,
  },
];

export default function TransfersPage() {
  const stats = useMemo(() => {
    const inTransit = mockStockTransfers.filter((t) => t.status === "in-transit").length;
    const pending = mockStockTransfers.filter((t) => t.status === "pending").length;
    const received = mockStockTransfers.filter((t) => t.status === "received").length;
    return { total: mockStockTransfers.length, inTransit, pending, received };
  }, []);

  return (
    <div>
      <PageHeader
        title="Stock Transfers"
        subtitle={`${stats.total} inter-branch transfer requests`}
        actions={<Button size="sm">New Transfer</Button>}
      />

      <div className="grid grid-cols-3 gap-4 px-6 pt-5">
        <StatCard label="Pending" value={stats.pending} icon={Clock3} tone="bg-gray-100 text-gray-700" />
        <StatCard label="In Transit" value={stats.inTransit} icon={Truck} tone="bg-info-50 text-info-text" />
        <StatCard label="Received" value={stats.received} icon={CheckCircle2} tone="bg-success-50 text-success-text" />
      </div>

      <div className="px-6 py-5">
        <DataTable
          columns={columns}
          data={mockStockTransfers}
          emptyState={<EmptyState icon={ArrowRightLeft} title="No transfers yet" description="Inter-branch transfers will appear here." />}
        />
      </div>
    </div>
  );
}
