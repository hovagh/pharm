import { mockActivity } from "@/lib/mock-data";
import { formatDateTime } from "@/lib/utils";

export function RecentActivity() {
  return (
    <div className="rounded-lg border border-border bg-surface shadow-xs">
      <div className="border-b border-border px-5 py-3.5">
        <h2 className="text-sm font-semibold text-foreground">Recent Activity</h2>
      </div>
      <ol className="px-5 py-4">
        {mockActivity.map((ev, i) => (
          <li key={ev.id} className="relative flex gap-3 pb-5 last:pb-0">
            {i < mockActivity.length - 1 && (
              <span className="absolute left-[5px] top-3 h-full w-px bg-border" aria-hidden />
            )}
            <span className="relative z-10 mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full border-2 border-surface bg-primary-500" />
            <div className="min-w-0 flex-1">
              <p className="text-sm text-foreground">
                <span className="font-medium">{ev.actorName}</span>{" "}
                <span className="text-muted">{ev.action.toLowerCase()}</span>{" "}
                <span className="font-medium">{ev.target}</span>
              </p>
              {ev.detail && <p className="text-xs text-subtle">{ev.detail}</p>}
              <p className="mt-0.5 text-[11px] text-subtle">
                {ev.actorRole} · {formatDateTime(ev.timestamp)}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
