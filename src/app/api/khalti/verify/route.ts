import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  console.log("🔄 Khalti callback received");

  try {
    // 1. Get callback parameters from URL (as per docs)
    const searchParams = req.nextUrl.searchParams;
    const callbackData = {
      pidx: searchParams.get("pidx"),
      status: searchParams.get("status"),
      transaction_id: searchParams.get("transaction_id"),
      tidx: searchParams.get("tidx"),
      amount: searchParams.get("amount"),
      mobile: searchParams.get("mobile"),
      purchase_order_id: searchParams.get("purchase_order_id"),
      purchase_order_name: searchParams.get("purchase_order_name"),
      total_amount: searchParams.get("total_amount"),
    };

    console.log("📦 Callback data:", callbackData);

    // 2. Validate required parameters
    if (!callbackData.pidx) {
      console.error("❌ Missing pidx in callback");
      return NextResponse.redirect(
        new URL(
          "/payment/failed?reason=invalid_callback",
          process.env.NEXT_PUBLIC_APP_URL,
        ),
      );
    }

    // 3. Handle different statuses as per docs
    switch (callbackData.status) {
      case "Completed":
        console.log("✅ Payment completed successfully");

        // IMPORTANT: As per docs, use lookup API for final validation
        // You should call lookup API here to double-check

        return NextResponse.redirect(
          new URL(
            `/payment/success?` +
              `orderId=${callbackData.purchase_order_id}&` +
              `transactionId=${callbackData.transaction_id}&` +
              `amount=${Number(callbackData.amount) / 100}&` + // Convert paisa to NPR
              `pidx=${callbackData.pidx}`,
            process.env.NEXT_PUBLIC_APP_URL,
          ),
        );

      case "User canceled":
        console.log("🚫 Payment cancelled by user");
        return NextResponse.redirect(
          new URL(
            `/payment/failed?orderId=${callbackData.purchase_order_id}&reason=cancelled`,
            process.env.NEXT_PUBLIC_APP_URL,
          ),
        );

      case "Pending":
        console.log("⏳ Payment pending");
        return NextResponse.redirect(
          new URL(
            `/payment/pending?orderId=${callbackData.purchase_order_id}`,
            process.env.NEXT_PUBLIC_APP_URL,
          ),
        );

      default:
        console.log("⚠️ Unknown status:", callbackData.status);
        return NextResponse.redirect(
          new URL(
            `/payment/failed?orderId=${callbackData.purchase_order_id}&status=${callbackData.status}`,
            process.env.NEXT_PUBLIC_APP_URL,
          ),
        );
    }
  } catch (error) {
    console.error("💥 Callback error:", error);
    return NextResponse.redirect(
      new URL(
        "/payment/failed?reason=server_error",
        process.env.NEXT_PUBLIC_APP_URL,
      ),
    );
  }
}
