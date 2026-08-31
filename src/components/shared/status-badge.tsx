import { cn } from "@/lib/utils";

type StatusTone = "success" | "warning" | "danger" | "info" | "neutral";

const toneStyles: Record<StatusTone, { bg: string; text: string; dot: string }> = {
  success: { bg: "bg-success-50", text: "text-success-text", dot: "bg-primary-600" },
  warning: { bg: "bg-warning-50", text: "text-warning-text", dot: "bg-warning-500" },
  danger: { bg: "bg-danger-50", text: "text-danger-text", dot: "bg-danger-500" },
  info: { bg: "bg-info-50", text: "text-info-text", dot: "bg-info-500" },
  neutral: { bg: "bg-gray-100", text: "text-gray-700", dot: "bg-gray-400" },
};

// Central status → tone/label mapping. Add new statuses here, not at call sites,
// so labels stay consistent everywhere they're rendered.
const STATUS_MAP: Record<string, { label: string; tone: StatusTone }> = {
  // Stock
  "in-stock": { label: "In Stock", tone: "success" },
  "low-stock": { label: "Low Stock", tone: "warning" },
  "critical": { label: "Critical", tone: "danger" },
  "out-of-stock": { label: "Out of Stock", tone: "danger" },
  "expired": { label: "Expired", tone: "danger" },
  "expiring-soon": { label: "Expiring Soon", tone: "warning" },
  // Prescriptions
  "pending": { label: "Pending", tone: "neutral" },
  "under-review": { label: "Under Review", tone: "info" },
  "approved": { label: "Approved", tone: "success" },
  "partially-dispensed": { label: "Partially Dispensed", tone: "warning" },
  "dispensed": { label: "Dispensed", tone: "success" },
  "rejected": { label: "Rejected", tone: "danger" },
  "cancelled": { label: "Cancelled", tone: "neutral" },
  // Purchase orders
  "draft": { label: "Draft", tone: "neutral" },
  "pending-approval": { label: "Pending Approval", tone: "warning" },
  "ordered": { label: "Ordered", tone: "info" },
  "partially-received": { label: "Partially Received", tone: "warning" },
  "received": { label: "Received", tone: "success" },
  // Dispensing
  "queued": { label: "Queued", tone: "neutral" },
  "in-progress": { label: "In Progress", tone: "info" },
  "ready": { label: "Ready", tone: "success" },
  "completed": { label: "Completed", tone: "success" },
  "on-hold": { label: "On Hold", tone: "warning" },
  // Stock transfers
  "in-transit": { label: "In Transit", tone: "info" },
  // Payments / refunds
  "failed": { label: "Failed", tone: "danger" },
  // Reconciliation
  "open": { label: "Open", tone: "info" },
  "balanced": { label: "Balanced", tone: "success" },
  "variance": { label: "Variance", tone: "danger" },
  // Staff
  "active": { label: "Active", tone: "success" },
  "invited": { label: "Invited", tone: "info" },
  "suspended": { label: "Suspended", tone: "danger" },
};

export function StatusBadge({ status, className }: { status: string; className?: string }) {
  const entry = STATUS_MAP[status] ?? { label: status, tone: "neutral" as StatusTone };
  const t = toneStyles[entry.tone];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-transparent px-2.5 py-0.5 text-xs font-medium",
        t.bg,
        t.text,
        className
      )}
    >
      <span className={cn("h-1.5 w-1.5 rounded-full", t.dot)} aria-hidden />
      {entry.label}
    </span>
  );
}
