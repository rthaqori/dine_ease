"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function PaymentFailedPage() {
  const searchParams = useSearchParams();
  const reason = searchParams.get("reason");
  const status = searchParams.get("status");
  const orderId = searchParams.get("orderId");

  const getErrorMessage = () => {
    if (status === "User canceled" || reason === "cancelled") {
      return "You cancelled the payment";
    }
    if (status === "Expired") {
      return "Payment link has expired (60 minute limit)";
    }
    if (reason === "invalid_callback") {
      return "Invalid payment callback received";
    }
    return "Your payment could not be processed";
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-8">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-10 h-10 text-red-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-red-600 mb-2">
            Payment Failed
          </h1>
          <p className="text-gray-600">{getErrorMessage()}</p>
        </div>

        {orderId && (
          <div className="bg-gray-50 rounded-lg p-4 mb-8 text-center">
            <span className="text-gray-600">Order ID: </span>
            <span className="font-mono font-medium">{orderId}</span>
          </div>
        )}

        <div className="flex gap-4">
          <Link href="/payment" className="flex-1">
            <button className="w-full bg-purple-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-purple-700">
              Try Again
            </button>
          </Link>
          <Link href="/" className="flex-1">
            <button className="w-full bg-gray-200 text-gray-800 py-3 px-4 rounded-lg font-semibold hover:bg-gray-300">
              Go Home
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
