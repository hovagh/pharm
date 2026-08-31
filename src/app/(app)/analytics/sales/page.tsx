"use client";

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Cell } from "recharts";
import { TrendingUp, Receipt, Award } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { StatCard } from "@/components/shared/stat-card";
import { mockSales } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/utils";
import type { PaymentMethod } from "@/types/domain";

const methodLabel: Record<PaymentMethod, string> = {
  cash: "Cash",
  "mobile-money": "Mobile Money",
  card: "Card",
  insurance: "Insurance",
};

const barColors = ["#2F7D48", "#4A9B68", "#8FBF9F", "#C4CAC0"];

function computeByMethod() {
  const totals = new Map<PaymentMethod, number>();
  for (const sale of mockSales) {
    totals.set(sale.paymentMethod, (totals.get(sale.paymentMethod) ?? 0) + sale.total);
  }
  return Array.from(totals.entries()).map(([method, total]) => ({ method: methodLabel[method], total }));
}

function computeTopProducts() {
  const totals = new Map<string, { quantity: number; revenue: number }>();
  for (const sale of mockSales) {
    for (const item of sale.items) {
      const cur = totals.get(item.medicineName) ?? { quantity: 0, revenue: 0 };
      totals.set(item.medicineName, {
        quantity: cur.quantity + item.quantity,
        revenue: cur.revenue + item.quantity * item.unitPrice,
      });
    }
  }
  return Array.from(totals.entries())
    .map(([name, v]) => ({ name, ...v }))
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, 5);
}

export default function SalesAnalyticsPage() {
  const totalRevenue = mockSales.reduce((s, sale) => s + sale.total, 0);
  const byMethod = computeByMethod();
  const topProducts = computeTopProducts();

  return (
    <div>
      <PageHeader title="Sales Analytics" subtitle="Revenue mix and top-selling products" />

      <div className="grid grid-cols-1 gap-4 px-6 pt-5 sm:grid-cols-3">
        <StatCard label="Total Revenue" value={formatCurrency(totalRevenue)} icon={TrendingUp} tone="bg-primary-50 text-primary-700" />
        <StatCard label="Transactions" value={mockSales.length} icon={Receipt} tone="bg-info-50 text-info-text" />
        <StatCard label="Top Product" value={topProducts[0]?.name ?? "—"} icon={Award} tone="bg-success-50 text-success-text" />
      </div>

      <div className="grid grid-cols-1 gap-4 px-6 py-5 lg:grid-cols-2">
        <div className="rounded-lg border border-border bg-surface p-4">
          <h2 className="mb-4 text-sm font-semibold text-foreground">Revenue by Payment Method</h2>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={byMethod} margin={{ top: 4, right: 8, left: 0, bottom: 0 }}>
              <CartesianGrid vertical={false} stroke="#E4E7E2" />
              <XAxis dataKey="method" tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: "#8A968E" }} />
              <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: "#8A968E" }} tickFormatter={(v) => `${v}`} width={40} />
              <Tooltip formatter={(value: number) => formatCurrency(value)} contentStyle={{ borderRadius: 8, border: "1px solid #E4E7E2", fontSize: 12 }} />
              <Bar dataKey="total" radius={[6, 6, 0, 0]}>
                {byMethod.map((_, i) => (
                  <Cell key={i} fill={barColors[i % barColors.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="rounded-lg border border-border bg-surface p-4">
          <h2 className="mb-4 text-sm font-semibold text-foreground">Top-Selling Products</h2>
          <div className="space-y-3">
            {topProducts.map((p, i) => (
              <div key={p.name} className="flex items-center gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary-50 text-xs font-semibold text-primary-700">
                  {i + 1}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-foreground">{p.name}</p>
                  <p className="text-xs text-subtle">{p.quantity} units sold</p>
                </div>
                <span className="shrink-0 text-sm font-semibold tabular-nums">{formatCurrency(p.revenue)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
