"use client";

import { useEffect, useState } from "react";
import api from "@/lib/user/axios";
import {
    Droplet,
    Wind,
    Sparkles,
    Leaf,
    Calendar,
    ShieldCheck,
    TreeDeciduous,
} from "lucide-react";
import Link from "next/link";

type DashboardData = {
    ecoLevel: {
        level: string;
        totalCleans: number;
        nextLevelAt: number;
        progressPercent: number;
    };
    environment: {
        waterSavedLitres: number;
        co2SavedKg: number;
        treesPlanted: number;
        nextTreeAtLitres: number;
    };
    recentBookings: {
        id: string;
        service: string;
        vehicleCategory: string;
        date: string;
        timeFrom: string;
        timeTo: string;
        status: string;
    }[];
    subscription: {
        active: boolean;
        discountPercent: number;
    };
};

export default function UserDashboardPage() {
    const [data, setData] = useState<DashboardData | null>(null);

    useEffect(() => {
        api.get("/user/dashboard/overview").then((res) => {
            setData(res.data);
        });
    }, []);

    if (!data) return null;

    const { ecoLevel, environment, recentBookings, subscription } = data;

    return (
        <div className="space-y-8">
            {/* TOP ROW */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                <EcoLevelCard eco={ecoLevel} env={environment} />
                <TreesCard env={environment} />
            </div>

            {/* ACTIONS */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <ActionCard
                    title="Book a Clean"
                    subtitle="Schedule your next service"
                    href="/booking"
                    color="bg-emerald-500"
                    icon={<Calendar />}
                />

                <ActionCard
                    title="Subscribe & Save"
                    subtitle={`Get up to ${subscription.discountPercent}% off`}
                    href="/subscribe"
                    color="bg-gray-900"
                    icon={<ShieldCheck />}
                />
            </div>

            {/* RECENT BOOKINGS */}
            <RecentBookings bookings={recentBookings} />
        </div>
    );
}

function EcoLevelCard({
    eco,
    env,
}: {
    eco: DashboardData["ecoLevel"];
    env: DashboardData["environment"];
}) {
    return (
        <div className="col-span-2 rounded-2xl border bg-white p-6">
            <div className="mb-4 flex items-center justify-between">
                <div>
                    <h3 className="text-lg font-semibold">Your Eco Level</h3>
                    <p className="text-sm text-gray-500">
                        Keep cleaning to level up!
                    </p>
                </div>

                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/90 px-3 py-1 text-xs font-medium text-white shadow-sm">
                    <Leaf size={12} className="text-white" />
                    {eco.level}
                </span>
            </div>

            <div className="mb-2 flex justify-between text-sm text-gray-500">
                <span>{eco.totalCleans} cleans</span>
                <span>{eco.nextLevelAt - eco.totalCleans} to Tree</span>
            </div>

            <div className="mb-6 h-3 w-full rounded-full bg-gray-100">
                <div
                    className="h-3 rounded-full bg-gradient-to-r from-emerald-400 via-green-500 to-emerald-600 transition-all duration-500"
                    style={{ width: `${eco.progressPercent}%` }}
                />
            </div>

            <div className="grid grid-cols-3 gap-4">
                <StatMini
                    icon={<Sparkles className="text-emerald-500" />}
                    value={eco.totalCleans}
                    label="Total Cleans"
                />
                <StatMini
                    icon={<Droplet className="text-blue-500" />}
                    value={`${env.waterSavedLitres}L`}
                    label="Water Saved"
                />
                <StatMini
                    icon={<Wind className="text-emerald-600" />}
                    value={`${env.co2SavedKg.toFixed(1)}kg`}
                    label="CO₂ Saved"
                />
            </div>
        </div>
    );
}

function TreesCard({ env }: { env: DashboardData["environment"] }) {
    const remaining =
        env.nextTreeAtLitres -
        (env.waterSavedLitres % env.nextTreeAtLitres);

    return (
        <div className="rounded-2xl bg-gradient-to-r from-green-500 to-emerald-600 p-6 text-white">
            <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 items-center justify-center">
                    <TreeDeciduous size={36} className="text-white" />
                </div>

                <div>
                    <h3 className="text-lg font-semibold leading-tight">
                        Trees Planted
                    </h3>
                    <p className="text-sm opacity-90">
                        Through your water savings
                    </p>
                </div>
            </div>

            <div className="mt-6 text-4xl font-light">
                {env.treesPlanted} trees
            </div>

            <div className="mt-2 text-sm opacity-90">
                {env.waterSavedLitres}L saved
            </div>

            <div className="mt-4 h-2 w-full rounded-full bg-white/30">
                <div
                    className="h-2 rounded-full bg-white"
                    style={{
                        width: `${(env.waterSavedLitres %
                            env.nextTreeAtLitres) /
                            env.nextTreeAtLitres *
                            100
                            }%`,
                    }}
                />
            </div>

            <p className="mt-3 text-sm opacity-90">
                Save {remaining}L more to plant your next tree!
            </p>
        </div>
    );
}

function ActionCard({
    title,
    subtitle,
    href,
    color,
    icon,
}: {
    title: string;
    subtitle: string;
    href: string;
    color: string;
    icon: React.ReactNode;
}) {
    return (
        <Link
            href={href}
            className={`rounded-2xl p-6 text-white ${color} transition hover:opacity-90`}
        >
            <div className="mb-4">{icon}</div>
            <h3 className="text-lg font-semibold">{title}</h3>
            <p className="text-sm opacity-80">{subtitle}</p>
        </Link>
    );
}

function RecentBookings({
    bookings,
}: {
    bookings: DashboardData["recentBookings"];
}) {
    return (
        <div className="rounded-2xl border bg-white p-6">
            <div className="mb-4 flex items-center justify-between">
                <h3 className="text-lg font-semibold">Recent Bookings</h3>
                <Link
                    href="/account/bookings"
                    className="text-sm text-emerald-600 hover:underline"
                >
                    View all →
                </Link>
            </div>

            {bookings.length === 0 ? (
                <p className="text-sm text-gray-500">
                    No bookings yet.
                </p>
            ) : (
                <div className="space-y-3">
                    {bookings.map((b) => (
                        <div
                            key={b.id}
                            className="flex items-center justify-between rounded-2xl border bg-white p-4 shadow-sm"
                        >
                            {/* LEFT */}
                            <div className="flex items-center gap-4">
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-electric-teal/10 text-electric-teal">
                                    <ShieldCheck size={18} />
                                </div>

                                <div>
                                    <p className="font-medium text-gray-900">
                                        {b.service}
                                        {b.vehicleCategory && (
                                            <span className="ml-2 text-xs text-gray-500">
                                                · {b.vehicleCategory}
                                            </span>
                                        )}
                                    </p>

                                    <p className="text-sm text-gray-500">
                                        {formatDate(b.date)} · {formatTime(b.timeFrom)} –{" "}
                                        {formatTime(b.timeTo)}
                                    </p>
                                </div>
                            </div>

                            {/* RIGHT */}
                            <div className="flex items-center gap-4">
                                {b.totalPrice && (
                                    <p className="text-sm font-medium text-gray-700">
                                        £{(b.totalPrice / 100).toFixed(2)}
                                    </p>
                                )}

                                <span
                                    className={[
                                        "rounded-full px-3 py-1 text-xs font-medium",
                                        b.status === "COMPLETED"
                                            ? "bg-emerald-100 text-emerald-700"
                                            : b.status === "CONFIRMED"
                                                ? "bg-blue-100 text-blue-700"
                                                : "bg-gray-100 text-gray-600",
                                    ].join(" ")}
                                >
                                    {b.status.toLowerCase()}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

function formatDate(date: string) {
    return new Date(date).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
    });
}

function formatTime(time: string) {
    const [h, m] = time.split(":").map(Number);
    const d = new Date();
    d.setHours(h, m);
    return d
        .toLocaleTimeString("en-GB", {
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
        })
        .replace("am", "AM")
        .replace("pm", "PM");
}


function StatMini({
    icon,
    value,
    label,
}: {
    icon: React.ReactNode;
    value: string | number;
    label: string;
}) {
    return (
        <div className="rounded-xl bg-gray-50 p-4 text-center">
            <div className="mb-2 flex justify-center">{icon}</div>
            <p className="text-lg font-medium">{value}</p>
            <p className="text-xs text-gray-500">{label}</p>
        </div>
    );
}
