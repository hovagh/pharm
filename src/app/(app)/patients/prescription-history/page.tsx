"use client";

import { useMemo, useState } from "react";
import { Search, History } from "lucide-react";
import { EmptyState } from "@/components/shared/empty-state";
import { StatusBadge } from "@/components/shared/status-badge";
import { PageHeader } from "@/components/shared/page-header";
import { mockPrescriptions } from "@/lib/mock-data";
import { formatDate } from "@/lib/utils";

export default function PrescriptionHistoryPage() {
  const [query, setQuery] = useState("");

  const sorted = useMemo(
    () => [...mockPrescriptions].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()),
    []
  );

  const filtered = useMemo(() => {
    if (!query) return sorted;
    return sorted.filter(
      (p) =>
        p.patientName.toLowerCase().includes(query.toLowerCase()) ||
        p.prescriptionNumber.toLowerCase().includes(query.toLowerCase()) ||
        p.prescriber.toLowerCase().includes(query.toLowerCase())
    );
  }, [sorted, query]);

  return (
    <div>
      <PageHeader title="Prescription History" subtitle="Complete chronological record across every patient, regardless of status" />

      <div className="px-6 py-5">
        <div className="relative mb-4 max-w-xs">
          <Search className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-subtle" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search patient, Rx number, or prescriber…"
            className="h-9 w-full rounded-md border border-border-strong bg-surface pl-8 pr-3 text-sm placeholder:text-subtle focus:outline-none"
          />
        </div>

        {filtered.length === 0 ? (
          <EmptyState icon={History} title="No prescriptions found" description="Try a different search term." />
        ) : (
          <div className="relative space-y-0 border-l border-border pl-6">
            {filtered.map((p) => (
              <div key={p.id} className="relative pb-6 last:pb-0">
                <span className="absolute -left-[29px] top-1 h-2.5 w-2.5 rounded-full border-2 border-surface bg-primary-500" />
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="text-sm font-medium text-foreground">
                    <span className="font-mono text-xs text-subtle">{p.prescriptionNumber}</span> — {p.patientName}
                  </p>
                  <StatusBadge status={p.status} />
                </div>
                <p className="mt-0.5 text-xs text-subtle">
                  {p.prescriber} · {p.itemCount} item{p.itemCount !== 1 ? "s" : ""} · {formatDate(p.date)}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
