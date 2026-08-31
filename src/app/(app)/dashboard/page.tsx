import { DashboardHeader } from "@/features/dashboard/components/dashboard-header";
import { KeyMetrics } from "@/features/dashboard/components/key-metrics";
import { ActionRequired } from "@/features/dashboard/components/action-required";
import { SalesPerformance } from "@/features/dashboard/components/sales-performance";
import { InventoryHealth } from "@/features/dashboard/components/inventory-health";
import { RecentActivity } from "@/features/dashboard/components/recent-activity";
import { AlertPreview } from "@/features/dashboard/components/alert-preview";

export const metadata = { title: "Dashboard — HovaPharm" };

export default function DashboardPage() {
  return (
    <div>
      <DashboardHeader />

      <div className="space-y-5 px-6 py-5">
        <KeyMetrics />

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <SalesPerformance />
          </div>
          <ActionRequired />
        </div>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
          <InventoryHealth />
          <AlertPreview />
          <RecentActivity />
        </div>
      </div>
    </div>
  );
}
