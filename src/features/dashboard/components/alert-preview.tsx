import Link from "next/link";
import { AlertTriangle, AlertOctagon, Info, ChevronRight } from "lucide-react";
import { mockAlerts } from "@/lib/mock-data";
import { cn, formatDateTime } from "@/lib/utils";
import type { AlertSeverity } from "@/types/domain";

const severityConfig: Record<AlertSeverity, { icon: typeof AlertTriangle; className: string }> = {
  critical: { icon: AlertOctagon, className: "bg-danger-50 text-danger-500" },
  warning: { icon: AlertTriangle, className: "bg-warning-50 text-warning-500" },
  information: { icon: Info, className: "bg-info-50 text-info-500" },
  success: { icon: Info, className: "bg-success-50 text-success-500" },
};

export function AlertPreview() {
  return (
    <div className="rounded-lg border border-border bg-surface shadow-xs">
      <div className="flex items-center justify-between border-b border-border px-5 py-3.5">
        <h2 className="text-sm font-semibold text-foreground">Alerts</h2>
        <Link href="/notifications/alerts" className="text-xs font-medium text-primary-600 hover:underline">
          View all
        </Link>
      </div>
      <ul className="divide-y divide-border">
        {mockAlerts.slice(0, 4).map((a) => {
          const cfg = severityConfig[a.severity];
          const Icon = cfg.icon;
          return (
            <li key={a.id} className="flex items-start gap-3 px-5 py-3">
              <span className={cn("mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-md", cfg.className)}>
                <Icon className="h-3.5 w-3.5" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium leading-snug text-foreground">{a.title}</p>
                <p className="mt-0.5 text-xs text-subtle">
                  {a.module} · {formatDateTime(a.timestamp)}
                </p>
              </div>
              {a.actionLabel && (
                <button className="flex shrink-0 items-center gap-0.5 self-center text-xs font-medium text-primary-600 hover:underline">
                  {a.actionLabel}
                  <ChevronRight className="h-3 w-3" />
                </button>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
