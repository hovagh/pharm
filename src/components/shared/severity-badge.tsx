import { AlertTriangle, AlertOctagon, Info } from "lucide-react";
import { cn } from "@/lib/utils";
import type { AlertSeverity } from "@/types/domain";

export const severityConfig: Record<AlertSeverity, { icon: typeof AlertTriangle; className: string }> = {
  critical: { icon: AlertOctagon, className: "bg-danger-50 text-danger-500" },
  warning: { icon: AlertTriangle, className: "bg-warning-50 text-warning-500" },
  information: { icon: Info, className: "bg-info-50 text-info-500" },
  success: { icon: Info, className: "bg-success-50 text-success-500" },
};

export function SeverityIcon({ severity, className }: { severity: AlertSeverity; className?: string }) {
  const cfg = severityConfig[severity];
  const Icon = cfg.icon;
  return (
    <span className={cn("flex h-7 w-7 shrink-0 items-center justify-center rounded-md", cfg.className, className)}>
      <Icon className="h-3.5 w-3.5" />
    </span>
  );
}
