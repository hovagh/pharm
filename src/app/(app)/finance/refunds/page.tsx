"use client";

import { useMemo } from "react";
import { type ColumnDef } from "@tanstack/react-table";
import { Undo2, Clock, CheckCircle2, XCircle } from "lucide-react";
import { DataTable } from "@/components/shared/data-table";
import { EmptyState } from "@/components/shared/empty-state";
import { StatusBadge } from "@/components/shared/status-badge";
import { PageHeader } from "@/components/shared/page-header";
import { StatCard } from "@/components/shared/stat-card";
import { mockRefunds } from "@/lib/mock-data";
import { formatCurrency, formatDate } from "@/lib/utils";
import type { Refund } from "@/types/domain";

const columns: ColumnDef<Refund, unknown>[] = [
  {
    accessorKey: "refundNumber",
    header: "Refund",
    cell: ({ row }) => <span className="font-mono text-xs font-medium text-foreground">{row.original.refundNumber}</span>,
  },
  {
    accessorKey: "originalTransaction",
    header: "Original Transaction",
    cell: ({ row }) => <span className="font-mono text-xs text-muted">{row.original.originalTransaction}</span>,
  },
  { accessorKey: "customerName", header: "Customer" },
  { accessorKey: "reason", header: "Reason" },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => <span className="tabular-nums text-muted">{formatDate(row.original.date)}</span>,
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => <span className="tabular-nums font-semibold">{formatCurrency(row.original.amount)}</span>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <StatusBadge status={row.original.status} />,
  },
];

export default function RefundsPage() {
  const stats = useMemo(() => {
    const pending = mockRefunds.filter((r) => r.status === "pending").length;
    const approved = mockRefunds.filter((r) => r.status === "approved").length;
    const rejected = mockRefunds.filter((r) => r.status === "rejected").length;
    return { pending, approved, rejected };
  }, []);

  return (
    <div>
      <PageHeader title="Refunds" subtitle={`${mockRefunds.length} refund requests`} />

      <div className="grid grid-cols-3 gap-4 px-6 pt-5">
        <StatCard label="Pending Review" value={stats.pending} icon={Clock} tone="bg-warning-50 text-warning-text" />
        <StatCard label="Approved" value={stats.approved} icon={CheckCircle2} tone="bg-success-50 text-success-text" />
        <StatCard label="Rejected" value={stats.rejected} icon={XCircle} tone="bg-danger-50 text-danger-text" />
      </div>

      <div className="px-6 py-5">
        <DataTable
          columns={columns}
          data={mockRefunds}
          emptyState={<EmptyState icon={Undo2} title="No refunds yet" description="Refund requests will appear here." />}
        />
      </div>
    </div>
  );
}
