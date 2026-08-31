"use client";

import { useMemo } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { TrendingUp, DollarSign, Percent } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { StatCard } from "@/components/shared/stat-card";
import { mockRevenueSeries, mockSales } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/utils";

export default function RevenuePage() {
  const stats = useMemo(() => {
    const today = mockRevenueSeries.at(-1)?.today ?? 0;
    const yesterday = mockRevenueSeries.at(-1)?.yesterday ?? 0;
    const growth = yesterday > 0 ? ((today - yesterday) / yesterday) * 100 : 0;
    const salesRevenue = mockSales.reduce((s, sale) => s + sale.total, 0);
    return { today, growth, salesRevenue };
  }, []);

  return (
    <div>
      <PageHeader title="Revenue" subtitle="Today's revenue trend compared to yesterday" />

      <div className="grid grid-cols-1 gap-4 px-6 pt-5 sm:grid-cols-3">
        <StatCard label="Revenue Today" value={formatCurrency(stats.today)} icon={DollarSign} tone="bg-primary-50 text-primary-700" />
        <StatCard
          label="vs. Yesterday"
          value={`${stats.growth >= 0 ? "+" : ""}${stats.growth.toFixed(1)}%`}
          icon={TrendingUp}
          tone="bg-success-50 text-success-text"
        />
        <StatCard label="Recorded Transactions Total" value={formatCurrency(stats.salesRevenue)} icon={Percent} tone="bg-info-50 text-info-text" />
      </div>

      <div className="px-6 py-5">
        <div className="rounded-lg border border-border bg-surface p-4">
          <h2 className="mb-4 text-sm font-semibold text-foreground">Today vs. Yesterday</h2>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={mockRevenueSeries} margin={{ top: 4, right: 16, left: 0, bottom: 0 }}>
              <CartesianGrid vertical={false} stroke="#E4E7E2" />
              <XAxis dataKey="label" tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: "#8A968E" }} />
              <YAxis
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 11, fill: "#8A968E" }}
                tickFormatter={(v) => `${v / 1000}k`}
                width={34}
              />
              <Tooltip
                formatter={(value: number, name: string) => [formatCurrency(value), name === "today" ? "Today" : "Yesterday"]}
                contentStyle={{ borderRadius: 8, border: "1px solid #E4E7E2", fontSize: 12, boxShadow: "0 4px 10px -2px rgba(20,35,28,0.1)" }}
                labelStyle={{ color: "#14231C", fontWeight: 600 }}
              />
              <Line type="monotone" dataKey="yesterday" stroke="#C4CAC0" strokeWidth={1.5} strokeDasharray="3 3" dot={false} />
              <Line type="monotone" dataKey="today" stroke="#2F7D48" strokeWidth={2.5} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
