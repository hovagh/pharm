"use client";

import { useMemo, useState } from "react";
import { AlertOctagon, AlertTriangle, CalendarClock } from "lucide-react";
import { EmptyState } from "@/components/shared/empty-state";
import { StatusBadge } from "@/components/shared/status-badge";
import { PageHeader } from "@/components/shared/page-header";
import { StatCard } from "@/components/shared/stat-card";
import { mockBatches, mockMedicines } from "@/lib/mock-data";
import { cn, formatCurrency, formatDate } from "@/lib/utils";

const medicineById = new Map(mockMedicines.map((m) => [m.id, m]));

function daysToExpiry(expiryDate: string) {
  return Math.ceil((new Date(expiryDate).getTime() - Date.now()) / 86_400_000);
}

type Window = "all" | "expired" | "30" | "60" | "90";

export default function ExpiryPage() {
  const [windowFilter, setWindowFilter] = useState<Window>("all");

  const rows = useMemo(() => {
    return mockBatches
      .map((b) => ({ batch: b, days: daysToExpiry(b.expiryDate), medicine: medicineById.get(b.medicineId) }))
      .filter((r) => r.batch.quantityRemaining > 0)
      .sort((a, b) => a.days - b.days);
  }, []);

  const stats = useMemo(() => {
    const expired = rows.filter((r) => r.days < 0).length;
    const within30 = rows.filter((r) => r.days >= 0 && r.days <= 30).length;
    const within90 = rows.filter((r) => r.days >= 0 && r.days <= 90).length;
    const atRiskValue = rows
      .filter((r) => r.days <= 90)
      .reduce((sum, r) => sum + r.batch.quantityRemaining * r.batch.costPerUnit, 0);
    return { expired, within30, within90, atRiskValue };
  }, [rows]);

  const filtered = useMemo(() => {
    if (windowFilter === "all") return rows;
    if (windowFilter === "expired") return rows.filter((r) => r.days < 0);
    const days = parseInt(windowFilter, 10);
    return rows.filter((r) => r.days >= 0 && r.days <= days);
  }, [rows, windowFilter]);

  return (
    <div>
      <PageHeader title="Expiry Tracking" subtitle="Batches ordered by nearest expiry date, across all branches" />

      <div className="grid grid-cols-2 gap-4 px-6 pt-5 sm:grid-cols-4">
        <StatCard label="Expired" value={stats.expired} icon={AlertOctagon} tone="bg-danger-50 text-danger-text" />
        <StatCard label="Expiring ≤ 30 days" value={stats.within30} icon={AlertTriangle} tone="bg-warning-50 text-warning-text" />
        <StatCard label="Expiring ≤ 90 days" value={stats.within90} icon={CalendarClock} tone="bg-info-50 text-info-text" />
        <StatCard label="Value at Risk" value={formatCurrency(stats.atRiskValue)} icon={AlertTriangle} tone="bg-gray-100 text-gray-700" />
      </div>

      <div className="space-y-4 px-6 py-5">
        <div className="flex flex-wrap items-center gap-1.5">
          {([
            { value: "all", label: "All upcoming" },
            { value: "expired", label: "Expired" },
            { value: "30", label: "Within 30 days" },
            { value: "60", label: "Within 60 days" },
            { value: "90", label: "Within 90 days" },
          ] as { value: Window; label: string }[]).map((f) => (
            <button
              key={f.value}
              onClick={() => setWindowFilter(f.value)}
              className={cn(
                "rounded-full border px-3 py-1 text-xs font-medium transition-colors",
                windowFilter === f.value
                  ? "border-primary-600 bg-primary-50 text-success-text"
                  : "border-border-strong text-muted hover:bg-gray-50"
              )}
            >
              {f.label}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <EmptyState icon={CalendarClock} title="Nothing in this window" description="No batches match the selected expiry window." />
        ) : (
          <div className="overflow-hidden rounded-lg border border-border">
            <table className="w-full text-sm">
              <thead className="bg-surface-sunken text-xs text-subtle">
                <tr>
                  <th className="px-4 py-2.5 text-left font-medium">Medicine</th>
                  <th className="px-4 py-2.5 text-left font-medium">Batch</th>
                  <th className="px-4 py-2.5 text-left font-medium">Remaining</th>
                  <th className="px-4 py-2.5 text-left font-medium">Expiry Date</th>
                  <th className="px-4 py-2.5 text-left font-medium">Days Left</th>
                  <th className="px-4 py-2.5 text-left font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filtered.map(({ batch, days, medicine }) => (
                  <tr key={batch.id} className="bg-surface">
                    <td className="px-4 py-2.5">
                      <p className="font-medium text-foreground">{medicine?.brandName ?? "—"}</p>
                      <p className="text-xs text-subtle">{medicine?.genericName}</p>
                    </td>
                    <td className="px-4 py-2.5 font-mono text-xs">{batch.batchNumber}</td>
                    <td className="px-4 py-2.5 tabular-nums">{batch.quantityRemaining}</td>
                    <td className="px-4 py-2.5 tabular-nums">{formatDate(batch.expiryDate)}</td>
                    <td
                      className={cn(
                        "px-4 py-2.5 tabular-nums font-medium",
                        days < 0 ? "text-danger-text" : days <= 30 ? "text-warning-text" : "text-muted"
                      )}
                    >
                      {days < 0 ? `${Math.abs(days)}d overdue` : `${days}d`}
                    </td>
                    <td className="px-4 py-2.5">
                      <StatusBadge status={days < 0 ? "expired" : days <= 60 ? "expiring-soon" : "in-stock"} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
