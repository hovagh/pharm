"use client";

import { useState } from "react";
import { Menu, Search, Bell, HelpCircle, ChevronDown, Command } from "lucide-react";
import { mockBranches, mockCurrentUser, mockOrganization } from "@/lib/mock-data";
import { useSidebar } from "./sidebar-context";
import { cn } from "@/lib/utils";

export function Header({ onOpenCommandPalette }: { onOpenCommandPalette: () => void }) {
  const { openMobile } = useSidebar();
  const [branch, setBranch] = useState(mockBranches[0]);
  const [branchMenuOpen, setBranchMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b border-border bg-surface/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-surface/80">
      <button
        onClick={openMobile}
        className="rounded-md p-1.5 text-muted hover:bg-gray-100 lg:hidden"
        aria-label="Open navigation"
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* Org / Branch */}
      <div className="relative hidden shrink-0 items-center gap-1.5 sm:flex">
        <button
          onClick={() => setBranchMenuOpen((o) => !o)}
          className="flex items-center gap-1.5 rounded-md px-2 py-1.5 text-sm font-medium text-foreground hover:bg-gray-100"
        >
          <span className="text-subtle font-normal">{mockOrganization.name}</span>
          <span className="text-border-strong">/</span>
          <span>{branch.name}</span>
          <ChevronDown className="h-3.5 w-3.5 text-subtle" />
        </button>
        {branchMenuOpen && (
          <div className="absolute left-0 top-full z-40 mt-1 w-64 rounded-md border border-border bg-surface-elevated py-1 shadow-lg">
            {mockBranches.map((b) => (
              <button
                key={b.id}
                onClick={() => {
                  setBranch(b);
                  setBranchMenuOpen(false);
                }}
                className={cn(
                  "flex w-full items-center justify-between px-3 py-2 text-left text-sm hover:bg-gray-50",
                  b.id === branch.id && "text-primary-600 font-medium"
                )}
              >
                <span>{b.name}</span>
                <span className="text-xs text-subtle">{b.city}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Search / command palette trigger */}
      <div className="flex-1">
        <button
          onClick={onOpenCommandPalette}
          className="flex h-9 w-full max-w-md items-center gap-2 rounded-md border border-border bg-surface-sunken px-3 text-sm text-subtle hover:border-border-strong"
        >
          <Search className="h-4 w-4 shrink-0" />
          <span className="flex-1 text-left">Search medicines, patients, prescriptions…</span>
          <kbd className="hidden items-center gap-0.5 rounded border border-border-strong bg-surface px-1.5 py-0.5 text-[10px] font-medium text-subtle sm:flex">
            <Command className="h-2.5 w-2.5" />K
          </kbd>
        </button>
      </div>

      {/* Right cluster */}
      <div className="flex items-center gap-1">
        <button className="rounded-md p-2 text-muted hover:bg-gray-100" aria-label="Help">
          <HelpCircle className="h-[18px] w-[18px]" />
        </button>
        <button className="relative rounded-md p-2 text-muted hover:bg-gray-100" aria-label="Notifications">
          <Bell className="h-[18px] w-[18px]" />
          <span className="absolute right-1.5 top-1.5 flex h-3.5 min-w-3.5 items-center justify-center rounded-full bg-danger-500 px-0.5 text-[9px] font-semibold text-white">
            3
          </span>
        </button>
        <div className="ml-1 flex items-center gap-2 border-l border-border pl-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-100 text-xs font-semibold text-success-text">
            {mockCurrentUser.avatarInitials}
          </div>
          <div className="hidden leading-tight sm:block">
            <p className="text-[13px] font-medium text-foreground">{mockCurrentUser.name}</p>
            <p className="text-[11px] capitalize text-subtle">{mockCurrentUser.role.replace("-", " ")}</p>
          </div>
        </div>
      </div>
    </header>
  );
}
