"use client";

import { useMemo } from "react";
import { TrendingUp, TrendingDown, Percent } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { StatCard } from "@/components/shared/stat-card";
import { mockMedicines } from "@/lib/mock-data";
import { cn, formatCurrency } from "@/lib/utils";

export default function ProfitabilityPage() {
  const ranked = useMemo(() => {
    return mockMedicines
      .map((m) => ({
        ...m,
        margin: m.sellingPrice > 0 ? ((m.sellingPrice - m.costPrice) / m.sellingPrice) * 100 : 0,
      }))
      .sort((a, b) => b.margin - a.margin);
  }, []);

  const avgMargin = ranked.reduce((s, m) => s + m.margin, 0) / (ranked.length || 1);
  const best = ranked[0];
  const worst = ranked[ranked.length - 1];

  return (
    <div>
      <PageHeader title="Profitability" subtitle="Margin performance across the medicine catalog" />

      <div className="grid grid-cols-1 gap-4 px-6 pt-5 sm:grid-cols-3">
        <StatCard label="Average Margin" value={`${avgMargin.toFixed(1)}%`} icon={Percent} tone="bg-primary-50 text-primary-700" />
        <StatCard label="Best Margin" value={best ? `${best.margin.toFixed(1)}%` : "—"} icon={TrendingUp} tone="bg-success-50 text-success-text" />
        <StatCard label="Lowest Margin" value={worst ? `${worst.margin.toFixed(1)}%` : "—"} icon={TrendingDown} tone="bg-danger-50 text-danger-text" />
      </div>

      <div className="px-6 py-5">
        <div className="overflow-hidden rounded-lg border border-border">
          <table className="w-full text-sm">
            <thead className="bg-surface-sunken text-xs text-subtle">
              <tr>
                <th className="px-4 py-2.5 text-left font-medium">Medicine</th>
                <th className="px-4 py-2.5 text-left font-medium">Category</th>
                <th className="px-4 py-2.5 text-left font-medium">Cost</th>
                <th className="px-4 py-2.5 text-left font-medium">Price</th>
                <th className="px-4 py-2.5 text-left font-medium">Margin</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {ranked.map((m) => (
                <tr key={m.id} className="bg-surface">
                  <td className="px-4 py-2.5">
                    <p className="font-medium text-foreground">{m.brandName}</p>
                    <p className="text-xs text-subtle">{m.genericName}</p>
                  </td>
                  <td className="px-4 py-2.5 text-muted">{m.category}</td>
                  <td className="px-4 py-2.5 tabular-nums text-muted">{formatCurrency(m.costPrice)}</td>
                  <td className="px-4 py-2.5 tabular-nums">{formatCurrency(m.sellingPrice)}</td>
                  <td className="px-4 py-2.5">
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 w-16 overflow-hidden rounded-full bg-surface-sunken">
                        <div
                          className={cn("h-full rounded-full", m.margin >= 30 ? "bg-success-500" : m.margin >= 15 ? "bg-warning-500" : "bg-danger-500")}
                          style={{ width: `${Math.min(m.margin, 100)}%` }}
                        />
                      </div>
                      <span className="tabular-nums font-medium">{m.margin.toFixed(1)}%</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
