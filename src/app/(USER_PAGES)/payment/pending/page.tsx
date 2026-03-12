"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useEffect } from "react";

export default function PaymentPendingPage() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");

  useEffect(() => {
    // Auto-check status every 5 seconds
    const interval = setInterval(async () => {
      // You could implement auto-check here
      console.log("Checking payment status...");
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-8">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-10 h-10 text-yellow-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-yellow-600 mb-2">
            Payment Pending
          </h1>
          <p className="text-gray-600">Your payment is being processed</p>
        </div>

        <div className="bg-gray-50 rounded-lg p-4 mb-8 text-center">
          <p className="text-sm text-gray-600">
            Order ID: <span className="font-mono font-medium">{orderId}</span>
          </p>
          <p className="text-xs text-gray-500 mt-2">
            As per Khalti docs: For pending status, hold and contact Khalti team
          </p>
        </div>

        <Link href="/" className="block">
          <button className="w-full bg-purple-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-purple-700">
            Go Home
          </button>
        </Link>
      </div>
    </div>
  );
}
