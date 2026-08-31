"use client";

import { useMemo, useState } from "react";
import { type ColumnDef } from "@tanstack/react-table";
import { Search, Users, AlertTriangle, CalendarClock } from "lucide-react";
import { DataTable } from "@/components/shared/data-table";
import { EmptyState } from "@/components/shared/empty-state";
import { PageHeader } from "@/components/shared/page-header";
import { StatCard } from "@/components/shared/stat-card";
import { Button } from "@/components/ui/button";
import { mockPatients } from "@/lib/mock-data";
import { formatDate } from "@/lib/utils";
import type { Patient } from "@/types/domain";

function age(dob: string) {
  const diff = Date.now() - new Date(dob).getTime();
  return Math.floor(diff / (365.25 * 86_400_000));
}

const columns: ColumnDef<Patient, unknown>[] = [
  {
    accessorKey: "name",
    header: "Patient",
    cell: ({ row }) => (
      <div>
        <p className="font-medium text-foreground">{row.original.name}</p>
        <p className="text-xs text-subtle">{row.original.phone}</p>
      </div>
    ),
  },
  {
    id: "age",
    header: "Age / Sex",
    cell: ({ row }) => (
      <span className="text-muted">
        {age(row.original.dateOfBirth)} · {row.original.sex}
      </span>
    ),
  },
  {
    accessorKey: "allergies",
    header: "Allergies",
    cell: ({ row }) =>
      row.original.allergies.length === 0 ? (
        <span className="text-subtle">None recorded</span>
      ) : (
        <div className="flex flex-wrap gap-1">
          {row.original.allergies.map((a) => (
            <span key={a} className="rounded-full bg-danger-50 px-2 py-0.5 text-[11px] font-medium text-danger-text">
              {a}
            </span>
          ))}
        </div>
      ),
  },
  {
    accessorKey: "lastVisit",
    header: "Last Visit",
    cell: ({ row }) => <span className="tabular-nums text-muted">{formatDate(row.original.lastVisit)}</span>,
  },
];

export default function PatientsPage() {
  const [query, setQuery] = useState("");
  const [now] = useState(() => Date.now());

  const stats = useMemo(() => {
    const withAllergies = mockPatients.filter((p) => p.allergies.length > 0).length;
    const recentVisits = mockPatients.filter(
      (p) => now - new Date(p.lastVisit).getTime() < 30 * 86_400_000
    ).length;
    return { total: mockPatients.length, withAllergies, recentVisits };
  }, [now]);

  const filtered = useMemo(() => {
    if (!query) return mockPatients;
    return mockPatients.filter((p) => p.name.toLowerCase().includes(query.toLowerCase()) || p.phone.includes(query));
  }, [query]);

  return (
    <div>
      <PageHeader
        title="Patients"
        subtitle={`${stats.total} patients registered`}
        actions={<Button size="sm">Add Patient</Button>}
      />

      <div className="grid grid-cols-3 gap-4 px-6 pt-5">
        <StatCard label="Total Patients" value={stats.total} icon={Users} tone="bg-primary-50 text-primary-700" />
        <StatCard label="With Allergies" value={stats.withAllergies} icon={AlertTriangle} tone="bg-danger-50 text-danger-text" />
        <StatCard label="Visited (30d)" value={stats.recentVisits} icon={CalendarClock} tone="bg-info-50 text-info-text" />
      </div>

      <div className="space-y-4 px-6 py-5">
        <div className="relative max-w-xs">
          <Search className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-subtle" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search name or phone…"
            className="h-9 w-full rounded-md border border-border-strong bg-surface pl-8 pr-3 text-sm placeholder:text-subtle focus:outline-none"
          />
        </div>

        <DataTable
          columns={columns}
          data={filtered}
          emptyState={
            <EmptyState
              icon={Search}
              title="No patients found"
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
