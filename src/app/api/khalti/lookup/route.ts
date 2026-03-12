import { NextResponse } from "next/server";

export async function POST(req: Request) {
  console.log("🔍 Khalti payment lookup started");

  try {
    // 1. Parse request body
    const body = await req.json();
    const { pidx } = body;

    // 2. Validate required field (per docs)
    if (!pidx) {
      return NextResponse.json(
        {
          error_key: "validation_error",
          detail: "pidx is required",
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

    // 4. Make lookup API call to Khalti (per docs: /epayment/lookup/)
    const response = await fetch(
      "https://dev.khalti.com/api/v2/epayment/lookup/",
      {
        method: "POST",
        headers: {
          Authorization: `Key ${secretKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ pidx }),
      },
    );

    const responseText = await response.text();
    console.log("📥 Lookup response:", responseText);

    if (!response.ok) {
      let errorData;
      try {
        errorData = JSON.parse(responseText);
      } catch {
        errorData = { detail: responseText };
      }

      return NextResponse.json(
        {
          error_key: errorData.error_key || "lookup_error",
          detail: errorData.detail || "Lookup failed",
        },
        { status: response.status },
      );
    }

    // 5. Parse and return lookup data (per docs)
    const data = JSON.parse(responseText);

    // Return full lookup response as per docs
    return NextResponse.json({
      success: true,
      pidx: data.pidx,
      total_amount: data.total_amount, // In paisa
      status: data.status, // Completed, Pending, Expired, etc.
      transaction_id: data.transaction_id,
      fee: data.fee,
      refunded: data.refunded,
      purchase_order_id: data.purchase_order_id,
      purchase_order_name: data.purchase_order_name,
      amount: data.amount, // In paisa
      created_on: data.created_on,
      updated_on: data.updated_on,
    });
  } catch (error) {
    console.error("💥 Lookup error:", error);
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
