"use client";

import { useState } from "react";
import { Bell, Lock, Receipt, Globe } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { cn } from "@/lib/utils";

interface SettingItem {
  key: string;
  label: string;
  description: string;
  defaultOn: boolean;
}

const groups: { title: string; icon: React.ElementType; items: SettingItem[] }[] = [
  {
    title: "Notifications",
    icon: Bell,
    items: [
      { key: "low-stock-alerts", label: "Low stock alerts", description: "Notify when inventory falls below minimum threshold.", defaultOn: true },
      { key: "expiry-alerts", label: "Expiry alerts", description: "Notify 60 days before a batch expires.", defaultOn: true },
      { key: "daily-summary", label: "Daily sales summary", description: "Send an end-of-day summary email to branch managers.", defaultOn: false },
    ],
  },
  {
    title: "Security",
    icon: Lock,
    items: [
      { key: "two-factor", label: "Require two-factor authentication", description: "Require all staff to enable 2FA on login.", defaultOn: false },
      { key: "session-timeout", label: "Auto-lock idle sessions", description: "Lock the screen after 15 minutes of inactivity.", defaultOn: true },
    ],
  },
  {
    title: "Sales & Billing",
    icon: Receipt,
    items: [
      { key: "require-patient", label: "Require patient record for Rx sales", description: "Block checkout on prescription items without a linked patient.", defaultOn: true },
      { key: "auto-print-receipt", label: "Auto-print receipts", description: "Print a receipt automatically after every completed sale.", defaultOn: false },
    ],
  },
  {
    title: "Regional",
    icon: Globe,
    items: [
      { key: "gh-cedis", label: "Display prices in GH₵", description: "Show all prices in Ghana cedis across the app.", defaultOn: true },
    ],
  },
];

export default function SettingsPage() {
  const [values, setValues] = useState<Record<string, boolean>>(
    Object.fromEntries(groups.flatMap((g) => g.items.map((i) => [i.key, i.defaultOn])))
  );

  return (
    <div>
      <PageHeader title="Settings" subtitle="Configure application-wide behavior" />

      <div className="space-y-6 px-6 py-5">
        {groups.map((group) => (
          <div key={group.title} className="rounded-lg border border-border bg-surface">
            <div className="flex items-center gap-2 border-b border-border px-4 py-3">
              <group.icon className="h-4 w-4 text-subtle" />
              <h2 className="text-sm font-semibold text-foreground">{group.title}</h2>
            </div>
            <div className="divide-y divide-border">
              {group.items.map((item) => (
                <div key={item.key} className="flex items-center justify-between gap-4 px-4 py-3.5">
                  <div>
                    <p className="text-sm font-medium text-foreground">{item.label}</p>
                    <p className="text-xs text-subtle">{item.description}</p>
                  </div>
                  <button
                    onClick={() => setValues((v) => ({ ...v, [item.key]: !v[item.key] }))}
                    className={cn(
                      "relative h-6 w-11 shrink-0 rounded-full transition-colors",
                      values[item.key] ? "bg-primary-600" : "bg-gray-300"
                    )}
                    aria-pressed={values[item.key]}
                  >
                    <span
                      className={cn(
                        "absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform",
                        values[item.key] ? "translate-x-[22px]" : "translate-x-0.5"
                      )}
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
