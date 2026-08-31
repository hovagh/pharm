"use client";

import { useMemo } from "react";
import { type ColumnDef } from "@tanstack/react-table";
import { CreditCard, CheckCircle2, Clock, XCircle } from "lucide-react";
import { DataTable } from "@/components/shared/data-table";
import { EmptyState } from "@/components/shared/empty-state";
import { StatusBadge } from "@/components/shared/status-badge";
import { PageHeader } from "@/components/shared/page-header";
import { StatCard } from "@/components/shared/stat-card";
import { mockPayments } from "@/lib/mock-data";
import { formatCurrency, formatDate } from "@/lib/utils";
import type { Payment, PaymentMethod } from "@/types/domain";

const methodLabel: Record<PaymentMethod, string> = {
  cash: "Cash",
  "mobile-money": "Mobile Money",
  card: "Card",
  insurance: "Insurance",
};

const columns: ColumnDef<Payment, unknown>[] = [
  {
    accessorKey: "reference",
    header: "Reference",
    cell: ({ row }) => <span className="font-mono text-xs font-medium text-foreground">{row.original.reference}</span>,
  },
  { accessorKey: "payerName", header: "Payer" },
  {
    accessorKey: "method",
    header: "Method",
    cell: ({ row }) => (
      <span className="rounded-md border border-border bg-surface-sunken px-2 py-1 text-xs text-muted">
        {methodLabel[row.original.method]}
      </span>
    ),
  },
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

export default function PaymentsPage() {
  const stats = useMemo(() => {
    const completed = mockPayments.filter((p) => p.status === "completed").length;
    const pending = mockPayments.filter((p) => p.status === "pending").length;
    const failed = mockPayments.filter((p) => p.status === "failed").length;
    return { completed, pending, failed };
  }, []);

  return (
    <div>
      <PageHeader title="Payments" subtitle={`${mockPayments.length} payments recorded`} />

      <div className="grid grid-cols-3 gap-4 px-6 pt-5">
        <StatCard label="Completed" value={stats.completed} icon={CheckCircle2} tone="bg-success-50 text-success-text" />
        <StatCard label="Pending" value={stats.pending} icon={Clock} tone="bg-warning-50 text-warning-text" />
        <StatCard label="Failed" value={stats.failed} icon={XCircle} tone="bg-danger-50 text-danger-text" />
      </div>

      <div className="px-6 py-5">
        <DataTable
          columns={columns}
          data={mockPayments}
          emptyState={<EmptyState icon={CreditCard} title="No payments yet" description="Payments will appear here as they're recorded." />}
        />
      </div>
    </div>
  );
}
