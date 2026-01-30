"use client";

import adminApi from "@/lib/admin/axios";
import {
    CheckCircle,
    Bell,
    Download,
    Calendar,
    CreditCard,
    TrendingUp,
    Users,
    Droplet,
    Leaf,
    UserPlus,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AdminDashboardOverview() {
    const [stats, setStats] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        adminApi
            .get("/admin/dashboard/overview")
            .then((res) => setStats(res.data))
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return <div className="text-sm text-gray-500">Loading dashboard…</div>;
    }

    return (
        <div className="space-y-6">
            {/* Row 1 */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                <StatCard
                    title="Pending Bookings"
                    value={stats.pendingBookings}
                    bg="bg-emerald-500"
                    icon={<CheckCircle />}
                    action={
                        <Button muted disabled={stats.pendingBookings === 0}>
                            Confirm All
                        </Button>
                    }
                />

                <StatCard
                    title="Today's Bookings"
                    value={stats.todaysBookings}
                    bg="bg-blue-500"
                    icon={<Bell />}
                    action={
                        <Button>
                            <Download size={16} />
                            Export All
                        </Button>
                    }
                />

                <InviteCard />

                <StatCard
                    title="Export Data"
                    subtitle="Download all booking records"
                    bg="bg-orange-500"
                    icon={<Download />}
                    action={<Button>Download CSV</Button>}
                />
            </div>

            {/* Row 2 */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                <StatCard
                    title="Total Bookings"
                    value={stats.totalBookings.count}
                    subtitle={`${stats.totalBookings.pending} pending`}
                    bg="bg-emerald-500"
                    icon={<Calendar />}
                />

                <StatCard
                    title="Active Subscriptions"
                    value={stats.activeSubscriptions.active}
                    subtitle={`of ${stats.activeSubscriptions.total} total`}
                    bg="bg-blue-600"
                    icon={<CreditCard />}
                />

                <StatCard
                    title="Total Revenue"
                    value={`£${stats.revenue.total}`}
                    subtitle="from bookings"
                    bg="bg-orange-500"
                    icon={<TrendingUp />}
                />
            </div>

            {/* Row 3 */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                <StatCard
                    title="Total Customers"
                    value={stats.totalCustomers}
                    subtitle="registered users"
                    bg="bg-purple-500"
                    icon={<Users />}
                />

                <StatCard
                    title="Water Saved"
                    value={`${stats.environment.waterSavedLitres}L`}
                    subtitle="environmental impact"
                    bg="bg-blue-500"
                    icon={<Droplet />}
                />

                <StatCard
                    title="CO₂ Saved"
                    value={`${stats.environment.co2SavedKg}kg`}
                    subtitle="carbon reduction"
                    bg="bg-emerald-500"
                    icon={<Leaf />}
                />
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="p-4 bg-white border rounded-xl">
                    <div className="mb-4 flex items-center justify-between">
                        <h3 className="text-lg font-semibold">Recent Bookings</h3>

                        <button
                            onClick={() => router.push("/admin/bookings")}
                            className="text-sm font-medium text-electric-teal hover:underline"
                        >
                            View all
                        </button>
                    </div>
                    {stats.recentBookings.map((b) => (
                        <div key={b.id} className="flex items-center justify-between rounded-lg p-4">
                            <div>
                                <p className="font-medium">{b.name}</p>
                                <p className="text-xs text-gray-500">{b.referenceCode}</p>
                            </div>

                            <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs text-emerald-700">
                                {b.status.toLowerCase()}
                            </span>
                        </div>
                    ))}
                </div>
                <div className="rounded-xl border bg-white p-6">
                    <div className="mb-4 flex items-center justify-between">
                        <h3 className="text-lg font-semibold">Recent Bookings</h3>

                        <button
                            onClick={() => router.push("/admin/subscriptions")}
                            className="text-sm font-medium text-electric-teal hover:underline"
                        >
                            View all
                        </button>
                    </div>


                    {stats.recentSubscriptions.length === 0 ? (
                        <div className="flex h-40 flex-col items-center justify-center text-center">
                            <p className="text-sm text-gray-500">
                                No active subscriptions yet
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {stats.recentSubscriptions.map((s) => (
                                <div
                                    key={s.id}
                                    className="flex items-center justify-between rounded-lg border p-4"
                                >
                                    <div>
                                        <p className="font-medium">{s.userName}</p>
                                        <p className="text-xs text-gray-500">
                                            {new Date(s.createdAt).toLocaleDateString(
                                                "en-GB",
                                                {
                                                    day: "2-digit",
                                                    month: "short",
                                                    year: "numeric",
                                                },
                                            )}
                                        </p>
                                    </div>

                                    <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">
                                        {s.status.toLowerCase()}
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}


function StatCard({
    title,
    value,
    subtitle,
    bg,
    icon,
    action,
}: {
    title: string;
    value?: string;
    subtitle?: string;
    bg: string;
    icon: React.ReactNode;
    action?: React.ReactNode;
}) {
    return (
        <div
            className={`${bg} relative flex h-40 flex-col justify-between rounded-2xl p-6 text-white`}
        >
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium opacity-90">{title}</h3>
                <div className="opacity-90">{icon}</div>
            </div>

            {value && (
                <div>
                    <p className="text-3xl font-semibold">{value}</p>
                    {subtitle && (
                        <p className="mt-1 text-sm opacity-90">{subtitle}</p>
                    )}
                </div>
            )}

            {action && <div>{action}</div>}
        </div>
    );
}


function InviteCard() {
    return (
        <div className="flex h-40 flex-col justify-between rounded-2xl border bg-white p-6">
            <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium">Invite Customer</h3>
                <UserPlus className="text-purple-500" />
            </div>

            <div className="flex gap-2">
                <input
                    placeholder="Email..."
                    className="flex-1 rounded-lg border px-3 py-2 text-sm focus:outline-none"
                />
                <button className="rounded-lg bg-purple-500 px-3 py-2 text-white">
                    →
                </button>
            </div>
        </div>
    );
}

function Button({
    children,
    muted,
    disabled,
    onClick,
}: {
    children: React.ReactNode;
    muted?: boolean;
    disabled?: boolean;
    onClick?: () => void;
}) {
    return (
        <button
            disabled={disabled}
            onClick={onClick}
            className={[
                "flex w-full items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition",
                muted
                    ? "bg-white/20 text-white opacity-70"
                    : "bg-white/20 hover:bg-white/30",
                disabled && "cursor-not-allowed opacity-50",
            ]
                .filter(Boolean)
                .join(" ")}
        >
            {children}
        </button>
    );
}

