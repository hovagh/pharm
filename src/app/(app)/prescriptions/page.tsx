"use client";

import { useMemo, useState } from "react";
import { type ColumnDef } from "@tanstack/react-table";
import { Search, FileText, Clock, CheckCircle2, AlertTriangle } from "lucide-react";
import { DataTable } from "@/components/shared/data-table";
import { EmptyState } from "@/components/shared/empty-state";
import { StatusBadge } from "@/components/shared/status-badge";
import { PageHeader } from "@/components/shared/page-header";
import { StatCard } from "@/components/shared/stat-card";
import { Button } from "@/components/ui/button";
import { mockPrescriptions } from "@/lib/mock-data";
import { formatDate } from "@/lib/utils";
import type { Prescription, PrescriptionStatus } from "@/types/domain";

const columns: ColumnDef<Prescription, unknown>[] = [
  {
    accessorKey: "prescriptionNumber",
    header: "Rx Number",
    cell: ({ row }) => <span className="font-mono text-xs font-medium text-foreground">{row.original.prescriptionNumber}</span>,
  },
  {
    accessorKey: "patientName",
    header: "Patient",
    cell: ({ row }) => <span className="font-medium text-foreground">{row.original.patientName}</span>,
  },
  { accessorKey: "prescriber", header: "Prescriber" },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => <span className="tabular-nums text-muted">{formatDate(row.original.date)}</span>,
  },
  {
    accessorKey: "itemCount",
    header: "Items",
    cell: ({ row }) => <span className="tabular-nums text-muted">{row.original.itemCount}</span>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <StatusBadge status={row.original.status} />,
  },
];

const filters: { value: PrescriptionStatus | "all"; label: string }[] = [
  { value: "all", label: "All" },
  { value: "pending", label: "Pending" },
  { value: "under-review", label: "Under Review" },
  { value: "approved", label: "Approved" },
  { value: "partially-dispensed", label: "Partially Dispensed" },
  { value: "dispensed", label: "Dispensed" },
  { value: "rejected", label: "Rejected" },
];

export default function PrescriptionsPage() {
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<PrescriptionStatus | "all">("all");

  const stats = useMemo(() => {
    const pending = mockPrescriptions.filter((p) => p.status === "pending" || p.status === "under-review").length;
    const dispensed = mockPrescriptions.filter((p) => p.status === "dispensed").length;
    const flagged = mockPrescriptions.filter((p) => p.status === "rejected" || p.status === "expired").length;
    return { total: mockPrescriptions.length, pending, dispensed, flagged };
  }, []);

  const filtered = useMemo(() => {
    return mockPrescriptions.filter((p) => {
      const matchesQuery =
        !query ||
        p.patientName.toLowerCase().includes(query.toLowerCase()) ||
        p.prescriptionNumber.toLowerCase().includes(query.toLowerCase()) ||
        p.prescriber.toLowerCase().includes(query.toLowerCase());
      const matchesStatus = statusFilter === "all" || p.status === statusFilter;
      return matchesQuery && matchesStatus;
    });
  }, [query, statusFilter]);

  return (
    <div>
      <PageHeader
        title="Prescriptions"
        subtitle={`${stats.total} prescriptions in the pipeline`}
        actions={<Button size="sm">New Prescription</Button>}
      />

      <div className="grid grid-cols-2 gap-4 px-6 pt-5 sm:grid-cols-4">
        <StatCard label="Total" value={stats.total} icon={FileText} tone="bg-primary-50 text-primary-700" />
        <StatCard label="Awaiting Action" value={stats.pending} icon={Clock} tone="bg-warning-50 text-warning-text" />
        <StatCard label="Dispensed" value={stats.dispensed} icon={CheckCircle2} tone="bg-success-50 text-success-text" />
        <StatCard label="Rejected / Expired" value={stats.flagged} icon={AlertTriangle} tone="bg-danger-50 text-danger-text" />
      </div>

      <div className="space-y-4 px-6 py-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1 sm:max-w-xs">
            <Search className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-subtle" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by patient, Rx number, or prescriber…"
              className="h-9 w-full rounded-md border border-border-strong bg-surface pl-8 pr-3 text-sm placeholder:text-subtle focus:outline-none"
            />
          </div>
          <div className="flex flex-wrap items-center gap-1.5">
            {filters.map((f) => (
              <button
                key={f.value}
                onClick={() => setStatusFilter(f.value)}
                className={
                  "rounded-full border px-3 py-1 text-xs font-medium transition-colors " +
                  (statusFilter === f.value
                    ? "border-primary-600 bg-primary-50 text-success-text"
                    : "border-border-strong text-muted hover:bg-gray-50")
                }
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
              title="No prescriptions found"
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
