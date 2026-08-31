"use client";

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { Truck, Clock, TrendingUp } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { StatCard } from "@/components/shared/stat-card";
import { mockSuppliers } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/utils";

function computeChartData() {
  return [...mockSuppliers]
    .sort((a, b) => b.totalSpend - a.totalSpend)
    .map((s) => ({ name: s.name.split(" ").slice(0, 2).join(" "), spend: s.totalSpend, onTime: s.onTimeRate }));
}

export default function ProcurementAnalyticsPage() {
  const totalSpend = mockSuppliers.reduce((s, sup) => s + sup.totalSpend, 0);
  const avgLeadTime = mockSuppliers.reduce((s, sup) => s + sup.leadTimeDays, 0) / mockSuppliers.length;
  const avgOnTime = mockSuppliers.reduce((s, sup) => s + sup.onTimeRate, 0) / mockSuppliers.length;
  const chartData = computeChartData();

  return (
    <div>
      <PageHeader title="Procurement Analytics" subtitle="Supplier spend and delivery performance" />

      <div className="grid grid-cols-1 gap-4 px-6 pt-5 sm:grid-cols-3">
        <StatCard label="Total Spend" value={formatCurrency(totalSpend)} icon={Truck} tone="bg-primary-50 text-primary-700" />
        <StatCard label="Avg. Lead Time" value={`${avgLeadTime.toFixed(1)}d`} icon={Clock} tone="bg-info-50 text-info-text" />
        <StatCard label="Avg. On-Time Rate" value={`${avgOnTime.toFixed(0)}%`} icon={TrendingUp} tone="bg-success-50 text-success-text" />
      </div>

      <div className="px-6 py-5">
        <div className="rounded-lg border border-border bg-surface p-4">
          <h2 className="mb-4 text-sm font-semibold text-foreground">Spend by Supplier</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData} layout="vertical" margin={{ top: 4, right: 16, left: 8, bottom: 0 }}>
              <CartesianGrid horizontal={false} stroke="#E4E7E2" />
              <XAxis type="number" tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: "#8A968E" }} tickFormatter={(v) => `${v / 1000}k`} />
              <YAxis type="category" dataKey="name" tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: "#8A968E" }} width={110} />
              <Tooltip formatter={(value: number) => formatCurrency(value)} contentStyle={{ borderRadius: 8, border: "1px solid #E4E7E2", fontSize: 12 }} />
              <Bar dataKey="spend" fill="#2F7D48" radius={[0, 6, 6, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
