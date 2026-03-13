"use client";

import { useState } from "react";
import { useCustomerAcquisition } from "@/hooks/useStats";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { Progress } from "@/components/ui/progress";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { Users, UserPlus, TrendingUp, Award } from "lucide-react";

const LOYALTY_COLORS = ["#22c55e", "#3b82f6", "#f97316", "#ef4444"];

export function CustomerInsights() {
  const [period, setPeriod] = useState("month");

  const { data: acquisitionData, isLoading: acquisitionLoading } =
    useCustomerAcquisition(period);

  const totalCustomers =
    acquisitionData?.reduce((sum, day) => sum + day.newCustomers, 0) || 0;
  const returningCustomers =
    acquisitionData?.reduce((sum, day) => sum + day.returningCustomers, 0) || 0;
  const retentionRate = totalCustomers
    ? ((returningCustomers / totalCustomers) * 100).toFixed(1)
    : 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Customer Insights</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="acquisition">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="acquisition">Acquisition</TabsTrigger>
            <TabsTrigger value="loyalty">Loyalty</TabsTrigger>
            <TabsTrigger value="retention">Retention</TabsTrigger>
          </TabsList>

          <TabsContent value="acquisition" className="space-y-4">
            <div className="flex justify-end space-x-2">
              {["week", "month", "year"].map((p) => (
                <button
                  key={p}
                  className={`text-sm px-2 py-1 rounded ${
                    period === p ? "bg-primary text-white" : "bg-muted"
                  }`}
                  onClick={() => setPeriod(p)}
                >
                  {p}
                </button>
              ))}
            </div>

            {acquisitionLoading ? (
              <Skeleton className="h-[200px] w-full" />
            ) : (
              <>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={acquisitionData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="date"
                      tickFormatter={(value) => {
                        const date = new Date(value);
                        return period === "week"
                          ? date.toLocaleDateString("en-US", {
                              weekday: "short",
                            })
                          : date.toLocaleDateString("en-US", {
                              day: "numeric",
                            });
                      }}
                    />
                    <YAxis />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="newCustomers"
                      stroke="#22c55e"
                      name="New"
                    />
                    <Line
                      type="monotone"
                      dataKey="returningCustomers"
                      stroke="#3b82f6"
                      name="Returning"
                    />
                  </LineChart>
                </ResponsiveContainer>

                <div className="grid grid-cols-2 gap-4 pt-4">
                  <div className="text-center">
                    <UserPlus className="h-5 w-5 mx-auto mb-2 text-green-500" />
                    <div className="text-2xl font-bold">{totalCustomers}</div>
                    <div className="text-xs text-muted-foreground">New</div>
                  </div>
                  <div className="text-center">
                    <Users className="h-5 w-5 mx-auto mb-2 text-blue-500" />
                    <div className="text-2xl font-bold">
                      {returningCustomers}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Returning
                    </div>
                  </div>
                </div>
              </>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
