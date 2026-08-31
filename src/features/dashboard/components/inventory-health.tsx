const breakdown = [
  { label: "Healthy", count: 486, tone: "bg-primary-500" },
  { label: "Low Stock", count: 34, tone: "bg-warning-500" },
  { label: "Critical", count: 8, tone: "bg-danger-500" },
  { label: "Expiring Soon", count: 12, tone: "bg-warning-400" },
  { label: "Expired", count: 3, tone: "bg-danger-600" },
] as const;

const total = breakdown.reduce((s, b) => s + b.count, 0);

export function InventoryHealth() {
  return (
    <div className="rounded-lg border border-border bg-surface shadow-xs">
      <div className="border-b border-border px-5 py-3.5">
        <h2 className="text-sm font-semibold text-foreground">Inventory Health</h2>
        <p className="text-xs text-subtle">{total} SKUs across Accra Central Pharmacy</p>
      </div>
      <div className="px-5 py-4">
        <div className="flex h-2 w-full overflow-hidden rounded-full bg-gray-100">
          {breakdown.map((b) => (
            <div key={b.label} className={b.tone} style={{ width: `${(b.count / total) * 100}%` }} />
          ))}
        </div>
        <ul className="mt-4 space-y-2.5">
          {breakdown.map((b) => (
            <li key={b.label} className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-2 text-foreground">
                <span className={`h-2 w-2 rounded-full ${b.tone}`} />
                {b.label}
              </span>
              <span className="tabular-nums font-medium text-foreground">{b.count}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
