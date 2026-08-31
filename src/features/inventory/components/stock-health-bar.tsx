"use client";

import { cn } from "@/lib/utils";

export function StockHealthBar({
  quantityOnHand,
  minimumStock,
  maxCapacity,
  className,
}: {
  quantityOnHand: number;
  minimumStock: number;
  maxCapacity?: number;
  className?: string;
}) {
  const cap = maxCapacity ?? Math.max(minimumStock * 4, 1);
  const pct = Math.min((quantityOnHand / cap) * 100, 100);
  const minPct = Math.min((minimumStock / cap) * 100, 100);

  let color = "bg-primary-600";
  if (quantityOnHand === 0) color = "bg-gray-300";
  else if (quantityOnHand <= minimumStock * 0.5) color = "bg-danger-500";
  else if (quantityOnHand <= minimumStock) color = "bg-warning-500";

  return (
    <div className={cn("space-y-1", className)}>
      <div className="relative h-2 overflow-hidden rounded-full bg-surface-sunken">
        <div className={cn("h-full rounded-full transition-all", color)} style={{ width: `${pct}%` }} />
        <div className="absolute top-0 bottom-0 w-0.5 bg-subtle" style={{ left: `${minPct}%` }} />
      </div>
      <div className="flex justify-between text-[11px] text-subtle">
        <span>0</span>
        <span className="text-warning-text">Min: {minimumStock}</span>
        <span>Cap: {cap}</span>
      </div>
    </div>
  );
}
