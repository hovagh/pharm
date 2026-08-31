"use client";

import { useMemo } from "react";
import { Scale, CheckCircle2, AlertTriangle } from "lucide-react";
import { EmptyState } from "@/components/shared/empty-state";
import { StatusBadge } from "@/components/shared/status-badge";
import { PageHeader } from "@/components/shared/page-header";
import { StatCard } from "@/components/shared/stat-card";
import { mockBranches, mockReconciliations } from "@/lib/mock-data";
import { cn, formatCurrency, formatDate } from "@/lib/utils";

const branchById = new Map(mockBranches.map((b) => [b.id, b]));

export default function ReconciliationPage() {
  const stats = useMemo(() => {
    const balanced = mockReconciliations.filter((r) => r.status === "balanced").length;
    const variance = mockReconciliations.filter((r) => r.status === "variance").length;
    const totalVariance = mockReconciliations.reduce((s, r) => s + Math.abs(r.variance), 0);
    return { balanced, variance, totalVariance };
  }, []);

  return (
    <div>
      <PageHeader title="Cash Reconciliation" subtitle={`${mockReconciliations.length} cash-drawer sessions logged`} />

      <div className="grid grid-cols-3 gap-4 px-6 pt-5">
        <StatCard label="Balanced Sessions" value={stats.balanced} icon={CheckCircle2} tone="bg-success-50 text-success-text" />
        <StatCard label="With Variance" value={stats.variance} icon={AlertTriangle} tone="bg-danger-50 text-danger-text" />
        <StatCard label="Total Variance" value={formatCurrency(stats.totalVariance)} icon={Scale} tone="bg-gray-100 text-gray-700" />
      </div>

      <div className="px-6 py-5">
        {mockReconciliations.length === 0 ? (
          <EmptyState icon={Scale} title="No reconciliation sessions" description="Cash-drawer sessions will appear here." />
        ) : (
          <div className="overflow-hidden rounded-lg border border-border">
            <table className="w-full text-sm">
              <thead className="bg-surface-sunken text-xs text-subtle">
                <tr>
                  <th className="px-4 py-2.5 text-left font-medium">Branch</th>
                  <th className="px-4 py-2.5 text-left font-medium">Date</th>
                  <th className="px-4 py-2.5 text-left font-medium">Opened By</th>
                  <th className="px-4 py-2.5 text-left font-medium">Expected</th>
                  <th className="px-4 py-2.5 text-left font-medium">Counted</th>
                  <th className="px-4 py-2.5 text-left font-medium">Variance</th>
                  <th className="px-4 py-2.5 text-left font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {mockReconciliations.map((r) => (
                  <tr key={r.id} className="bg-surface">
                    <td className="px-4 py-2.5 font-medium text-foreground">{branchById.get(r.branchId)?.name ?? r.branchId}</td>
                    <td className="px-4 py-2.5 tabular-nums text-muted">{formatDate(r.date)}</td>
                    <td className="px-4 py-2.5 text-muted">{r.openedBy}</td>
                    <td className="px-4 py-2.5 tabular-nums">{formatCurrency(r.expectedCash)}</td>
                    <td className="px-4 py-2.5 tabular-nums">{formatCurrency(r.countedCash)}</td>
                    <td
                      className={cn(
                        "px-4 py-2.5 tabular-nums font-medium",
                        r.variance === 0 ? "text-success-text" : "text-danger-text"
                      )}
                    >
                      {r.variance > 0 ? "+" : ""}
                      {formatCurrency(r.variance)}
                    </td>
                    <td className="px-4 py-2.5">
                      <StatusBadge status={r.status} />
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
