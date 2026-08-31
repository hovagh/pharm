import type { LucideIcon } from "lucide-react";
import {
  LayoutDashboard,
  ShoppingCart,
  FileText,
  Pill,
  Boxes,
  Package,
  CalendarClock,
  ArrowLeftRight,
  SlidersHorizontal,
  Truck,
  ClipboardList,
  PackageCheck,
  History,
  Users,
  UserSquare2,
  Wallet,
  Receipt,
  CreditCard,
  Undo2,
  Scale,
  BarChart3,
  LineChart,
  PieChart,
  TrendingUp,
  ShieldCheck,
  UserCog,
  KeyRound,
  Building2,
  Settings,
  ScrollText,
  ShieldAlert,
} from "lucide-react";

export interface NavLeaf {
  label: string;
  href: string;
  icon: LucideIcon;
}

export interface NavSection {
  label: string;
  items: NavLeaf[];
}

export const navSections: NavSection[] = [
  {
    label: "",
    items: [{ label: "Dashboard", href: "/dashboard", icon: LayoutDashboard }],
  },
  {
    label: "Operations",
    items: [
      { label: "Point of Sale", href: "/pos", icon: ShoppingCart },
      { label: "Prescriptions", href: "/prescriptions", icon: FileText },
      { label: "Dispensing", href: "/dispensing", icon: Pill },
      { label: "Sales", href: "/sales", icon: Receipt },
    ],
  },
  {
    label: "Inventory",
    items: [
      { label: "Inventory", href: "/inventory", icon: Boxes },
      { label: "Medicines", href: "/inventory/medicines", icon: Package },
      { label: "Batches", href: "/inventory/batches", icon: ClipboardList },
      { label: "Expiry", href: "/inventory/expiry", icon: CalendarClock },
      { label: "Stock Transfers", href: "/inventory/transfers", icon: ArrowLeftRight },
      { label: "Stock Adjustments", href: "/inventory/adjustments", icon: SlidersHorizontal },
    ],
  },
  {
    label: "Procurement",
    items: [
      { label: "Suppliers", href: "/procurement/suppliers", icon: Truck },
      { label: "Purchase Orders", href: "/procurement/orders", icon: ClipboardList },
      { label: "Goods Received", href: "/procurement/goods-received", icon: PackageCheck },
      { label: "Purchase History", href: "/procurement/history", icon: History },
    ],
  },
  {
    label: "Patients",
    items: [
      { label: "Patients", href: "/patients", icon: Users },
      { label: "Patient Profiles", href: "/patients/profiles", icon: UserSquare2 },
      { label: "Medication History", href: "/patients/medication-history", icon: History },
      { label: "Prescription History", href: "/patients/prescription-history", icon: FileText },
    ],
  },
  {
    label: "Finance",
    items: [
      { label: "Revenue", href: "/finance/revenue", icon: Wallet },
      { label: "Expenses", href: "/finance/expenses", icon: Receipt },
      { label: "Payments", href: "/finance/payments", icon: CreditCard },
      { label: "Refunds", href: "/finance/refunds", icon: Undo2 },
      { label: "Reconciliation", href: "/finance/reconciliation", icon: Scale },
    ],
  },
  {
    label: "Analytics",
    items: [
      { label: "Overview", href: "/analytics", icon: BarChart3 },
      { label: "Sales Analytics", href: "/analytics/sales", icon: LineChart },
      { label: "Inventory Analytics", href: "/analytics/inventory", icon: PieChart },
      { label: "Profitability", href: "/analytics/profitability", icon: TrendingUp },
      { label: "Procurement Analytics", href: "/analytics/procurement", icon: Truck },
    ],
  },
  {
    label: "Administration",
    items: [
      { label: "Staff", href: "/admin/staff", icon: UserCog },
      { label: "Roles & Permissions", href: "/admin/roles", icon: KeyRound },
      { label: "Branches", href: "/admin/branches", icon: Building2 },
      { label: "Organization", href: "/admin/organization", icon: ShieldCheck },
      { label: "Settings", href: "/admin/settings", icon: Settings },
    ],
  },
  {
    label: "Audit",
    items: [
      { label: "Activity Log", href: "/audit/activity", icon: ScrollText },
      { label: "Security Events", href: "/audit/security", icon: ShieldAlert },
    ],
  },
];
