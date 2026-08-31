import { ShieldCheck } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { mockRoles } from "@/lib/mock-data";

export default function RolesPage() {
  return (
    <div>
      <PageHeader title="Roles & Permissions" subtitle={`${mockRoles.length} roles defined across the organization`} />

      <div className="grid grid-cols-1 gap-4 px-6 py-5 sm:grid-cols-2 lg:grid-cols-3">
        {mockRoles.map((role) => (
          <div key={role.id} className="rounded-lg border border-border bg-surface p-4">
            <div className="mb-2 flex items-start justify-between">
              <div className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-50">
                  <ShieldCheck className="h-4 w-4 text-primary-600" />
                </div>
                <p className="text-sm font-semibold text-foreground">{role.label}</p>
              </div>
              <span className="rounded-full bg-surface-sunken px-2 py-0.5 text-[11px] font-medium text-subtle">
                {role.userCount} user{role.userCount !== 1 ? "s" : ""}
              </span>
            </div>
            <p className="mb-3 text-xs text-muted">{role.description}</p>
            <div className="flex flex-wrap gap-1.5">
              {role.permissions.map((p) => (
                <span key={p} className="rounded-md border border-border bg-surface-sunken px-2 py-0.5 text-[11px] text-muted">
                  {p}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
