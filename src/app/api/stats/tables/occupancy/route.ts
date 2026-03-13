// app/api/stats/tables/occupancy/route.ts
import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const date =
    searchParams.get("date") || new Date().toISOString().split("T")[0];

  const startDate = new Date(date + "T00:00:00.000Z");
  const endDate = new Date(date + "T23:59:59.999Z");

  const orders = await db.order.findMany({
    where: {
      createdAt: {
        gte: startDate,
        lte: endDate,
      },
      orderType: "DINE_IN",
      tableNumber: { not: null },
    },
    select: {
      tableNumber: true,
      createdAt: true,
      completedAt: true,
      status: true,
    },
  });

  const totalTables = await db.table.count();

  // Initialize hourly data
  const hourlyData = Array.from({ length: 24 }, (_, i) => {
    const hour = `${i.toString().padStart(2, "0")}:00`;
    const hourOrders = orders.filter(
      (order) => order.createdAt.getHours() === i,
    );

    const partySizes = hourOrders.length;
    const stays = hourOrders
      .filter((o) => o.completedAt)
      .map(
        (o) => (o.completedAt!.getTime() - o.createdAt.getTime()) / (1000 * 60),
      );

    return {
      hour,
      occupiedTables: hourOrders.length,
      totalTables,
      occupancyRate: (hourOrders.length / totalTables) * 100,
      averagePartySize: partySizes > 0 ? hourOrders.length / partySizes : 0,
      averageStayMinutes:
        stays.length > 0
          ? Math.round(stays.reduce((a, b) => a + b, 0) / stays.length)
          : 0,
    };
  });

  return NextResponse.json({ data: hourlyData });
}
