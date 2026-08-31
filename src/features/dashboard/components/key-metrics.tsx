import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { cn } from "@/lib/utils";

interface Metric {
  label: string;
  value: string;
  delta: number;
  deltaLabel: string;
}

const metrics: Metric[] = [
  { label: "Today's Revenue", value: formatCurrency(18420), delta: 9.3, deltaLabel: "vs yesterday" },
  { label: "Transactions", value: "142", delta: 5.1, deltaLabel: "vs yesterday" },
  { label: "Prescriptions", value: "37", delta: -4.2, deltaLabel: "vs yesterday" },
  { label: "Gross Profit", value: formatCurrency(6820), delta: 6.8, deltaLabel: "vs yesterday" },
];

export function KeyMetrics() {
  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      {metrics.map((m) => {
        const positive = m.delta >= 0;
        return (
          <div key={m.label} className="rounded-lg border border-border bg-surface p-4 shadow-xs">
            <p className="text-xs font-medium text-muted">{m.label}</p>
            <p className="mt-1.5 text-2xl font-semibold tabular-nums tracking-tight text-foreground">{m.value}</p>
            <div className="mt-1.5 flex items-center gap-1">
              <span
                className={cn(
                  "flex items-center gap-0.5 text-xs font-medium",
                  positive ? "text-success-text" : "text-danger-text"
                )}
              >
                {positive ? <ArrowUpRight className="h-3.5 w-3.5" /> : <ArrowDownRight className="h-3.5 w-3.5" />}
                {Math.abs(m.delta)}%
              </span>
              <span className="text-xs text-subtle">{m.deltaLabel}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
