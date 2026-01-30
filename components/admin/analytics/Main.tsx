"use client";

import { useEffect, useState } from "react";
import adminApi from "@/lib/admin/axios";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    BarChart,
    Bar,
    Legend,
} from "recharts";
import { TrendingUp, TrendingDown } from "lucide-react";

type RevenueTrendPoint = {
    date: string;
    revenue: number;
    bookings: number;
};


const COLORS = ["#10B981", "#3B82F6", "#F59E0B"];

export default function AdminDashboardAnalytics() {
    const [data, setData] = useState<any>(null);

    useEffect(() => {
        adminApi
            .get("/admin/dashboard/analytics")
            .then((res) => setData(res.data));
    }, []);

    if (!data) return null;

    const revenueTrend = fillMissingDays(data.revenueTrend);

    function fillMissingDays(raw: any[]): RevenueTrendPoint[] {
        const map = new Map<string, RevenueTrendPoint>(
            raw.map((d) => [
                d.date,
                {
                    date: d.date,
                    revenue: d.revenue,
                    bookings: d.bookings,
                },
            ]),
        );

        const result: RevenueTrendPoint[] = [];

        for (let i = 29; i >= 0; i--) {
            const d = new Date();
            d.setDate(d.getDate() - i);
            d.setHours(0, 0, 0, 0);

            const key = d.toISOString().slice(0, 10); // YYYY-MM-DD

            const label = d.toLocaleDateString("en-GB", {
                day: "numeric",
                month: "short",
            });

            const found = map.get(key);

            result.push({
                date: label,                    // display label
                revenue: found?.revenue ?? 0,
                bookings: found?.bookings ?? 0,
            });
        }

        return result;
    }

    return (
        <div className="space-y-6">
            {/* Top KPIs */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <KpiCard
                    title="Monthly Bookings"
                    value={data.monthlyBookings.current}
                    subtitle={`vs last month: ${data.monthlyBookings.previous}`}
                    percent={data.monthlyBookings.changePercent}
                />

                <KpiCard
                    title="Revenue Growth"
                    value={`+${data.revenueGrowth.percent}%`}
                    subtitle="month over month"
                    percent={data.revenueGrowth.percent}
                />
            </div>

            {/* Revenue Trend */}
            <div className="rounded-xl border bg-white p-6">
                <h3 className="mb-4 text-lg font-semibold">
                    Revenue Trend (Last 30 Days)
                </h3>

                <ResponsiveContainer width="100%" height={300}>
                    <LineChart
                        data={revenueTrend}
                        margin={{ top: 10, right: 20, left: 0, bottom: 10 }}
                    >
                        <CartesianGrid
                            strokeDasharray="3 3"
                            vertical={false}
                            stroke="#E5E7EB"
                        />

                        <XAxis
                            dataKey="date"
                            tick={{ fontSize: 12, fill: "#6B7280" }}
                        />

                        <YAxis
                            tick={{ fontSize: 12, fill: "#6B7280" }}
                            allowDecimals={false}
                        />

                        <Tooltip
                            contentStyle={{
                                backgroundColor: "#111827",
                                borderRadius: 8,
                                border: "none",
                                color: "#fff",
                            }}
                            labelStyle={{ color: "#D1D5DB", marginBottom: 6 }}
                            formatter={(value?: number | undefined, name?: string) => {
                                if (value == null) return null;

                                if (name === "revenue") {
                                    return [`£${value}`, "Revenue (£)"];
                                }

                                return [value, "Bookings"];
                            }}
                        />


                        <Legend
                            verticalAlign="bottom"
                            iconType="circle"
                            formatter={(value) => (
                                <span className="text-sm text-gray-600">
                                    {value === "revenue" ? "Revenue (£)" : "Bookings"}
                                </span>
                            )}
                        />

                        {/* Revenue line */}
                        <Line
                            type="monotone"
                            dataKey="revenue"
                            stroke="#10B981"
                            strokeWidth={2}
                            dot={{ r: 3, fill: "#10B981" }}
                            activeDot={{ r: 5 }}
                        />

                        {/* Bookings line */}
                        <Line
                            type="monotone"
                            dataKey="bookings"
                            stroke="#3B82F6"
                            strokeWidth={2}
                            dot={{ r: 3, fill: "#3B82F6" }}
                            activeDot={{ r: 5 }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>


            {/* Bottom charts */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {/* Service Breakdown */}
                <div className="rounded-xl border bg-white p-6">
                    <h3 className="mb-4 text-lg font-semibold">
                        Service Breakdown
                    </h3>

                    <ResponsiveContainer width="100%" height={260}>
                        <PieChart>
                            <Tooltip
                                formatter={(value?: number, name?: string) => {
                                    if (value == null) return "";

                                    return name === "percentage" ? `${value}%` : `£${value}`;
                                }}
                                labelFormatter={(label) => {
                                    if (!label) return "";
                                    return String(label);
                                }}
                            />
                            <Pie
                                data={data.serviceBreakdown}
                                dataKey="percentage"
                                nameKey="serviceType"
                                outerRadius={90}
                                label={({ name, value }) =>
                                    `${name} ${value}%`
                                }
                            >
                                {data.serviceBreakdown.map(
                                    (_: any, i: number) => (
                                        <Cell
                                            key={i}
                                            fill={COLORS[i % COLORS.length]}
                                        />
                                    ),
                                )}
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>

                    <div className="mt-4 space-y-2 text-sm">
                        {data.serviceBreakdown.map((s: any, i: number) => (
                            <div
                                key={i}
                                className="flex items-center justify-between"
                            >
                                <div className="flex items-center gap-2">
                                    <span
                                        className="h-2.5 w-2.5 rounded-full"
                                        style={{
                                            backgroundColor:
                                                COLORS[i % COLORS.length],
                                        }}
                                    />
                                    <span className="capitalize">
                                        {s.serviceType.toLowerCase()}
                                    </span>
                                </div>

                                <span className="font-medium">
                                    £{s.revenue}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Booking Status */}
                <div className="rounded-xl border bg-white p-6">
                    <h3 className="mb-4 text-lg font-semibold">
                        Booking Status
                    </h3>

                    <ResponsiveContainer width="100%" height={260}>
                        <BarChart data={data.bookingStatus}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="status" />
                            <YAxis />
                            <Tooltip />
                            <Bar
                                dataKey="count"
                                fill="#10B981"
                                radius={[8, 8, 0, 0]}
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}

function KpiCard({
    title,
    value,
    subtitle,
    percent,
    positive,
}: {
    title: string;
    value: string | number;
    subtitle?: string;
    percent?: number;
    positive?: boolean;
}) {
    return (
        <div className="rounded-xl border bg-white p-6">
            <p className="text-md font-semibold text-gray-500">{title}</p>

            <div className="mt-2 flex items-center gap-3">
                <h2 className="text-3xl font-light">{value}</h2>

                {percent !== undefined && (
                    <span
                        className={`flex items-center gap-1 text-sm ${percent >= 0
                            ? "text-emerald-600"
                            : "text-red-500"
                            }`}
                    >
                        {percent >= 0 ? (
                            <TrendingUp size={16} />
                        ) : (
                            <TrendingDown size={16} />
                        )}
                        {Math.abs(percent)}%
                    </span>
                )}
            </div>

            {subtitle && (
                <p className="mt-1 text-sm text-gray-500">
                    {subtitle}
                </p>
            )}
        </div>
    );
}
