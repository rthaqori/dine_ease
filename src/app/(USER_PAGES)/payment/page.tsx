"use client";

import { KhaltiPaymentButton } from "@/components/buttons/KhaltiPaymentButton";
import { useSearchParams } from "next/navigation";

export default function PaymentPage() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId") || "cmmnloyi90000vsv4hj01twak";

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
    </div>
  );
}
