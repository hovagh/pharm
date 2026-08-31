"use client";

import { useMemo, useState } from "react";
import { Search, Pill, User } from "lucide-react";
import { EmptyState } from "@/components/shared/empty-state";
import { PageHeader } from "@/components/shared/page-header";
import { mockPatients, mockSales } from "@/lib/mock-data";
import { formatDate } from "@/lib/utils";

interface MedicationEvent {
  patientName: string;
  medicineName: string;
  quantity: number;
  date: string;
  transactionNumber: string;
}

export default function MedicationHistoryPage() {
  const [query, setQuery] = useState("");

  const events = useMemo<MedicationEvent[]>(() => {
    const list: MedicationEvent[] = [];
    for (const sale of mockSales) {
      if (!sale.patientName) continue;
      for (const item of sale.items) {
        list.push({
          patientName: sale.patientName,
          medicineName: item.medicineName,
          quantity: item.quantity,
          date: sale.timestamp,
          transactionNumber: sale.transactionNumber,
        });
      }
    }
    return list.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, []);

  const filtered = useMemo(() => {
    if (!query) return events;
    return events.filter(
      (e) => e.patientName.toLowerCase().includes(query.toLowerCase()) || e.medicineName.toLowerCase().includes(query.toLowerCase())
    );
  }, [events, query]);

  return (
    <div>
      <PageHeader
        title="Medication History"
        subtitle={`${events.length} dispensing events linked to a patient record, across ${mockPatients.length} registered patients`}
      />

      <div className="px-6 py-5">
        <div className="relative mb-4 max-w-xs">
          <Search className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-subtle" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search patient or medicine…"
            className="h-9 w-full rounded-md border border-border-strong bg-surface pl-8 pr-3 text-sm placeholder:text-subtle focus:outline-none"
          />
        </div>

        {filtered.length === 0 ? (
          <EmptyState icon={Pill} title="No medication history found" description="Dispensing events linked to a patient will appear here." />
        ) : (
          <div className="space-y-2">
            {filtered.map((e, i) => (
              <div key={i} className="flex items-center gap-3 rounded-lg border border-border bg-surface p-3.5">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary-50">
                  <Pill className="h-4 w-4 text-primary-600" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-foreground">
                    {e.medicineName} <span className="font-normal text-subtle">× {e.quantity}</span>
                  </p>
                  <p className="flex items-center gap-1 text-xs text-subtle">
                    <User className="h-3 w-3" /> {e.patientName} · {formatDate(e.date)}
                  </p>
                </div>
                <span className="shrink-0 font-mono text-[11px] text-subtle">{e.transactionNumber}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
