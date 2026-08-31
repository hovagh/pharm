import Link from "next/link";
import { PackageX, CalendarClock, FileClock, ClipboardList, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const items = [
  { label: "Critical Stock", count: 4, unit: "medicines", icon: PackageX, tone: "danger", href: "/inventory?status=critical" },
  { label: "Expiring Soon", count: 7, unit: "medicines", icon: CalendarClock, tone: "warning", href: "/inventory/expiry" },
  { label: "Pending Prescriptions", count: 2, unit: "prescriptions", icon: FileClock, tone: "info", href: "/prescriptions?status=pending" },
  { label: "Pending Purchase Orders", count: 3, unit: "orders", icon: ClipboardList, tone: "warning", href: "/procurement/orders?status=pending-approval" },
] as const;

const toneStyles = {
  danger: "bg-danger-50 text-danger-500",
  warning: "bg-warning-50 text-warning-500",
  info: "bg-info-50 text-info-500",
} as const;

export function ActionRequired() {
  return (
    <div className="rounded-lg border border-border bg-surface shadow-xs">
      <div className="flex items-center justify-between border-b border-border px-5 py-3.5">
        <h2 className="text-sm font-semibold text-foreground">Action Required</h2>
      </div>
      <ul className="divide-y divide-border">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <li key={item.label}>
              <Link
                href={item.href}
                className="flex items-center gap-3 px-5 py-3 transition-colors hover:bg-gray-50"
              >
                <span className={cn("flex h-8 w-8 shrink-0 items-center justify-center rounded-md", toneStyles[item.tone])}>
                  <Icon className="h-4 w-4" />
                </span>
                <span className="flex-1 min-w-0">
                  <span className="block text-sm font-medium text-foreground">{item.label}</span>
                  <span className="block text-xs text-subtle">
                    {item.count} {item.unit}
                  </span>
                </span>
                <ChevronRight className="h-4 w-4 shrink-0 text-subtle" />
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
