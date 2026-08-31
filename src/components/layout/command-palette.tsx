"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import * as Dialog from "@radix-ui/react-dialog";
import {
  Search,
  Pill,
  User,
  FileText,
  ClipboardList,
  Truck,
  LayoutDashboard,
  ShoppingCart,
  PlusCircle,
} from "lucide-react";
import { mockMedicines, mockPatients, mockPrescriptions, mockPurchaseOrders } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

interface Result {
  id: string;
  group: string;
  label: string;
  sublabel?: string;
  icon: typeof Pill;
  href: string;
}

export function CommandPalette({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) {
  const router = useRouter();
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (!open) setQuery("");
  }, [open]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        onOpenChange(!open);
      }
      if (e.key === "Escape") onOpenChange(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onOpenChange]);

  const pages: Result[] = [
    { id: "p-dashboard", group: "Pages", label: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
    { id: "p-pos", group: "Pages", label: "Point of Sale", icon: ShoppingCart, href: "/pos" },
    { id: "p-inventory", group: "Pages", label: "Inventory", icon: ClipboardList, href: "/inventory" },
  ];

  const actions: Result[] = [
    { id: "a-po", group: "Actions", label: "Create purchase order", icon: PlusCircle, href: "/procurement/orders" },
    { id: "a-sale", group: "Actions", label: "Open today's sales", icon: ShoppingCart, href: "/sales" },
  ];

  const results = useMemo<Result[]>(() => {
    const q = query.trim().toLowerCase();
    const medicines: Result[] = mockMedicines
      .filter((m) => !q || m.genericName.toLowerCase().includes(q) || m.brandName.toLowerCase().includes(q))
      .slice(0, 4)
      .map((m) => ({
        id: m.id,
        group: "Medicines",
        label: `${m.genericName} ${m.strength}`,
        sublabel: `${m.brandName} · ${m.dosageForm}`,
        icon: Pill,
        href: `/inventory/medicines/${m.id}`,
      }));

    const patients: Result[] = mockPatients
      .filter((p) => !q || p.name.toLowerCase().includes(q))
      .slice(0, 3)
      .map((p) => ({
        id: p.id,
        group: "Patients",
        label: p.name,
        sublabel: p.phone,
        icon: User,
        href: `/patients/profiles/${p.id}`,
      }));

    const prescriptions: Result[] = mockPrescriptions
      .filter((rx) => !q || rx.prescriptionNumber.toLowerCase().includes(q) || rx.patientName.toLowerCase().includes(q))
      .slice(0, 3)
      .map((rx) => ({
        id: rx.id,
        group: "Prescriptions",
        label: rx.prescriptionNumber,
        sublabel: rx.patientName,
        icon: FileText,
        href: `/prescriptions/${rx.id}`,
      }));

    const orders: Result[] = mockPurchaseOrders
      .filter((po) => !q || po.poNumber.toLowerCase().includes(q) || po.supplierName.toLowerCase().includes(q))
      .slice(0, 3)
      .map((po) => ({
        id: po.id,
        group: "Purchase Orders",
        label: po.poNumber,
        sublabel: po.supplierName,
        icon: Truck,
        href: `/procurement/orders/${po.id}`,
      }));

    const matchedPages = pages.filter((p) => !q || p.label.toLowerCase().includes(q));
    const matchedActions = actions.filter((a) => !q || a.label.toLowerCase().includes(q));

    return [...medicines, ...patients, ...prescriptions, ...orders, ...matchedPages, ...matchedActions];
  }, [query]);

  const grouped = useMemo(() => {
    const map = new Map<string, Result[]>();
    for (const r of results) {
      if (!map.has(r.group)) map.set(r.group, []);
      map.get(r.group)!.push(r);
    }
    return map;
  }, [results]);

  const [activeIndex, setActiveIndex] = useState(0);
  useEffect(() => setActiveIndex(0), [query]);

  function handleSelect(r: Result) {
    onOpenChange(false);
    router.push(r.href);
  }

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[60] bg-black/40" />
        <Dialog.Content
          className="fixed left-1/2 top-[14vh] z-[61] w-[92vw] max-w-xl -translate-x-1/2 overflow-hidden rounded-lg border border-border bg-surface-elevated shadow-lg"
          onOpenAutoFocus={(e) => e.preventDefault()}
        >
          <Dialog.Title className="sr-only">Search HovaPharm</Dialog.Title>
          <div className="flex items-center gap-2.5 border-b border-border px-4">
            <Search className="h-4 w-4 shrink-0 text-subtle" />
            <input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "ArrowDown") {
                  e.preventDefault();
                  setActiveIndex((i) => Math.min(i + 1, results.length - 1));
                } else if (e.key === "ArrowUp") {
                  e.preventDefault();
                  setActiveIndex((i) => Math.max(i - 1, 0));
                } else if (e.key === "Enter" && results[activeIndex]) {
                  handleSelect(results[activeIndex]);
                }
              }}
              placeholder="Search medicines, patients, prescriptions, orders…"
              className="h-12 flex-1 bg-transparent text-sm text-foreground placeholder:text-subtle focus:outline-none"
            />
            <kbd className="rounded border border-border-strong px-1.5 py-0.5 text-[10px] text-subtle">Esc</kbd>
          </div>

          <div className="max-h-[60vh] overflow-y-auto py-2">
            {results.length === 0 && (
              <p className="px-4 py-8 text-center text-sm text-muted">No results for &ldquo;{query}&rdquo;.</p>
            )}
            {[...grouped.entries()].map(([group, items]) => (
              <div key={group} className="px-2 py-1">
                <p className="px-2 py-1 text-[10.5px] font-semibold uppercase tracking-wider text-subtle">{group}</p>
                {items.map((r) => {
                  const globalIndex = results.indexOf(r);
                  const Icon = r.icon;
                  return (
                    <button
                      key={r.id}
                      onMouseEnter={() => setActiveIndex(globalIndex)}
                      onClick={() => handleSelect(r)}
                      className={cn(
                        "flex w-full items-center gap-3 rounded-md px-2.5 py-2 text-left text-sm",
                        activeIndex === globalIndex ? "bg-primary-50 text-success-text" : "text-foreground hover:bg-gray-50"
                      )}
                    >
                      <Icon className="h-4 w-4 shrink-0 text-subtle" />
                      <span className="flex-1 truncate">{r.label}</span>
                      {r.sublabel && <span className="shrink-0 text-xs text-subtle">{r.sublabel}</span>}
                    </button>
                  );
                })}
              </div>
            ))}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
