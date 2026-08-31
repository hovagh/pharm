"use client";

import { Package, Calendar, MapPin, X } from "lucide-react";
import { cn, formatCurrency, formatDate } from "@/lib/utils";
import { StatusBadge } from "@/components/shared/status-badge";
import type { Batch } from "@/types/domain";

function batchStatus(batch: Batch): "in-stock" | "expired" | "expiring-soon" | "out-of-stock" {
  if (batch.quantityRemaining === 0) return "out-of-stock";
  const daysToExpiry = Math.ceil((new Date(batch.expiryDate).getTime() - Date.now()) / 86_400_000);
  if (daysToExpiry < 0) return "expired";
  if (daysToExpiry <= 60) return "expiring-soon";
  return "in-stock";
}

export function BatchDrawer({
  batches,
  medicineName,
  onClose,
}: {
  batches: Batch[];
  medicineName: string;
  onClose: () => void;
}) {
  if (!batches.length) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-foreground/30 backdrop-blur-sm" onClick={onClose} />
      <div className="relative h-full w-full max-w-lg overflow-y-auto bg-surface shadow-2xl">
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-border bg-surface px-6 py-4">
          <div>
            <h2 className="text-base font-semibold text-foreground">Batch Details</h2>
            <p className="text-sm text-muted">{medicineName}</p>
          </div>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-md text-muted transition-colors hover:bg-gray-100"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="space-y-4 p-6">
          {batches.map((batch) => {
            const status = batchStatus(batch);
            const pct = (batch.quantityRemaining / batch.quantityReceived) * 100;
            return (
              <div
                key={batch.id}
                className={cn(
                  "rounded-xl border p-4",
                  status === "expired" && "border-danger-400 bg-danger-50",
                  status === "expiring-soon" && "border-warning-400 bg-warning-50",
                  status === "in-stock" && "border-border bg-surface-sunken",
                  status === "out-of-stock" && "border-border bg-surface-sunken"
                )}
              >
                <div className="mb-3 flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-sm font-semibold text-foreground">{batch.batchNumber}</span>
                    <StatusBadge status={status} />
                  </div>
                  <span className="text-xs text-subtle">{formatDate(batch.purchaseDate)}</span>
                </div>

                <div className="mb-3 grid grid-cols-2 gap-3 text-sm text-foreground">
                  <div className="flex items-center gap-2">
                    <Package className="h-4 w-4 text-subtle" />
                    <span>
                      {batch.quantityRemaining} / {batch.quantityReceived} remaining
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-subtle" />
                    <span>Exp: {formatDate(batch.expiryDate)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-subtle" />
                    <span>{batch.supplierName}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-subtle">Unit cost:</span>
                    <span className="font-medium">{formatCurrency(batch.costPerUnit)}</span>
                  </div>
                </div>

                <div className="h-1.5 overflow-hidden rounded-full bg-surface-sunken">
                  <div
                    className={cn(
                      "h-full rounded-full",
                      status === "expired" && "bg-danger-500",
                      status === "expiring-soon" && "bg-warning-500",
                      status === "in-stock" && "bg-primary-600",
                      status === "out-of-stock" && "bg-gray-300"
                    )}
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
