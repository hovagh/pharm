"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { mockBranches, mockCurrentUser } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";

function greeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}

const RANGES = ["Today", "This week", "This month"];

export function DashboardHeader() {
  const [branch, setBranch] = useState(mockBranches[0]);
  const [range, setRange] = useState(RANGES[0]);
  const [branchOpen, setBranchOpen] = useState(false);
  const [rangeOpen, setRangeOpen] = useState(false);

  const today = new Date().toLocaleDateString("en-GB", { weekday: "long", month: "long", day: "numeric" });
  const firstName = mockCurrentUser.name.split(" ")[0];

  return (
    <div className="flex flex-col gap-4 border-b border-border px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-lg font-semibold tracking-tight text-foreground">
          {greeting()}, {firstName}
        </h1>
        <p className="text-sm text-muted">{today}</p>
      </div>

      <div className="flex items-center gap-2">
        <div className="relative">
          <Button variant="secondary" size="sm" onClick={() => setBranchOpen((o) => !o)}>
            {branch.name}
            <ChevronDown className="h-3.5 w-3.5" />
          </Button>
          {branchOpen && (
            <div className="absolute right-0 top-full z-20 mt-1 w-56 rounded-md border border-border bg-surface-elevated py-1 shadow-lg">
              {mockBranches.map((b) => (
                <button
                  key={b.id}
                  onClick={() => {
                    setBranch(b);
                    setBranchOpen(false);
                  }}
                  className="flex w-full items-center justify-between px-3 py-1.5 text-left text-sm hover:bg-gray-50"
                >
                  {b.name}
                  <span className="text-xs text-subtle">{b.city}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="relative">
          <Button variant="secondary" size="sm" onClick={() => setRangeOpen((o) => !o)}>
            {range}
            <ChevronDown className="h-3.5 w-3.5" />
          </Button>
          {rangeOpen && (
            <div className="absolute right-0 top-full z-20 mt-1 w-36 rounded-md border border-border bg-surface-elevated py-1 shadow-lg">
              {RANGES.map((r) => (
                <button
                  key={r}
                  onClick={() => {
                    setRange(r);
                    setRangeOpen(false);
                  }}
                  className="block w-full px-3 py-1.5 text-left text-sm hover:bg-gray-50"
                >
                  {r}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
