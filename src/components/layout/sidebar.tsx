"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronsLeft, ChevronsRight } from "lucide-react";
import { BrandMark } from "@/components/shared/brand-mark";
import { navSections } from "@/config/navigation";
import { cn } from "@/lib/utils";
import { useSidebar } from "./sidebar-context";

export function Sidebar() {
  const pathname = usePathname();
  const { collapsed, toggle, mobileOpen, closeMobile } = useSidebar();

  return (
    <>
      {/* Mobile scrim */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={closeMobile}
          aria-hidden
        />
      )}

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex flex-col bg-sidebar-bg text-sidebar-fg transition-all duration-200 ease-out",
          "lg:sticky lg:top-0 lg:h-screen lg:translate-x-0",
          collapsed ? "lg:w-[68px]" : "lg:w-[248px]",
          mobileOpen ? "translate-x-0 w-[248px]" : "-translate-x-full w-[248px] lg:translate-x-0"
        )}
        aria-label="Primary navigation"
      >
        {/* Brand */}
        <div className="flex h-14 items-center justify-between border-b border-sidebar-border px-4">
          <Link href="/dashboard" className="flex items-center gap-2 overflow-hidden">
            <BrandMark className="h-7 w-7 shrink-0" />
            {!collapsed && (
              <span className="truncate text-[15px] font-semibold tracking-tight text-white">
                Hova<span className="text-primary-300">Pharm</span>
              </span>
            )}
          </Link>
          <button
            onClick={closeMobile}
            className="rounded-md p-1 text-sidebar-fg-muted hover:bg-sidebar-active-bg lg:hidden"
            aria-label="Close navigation"
          >
            <ChevronsLeft className="h-4 w-4" />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto px-2.5 py-3">
          {navSections.map((section, si) => (
            <div key={si} className={cn(si > 0 && "mt-4")}>
              {section.label && !collapsed && (
                <p className="px-2.5 pb-1.5 text-[10.5px] font-semibold uppercase tracking-wider text-sidebar-fg-muted">
                  {section.label}
                </p>
              )}
              <ul className="space-y-0.5">
                {section.items.map((item) => {
                  const active = pathname === item.href || pathname.startsWith(item.href + "/");
                  const Icon = item.icon;
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={closeMobile}
                        title={collapsed ? item.label : undefined}
                        className={cn(
                          "group relative flex items-center gap-2.5 rounded-md px-2.5 py-1.5 text-[13px] font-medium transition-colors",
                          active
                            ? "bg-sidebar-active-bg text-sidebar-active-fg"
                            : "text-sidebar-fg hover:bg-sidebar-active-bg/60 hover:text-sidebar-active-fg"
                        )}
                      >
                        {active && (
                          <span className="absolute left-0 top-1/2 h-4 w-0.5 -translate-y-1/2 rounded-full bg-primary-400" />
                        )}
                        <Icon className="h-[17px] w-[17px] shrink-0" strokeWidth={1.8} />
                        {!collapsed && <span className="truncate">{item.label}</span>}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>

        {/* Collapse toggle */}
        <div className="hidden border-t border-sidebar-border p-2.5 lg:block">
          <button
            onClick={toggle}
            className="flex w-full items-center gap-2.5 rounded-md px-2.5 py-1.5 text-[13px] font-medium text-sidebar-fg-muted hover:bg-sidebar-active-bg hover:text-sidebar-active-fg"
          >
            {collapsed ? <ChevronsRight className="h-[17px] w-[17px]" /> : <ChevronsLeft className="h-[17px] w-[17px]" />}
            {!collapsed && <span>Collapse</span>}
          </button>
        </div>
      </aside>
    </>
  );
}
