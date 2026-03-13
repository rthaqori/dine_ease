"use client";

import { KhaltiPaymentButton } from "@/components/buttons/KhaltiPaymentButton";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function PaymentPage() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId") || "cmmolg96h0011x0v450rjg0x9";

  const apiRoutes = [
    "/api/stats/customers/acquisition",
    "/api/stats/dashboard/overview",
    "/api/stats/inventory/stock-levels",
    "/api/stats/menu/category-performance",
    "/api/stats/menu/top-items",
    "/api/stats/orders/status-distribution",
    "/api/stats/orders/timeline",
    "/api/stats/orders/type-distribution",
    "/api/stats/payments/method-distribution",
    "/api/stats/realtime/current",
    "/api/stats/revenue/daily",
    "/api/stats/revenue/hourly",
    "/api/stats/revenue/monthly",
    "/api/stats/staff/performance",
    "/api/stats/tables/occupancy",
  ];

  async function fetchAllStats() {
    const results = await Promise.all(
      apiRoutes.map(async (route) => {
        try {
          const res = await fetch(route);
          const data = await res.json();
          return { route, data };
        } catch (error) {
          return { route, error };
        }
      }),
    );

    results.forEach((result) => {
      console.log("📊", result.route);
      console.log(result.data || result.error);
    });
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <h1 className="text-2xl font-bold mb-6">Complete Payment</h1>

        <div className="mb-6">
          <p className="text-sm text-gray-600">Order ID:</p>
          <p className="font-mono text-sm bg-gray-100 p-2 rounded">{orderId}</p>
        </div>

        <KhaltiPaymentButton orderId={orderId} />
      </div>
      <Button onClick={() => fetchAllStats()}>Fetch Data</Button>
    </div>
  );
}
