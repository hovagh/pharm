"use client";

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { Package, AlertTriangle, DollarSign } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { StatCard } from "@/components/shared/stat-card";
import { mockInventory } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/utils";

const statusColors: Record<string, string> = {
  "In Stock": "#2F7D48",
  "Low Stock": "#D9A441",
  Critical: "#C4432E",
  "Out of Stock": "#8A968E",
};

const statusLabel: Record<string, string> = {
  "in-stock": "In Stock",
  "low-stock": "Low Stock",
  critical: "Critical",
  "out-of-stock": "Out of Stock",
};

function computeByStatus() {
  const counts = new Map<string, number>();
  for (const item of mockInventory) {
    const label = statusLabel[item.status] ?? item.status;
    counts.set(label, (counts.get(label) ?? 0) + 1);
  }
  return Array.from(counts.entries()).map(([name, value]) => ({ name, value }));
}

function computeByCategory() {
  const totals = new Map<string, number>();
  for (const item of mockInventory) {
    const cat = item.medicine.category;
    totals.set(cat, (totals.get(cat) ?? 0) + item.quantityOnHand * item.medicine.costPrice);
  }
  return Array.from(totals.entries())
    .map(([category, value]) => ({ category, value }))
    .sort((a, b) => b.value - a.value);
}

export default function InventoryAnalyticsPage() {
  const totalValue = mockInventory.reduce((s, i) => s + i.quantityOnHand * i.medicine.costPrice, 0);
  const byStatus = computeByStatus();
  const byCategory = computeByCategory();
  const atRiskCount = mockInventory.filter((i) => i.status === "critical" || i.status === "low-stock").length;

  return (
    <div>
      <PageHeader title="Inventory Analytics" subtitle="Stock health and value distribution across the catalog" />

      <div className="grid grid-cols-1 gap-4 px-6 pt-5 sm:grid-cols-3">
        <StatCard label="Inventory Value" value={formatCurrency(totalValue)} icon={DollarSign} tone="bg-primary-50 text-primary-700" />
        <StatCard label="SKUs Tracked" value={mockInventory.length} icon={Package} tone="bg-info-50 text-info-text" />
        <StatCard label="At Risk" value={atRiskCount} icon={AlertTriangle} tone="bg-danger-50 text-danger-text" />
      </div>

      <div className="grid grid-cols-1 gap-4 px-6 py-5 lg:grid-cols-2">
        <div className="rounded-lg border border-border bg-surface p-4">
          <h2 className="mb-4 text-sm font-semibold text-foreground">Stock Status Distribution</h2>
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie data={byStatus} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={55} outerRadius={90} paddingAngle={2}>
                {byStatus.map((entry) => (
                  <Cell key={entry.name} fill={statusColors[entry.name] ?? "#8A968E"} />
                ))}
              </Pie>
              <Tooltip />
              <Legend iconType="circle" wrapperStyle={{ fontSize: 12 }} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="rounded-lg border border-border bg-surface p-4">
          <h2 className="mb-4 text-sm font-semibold text-foreground">Inventory Value by Category</h2>
          <div className="space-y-3">
            {byCategory.map((c) => {
              const pct = (c.value / totalValue) * 100;
              return (
                <div key={c.category}>
                  <div className="mb-1 flex items-center justify-between text-xs">
                    <span className="font-medium text-foreground">{c.category}</span>
                    <span className="text-subtle">{formatCurrency(c.value)}</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-surface-sunken">
                    <div className="h-full rounded-full bg-primary-600" style={{ width: `${pct}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
