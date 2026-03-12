"use client";

import { useState } from "react";

export default function PaymentPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Product data
  const product = {
    id: "PROD-001",
    name: "Premium Package",
    price: 100, // NPR 100
    description: "Access to all premium features",
  };

  const handlePayment = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Generate unique order ID as per docs
      const purchase_order_id = `ORDER-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

      console.log("📤 Initiating payment for order:", purchase_order_id);

      // Call initiate API
      const response = await fetch("/api/khalti/initiate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: product.price,
          purchase_order_id: purchase_order_id,
          purchase_order_name: product.name,
          // Optional customer info (per docs)
          customer_info: {
            name: "Test User",
            email: "test@example.com",
            phone: "9800000000",
          },
          // Optional return_url (defaults to our verify endpoint)
          // return_url: `${window.location.origin}/api/khalti/verify`,
          // Optional website_url (defaults to app URL)
          // website_url: window.location.origin,
        }),
      });

      const data = await response.json();

      // Handle error responses
      if (!response.ok) {
        throw new Error(
          data.detail || data.error_key || "Payment initiation failed",
        );
      }

      console.log("✅ Payment initiated:", data);

      // Redirect to Khalti payment page (per docs)
      if (data.payment_url) {
        window.location.href = data.payment_url;
      } else {
        throw new Error("No payment URL received");
      }
    } catch (err) {
      console.error("💥 Error:", err);
      setError(err instanceof Error ? err.message : "Payment failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Khalti Payment
        </h1>

        {/* Product Card */}
        <div className="bg-purple-50 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-purple-900 mb-2">
            {product.name}
          </h2>
          <p className="text-gray-600 mb-4">{product.description}</p>
          <div className="text-3xl font-bold text-purple-600">
            NPR {product.price}
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg mb-6">
            <p className="font-medium">Error</p>
            <p className="text-sm">{error}</p>
          </div>
        )}

        {/* Pay Button */}
        <button
          onClick={handlePayment}
          disabled={isLoading}
          className="w-full bg-purple-600 text-white py-4 px-6 rounded-lg font-semibold text-lg hover:bg-purple-700 transition-colors disabled:bg-gray-400"
        >
          {isLoading ? "Processing..." : `Pay NPR ${product.price}`}
        </button>

        {/* Test Credentials (per docs) */}
        <div className="mt-8 p-4 bg-gray-50 rounded-lg border">
          <h3 className="font-semibold text-gray-700 mb-2">Test Credentials</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>
              📱 Khalti IDs: 9800000000, 9800000001, 9800000002, 9800000003,
              9800000004, 9800000005
            </li>
            <li>🔑 MPIN: 1111</li>
            <li>🔢 OTP: 987654</li>
          </ul>
          <p className="text-xs text-gray-500 mt-2">
            Use these on the Khalti payment page
          </p>
        </div>

        {/* API Info */}
        <div className="mt-4 text-xs text-gray-400 text-center">
          <p>Using Khalti Payment Gateway v2</p>
          <p>Payment link expires in 60 minutes</p>
        </div>
      </div>
    </div>
  );
}
