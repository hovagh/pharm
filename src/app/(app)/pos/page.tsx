"use client";

import { useMemo, useState } from "react";
import { Search, Plus, Minus, Trash2, Banknote, Smartphone, CreditCard, ShieldCheck, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/shared/empty-state";
import { PageHeader } from "@/components/shared/page-header";
import { mockInventory } from "@/lib/mock-data";
import { cn, formatCurrency } from "@/lib/utils";
import type { InventoryItem, PaymentMethod } from "@/types/domain";

interface CartLine {
  item: InventoryItem;
  quantity: number;
}

const paymentOptions: { value: PaymentMethod; label: string; icon: React.ElementType }[] = [
  { value: "cash", label: "Cash", icon: Banknote },
  { value: "mobile-money", label: "Mobile Money", icon: Smartphone },
  { value: "card", label: "Card", icon: CreditCard },
  { value: "insurance", label: "Insurance", icon: ShieldCheck },
];

export default function PosPage() {
  const [query, setQuery] = useState("");
  const [cart, setCart] = useState<CartLine[]>([]);
  const [payment, setPayment] = useState<PaymentMethod>("cash");
  const [confirmed, setConfirmed] = useState<{ total: number; method: PaymentMethod } | null>(null);

  const results = useMemo(() => {
    if (!query) return mockInventory.slice(0, 8);
    return mockInventory.filter(
      (item) =>
        item.medicine.brandName.toLowerCase().includes(query.toLowerCase()) ||
        item.medicine.genericName.toLowerCase().includes(query.toLowerCase()) ||
        item.medicine.sku.toLowerCase().includes(query.toLowerCase())
    );
  }, [query]);

  function addToCart(item: InventoryItem) {
    setCart((c) => {
      const existing = c.find((l) => l.item.id === item.id);
      if (existing) {
        return c.map((l) => (l.item.id === item.id ? { ...l, quantity: Math.min(l.quantity + 1, item.quantityOnHand) } : l));
      }
      return [...c, { item, quantity: 1 }];
    });
  }

  function setQuantity(itemId: string, quantity: number) {
    setCart((c) =>
      c
        .map((l) => (l.item.id === itemId ? { ...l, quantity: Math.max(0, Math.min(quantity, l.item.quantityOnHand)) } : l))
        .filter((l) => l.quantity > 0)
    );
  }

  function removeLine(itemId: string) {
    setCart((c) => c.filter((l) => l.item.id !== itemId));
  }

  const subtotal = cart.reduce((sum, l) => sum + l.quantity * l.item.medicine.sellingPrice, 0);

  function checkout() {
    if (cart.length === 0) return;
    setConfirmed({ total: subtotal, method: payment });
    setCart([]);
  }

  return (
    <div>
      <PageHeader title="Point of Sale" subtitle="Accra Central Pharmacy · Kojo Ampofo" />

      <div className="grid grid-cols-1 gap-0 lg:grid-cols-[1fr_360px]">
        {/* Catalog / search */}
        <div className="border-b border-border p-6 lg:border-b-0 lg:border-r">
          <div className="relative mb-4">
            <Search className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-subtle" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Scan barcode or search by name, brand, SKU…"
              className="h-10 w-full rounded-md border border-border-strong bg-surface pl-9 pr-3 text-sm placeholder:text-subtle focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500"
              autoFocus
            />
          </div>

          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {results.map((item) => (
              <button
                key={item.id}
                onClick={() => addToCart(item)}
                disabled={item.quantityOnHand === 0}
                className="flex items-center justify-between gap-3 rounded-lg border border-border bg-surface p-3 text-left transition-colors hover:border-primary-300 hover:bg-primary-50/30 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-foreground">{item.medicine.brandName}</p>
                  <p className="text-xs text-subtle">
                    {item.medicine.genericName} {item.medicine.strength} · {item.quantityOnHand} in stock
                  </p>
                </div>
                <span className="shrink-0 text-sm font-semibold tabular-nums text-foreground">
                  {formatCurrency(item.medicine.sellingPrice)}
                </span>
              </button>
            ))}
          </div>

          {results.length === 0 && (
            <EmptyState icon={Search} title="No matching products" description="Try a different search term." />
          )}
        </div>

        {/* Cart */}
        <div className="flex flex-col p-6">
          <h2 className="mb-3 text-sm font-semibold text-foreground">Current Sale</h2>
          {cart.length === 0 ? (
            <EmptyState
              icon={ShoppingCart}
              title="Cart is empty"
              description="Search or tap a product to add it to the sale."
              className="flex-1"
            />
          ) : (
            <div className="flex-1 space-y-3 overflow-y-auto">
              {cart.map((line) => (
                <div key={line.item.id} className="rounded-lg border border-border bg-surface p-3">
                  <div className="mb-2 flex items-start justify-between gap-2">
                    <p className="text-sm font-medium text-foreground">{line.item.medicine.brandName}</p>
                    <button
                      onClick={() => removeLine(line.item.id)}
                      className="text-subtle hover:text-danger-text"
                      aria-label="Remove"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setQuantity(line.item.id, line.quantity - 1)}
                        className="flex h-7 w-7 items-center justify-center rounded-md border border-border-strong text-muted hover:bg-gray-50"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="w-6 text-center text-sm tabular-nums">{line.quantity}</span>
                      <button
                        onClick={() => setQuantity(line.item.id, line.quantity + 1)}
                        className="flex h-7 w-7 items-center justify-center rounded-md border border-border-strong text-muted hover:bg-gray-50"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>
                    <span className="text-sm font-semibold tabular-nums">
                      {formatCurrency(line.quantity * line.item.medicine.sellingPrice)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="mt-4 space-y-3 border-t border-border pt-4">
            <div className="grid grid-cols-2 gap-2">
              {paymentOptions.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setPayment(opt.value)}
                  className={cn(
                    "flex items-center gap-2 rounded-lg border px-3 py-2 text-xs font-medium transition-colors",
                    payment === opt.value
                      ? "border-primary-600 bg-primary-50 text-primary-700"
                      : "border-border-strong text-muted hover:bg-gray-50"
                  )}
                >
                  <opt.icon className="h-3.5 w-3.5" />
                  {opt.label}
                </button>
              ))}
            </div>

            <div className="flex items-center justify-between text-sm">
              <span className="text-muted">Total</span>
              <span className="text-lg font-bold text-foreground">{formatCurrency(subtotal)}</span>
            </div>

            <Button className="w-full" size="lg" onClick={checkout} disabled={cart.length === 0}>
              Complete Sale
            </Button>

            {confirmed && (
              <p className="rounded-md bg-success-50 px-3 py-2 text-center text-xs font-medium text-success-text">
                Sale completed — {formatCurrency(confirmed.total)} via{" "}
                {paymentOptions.find((p) => p.value === confirmed.method)?.label}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
