"use client";

import { useMemo, useState } from "react";
import { Search, Clock3, Flame, User2 } from "lucide-react";
import { EmptyState } from "@/components/shared/empty-state";
import { PageHeader } from "@/components/shared/page-header";
import { StatCard } from "@/components/shared/stat-card";
import { mockDispensingQueue } from "@/lib/mock-data";
import { cn, formatDateTime } from "@/lib/utils";
import type { DispensingStatus, DispensingTask } from "@/types/domain";

const COLUMNS: { status: DispensingStatus; label: string }[] = [
  { status: "queued", label: "Queued" },
  { status: "in-progress", label: "In Progress" },
  { status: "on-hold", label: "On Hold" },
  { status: "ready", label: "Ready for Pickup" },
  { status: "completed", label: "Completed" },
];

export default function DispensingPage() {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    if (!query) return mockDispensingQueue;
    return mockDispensingQueue.filter(
      (t) =>
        t.patientName.toLowerCase().includes(query.toLowerCase()) ||
        t.prescriptionNumber.toLowerCase().includes(query.toLowerCase())
    );
  }, [query]);

  const stats = useMemo(() => {
    const active = mockDispensingQueue.filter((t) => t.status === "queued" || t.status === "in-progress").length;
    const urgent = mockDispensingQueue.filter((t) => t.priority === "urgent").length;
    const ready = mockDispensingQueue.filter((t) => t.status === "ready").length;
    return { active, urgent, ready };
  }, []);

  return (
    <div>
      <PageHeader title="Dispensing Queue" subtitle={`${mockDispensingQueue.length} prescriptions moving through dispensing`} />

      <div className="grid grid-cols-3 gap-4 px-6 pt-5">
        <StatCard label="Active" value={stats.active} icon={Clock3} tone="bg-info-50 text-info-text" />
        <StatCard label="Urgent" value={stats.urgent} icon={Flame} tone="bg-danger-50 text-danger-text" />
        <StatCard label="Ready for Pickup" value={stats.ready} icon={User2} tone="bg-success-50 text-success-text" />
      </div>

      <div className="px-6 py-5">
        <div className="relative mb-4 max-w-xs">
          <Search className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-subtle" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search patient or Rx number…"
            className="h-9 w-full rounded-md border border-border-strong bg-surface pl-8 pr-3 text-sm placeholder:text-subtle focus:outline-none"
          />
        </div>

        {filtered.length === 0 ? (
          <EmptyState icon={Search} title="No matching tasks" description="Try a different search term." />
        ) : (
          <div className="grid grid-cols-1 gap-4 overflow-x-auto pb-2 sm:grid-cols-2 lg:grid-cols-5">
            {COLUMNS.map((col) => {
              const tasks = filtered.filter((t) => t.status === col.status);
              return (
                <div key={col.status} className="min-w-[220px] rounded-lg border border-border bg-surface-sunken">
                  <div className="flex items-center justify-between border-b border-border px-3 py-2.5">
                    <span className="text-xs font-semibold text-foreground">{col.label}</span>
                    <span className="rounded-full bg-surface px-1.5 py-0.5 text-[11px] font-medium text-subtle">
                      {tasks.length}
                    </span>
                  </div>
                  <div className="space-y-2 p-2">
                    {tasks.length === 0 ? (
                      <p className="px-2 py-4 text-center text-[11px] text-subtle">Nothing here</p>
                    ) : (
                      tasks.map((t) => <TaskCard key={t.id} task={t} />)
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

function TaskCard({ task }: { task: DispensingTask }) {
  return (
    <div className="rounded-lg border border-border bg-surface p-3 shadow-xs">
      <div className="mb-1.5 flex items-start justify-between gap-2">
        <span className="font-mono text-xs font-medium text-foreground">{task.prescriptionNumber}</span>
        {task.priority === "urgent" && (
          <span className="rounded-full bg-danger-50 px-1.5 py-0.5 text-[10px] font-semibold text-danger-text">
            Urgent
          </span>
        )}
      </div>
      <p className="text-sm font-medium text-foreground">{task.patientName}</p>
      <p className="mt-0.5 text-xs text-subtle">
        {task.itemCount} item{task.itemCount !== 1 ? "s" : ""} · {task.assignedTo}
      </p>
      <p className={cn("mt-2 text-[11px] text-subtle")}>{formatDateTime(task.queuedAt)}</p>
    </div>
  );
}
