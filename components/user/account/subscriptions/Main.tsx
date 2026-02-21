"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/user/axios";
import ConfirmModal from "@/components/ui/ConfirmModal";
import {
    Calendar,
    MapPin,
    CreditCard,
    RefreshCcw,
} from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";

/* ---------- TYPES ---------- */

type UpcomingBooking = {
    id: string;
    date: string;
    timeFrom: string;
    timeTo: string;
};

type Subscription = {
    id: string;
    planName: string;
    price: string;
    status: "active" | "past_due" | "canceled";
    weekday: number;
    timeFrom: string;
    timeTo: string;
    isPaused: boolean;
    postcode: string;
    address: string;
    nextBillingDate: string;
    upcomingBookings: UpcomingBooking[];
};

export default function SubscriptionPage() {
    const router = useRouter();

    const [subscription, setSubscription] =
        useState<Subscription | null>(null);
    const [loading, setLoading] = useState(true);

    const [confirmType, setConfirmType] =
        useState<"pause" | "cancel" | "resume" | null>(null);

    const [actionLoading, setActionLoading] = useState(false);

    const fetchSubscription = async () => {
        const res = await api.get("/subscriptions/me");
        setSubscription(res.data);
    };

    useEffect(() => {
        fetchSubscription().finally(() => setLoading(false));
    }, []);

    if (loading) return null;

    if (!subscription) {
        return (
            <div className="min-h-screen bg-gray-50 px-6 py-20 flex items-center justify-center">
                <div className="max-w-xl w-full bg-white rounded-3xl border border-gray-200 shadow-lg p-12 text-center">

                    {/* Icon Circle */}
                    <div className="mx-auto w-16 h-16 rounded-full bg-[#0B2E28]/10 flex items-center justify-center mb-6">
                        <RefreshCcw className="w-7 h-7 text-[#0B2E28]" />
                    </div>

                    <h2 className="text-2xl font-semibold text-gray-900">
                        No Active Subscription
                    </h2>

                    <p className="mt-3 text-gray-600 leading-relaxed">
                        You’re not currently subscribed to Zerava Care.
                        Start a subscription to enjoy regular eco-friendly vehicle care
                        with exclusive savings.
                    </p>

                    <Link
                        href="/subscribe"
                        className="mt-8 inline-flex items-center justify-center rounded-full bg-[#0B2E28] px-8 py-3 text-sm font-medium text-white hover:opacity-90 transition"
                    >
                        Start Subscription
                    </Link>
                </div>
            </div>
        );
    }

    const handleConfirm = async () => {
        if (!confirmType) return;

        setActionLoading(true);
        try {
            const res = await api.post(
                `/subscriptions/${subscription.id}/${confirmType}`
            );
            toast.success(res.data.message);
            setConfirmType(null);
            await fetchSubscription();
        } finally {
            setActionLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 px-6 py-16">
            <div className="mx-auto max-w-5xl space-y-14">

                {/* HEADER */}
                <div className="max-w-3xl mx-auto">
                    <h1 className="text-4xl font-light tracking-tight text-gray-900">
                        Your Subscription
                    </h1>
                    <p className="mt-2 text-gray-500">
                        Manage your recurring Zerava vehicle care.
                    </p>
                </div>

                {/* CREDIT CARD STYLE PANEL */}
                <div className="relative max-w-3xl mx-auto rounded-3xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.12)]">

                    {/* Base Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-eco-black via-mobility-green to-eco-black"></div>

                    {/* Top Light Reflection */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.15),transparent_40%)]"></div>

                    {/* Bottom Glow Accent */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(56,214,196,0.25),transparent_45%)]"></div>

                    {/* Inner Soft Border */}
                    <div className="absolute inset-0 rounded-3xl border border-white/10"></div>

                    <div className="relative p-10 text-white">

                        {/* HEADER */}
                        <div className="flex justify-between items-start">

                            <div>
                                <p className="text-xs uppercase tracking-widest text-white/60 mb-1">
                                    Zerava Subscription
                                </p>
                                <h2 className="text-2xl font-semibold tracking-wide">
                                    {subscription.planName}
                                </h2>
                                <p className="mt-2 text-[#38D6C4] text-lg font-medium">
                                    {subscription.price}
                                </p>
                            </div>

                            <span className={`px-4 py-1 rounded-full text-xs font-medium backdrop-blur ${subscription.status === "active"
                                ? "bg-[#38D6C4]/20 text-[#38D6C4] border border-[#38D6C4]/40"
                                : subscription.status === "past_due"
                                    ? "bg-yellow-400/20 text-yellow-300 border border-yellow-300/40"
                                    : "bg-red-500/20 text-red-300 border border-red-400/40"
                                }`}>
                                {subscription.isPaused ? "Paused" : subscription.status}
                            </span>
                        </div>

                        {/* Divider */}
                        <div className="my-4 h-px bg-white/10"></div>

                        {/* DETAILS */}
                        <div className="grid md:grid-cols-2 gap-8 text-sm">

                            <DetailItemCard
                                icon={<Calendar size={18} />}
                                title={formatWeekday(subscription.weekday)}
                                subtitle={`${formatTime(subscription.timeFrom)} – ${formatTime(subscription.timeTo)}`}
                            />

                            <DetailItemCard
                                icon={<MapPin size={18} />}
                                title={subscription.postcode}
                                subtitle={subscription.address}
                            />

                            <DetailItemCard
                                icon={<CreditCard size={18} />}
                                title="Next billing"
                                subtitle={formatDate(subscription.nextBillingDate)}
                            />

                            <DetailItemCard
                                icon={<RefreshCcw size={18} />}
                                title="Subscription ID"
                                subtitle={subscription.id.slice(0, 12)}
                            />
                        </div>

                        {/* ACTIONS */}
                        <div className="mt-10 flex flex-wrap gap-4 justify-between items-center">

                            <Link
                                href={`/account/subscriptions/${subscription.id}/reschedule`}
                                className="rounded-full bg-white text-[#0B2E28] px-6 py-2 text-sm font-medium hover:opacity-90 transition"
                            >
                                Reschedule Plan
                            </Link>

                            <div className="flex gap-6 text-sm">

                                {subscription.status === "active" && (
                                    <button
                                        onClick={() =>
                                            setConfirmType(
                                                subscription.isPaused
                                                    ? "resume"
                                                    : "pause"
                                            )
                                        }
                                        className="text-yellow-300 hover:underline"
                                    >
                                        {subscription.isPaused
                                            ? "Resume"
                                            : "Pause"}
                                    </button>
                                )}

                                {subscription.status !== "canceled" && (
                                    <button
                                        onClick={() => setConfirmType("cancel")}
                                        className="text-red-300 hover:underline"
                                    >
                                        Cancel
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* UPCOMING BOOKINGS */}
                <div className="rounded-3xl max-w-3xl mx-auto border border-gray-200 bg-white p-8 shadow-sm">
                    <h3 className="text-xl font-medium text-gray-900 mb-6">
                        Upcoming Visits
                    </h3>

                    <div className="space-y-4">
                        {subscription.upcomingBookings.map((booking) => (
                            <VisitItem
                                key={booking.id}
                                booking={booking}
                                onReschedule={() =>
                                    router.push(
                                        `/account/bookings/${booking.id}/reschedule`
                                    )
                                }
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* CONFIRM MODAL */}
            <ConfirmModal
                open={!!confirmType}
                title={
                    confirmType === "cancel"
                        ? "Cancel Subscription?"
                        : confirmType === "resume"
                            ? "Resume Subscription?"
                            : "Pause Subscription?"
                }
                description={
                    confirmType === "cancel"
                        ? "This will permanently stop your subscription and future bookings."
                        : confirmType === "resume"
                            ? "Your subscription will resume and future visits will continue."
                            : "Your subscription will be paused until you reactivate it."
                }
                confirmText={
                    confirmType === "cancel"
                        ? "Cancel Subscription"
                        : confirmType === "resume"
                            ? "Resume Subscription"
                            : "Pause Subscription"
                }
                onConfirm={handleConfirm}
                onCancel={() => setConfirmType(null)}
                loading={actionLoading}
                variant={confirmType === "cancel" ? "danger" : "default"}
            />
        </div>
    );
}

/* ---------- DETAIL ITEM ---------- */

function DetailItemCard({
    icon,
    title,
    subtitle,
}: {
    icon: React.ReactNode;
    title: string;
    subtitle: string;
}) {
    return (
        <div className="flex gap-4">
            <div className="text-[#38D6C4]">{icon}</div>
            <div>
                <p className="font-medium">{title}</p>
                <p className="text-white/60">{subtitle}</p>
            </div>
        </div>
    );
}

/* ---------- VISIT ITEM ---------- */

function VisitItem({
    booking,
    onReschedule,
}: {
    booking: UpcomingBooking;
    onReschedule: () => void;
}) {
    return (
        <div className="flex justify-between items-center rounded-2xl border border-gray-200 bg-gray-50 p-5 hover:border-[#0B2E28]/40 transition">

            <div>
                <p className="font-medium text-gray-900">
                    {formatDate(booking.date)}
                </p>
                <p className="text-sm text-gray-500">
                    {formatTime(booking.timeFrom)} –{" "}
                    {formatTime(booking.timeTo)}
                </p>
            </div>

            <button
                onClick={onReschedule}
                className="rounded-full border border-[#0B2E28] px-5 py-2 text-sm font-medium text-[#0B2E28] hover:bg-[#0B2E28] hover:text-white transition"
            >
                Reschedule
            </button>
        </div>
    );
}

/* ---------- HELPERS ---------- */

function formatWeekday(day: number) {
    const days = [
        "Monday", "Tuesday", "Wednesday", "Thursday",
        "Friday", "Saturday", "Sunday"
    ];
    return days[day - 1] ?? "";
}

function formatTime(time: string) {
    const d = new Date(`1970-01-01T${time}`);
    return d.toLocaleTimeString("en-GB", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
    });
}

function formatDate(dateStr: string) {
    return new Date(dateStr).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });
}