"use client";

import { useMemo } from "react";
import { ShieldAlert, ShieldCheck, ShieldQuestion } from "lucide-react";
import { EmptyState } from "@/components/shared/empty-state";
import { PageHeader } from "@/components/shared/page-header";
import { StatCard } from "@/components/shared/stat-card";
import { SeverityIcon } from "@/components/shared/severity-badge";
import { mockSecurityEvents } from "@/lib/mock-data";
import { formatDateTime } from "@/lib/utils";

const typeLabel: Record<string, string> = {
  "login-failed": "Failed login",
  "login-success": "Successful login",
  "permission-change": "Permission change",
  "password-reset": "Password reset",
  "suspicious-activity": "Suspicious activity",
};

export default function AuditSecurityPage() {
  const sorted = useMemo(
    () => [...mockSecurityEvents].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()),
    []
  );

  const stats = useMemo(() => {
    const critical = mockSecurityEvents.filter((e) => e.severity === "critical").length;
    const warning = mockSecurityEvents.filter((e) => e.severity === "warning").length;
    const info = mockSecurityEvents.filter((e) => e.severity === "information").length;
    return { critical, warning, info };
  }, []);

  return (
    <div>
      <PageHeader title="Security" subtitle={`${mockSecurityEvents.length} security events logged`} />

      <div className="grid grid-cols-3 gap-4 px-6 pt-5">
        <StatCard label="Critical" value={stats.critical} icon={ShieldAlert} tone="bg-danger-50 text-danger-500" />
        <StatCard label="Warnings" value={stats.warning} icon={ShieldQuestion} tone="bg-warning-50 text-warning-500" />
        <StatCard label="Informational" value={stats.info} icon={ShieldCheck} tone="bg-info-50 text-info-500" />
      </div>

      <div className="px-6 py-5">
        {sorted.length === 0 ? (
          <EmptyState icon={ShieldCheck} title="No security events" description="Security-relevant events will be logged here." />
        ) : (
          <div className="divide-y divide-border rounded-lg border border-border bg-surface">
            {sorted.map((e) => (
              <div key={e.id} className="flex items-start gap-3 px-4 py-3.5">
                <SeverityIcon severity={e.severity} />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-foreground">{typeLabel[e.type] ?? e.type}</p>
                  <p className="text-xs text-muted">{e.detail}</p>
                  <p className="text-xs text-subtle">
                    {e.actorName} · {e.ipAddress}
                  </p>
                </div>
                <span className="shrink-0 text-xs tabular-nums text-subtle">{formatDateTime(e.timestamp)}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
