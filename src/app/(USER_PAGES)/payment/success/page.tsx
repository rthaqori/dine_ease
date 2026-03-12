"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams();
  const [payment, setPayment] = useState({
    orderId: searchParams.get("orderId") || "",
    transactionId: searchParams.get("transactionId") || "",
    amount: searchParams.get("amount") || "0",
    pidx: searchParams.get("pidx") || "",
  });

  useEffect(() => {
    console.log("✅ Payment success:", payment);
    // Optional: Call lookup API for final verification
    const verifyWithLookup = async () => {
      if (payment.pidx) {
        try {
          const response = await fetch("/api/khalti/lookup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ pidx: payment.pidx }),
          });
          const data = await response.json();
          console.log("🔍 Lookup verification:", data);
        } catch (error) {
          console.error("Lookup error:", error);
        }
      }
    };
    verifyWithLookup();
  }, [payment]);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-8">
        {/* Success Icon */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-10 h-10 text-green-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              ></path>
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-green-600 mb-2">
            Payment Successful!
          </h1>
          <p className="text-gray-600">Your transaction has been completed</p>
        </div>

        {/* Payment Details */}
        <div className="bg-gray-50 rounded-lg p-6 mb-8 space-y-3">
          <div className="flex justify-between border-b pb-2">
            <span className="text-gray-600">Order ID:</span>
            <span className="font-mono font-medium">{payment.orderId}</span>
          </div>
          <div className="flex justify-between border-b pb-2">
            <span className="text-gray-600">Transaction ID:</span>
            <span className="font-mono font-medium">
              {payment.transactionId}
            </span>
          </div>
          <div className="flex justify-between pt-2">
            <span className="text-lg font-semibold">Amount Paid:</span>
            <span className="text-2xl font-bold text-purple-600">
              NPR {payment.amount}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <Link href="/orders" className="flex-1">
            <button className="w-full bg-gray-200 text-gray-800 py-3 px-4 rounded-lg font-semibold hover:bg-gray-300">
              View Orders
            </button>
          </Link>
          <Link href="/" className="flex-1">
            <button className="w-full bg-purple-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-purple-700">
              Continue Shopping
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
