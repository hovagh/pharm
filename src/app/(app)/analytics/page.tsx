import Link from "next/link";
import { TrendingUp, Package, PieChart, Truck, ArrowUpRight } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { StatCard } from "@/components/shared/stat-card";
import { mockInventory, mockSales, mockPurchaseOrders } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/utils";

const sections = [
  {
    href: "/analytics/sales",
    icon: TrendingUp,
    title: "Sales Analytics",
    description: "Revenue trends, top-selling products, and payment method mix.",
  },
  {
    href: "/analytics/inventory",
    icon: Package,
    title: "Inventory Analytics",
    description: "Stock health, turnover, and expiry risk across branches.",
  },
  {
    href: "/analytics/profitability",
    icon: PieChart,
    title: "Profitability",
    description: "Margin by category and highest/lowest performing products.",
  },
  {
    href: "/analytics/procurement",
    icon: Truck,
    title: "Procurement Analytics",
    description: "Supplier performance, lead times, and spend distribution.",
  },
];

export default function AnalyticsOverviewPage() {
  const totalRevenue = mockSales.reduce((s, sale) => s + sale.total, 0);
  const inventoryValue = mockInventory.reduce((s, i) => s + i.quantityOnHand * i.medicine.costPrice, 0);
  const openPOValue = mockPurchaseOrders
    .filter((p) => p.status !== "received")
    .reduce((s, p) => s + p.total, 0);

  return (
    <div>
      <PageHeader title="Analytics" subtitle="A cross-section of how the pharmacy is performing" />

      <div className="grid grid-cols-1 gap-4 px-6 pt-5 sm:grid-cols-3">
        <StatCard label="Recorded Revenue" value={formatCurrency(totalRevenue)} icon={TrendingUp} tone="bg-primary-50 text-primary-700" />
        <StatCard label="Inventory Value" value={formatCurrency(inventoryValue)} icon={Package} tone="bg-info-50 text-info-text" />
        <StatCard label="Open PO Value" value={formatCurrency(openPOValue)} icon={Truck} tone="bg-warning-50 text-warning-text" />
      </div>

      <div className="grid grid-cols-1 gap-4 px-6 py-5 sm:grid-cols-2">
        {sections.map((s) => (
          <Link
            key={s.href}
            href={s.href}
            className="group flex items-start gap-3 rounded-lg border border-border bg-surface p-4 transition-colors hover:border-primary-300 hover:bg-primary-50/30"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-50">
              <s.icon className="h-5 w-5 text-primary-600" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="flex items-center gap-1 text-sm font-semibold text-foreground">
                {s.title}
                <ArrowUpRight className="h-3.5 w-3.5 text-subtle transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </p>
              <p className="mt-0.5 text-xs text-muted">{s.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
