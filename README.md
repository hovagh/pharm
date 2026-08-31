# HovaPharm

A modern pharmacy operations platform — frontend. Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4, TanStack Query/Table, React Hook Form + Zod, Recharts.

This build follows the phased plan in the project brief. **Phase 1 is complete**: architecture, design token system, global app shell, navigation, command palette, and the dashboard. Phase 2 has a reference module (Inventory) built end-to-end on the reusable table system so the pattern is easy to repeat for POS, Prescriptions, Patients, Procurement, Finance, and the rest.

## Getting started

\`\`\`bash
npm install
npm run dev
\`\`\`

Open http://localhost:3000 — it redirects to \`/dashboard\`.

> **Fonts:** \`src/app/layout.tsx\` currently uses the system font stack because this was built in a sandbox with no access to \`fonts.googleapis.com\`. Once you have normal network access, uncomment the \`next/font/google\` block at the top of that file to restore Inter / IBM Plex Mono — everything else (type scale, tokens) already assumes them.

## What's implemented

**Design system** (\`src/app/globals.css\`, \`src/components/ui\`)
- Full token system: background/surface/border/foreground scales, primary (healthcare green), secondary (clinical navy), success/warning/danger/info semantics, neutral grays, radius, shadow scale — all as CSS variables feeding Tailwind v4's \`@theme\`.
- Primitives: Button, Card, Badge, StatusBadge (color + label + dot, never color alone).
- Shared states every screen needs: \`EmptyState\`, \`ErrorState\`, \`PermissionDenied\`, \`Skeleton\`/\`TableSkeleton\`.
- Reusable \`DataTable\` on TanStack Table: sorting, pagination, sticky header, empty-state slot.

**Shell** (\`src/components/layout\`)
- Persistent sidebar with the full section/route map from the brief, collapse + mobile drawer, active-route indicator, keyboard-accessible links.
- Global header: org/branch switcher, global search entry point, notifications, user identity.
- Command palette (⌘K / Ctrl+K): searches medicines, patients, prescriptions, purchase orders, pages, and actions, with arrow-key navigation.

**Dashboard** (\`src/features/dashboard\`)
- Greeting header with branch + date-range selectors.
- Key metrics (revenue, transactions, prescriptions, gross profit) with day-over-day deltas.
- Action Required panel (critical stock, expiring soon, pending prescriptions, pending POs).
- Sales performance chart (today vs. yesterday, Recharts).
- Inventory health breakdown, alert preview, recent activity timeline.

**Inventory** (\`src/app/(app)/inventory\`)
- Search + status filter chips + reusable data table showing batch-aware stock, expiry, margin, and \`StatusBadge\`. This is the pattern to copy for the other list screens (Prescriptions, Patients, Purchase Orders, Suppliers, etc.).

**Login** (\`src/app/login\`) — restrained, no marketing chrome, security messaging per the brief.

## Architecture

\`\`\`
src/
  app/            App Router routes. (app)/ is the authenticated shell group.
  components/
    ui/           Design-system primitives (Button, Card, Badge…)
    layout/       Sidebar, Header, CommandPalette, AppShell
    shared/       Cross-feature UI (DataTable, StatusBadge, EmptyState…)
  features/       One folder per module (dashboard, pos, inventory, …),
                  each with its own components/ subfolder.
  services/       Typed API boundary — one file per resource. No database
                  access from the frontend, ever (see section 39 of the brief).
  lib/mock-data/  Realistic seed data for frontend development, kept
                  strictly separate from services/.
  types/          Shared domain types.
  config/         navigation.ts (single source of truth for the sidebar),
                  env.ts (API base URL — never hardcode secrets here).
\`\`\`

Frontend → API layer → auth → authorization → backend business logic → database. The frontend never talks to a database directly, and frontend permission checks are UX only — the backend is the real authorization boundary.

## Next steps (Phase 2 onward)

Each remaining module follows the Inventory pattern:
1. Add types to \`src/types/domain.ts\` if needed (most already exist).
2. Add/extend mock data in \`src/lib/mock-data\`.
3. Build the service file in \`src/services\` (already scaffolded).
4. Build the feature UI in \`src/features/<module>/components\`.
5. Wire the route in \`src/app/(app)/<module>/page.tsx\`.

Priority order (per the brief): POS → Medicine catalog/detail → Batches → Prescriptions/Dispensing → Patients → Suppliers/Procurement/Goods receiving/Transfers → Finance/Reports/Analytics → Staff/Roles/Branches/Org settings/Audit → Notification center/Integrations.
