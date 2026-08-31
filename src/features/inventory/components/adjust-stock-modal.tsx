"use client";

import { useState } from "react";
import { AlertTriangle, Minus, Plus, RotateCcw, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import type { InventoryItem } from "@/types/domain";

const ADJUSTMENT_TYPES = ["restock", "adjustment", "wastage", "return"] as const;
type AdjustmentType = (typeof ADJUSTMENT_TYPES)[number];

export function AdjustStockModal({
  item,
  onClose,
  onAdjust,
}: {
  item: InventoryItem | null;
  onClose: () => void;
  onAdjust?: (item: InventoryItem, quantity: number, reason: string, type: AdjustmentType) => void;
}) {
  const [quantity, setQuantity] = useState(0);
  const [reason, setReason] = useState("");
  const [type, setType] = useState<AdjustmentType>("adjustment");

  if (!item) return null;

  const newBalance = item.quantityOnHand + quantity;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!reason.trim() || quantity === 0 || !item) return;
    onAdjust?.(item, quantity, reason, type);
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-foreground/30 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-md rounded-xl bg-surface p-6 shadow-2xl">
        <div className="mb-5 flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-warning-50">
              <RotateCcw className="h-5 w-5 text-warning-text" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-foreground">Adjust Stock</h3>
              <p className="text-xs text-subtle">
                {item.medicine.genericName} {item.medicine.strength}
              </p>
            </div>
          </div>
          <button onClick={onClose} className="text-muted hover:text-foreground" aria-label="Close">
            <X className="h-4 w-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-4 gap-2">
            {ADJUSTMENT_TYPES.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setType(t)}
                className={cn(
                  "rounded-lg border px-2 py-2 text-xs font-medium capitalize transition-colors",
                  type === t
                    ? "border-primary-600 bg-primary-50 text-primary-700"
                    : "border-border-strong bg-surface text-muted hover:bg-gray-50"
                )}
              >
                {t}
              </button>
            ))}
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-medium text-muted">Quantity</label>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setQuantity((q) => q - 1)}
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-border-strong text-muted hover:bg-gray-50"
                aria-label="Decrease"
              >
                <Minus className="h-4 w-4" />
              </button>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value, 10) || 0)}
                className="flex-1 rounded-lg border border-border-strong px-3 py-2.5 text-center text-sm font-semibold text-foreground focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500"
              />
              <button
                type="button"
                onClick={() => setQuantity((q) => q + 1)}
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-border-strong text-muted hover:bg-gray-50"
                aria-label="Increase"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
            <p className="mt-1.5 text-[11px] text-subtle">
              Current: <span className="font-medium text-foreground">{item.quantityOnHand}</span> → New balance:{" "}
              <span className={cn("font-medium", newBalance < 0 ? "text-danger-text" : "text-success-text")}>
                {newBalance}
              </span>
            </p>
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-medium text-muted">Reason *</label>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Why are you adjusting this stock?"
              rows={3}
              required
              className="w-full resize-none rounded-lg border border-border-strong px-3 py-2.5 text-sm text-foreground placeholder:text-subtle focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500"
            />
          </div>

          {newBalance < 0 && (
            <div className="flex items-center gap-2 rounded-lg bg-danger-50 p-3 text-xs text-danger-text">
              <AlertTriangle className="h-4 w-4 shrink-0" />
              This will result in negative stock. Make sure that&apos;s intentional.
            </div>
          )}

          <div className="flex gap-3 pt-2">
            <Button type="button" variant="secondary" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" disabled={!reason.trim() || quantity === 0} className="flex-1">
              Record Adjustment
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
