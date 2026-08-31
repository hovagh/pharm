"use client";

import { useMemo } from "react";
import { type ColumnDef } from "@tanstack/react-table";
import { Receipt, TrendingDown } from "lucide-react";
import { DataTable } from "@/components/shared/data-table";
import { EmptyState } from "@/components/shared/empty-state";
import { PageHeader } from "@/components/shared/page-header";
import { StatCard } from "@/components/shared/stat-card";
import { Button } from "@/components/ui/button";
import { mockExpenses } from "@/lib/mock-data";
import { cn, formatCurrency, formatDate } from "@/lib/utils";
import type { Expense, ExpenseCategory } from "@/types/domain";

const categoryStyles: Record<ExpenseCategory, string> = {
  rent: "bg-primary-50 text-primary-700",
  utilities: "bg-info-50 text-info-text",
  salaries: "bg-warning-50 text-warning-text",
  logistics: "bg-success-50 text-success-text",
  maintenance: "bg-gray-100 text-gray-700",
  other: "bg-danger-50 text-danger-text",
};

const columns: ColumnDef<Expense, unknown>[] = [
  { accessorKey: "description", header: "Description" },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => (
      <span className={cn("rounded-full px-2.5 py-0.5 text-xs font-medium capitalize", categoryStyles[row.original.category])}>
        {row.original.category}
      </span>
    ),
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => <span className="tabular-nums text-muted">{formatDate(row.original.date)}</span>,
  },
  { accessorKey: "approvedBy", header: "Approved By" },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => <span className="tabular-nums font-semibold">{formatCurrency(row.original.amount)}</span>,
  },
];

export default function ExpensesPage() {
  const stats = useMemo(() => {
    const total = mockExpenses.reduce((s, e) => s + e.amount, 0);
    const largest = mockExpenses.reduce((max, e) => (e.amount > max.amount ? e : max), mockExpenses[0]);
    return { total, largest };
  }, []);

  return (
    <div>
      <PageHeader
        title="Expenses"
        subtitle={`${mockExpenses.length} expenses recorded this month`}
        actions={<Button size="sm">Log Expense</Button>}
      />

      <div className="grid grid-cols-2 gap-4 px-6 pt-5 sm:grid-cols-2">
        <StatCard label="Total Expenses" value={formatCurrency(stats.total)} icon={Receipt} tone="bg-danger-50 text-danger-text" />
        <StatCard label="Largest Line Item" value={stats.largest ? formatCurrency(stats.largest.amount) : "—"} icon={TrendingDown} tone="bg-gray-100 text-gray-700" />
      </div>

      <div className="px-6 py-5">
        <DataTable
          columns={columns}
          data={mockExpenses}
          emptyState={<EmptyState icon={Receipt} title="No expenses logged" description="Business expenses will appear here." />}
        />
      </div>
    </div>
  );
}
