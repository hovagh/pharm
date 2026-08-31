"use client";

import { useMemo, useState } from "react";
import { Search, Activity as ActivityIcon } from "lucide-react";
import { EmptyState } from "@/components/shared/empty-state";
import { PageHeader } from "@/components/shared/page-header";
import { mockActivity } from "@/lib/mock-data";
import { formatDateTime } from "@/lib/utils";

export default function AuditActivityPage() {
  const [query, setQuery] = useState("");

  const sorted = useMemo(
    () => [...mockActivity].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()),
    []
  );

  const filtered = useMemo(() => {
    if (!query) return sorted;
    return sorted.filter(
      (e) =>
        e.actorName.toLowerCase().includes(query.toLowerCase()) ||
        e.action.toLowerCase().includes(query.toLowerCase()) ||
        e.target.toLowerCase().includes(query.toLowerCase())
    );
  }, [sorted, query]);

  return (
    <div>
      <PageHeader title="Activity Log" subtitle={`${mockActivity.length} actions recorded across the organization`} />

      <div className="px-6 py-5">
        <div className="relative mb-4 max-w-xs">
          <Search className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-subtle" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search actor, action, or target…"
            className="h-9 w-full rounded-md border border-border-strong bg-surface pl-8 pr-3 text-sm placeholder:text-subtle focus:outline-none"
          />
        </div>

        {filtered.length === 0 ? (
          <EmptyState icon={ActivityIcon} title="No activity found" description="Try a different search term." />
        ) : (
          <div className="divide-y divide-border rounded-lg border border-border bg-surface">
            {filtered.map((e) => (
              <div key={e.id} className="flex items-start gap-3 px-4 py-3.5">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary-50 text-xs font-semibold text-primary-700">
                  {e.actorName
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .slice(0, 2)}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm text-foreground">
                    <span className="font-medium">{e.actorName}</span>{" "}
                    <span className="text-subtle">({e.actorRole})</span> {e.action.toLowerCase()}
                  </p>
                  <p className="text-xs text-muted">{e.target}</p>
                  {e.detail && <p className="text-xs text-subtle">{e.detail}</p>}
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
