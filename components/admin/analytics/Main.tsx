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
    const [loading, setLoading] = useState(true);

    const [selectedMonth, setSelectedMonth] = useState(() => {
        const now = new Date();
        return `${now.getFullYear()}-${String(
            now.getMonth() + 1,
        ).padStart(2, "0")}`;
    });

    useEffect(() => {
        setLoading(true);

        adminApi
            .get("/admin/dashboard/analytics", {
                params: { month: selectedMonth },
            })
            .then((res) => setData(res.data))
            .finally(() => setLoading(false));
    }, [selectedMonth]);

    if (loading) {
        return (
            <div className="py-20 text-center text-gray-500">
                Loading analytics...
            </div>
        );
    }

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

        const [year, month] = selectedMonth.split("-").map(Number);
        const daysInMonth = new Date(year, month, 0).getDate();

        const result: RevenueTrendPoint[] = [];

        for (let day = 1; day <= daysInMonth; day++) {
            const d = new Date(year, month - 1, day);
            const key = d.toISOString().slice(0, 10);

            const label = d.toLocaleDateString("en-GB", {
                day: "numeric",
                month: "short",
            });

            const found = map.get(key);

            result.push({
                date: label,
                revenue: found?.revenue ?? 0,
                bookings: found?.bookings ?? 0,
            });
        }

        return result;
    }

    return (
        <div className="space-y-6">

            {/* MONTH FILTER */}
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

                {/* LEFT SIDE */}
                <div>
                    <h2 className="text-xl font-semibold text-gray-900">
                        Analytics Overview
                    </h2>
                    <p className="text-sm text-gray-500">
                        Performance insights for the selected month
                    </p>
                </div>

                {/* RIGHT SIDE */}
                <div>
                    <input
                        type="month"
                        value={selectedMonth}
                        onChange={(e) => setSelectedMonth(e.target.value)}
                        className="rounded-md border px-3 py-2 text-sm shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    />
                </div>

            </div>

            {/* KPI CARDS */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <KpiCard
                    title="Monthly Bookings"
                    value={data.monthlyBookings.current}
                    subtitle={`vs last month: ${data.monthlyBookings.previous}`}
                    percent={data.monthlyBookings.changePercent}
                />

                <KpiCard
                    title="Revenue Growth"
                    value={`${data.revenueGrowth.percent}%`}
                    subtitle="month over month"
                    percent={data.revenueGrowth.percent}
                />
            </div>

            {/* Revenue Trend */}
            <div className="rounded-xl border bg-white p-6">
                <h3 className="mb-4 text-lg font-semibold">
                    Revenue Trend ({selectedMonth})
                </h3>

                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={revenueTrend}>
                        <CartesianGrid
                            strokeDasharray="3 3"
                            vertical={false}
                            stroke="#E5E7EB"
                        />
                        <XAxis dataKey="date" />
                        <YAxis allowDecimals={false} />
                        <Tooltip />
                        <Legend />
                        <Line
                            type="monotone"
                            dataKey="revenue"
                            stroke="#10B981"
                            strokeWidth={2}
                        />
                        <Line
                            type="monotone"
                            dataKey="bookings"
                            stroke="#3B82F6"
                            strokeWidth={2}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            {/* Bottom Charts */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {/* Service Breakdown */}
                <div className="rounded-xl border bg-white p-6">
                    <h3 className="mb-4 text-lg font-semibold">
                        Service Breakdown
                    </h3>

                    <ResponsiveContainer width="100%" height={260}>
                        <PieChart>
                            <Tooltip />
                            <Pie
                                data={data.serviceBreakdown}
                                dataKey="percentage"
                                nameKey="serviceName"
                                outerRadius={90}
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
}: {
    title: string;
    value: string | number;
    subtitle?: string;
    percent?: number;
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
