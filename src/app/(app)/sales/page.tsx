"use client";

import { useMemo, useState } from "react";
import { type ColumnDef } from "@tanstack/react-table";
import { Search, Receipt, TrendingUp, Users } from "lucide-react";
import { DataTable } from "@/components/shared/data-table";
import { EmptyState } from "@/components/shared/empty-state";
import { PageHeader } from "@/components/shared/page-header";
import { StatCard } from "@/components/shared/stat-card";
import { Button } from "@/components/ui/button";
import { mockSales } from "@/lib/mock-data";
import { cn, formatCurrency, formatDateTime } from "@/lib/utils";
import type { PaymentMethod, Sale } from "@/types/domain";

const methodLabel: Record<PaymentMethod, string> = {
  cash: "Cash",
  "mobile-money": "Mobile Money",
  card: "Card",
  insurance: "Insurance",
};

const columns: ColumnDef<Sale, unknown>[] = [
  {
    accessorKey: "transactionNumber",
    header: "Transaction",
    cell: ({ row }) => <span className="font-mono text-xs font-medium text-foreground">{row.original.transactionNumber}</span>,
  },
  {
    accessorKey: "items",
    header: "Items",
    cell: ({ row }) => (
      <span className="text-muted">
        {row.original.items.map((i) => i.medicineName).join(", ")}
      </span>
    ),
  },
  { accessorKey: "cashierName", header: "Cashier" },
  {
    accessorKey: "paymentMethod",
    header: "Payment",
    cell: ({ row }) => (
      <span className="rounded-md border border-border bg-surface-sunken px-2 py-1 text-xs text-muted">
        {methodLabel[row.original.paymentMethod]}
      </span>
    ),
  },
  {
    accessorKey: "timestamp",
    header: "Time",
    cell: ({ row }) => <span className="tabular-nums text-muted">{formatDateTime(row.original.timestamp)}</span>,
  },
  {
    accessorKey: "total",
    header: "Total",
    cell: ({ row }) => <span className="tabular-nums font-semibold">{formatCurrency(row.original.total)}</span>,
  },
];

const methodFilters: { value: PaymentMethod | "all"; label: string }[] = [
  { value: "all", label: "All" },
  { value: "cash", label: "Cash" },
  { value: "mobile-money", label: "Mobile Money" },
  { value: "card", label: "Card" },
  { value: "insurance", label: "Insurance" },
];

export default function SalesPage() {
  const [query, setQuery] = useState("");
  const [methodFilter, setMethodFilter] = useState<PaymentMethod | "all">("all");

  const stats = useMemo(() => {
    const totalRevenue = mockSales.reduce((s, sale) => s + sale.total, 0);
    const avgTicket = totalRevenue / (mockSales.length || 1);
    const uniqueCustomers = new Set(mockSales.filter((s) => s.patientName).map((s) => s.patientName)).size;
    return { totalRevenue, avgTicket, uniqueCustomers, count: mockSales.length };
  }, []);

  const filtered = useMemo(() => {
    return mockSales.filter((s) => {
      const matchesQuery =
        !query ||
        s.transactionNumber.toLowerCase().includes(query.toLowerCase()) ||
        s.cashierName.toLowerCase().includes(query.toLowerCase()) ||
        (s.patientName ?? "").toLowerCase().includes(query.toLowerCase());
      const matchesMethod = methodFilter === "all" || s.paymentMethod === methodFilter;
      return matchesQuery && matchesMethod;
    });
  }, [query, methodFilter]);

  return (
    <div>
      <PageHeader title="Sales" subtitle={`${stats.count} transactions recorded`} />

      <div className="grid grid-cols-2 gap-4 px-6 pt-5 sm:grid-cols-3">
        <StatCard label="Total Revenue" value={formatCurrency(stats.totalRevenue)} icon={TrendingUp} tone="bg-primary-50 text-primary-700" />
        <StatCard label="Avg. Ticket" value={formatCurrency(stats.avgTicket)} icon={Receipt} tone="bg-info-50 text-info-text" />
        <StatCard label="Unique Customers" value={stats.uniqueCustomers} icon={Users} tone="bg-success-50 text-success-text" />
      </div>

      <div className="space-y-4 px-6 py-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1 sm:max-w-xs">
            <Search className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-subtle" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by transaction, cashier, or customer…"
              className="h-9 w-full rounded-md border border-border-strong bg-surface pl-8 pr-3 text-sm placeholder:text-subtle focus:outline-none"
            />
          </div>
          <div className="flex flex-wrap items-center gap-1.5">
            {methodFilters.map((f) => (
              <button
                key={f.value}
                onClick={() => setMethodFilter(f.value)}
                className={cn(
                  "rounded-full border px-3 py-1 text-xs font-medium transition-colors",
                  methodFilter === f.value
                    ? "border-primary-600 bg-primary-50 text-success-text"
                    : "border-border-strong text-muted hover:bg-gray-50"
                )}
              >
                {f.label}
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
              title="No transactions found"
              description="Try a different search term or clear your filters."
              action={
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => {
                    setQuery("");
                    setMethodFilter("all");
                  }}
                >
                  Clear filters
                </Button>
              }
            />
          }
        />
      </div>
    </div>
  );
}
