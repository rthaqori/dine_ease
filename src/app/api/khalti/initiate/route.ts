import { NextResponse } from "next/server";

export async function POST(req: Request) {
  console.log("🚀 Khalti payment initiation started");

  try {
    // 1. Parse request body
    const body = await req.json();
    const {
      amount, // In NPR (will convert to paisa)
      purchase_order_id, // Your unique order ID
      purchase_order_name, // Product name
      customer_info, // Optional customer details
      return_url, // Where to redirect after payment
      website_url, // Your website URL
      amount_breakdown, // Optional amount breakdown
      product_details, // Optional product details
      merchant_extra, // Optional merchant data
    } = body;

    console.log("📦 Request data:", {
      amount,
      purchase_order_id,
      purchase_order_name,
    });

    // 2. Validate required fields (per docs)
    if (!amount) {
      return NextResponse.json(
        {
          error_key: "validation_error",
          detail: "amount is required",
        },
        { status: 400 },
      );
    }
    if (!purchase_order_id) {
      return NextResponse.json(
        {
          error_key: "validation_error",
          detail: "purchase_order_id is required",
        },
        { status: 400 },
      );
    }
    if (!purchase_order_name) {
      return NextResponse.json(
        {
          error_key: "validation_error",
          detail: "purchase_order_name is required",
        },
        { status: 400 },
      );
    }

    // 3. Check secret key
    const secretKey = process.env.KHALTI_SECRET_KEY;
    if (!secretKey) {
      console.error("❌ KHALTI_SECRET_KEY not found");
      return NextResponse.json(
        {
          error_key: "configuration_error",
          detail: "Khalti secret key not configured",
        },
        { status: 500 },
      );
    }

    // 4. Validate secret key format (per docs)
    // if (
    //   !secretKey.startsWith("test_secret_key_") &&
    //   !secretKey.startsWith("live_secret_key_")
    // ) {
    //   console.error("❌ Invalid secret key format");
    //   return NextResponse.json(
    //     {
    //       error_key: "authentication_error",
    //       detail:
    //         "Invalid secret key format. Key should start with test_secret_key_ or live_secret_key_",
    //     },
    //     { status: 401 },
    //   );
    // }

    // 5. Convert amount to paisa (CRITICAL: per docs)
    const amountInPaisa = Math.round(Number(amount) * 100);

    // Validate minimum amount (Rs 10 = 1000 paisa)
    if (amountInPaisa < 1000) {
      return NextResponse.json(
        {
          error_key: "validation_error",
          detail: "Amount must be at least NPR 10 (1000 paisa)",
        },
        { status: 400 },
      );
    }

    // 6. Build request payload exactly as per docs
    const khaltiPayload: any = {
      return_url:
        return_url || `${process.env.NEXT_PUBLIC_APP_URL}/api/khalti/verify`,
      website_url: website_url || process.env.NEXT_PUBLIC_APP_URL!,
      amount: amountInPaisa,
      purchase_order_id: purchase_order_id,
      purchase_order_name: purchase_order_name,
    };

    // Add optional fields if provided (per docs)
    if (customer_info) {
      khaltiPayload.customer_info = customer_info;
    }
    if (amount_breakdown) {
      khaltiPayload.amount_breakdown = amount_breakdown;
    }
    if (product_details) {
      khaltiPayload.product_details = product_details;
    }
    if (merchant_extra) {
      khaltiPayload.merchant_extra = merchant_extra;
    }

    console.log(
      "📤 Sending to Khalti:",
      JSON.stringify(khaltiPayload, null, 2),
    );

    // 7. Make API call to Khalti (per docs: /epayment/initiate/)
    const response = await fetch(
      "https://dev.khalti.com/api/v2/epayment/initiate/",
      {
        method: "POST",
        headers: {
          Authorization: `Key ${secretKey}`, // EXACT format per docs
          "Content-Type": "application/json",
        },
        body: JSON.stringify(khaltiPayload),
      },
    );

    // 8. Get response
    const responseText = await response.text();
    console.log("📥 Khalti raw response:", responseText);

    // 9. Handle non-OK responses (error handling per docs)
    if (!response.ok) {
      let errorData;
      try {
        errorData = JSON.parse(responseText);
      } catch {
        errorData = { detail: responseText };
      }

      console.error("❌ Khalti API error:", errorData);

      // Map error responses as per docs
      return NextResponse.json(
        {
          error_key: errorData.error_key || "api_error",
          detail: errorData.detail || "Khalti API error",
        },
        { status: response.status },
      );
    }

    // 10. Parse success response
    const data = JSON.parse(responseText);
    console.log("✅ Khalti success response:", data);

    // 11. Return payment details as per docs
    return NextResponse.json({
      success: true,
      pidx: data.pidx, // Payment ID for lookup
      payment_url: data.payment_url, // URL to redirect user
      expires_at: data.expires_at, // Link expiry
      expires_in: data.expires_in, // Seconds until expiry
    });
  } catch (error) {
    console.error("💥 Server error:", error);
    return NextResponse.json(
      {
        error_key: "server_error",
        detail:
          error instanceof Error ? error.message : "Internal server error",
      },
      { status: 500 },
    );
  }
}

// GET endpoint for testing (per docs)
export async function GET() {
  const secretKey = process.env.KHALTI_SECRET_KEY;

  return NextResponse.json({
    service: "Khalti Payment API",
    version: "v2",
    endpoints: {
      initiate: "/api/khalti/initiate (POST)",
      verify: "/api/khalti/verify (GET)",
      lookup: "/api/khalti/lookup (POST)",
    },
    configuration: {
      secretKeyExists: !!secretKey,
      secretKeyFormat: secretKey
        ? {
            prefix: secretKey.substring(0, 15),
            isValid:
              secretKey.startsWith("test_secret_key_") ||
              secretKey.startsWith("live_secret_key_"),
            length: secretKey.length,
          }
        : "Not configured",
      apiUrl: "https://dev.khalti.com/api/v2",
      documentation: "https://docs.khalti.com/khalti-epayment/",
    },
    testCredentials: {
      khaltiIds: [
        "9800000000",
        "9800000001",
        "9800000002",
        "9800000003",
        "9800000004",
        "9800000005",
      ],
      mpin: "1111",
      otp: "987654",
    },
    notes: [
      "Use test_secret_key_ for sandbox",
      "Amount must be in paisa (multiply NPR by 100)",
      'Only status "Completed" should be treated as success',
      "Payment link expires in 60 minutes",
    ],
  });
}
