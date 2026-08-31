"use client";

import { useMemo } from "react";
import { type ColumnDef } from "@tanstack/react-table";
import { PackageCheck, AlertTriangle, CheckCircle2 } from "lucide-react";
import { DataTable } from "@/components/shared/data-table";
import { EmptyState } from "@/components/shared/empty-state";
import { PageHeader } from "@/components/shared/page-header";
import { StatCard } from "@/components/shared/stat-card";
import { mockGoodsReceived } from "@/lib/mock-data";
import { formatDate } from "@/lib/utils";
import type { GoodsReceivedNote } from "@/types/domain";

const columns: ColumnDef<GoodsReceivedNote, unknown>[] = [
  {
    accessorKey: "grnNumber",
    header: "GRN",
    cell: ({ row }) => <span className="font-mono text-xs font-medium text-foreground">{row.original.grnNumber}</span>,
  },
  {
    accessorKey: "poNumber",
    header: "PO Reference",
    cell: ({ row }) => <span className="font-mono text-xs text-muted">{row.original.poNumber}</span>,
  },
  { accessorKey: "supplierName", header: "Supplier" },
  {
    accessorKey: "receivedDate",
    header: "Received",
    cell: ({ row }) => <span className="tabular-nums text-muted">{formatDate(row.original.receivedDate)}</span>,
  },
  { accessorKey: "receivedBy", header: "Received By" },
  {
    accessorKey: "itemCount",
    header: "Items",
    cell: ({ row }) => <span className="tabular-nums">{row.original.itemCount}</span>,
  },
  {
    id: "discrepancy",
    header: "Discrepancy",
    cell: ({ row }) =>
      row.original.discrepancy ? (
        <span className="inline-flex items-center gap-1 rounded-full bg-warning-50 px-2 py-0.5 text-[11px] font-medium text-warning-text">
          <AlertTriangle className="h-3 w-3" /> Flagged
        </span>
      ) : (
        <span className="inline-flex items-center gap-1 rounded-full bg-success-50 px-2 py-0.5 text-[11px] font-medium text-success-text">
          <CheckCircle2 className="h-3 w-3" /> Matched
        </span>
      ),
  },
];

export default function GoodsReceivedPage() {
  const stats = useMemo(() => {
    const flagged = mockGoodsReceived.filter((g) => g.discrepancy).length;
    return { total: mockGoodsReceived.length, flagged, matched: mockGoodsReceived.length - flagged };
  }, []);

  return (
    <div>
      <PageHeader title="Goods Received" subtitle={`${stats.total} goods received notes logged`} />

      <div className="grid grid-cols-3 gap-4 px-6 pt-5">
        <StatCard label="Total GRNs" value={stats.total} icon={PackageCheck} tone="bg-primary-50 text-primary-700" />
        <StatCard label="Matched" value={stats.matched} icon={CheckCircle2} tone="bg-success-50 text-success-text" />
        <StatCard label="Flagged" value={stats.flagged} icon={AlertTriangle} tone="bg-warning-50 text-warning-text" />
      </div>

      <div className="px-6 py-5">
        <DataTable
          columns={columns}
          data={mockGoodsReceived}
          emptyState={<EmptyState icon={PackageCheck} title="No goods received yet" description="GRNs will appear here once a purchase order is fulfilled." />}
        />
      </div>
    </div>
  );
}
