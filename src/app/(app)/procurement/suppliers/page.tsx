"use client";

import { useMemo, useState } from "react";
import { Search, Building2, Phone, Mail, Clock, TrendingUp } from "lucide-react";
import { EmptyState } from "@/components/shared/empty-state";
import { PageHeader } from "@/components/shared/page-header";
import { StatCard } from "@/components/shared/stat-card";
import { Button } from "@/components/ui/button";
import { mockSuppliers } from "@/lib/mock-data";
import { cn, formatCurrency } from "@/lib/utils";

export default function SuppliersPage() {
  const [query, setQuery] = useState("");

  const stats = useMemo(() => {
    const avgOnTime = mockSuppliers.reduce((s, sup) => s + sup.onTimeRate, 0) / mockSuppliers.length;
    const totalSpend = mockSuppliers.reduce((s, sup) => s + sup.totalSpend, 0);
    const activeOrders = mockSuppliers.reduce((s, sup) => s + sup.activeOrders, 0);
    return { avgOnTime, totalSpend, activeOrders };
  }, []);

  const filtered = useMemo(() => {
    if (!query) return mockSuppliers;
    return mockSuppliers.filter((s) => s.name.toLowerCase().includes(query.toLowerCase()) || s.city.toLowerCase().includes(query.toLowerCase()));
  }, [query]);

  return (
    <div>
      <PageHeader
        title="Suppliers"
        subtitle={`${mockSuppliers.length} active suppliers`}
        actions={<Button size="sm">Add Supplier</Button>}
      />

      <div className="grid grid-cols-3 gap-4 px-6 pt-5">
        <StatCard label="Avg. On-Time Rate" value={`${stats.avgOnTime.toFixed(0)}%`} icon={TrendingUp} tone="bg-success-50 text-success-text" />
        <StatCard label="Total Spend" value={formatCurrency(stats.totalSpend)} icon={Building2} tone="bg-primary-50 text-primary-700" />
        <StatCard label="Active Orders" value={stats.activeOrders} icon={Clock} tone="bg-info-50 text-info-text" />
      </div>

      <div className="px-6 py-5">
        <div className="relative mb-4 max-w-xs">
          <Search className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-subtle" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search supplier or city…"
            className="h-9 w-full rounded-md border border-border-strong bg-surface pl-8 pr-3 text-sm placeholder:text-subtle focus:outline-none"
          />
        </div>

        {filtered.length === 0 ? (
          <EmptyState icon={Search} title="No suppliers found" description="Try a different search term." />
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((s) => (
              <div key={s.id} className="rounded-lg border border-border bg-surface p-4">
                <div className="mb-3 flex items-start justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-50">
                      <Building2 className="h-4 w-4 text-primary-600" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">{s.name}</p>
                      <p className="text-xs text-subtle">{s.city}</p>
                    </div>
                  </div>
                  <span
                    className={cn(
                      "rounded-full px-2 py-0.5 text-[11px] font-medium",
                      s.onTimeRate >= 90 ? "bg-success-50 text-success-text" : "bg-warning-50 text-warning-text"
                    )}
                  >
                    {s.onTimeRate}% on-time
                  </span>
                </div>

                <div className="mb-3 space-y-1.5 text-xs text-muted">
                  <p className="flex items-center gap-1.5">
                    <Phone className="h-3 w-3 text-subtle" /> {s.phone}
                  </p>
                  <p className="flex items-center gap-1.5">
                    <Mail className="h-3 w-3 text-subtle" /> {s.email}
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-2 border-t border-border pt-3 text-center">
                  <div>
                    <p className="text-sm font-semibold text-foreground">{s.leadTimeDays}d</p>
                    <p className="text-[10px] text-subtle">Lead time</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{s.activeOrders}</p>
                    <p className="text-[10px] text-subtle">Active POs</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{formatCurrency(s.totalSpend)}</p>
                    <p className="text-[10px] text-subtle">Total spend</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
