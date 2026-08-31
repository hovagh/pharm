"use client";

import { useMemo } from "react";
import { ClipboardList, PackageCheck } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { StatusBadge } from "@/components/shared/status-badge";
import { EmptyState } from "@/components/shared/empty-state";
import { mockGoodsReceived, mockPurchaseOrders } from "@/lib/mock-data";
import { cn, formatCurrency, formatDate } from "@/lib/utils";

type HistoryEvent =
  | { kind: "po"; date: string; poNumber: string; supplierName: string; total: number; status: string }
  | { kind: "grn"; date: string; grnNumber: string; poNumber: string; supplierName: string; discrepancy: boolean };

export default function ProcurementHistoryPage() {
  const events = useMemo<HistoryEvent[]>(() => {
    const poEvents: HistoryEvent[] = mockPurchaseOrders.map((po) => ({
      kind: "po",
      date: po.createdDate,
      poNumber: po.poNumber,
      supplierName: po.supplierName,
      total: po.total,
      status: po.status,
    }));
    const grnEvents: HistoryEvent[] = mockGoodsReceived.map((g) => ({
      kind: "grn",
      date: g.receivedDate,
      grnNumber: g.grnNumber,
      poNumber: g.poNumber,
      supplierName: g.supplierName,
      discrepancy: g.discrepancy,
    }));
    return [...poEvents, ...grnEvents].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, []);

  return (
    <div>
      <PageHeader title="Procurement History" subtitle="A combined timeline of purchase orders raised and goods received" />

      <div className="px-6 py-5">
        {events.length === 0 ? (
          <EmptyState icon={ClipboardList} title="No procurement activity yet" description="Purchase orders and goods received notes will show up here." />
        ) : (
          <div className="space-y-3">
            {events.map((e, i) => (
              <div key={i} className="flex items-start gap-3 rounded-lg border border-border bg-surface p-3.5">
                <div
                  className={cn(
                    "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg",
                    e.kind === "po" ? "bg-primary-50 text-primary-600" : "bg-success-50 text-success-text"
                  )}
                >
                  {e.kind === "po" ? <ClipboardList className="h-4 w-4" /> : <PackageCheck className="h-4 w-4" />}
                </div>
                <div className="min-w-0 flex-1">
                  {e.kind === "po" ? (
                    <>
                      <p className="text-sm font-medium text-foreground">
                        Purchase order <span className="font-mono">{e.poNumber}</span> raised with {e.supplierName}
                      </p>
                      <p className="text-xs text-subtle">{formatCurrency(e.total)} · {formatDate(e.date)}</p>
                    </>
                  ) : (
                    <>
                      <p className="text-sm font-medium text-foreground">
                        Goods received <span className="font-mono">{e.grnNumber}</span> against{" "}
                        <span className="font-mono">{e.poNumber}</span> from {e.supplierName}
                      </p>
                      <p className="text-xs text-subtle">{formatDate(e.date)}</p>
                    </>
                  )}
                </div>
                <div className="shrink-0">
                  {e.kind === "po" ? (
                    <StatusBadge status={e.status} />
                  ) : e.discrepancy ? (
                    <span className="inline-flex items-center rounded-full bg-warning-50 px-2.5 py-0.5 text-xs font-medium text-warning-text">
                      Discrepancy
                    </span>
                  ) : (
                    <StatusBadge status="received" />
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
