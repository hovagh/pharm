"use client";

import { useMemo, useState } from "react";
import { type ColumnDef } from "@tanstack/react-table";
import { Search, Users, UserCheck, UserPlus } from "lucide-react";
import { DataTable } from "@/components/shared/data-table";
import { EmptyState } from "@/components/shared/empty-state";
import { StatusBadge } from "@/components/shared/status-badge";
import { PageHeader } from "@/components/shared/page-header";
import { StatCard } from "@/components/shared/stat-card";
import { Button } from "@/components/ui/button";
import { mockBranches, mockRoles, mockStaff } from "@/lib/mock-data";
import { formatDateTime } from "@/lib/utils";
import type { StaffMember } from "@/types/domain";

const branchById = new Map(mockBranches.map((b) => [b.id, b]));
const roleLabel = new Map(mockRoles.map((r) => [r.name, r.label]));

const columns: ColumnDef<StaffMember, unknown>[] = [
  {
    accessorKey: "name",
    header: "Staff Member",
    cell: ({ row }) => (
      <div className="flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-50 text-xs font-semibold text-primary-700">
          {row.original.avatarInitials}
        </div>
        <div>
          <p className="font-medium text-foreground">{row.original.name}</p>
          <p className="text-xs text-subtle">{row.original.email}</p>
        </div>
      </div>
    ),
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => <span className="text-muted">{roleLabel.get(row.original.role) ?? row.original.role}</span>,
  },
  {
    id: "branch",
    header: "Branch",
    cell: ({ row }) => (
      <span className="text-muted">{row.original.branchIds.map((id) => branchById.get(id)?.name ?? id).join(", ")}</span>
    ),
  },
  {
    accessorKey: "lastActive",
    header: "Last Active",
    cell: ({ row }) => (
      <span className="tabular-nums text-muted">
        {row.original.lastActive === "—" ? "—" : formatDateTime(row.original.lastActive)}
      </span>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <StatusBadge status={row.original.status} />,
  },
];

export default function StaffPage() {
  const [query, setQuery] = useState("");

  const stats = useMemo(() => {
    const active = mockStaff.filter((s) => s.status === "active").length;
    const invited = mockStaff.filter((s) => s.status === "invited").length;
    return { total: mockStaff.length, active, invited };
  }, []);

  const filtered = useMemo(() => {
    if (!query) return mockStaff;
    return mockStaff.filter((s) => s.name.toLowerCase().includes(query.toLowerCase()) || s.email.toLowerCase().includes(query.toLowerCase()));
  }, [query]);

  return (
    <div>
      <PageHeader
        title="Staff"
        subtitle={`${stats.total} team members across all branches`}
        actions={
          <Button size="sm">
            <UserPlus className="h-4 w-4" />
            Invite Staff
          </Button>
        }
      />

      <div className="grid grid-cols-3 gap-4 px-6 pt-5">
        <StatCard label="Total Staff" value={stats.total} icon={Users} tone="bg-primary-50 text-primary-700" />
        <StatCard label="Active" value={stats.active} icon={UserCheck} tone="bg-success-50 text-success-text" />
        <StatCard label="Pending Invites" value={stats.invited} icon={UserPlus} tone="bg-info-50 text-info-text" />
      </div>

      <div className="space-y-4 px-6 py-5">
        <div className="relative max-w-xs">
          <Search className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-subtle" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search name or email…"
            className="h-9 w-full rounded-md border border-border-strong bg-surface pl-8 pr-3 text-sm placeholder:text-subtle focus:outline-none"
          />
        </div>

        <DataTable
          columns={columns}
          data={filtered}
          emptyState={
            <EmptyState
              icon={Search}
              title="No staff found"
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
