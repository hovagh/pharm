"use client";

import { useMemo, useState } from "react";
import { type ColumnDef } from "@tanstack/react-table";
import { Search, ClipboardList, Clock, CheckCircle2 } from "lucide-react";
import { DataTable } from "@/components/shared/data-table";
import { EmptyState } from "@/components/shared/empty-state";
import { StatusBadge } from "@/components/shared/status-badge";
import { PageHeader } from "@/components/shared/page-header";
import { StatCard } from "@/components/shared/stat-card";
import { Button } from "@/components/ui/button";
import { mockPurchaseOrders } from "@/lib/mock-data";
import { cn, formatCurrency, formatDate } from "@/lib/utils";
import type { PurchaseOrder, PurchaseOrderStatus } from "@/types/domain";

const columns: ColumnDef<PurchaseOrder, unknown>[] = [
  {
    accessorKey: "poNumber",
    header: "PO Number",
    cell: ({ row }) => <span className="font-mono text-xs font-medium text-foreground">{row.original.poNumber}</span>,
  },
  { accessorKey: "supplierName", header: "Supplier" },
  {
    accessorKey: "createdDate",
    header: "Created",
    cell: ({ row }) => <span className="tabular-nums text-muted">{formatDate(row.original.createdDate)}</span>,
  },
  {
    accessorKey: "expectedDate",
    header: "Expected",
    cell: ({ row }) => <span className="tabular-nums text-muted">{formatDate(row.original.expectedDate)}</span>,
  },
  {
    accessorKey: "itemCount",
    header: "Items",
    cell: ({ row }) => <span className="tabular-nums">{row.original.itemCount}</span>,
  },
  {
    accessorKey: "total",
    header: "Total",
    cell: ({ row }) => <span className="tabular-nums font-semibold">{formatCurrency(row.original.total)}</span>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <StatusBadge status={row.original.status} />,
  },
];

const filters: { value: PurchaseOrderStatus | "all"; label: string }[] = [
  { value: "all", label: "All" },
  { value: "draft", label: "Draft" },
  { value: "pending-approval", label: "Pending Approval" },
  { value: "ordered", label: "Ordered" },
  { value: "partially-received", label: "Partially Received" },
  { value: "received", label: "Received" },
];

export default function PurchaseOrdersPage() {
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<PurchaseOrderStatus | "all">("all");

  const stats = useMemo(() => {
    const pendingApproval = mockPurchaseOrders.filter((p) => p.status === "pending-approval").length;
    const inTransit = mockPurchaseOrders.filter((p) => p.status === "ordered" || p.status === "partially-received").length;
    const totalValue = mockPurchaseOrders.reduce((s, p) => s + p.total, 0);
    return { total: mockPurchaseOrders.length, pendingApproval, inTransit, totalValue };
  }, []);

  const filtered = useMemo(() => {
    return mockPurchaseOrders.filter((p) => {
      const matchesQuery = !query || p.poNumber.toLowerCase().includes(query.toLowerCase()) || p.supplierName.toLowerCase().includes(query.toLowerCase());
      const matchesStatus = statusFilter === "all" || p.status === statusFilter;
      return matchesQuery && matchesStatus;
    });
  }, [query, statusFilter]);

  return (
    <div>
      <PageHeader
        title="Purchase Orders"
        subtitle={`${stats.total} purchase orders · ${formatCurrency(stats.totalValue)} total value`}
        actions={<Button size="sm">New Purchase Order</Button>}
      />

      <div className="grid grid-cols-3 gap-4 px-6 pt-5">
        <StatCard label="Pending Approval" value={stats.pendingApproval} icon={Clock} tone="bg-warning-50 text-warning-text" />
        <StatCard label="In Transit" value={stats.inTransit} icon={ClipboardList} tone="bg-info-50 text-info-text" />
        <StatCard label="Total Value" value={formatCurrency(stats.totalValue)} icon={CheckCircle2} tone="bg-primary-50 text-primary-700" />
      </div>

      <div className="space-y-4 px-6 py-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1 sm:max-w-xs">
            <Search className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-subtle" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search PO number or supplier…"
              className="h-9 w-full rounded-md border border-border-strong bg-surface pl-8 pr-3 text-sm placeholder:text-subtle focus:outline-none"
            />
          </div>
          <div className="flex flex-wrap items-center gap-1.5">
            {filters.map((f) => (
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
          </div>
        </div>

        <DataTable
          columns={columns}
          data={filtered}
          emptyState={
            <EmptyState
              icon={Search}
              title="No purchase orders found"
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
    </div>
  );
}
