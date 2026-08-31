"use client";

import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { mockRevenueSeries } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/utils";

export function SalesPerformance() {
  return (
    <div className="rounded-lg border border-border bg-surface shadow-xs">
      <div className="flex items-center justify-between border-b border-border px-5 py-3.5">
        <div>
          <h2 className="text-sm font-semibold text-foreground">Sales Performance</h2>
          <p className="text-xs text-subtle">Revenue today vs. yesterday</p>
        </div>
        <div className="flex items-center gap-3 text-xs">
          <span className="flex items-center gap-1.5 text-muted">
            <span className="h-2 w-2 rounded-full bg-primary-500" /> Today
          </span>
          <span className="flex items-center gap-1.5 text-muted">
            <span className="h-2 w-2 rounded-full bg-gray-300" /> Yesterday
          </span>
        </div>
      </div>
      <div className="h-64 px-2 py-4">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={mockRevenueSeries} margin={{ top: 4, right: 16, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="revToday" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#2F7D48" stopOpacity={0.22} />
                <stop offset="100%" stopColor="#2F7D48" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} stroke="#E4E7E2" />
            <XAxis
              dataKey="label"
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 11, fill: "#8A968E" }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 11, fill: "#8A968E" }}
              tickFormatter={(v) => `${v / 1000}k`}
              width={34}
            />
            <Tooltip
              formatter={(value: number, name: string) => [formatCurrency(value), name === "today" ? "Today" : "Yesterday"]}
              contentStyle={{
                borderRadius: 8,
                border: "1px solid #E4E7E2",
                fontSize: 12,
                boxShadow: "0 4px 10px -2px rgba(20,35,28,0.1)",
              }}
              labelStyle={{ color: "#14231C", fontWeight: 600 }}
            />
            <Area
              type="monotone"
              dataKey="yesterday"
              stroke="#C4CAC0"
              strokeWidth={1.5}
              fill="transparent"
              strokeDasharray="3 3"
            />
            <Area
              type="monotone"
              dataKey="today"
              stroke="#2F7D48"
              strokeWidth={2}
              fill="url(#revToday)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
