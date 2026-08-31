"use client";

import { Building, MapPin, Users, Star } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { Button } from "@/components/ui/button";
import { mockBranches, mockStaff } from "@/lib/mock-data";

export default function BranchesPage() {
  return (
    <div>
      <PageHeader
        title="Branches"
        subtitle={`${mockBranches.length} branches`}
        actions={<Button size="sm">Add Branch</Button>}
      />

      <div className="grid grid-cols-1 gap-4 px-6 py-5 sm:grid-cols-2 lg:grid-cols-3">
        {mockBranches.map((branch) => {
          const staffCount = mockStaff.filter((s) => s.branchIds.includes(branch.id)).length;
          return (
            <div key={branch.id} className="rounded-lg border border-border bg-surface p-4">
              <div className="mb-3 flex items-start justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-50">
                    <Building className="h-5 w-5 text-primary-600" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{branch.name}</p>
                    <p className="flex items-center gap-1 text-xs text-subtle">
                      <MapPin className="h-3 w-3" /> {branch.city}
                    </p>
                  </div>
                </div>
                {branch.isHeadOffice && (
                  <span className="flex items-center gap-1 rounded-full bg-warning-50 px-2 py-0.5 text-[11px] font-medium text-warning-text">
                    <Star className="h-3 w-3" /> HQ
                  </span>
                )}
              </div>
              <p className="flex items-center gap-1.5 border-t border-border pt-3 text-xs text-muted">
                <Users className="h-3.5 w-3.5 text-subtle" /> {staffCount} staff assigned
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
