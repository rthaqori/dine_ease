// app/dashboard/page.tsx
import { Suspense } from "react";
import { Metadata } from "next";
import { DashboardOverview } from "@/components/dashboard/DashboardOverview";
import { DashboardSkeleton } from "@/components/skeletons/DashboardSkeleton";

export const metadata: Metadata = {
  title: "Dashboard | Restaurant Management",
  description: "Real-time restaurant dashboard with analytics and insights",
};

export default function DashboardPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-muted-foreground">
            Last updated: {new Date().toLocaleTimeString()}
          </span>
        </div>
      </div>

      <Suspense fallback={<DashboardSkeleton />}>
        <DashboardOverview />
      </Suspense>
    </div>
  );
}
