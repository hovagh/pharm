import { Building2, MapPin, Users, Package } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { StatCard } from "@/components/shared/stat-card";
import { mockBranches, mockMedicines, mockOrganization, mockStaff } from "@/lib/mock-data";

export default function OrganizationPage() {
  return (
    <div>
      <PageHeader title="Organization" subtitle="Organization-wide identity and structure" />

      <div className="px-6 py-5">
        <div className="mb-5 flex items-center gap-4 rounded-lg border border-border bg-surface p-5">
          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary-50">
            <Building2 className="h-7 w-7 text-primary-600" />
          </div>
          <div>
            <h2 className="text-base font-semibold text-foreground">{mockOrganization.name}</h2>
            <p className="text-sm text-muted">Organization ID: {mockOrganization.id}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <StatCard label="Branches" value={mockBranches.length} icon={MapPin} tone="bg-info-50 text-info-text" />
          <StatCard label="Staff" value={mockStaff.length} icon={Users} tone="bg-success-50 text-success-text" />
          <StatCard label="Catalog Size" value={mockMedicines.length} icon={Package} tone="bg-primary-50 text-primary-700" />
        </div>

        <div className="mt-5 rounded-lg border border-border bg-surface p-5">
          <h3 className="mb-3 text-sm font-semibold text-foreground">Branch Directory</h3>
          <div className="divide-y divide-border">
            {mockBranches.map((b) => (
              <div key={b.id} className="flex items-center justify-between py-2.5 text-sm">
                <span className="font-medium text-foreground">{b.name}</span>
                <span className="text-muted">{b.city}{b.isHeadOffice ? " · Head Office" : ""}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
