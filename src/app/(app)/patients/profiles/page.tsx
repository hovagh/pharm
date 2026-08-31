"use client";

import { useMemo, useState } from "react";
import { Search, User, Phone, ShieldAlert, FileText } from "lucide-react";
import { EmptyState } from "@/components/shared/empty-state";
import { PageHeader } from "@/components/shared/page-header";
import { mockPatients, mockPrescriptions } from "@/lib/mock-data";
import { formatDate } from "@/lib/utils";

function age(dob: string) {
  const diff = Date.now() - new Date(dob).getTime();
  return Math.floor(diff / (365.25 * 86_400_000));
}

export default function PatientProfilesPage() {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    if (!query) return mockPatients;
    return mockPatients.filter((p) => p.name.toLowerCase().includes(query.toLowerCase()));
  }, [query]);

  return (
    <div>
      <PageHeader title="Patient Profiles" subtitle="Card view with visit and prescription summary at a glance" />

      <div className="px-6 py-5">
        <div className="relative mb-4 max-w-xs">
          <Search className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-subtle" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search patients…"
            className="h-9 w-full rounded-md border border-border-strong bg-surface pl-8 pr-3 text-sm placeholder:text-subtle focus:outline-none"
          />
        </div>

        {filtered.length === 0 ? (
          <EmptyState icon={Search} title="No patients found" description="Try a different search term." />
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((p) => {
              const rxCount = mockPrescriptions.filter((rx) => rx.patientId === p.id).length;
              return (
                <div key={p.id} className="rounded-lg border border-border bg-surface p-4">
                  <div className="mb-3 flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary-50">
                      <User className="h-5 w-5 text-primary-600" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">{p.name}</p>
                      <p className="text-xs text-subtle">
                        {age(p.dateOfBirth)} yrs · {p.sex}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-1.5 text-xs text-muted">
                    <p className="flex items-center gap-1.5">
                      <Phone className="h-3 w-3 text-subtle" /> {p.phone}
                    </p>
                    <p className="flex items-center gap-1.5">
                      <FileText className="h-3 w-3 text-subtle" /> {rxCount} prescription{rxCount !== 1 ? "s" : ""} on file
                    </p>
                    {p.allergies.length > 0 && (
                      <p className="flex items-center gap-1.5 text-danger-text">
                        <ShieldAlert className="h-3 w-3" /> Allergic to {p.allergies.join(", ")}
                      </p>
                    )}
                  </div>

                  <p className="mt-3 border-t border-border pt-2.5 text-[11px] text-subtle">
                    Last visit {formatDate(p.lastVisit)}
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
