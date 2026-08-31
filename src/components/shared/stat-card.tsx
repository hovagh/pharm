import { cn } from "@/lib/utils";

export function StatCard({
  label,
  value,
  icon: Icon,
  tone = "bg-primary-50 text-primary-700",
  trend,
}: {
  label: string;
  value: string | number;
  icon: React.ElementType;
  tone?: string;
  trend?: { value: string; positive: boolean };
}) {
  return (
    <div className="flex items-center gap-3 rounded-lg border border-border bg-surface p-4">
      <div className={cn("flex h-9 w-9 shrink-0 items-center justify-center rounded-lg", tone)}>
        <Icon className="h-4 w-4" />
      </div>
      <div className="min-w-0">
        <p className="truncate text-xl font-bold text-foreground">{value}</p>
        <div className="flex items-center gap-1.5">
          <p className="text-xs text-subtle">{label}</p>
          {trend && (
            <span className={cn("text-xs font-medium", trend.positive ? "text-success-text" : "text-danger-text")}>
              {trend.value}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
