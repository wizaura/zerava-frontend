"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/user/axios";
import {
    Calendar,
    MapPin,
    CreditCard,
    RefreshCcw,
    Calendar1,
    Settings2,
    PauseCircle,
    PlayCircle,
    XCircle,
    CalendarClock,
    X,
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
    firstServiceDate: string;
    cancelAtPeriodEnd: boolean;
    upcomingBookings: UpcomingBooking[];
};

type ManageView =
    | "menu"
    | "pause"
    | "cancel-warning"
    | "cancel-final";

export default function SubscriptionPage() {
    const router = useRouter();

    const [subscription, setSubscription] =
        useState<Subscription | null>(null);

    const [loading, setLoading] = useState(true);

    const [manageOpen, setManageOpen] = useState(false);

    const [manageView, setManageView] =
        useState<ManageView>("menu");

    const [pauseDuration, setPauseDuration] =
        useState<4 | 8>(4);

    const [actionLoading, setActionLoading] =
        useState(false);

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

                    <div className="mx-auto w-16 h-16 rounded-full bg-[#0B2E28]/10 flex items-center justify-center mb-6">
                        <RefreshCcw className="w-7 h-7 text-[#0B2E28]" />
                    </div>

                    <h2 className="text-2xl font-semibold text-gray-900">
                        No Active Subscription
                    </h2>

                    <p className="mt-3 text-gray-600 leading-relaxed">
                        You’re not currently subscribed to Zerava Care.
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

    /* ---------- ACTIONS ---------- */

    const handlePause = async () => {
        setActionLoading(true);

        try {
            const res = await api.post(
                `/subscriptions/${subscription.id}/pause`,
                {
                    durationWeeks: pauseDuration,
                }
            );

            toast.success(res.data.message);

            setManageOpen(false);

            await fetchSubscription();
        } finally {
            setActionLoading(false);
        }
    };

    const handleResume = async () => {
        setActionLoading(true);

        try {
            const res = await api.post(
                `/subscriptions/${subscription.id}/resume`
            );

            toast.success(res.data.message);

            setManageOpen(false);

            await fetchSubscription();
        } finally {
            setActionLoading(false);
        }
    };

    const handleCancel = async () => {
        setActionLoading(true);

        try {
            const res = await api.post(
                `/subscriptions/${subscription.id}/cancel`
            );

            toast.success(res.data.message);

            setManageOpen(false);

            await fetchSubscription();
        } finally {
            setActionLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 px-6 py-16">
            <div className="mx-auto max-w-5xl space-y-6">

                {/* HEADER */}

                <div className="max-w-3xl mx-auto">
                    <h1 className="text-4xl font-light tracking-tight text-gray-900">
                        Your Subscription
                    </h1>

                    <p className="mt-2 text-gray-500">
                        Manage your recurring Zerava vehicle care.
                    </p>
                </div>

                {/* SUB CARD */}

                <div className="relative max-w-3xl mx-auto rounded-3xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.12)]">

                    <div className="absolute inset-0 bg-gradient-to-br from-eco-black via-mobility-green to-eco-black"></div>

                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.15),transparent_40%)]"></div>

                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(56,214,196,0.25),transparent_45%)]"></div>

                    <div className="absolute inset-0 rounded-3xl border border-white/10"></div>

                    <div className="relative p-10 text-white">

                        {/* HEADER */}

                        <div className="flex justify-between items-start gap-5">

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

                            <span
                                className={`px-4 py-1 rounded-full text-xs font-medium backdrop-blur
                                ${subscription.isPaused
                                        ? "bg-yellow-400/20 text-yellow-200 border border-yellow-300/40"
                                        : subscription.status === "active"
                                            ? "bg-[#38D6C4]/20 text-[#38D6C4] border border-[#38D6C4]/40"
                                            : "bg-red-500/20 text-red-300 border border-red-400/40"
                                    }`}
                            >
                                {subscription.isPaused
                                    ? "Paused"
                                    : subscription.status}
                            </span>
                        </div>

                        <div className="my-5 h-px bg-white/10"></div>

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

                            <DetailItemCard
                                icon={<Calendar1 size={18} />}
                                title="First Service Date"
                                subtitle={formatDate(subscription.firstServiceDate)}
                            />
                        </div>

                        {/* ACTIONS */}

                        {!subscription.cancelAtPeriodEnd && (
                            <div className="mt-10 flex justify-end">

                                <button
                                    onClick={() => {
                                        setManageView("menu");
                                        setManageOpen(true);
                                    }}
                                    className="
                                        px-5 py-2 rounded-full font-medium
                                        bg-white text-[#0B2E28]
                                        hover:opacity-90 transition-all
                                        shadow-sm flex items-center gap-2
                                    "
                                >
                                    <Settings2 size={16} />
                                    Manage
                                </button>

                            </div>
                        )}

                        {subscription.cancelAtPeriodEnd && (
                            <div className="mt-5 text-xs text-red-200 bg-red-950 border border-red-900 px-4 py-3 rounded-2xl">
                                ⚠️ This subscription will be cancelled at the end of the current billing period.
                            </div>
                        )}
                    </div>
                </div>

                {/* PAUSED BANNER */}

                {subscription.isPaused && (
                    <div className="max-w-3xl mx-auto rounded-3xl border border-yellow-200 bg-yellow-50 p-6">

                        <div className="flex items-start gap-4">

                            <PauseCircle className="w-6 h-6 text-yellow-600 mt-1" />

                            <div className="flex-1">

                                <h3 className="font-semibold text-yellow-900">
                                    Your subscription is paused
                                </h3>

                                <div className="mt-4 space-y-3 text-sm text-yellow-800 leading-relaxed">

                                    <p>
                                        Your subscription is paused until
                                        <strong> 12 August 2026</strong>.
                                    </p>

                                    <p>
                                        It will automatically restart on
                                        <strong> 12 August 2026</strong>,
                                        and your regular 28-day billing cycle
                                        will continue from that date.
                                    </p>

                                    <p>
                                        Your next service slot will be allocated
                                        based on route availability.
                                    </p>

                                    <p>
                                        Your previous arrival window is not guaranteed.
                                    </p>

                                    <p>
                                        If you do not want your subscription to restart,
                                        please cancel before the restart date.
                                    </p>

                                    <p>
                                        Pause requests must be made at least
                                        7 days before the next billing date.
                                    </p>

                                </div>

                                <button
                                    onClick={handleResume}
                                    className="
                                        mt-5 inline-flex items-center gap-2
                                        rounded-full bg-yellow-600 text-white
                                        px-5 py-2 text-sm font-medium
                                        hover:bg-yellow-700 transition
                                    "
                                >
                                    <PlayCircle size={16} />
                                    Resume Early
                                </button>

                            </div>
                        </div>
                    </div>
                )}

                {/* UPCOMING VISITS */}

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
                                    router.push("/account/bookings")
                                }
                            />
                        ))}

                    </div>
                </div>
            </div>

            {/* MANAGE MODAL */}

            {manageOpen && (
                <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">

                    <div className="w-full max-w-2xl rounded-2xl bg-white shadow-2xl overflow-hidden">

                        {/* HEADER */}

                        <div className="flex items-center justify-between px-8 py-6 border-b border-gray-100">

                            <div>
                                <h2 className="text-2xl font-semibold text-gray-900">
                                    Manage Subscription
                                </h2>

                                <p className="text-sm text-gray-500 mt-1">
                                    Manage your Zerava subscription preferences.
                                </p>
                            </div>

                            <button
                                onClick={() => setManageOpen(false)}
                                className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center"
                            >
                                <X size={18} />
                            </button>

                        </div>

                        {/* CONTENT */}

                        <div className="p-8">

                            {/* MENU */}

                            {manageView === "menu" && (
                                <div className="space-y-4">

                                    {!subscription.isPaused && (
                                        <ManageCard
                                            icon={<PauseCircle />}
                                            title="Pause Subscription"
                                            description="Take a temporary break for 4 or 8 weeks."
                                            onClick={() => setManageView("pause")}
                                        />
                                    )}

                                    <ManageCard
                                        icon={<CalendarClock />}
                                        title="Reschedule Upcoming Visit"
                                        description="Manage your upcoming service bookings."
                                        onClick={() => {
                                            router.push("/account/bookings");
                                            setManageOpen(false);
                                        }}
                                    />

                                    {subscription.isPaused && (
                                        <ManageCard
                                            icon={<PlayCircle />}
                                            title="Resume Early"
                                            description="Restart your subscription before the pause ends."
                                            onClick={handleResume}
                                        />
                                    )}

                                    <ManageCard
                                        danger
                                        icon={<XCircle />}
                                        title="Cancel Subscription"
                                        description="Stop future recurring billing and visits."
                                        onClick={() =>
                                            setManageView("cancel-warning")
                                        }
                                    />

                                </div>
                            )}

                            {/* PAUSE */}

                            {manageView === "pause" && (
                                <div className="space-y-6">

                                    <button
                                        onClick={() => setManageView("menu")}
                                        className="text-sm text-gray-500 hover:text-gray-900"
                                    >
                                        ← Back
                                    </button>

                                    <div>
                                        <h3 className="text-xl font-semibold text-gray-900">
                                            Need a temporary break?
                                        </h3>

                                        <p className="mt-3 text-sm text-gray-600 leading-relaxed">
                                            You can pause your subscription
                                            up to 2 times in any rolling
                                            12-month period.
                                        </p>
                                    </div>

                                    <div className="space-y-3">

                                        <p className="text-sm font-medium text-gray-800">
                                            Choose your pause duration:
                                        </p>

                                        <div className="grid grid-cols-2 gap-4">

                                            {[4, 8].map((week) => (
                                                <button
                                                    key={week}
                                                    onClick={() =>
                                                        setPauseDuration(week as 4 | 8)
                                                    }
                                                    className={`
                                                        rounded-2xl border p-5 text-left transition-all
                                                        ${pauseDuration === week
                                                            ? "border-[#0B2E28] bg-[#0B2E28] text-white"
                                                            : "border-gray-200 hover:border-[#0B2E28]/40"
                                                        }
                                                    `}
                                                >
                                                    <p className="font-semibold">
                                                        {week} weeks
                                                    </p>

                                                    <p className="text-sm opacity-80 mt-1">
                                                        Temporary pause period
                                                    </p>
                                                </button>
                                            ))}

                                        </div>

                                    </div>

                                    <div className="rounded-2xl bg-amber-50 border border-amber-200 p-5 text-sm text-amber-900 leading-relaxed">
                                        Your subscription will automatically
                                        restart after the selected pause period.
                                        If you do not want it to restart,
                                        please cancel before the restart date.
                                    </div>

                                    <button
                                        onClick={handlePause}
                                        disabled={actionLoading}
                                        className="
                                            w-full rounded-full bg-[#0B2E28]
                                            text-white py-3 font-medium
                                            hover:opacity-90 transition
                                        "
                                    >
                                        {actionLoading
                                            ? "Processing..."
                                            : `Pause for ${pauseDuration} weeks`}
                                    </button>

                                </div>
                            )}

                            {/* CANCEL WARNING */}

                            {manageView === "cancel-warning" && (
                                <div className="space-y-6">

                                    <button
                                        onClick={() => setManageView("menu")}
                                        className="text-sm text-gray-500 hover:text-gray-900"
                                    >
                                        ← Back
                                    </button>

                                    <div>

                                        <h3 className="text-xl font-semibold text-gray-900">
                                            Need a temporary break instead?
                                        </h3>

                                        <p className="mt-3 text-sm text-gray-600 leading-relaxed">
                                            You can pause your subscription
                                            for 4 or 8 weeks instead of
                                            cancelling completely.
                                        </p>

                                    </div>

                                    <div className="grid gap-4">

                                        <button
                                            onClick={() => setManageView("pause")}
                                            className="
                                                rounded-2xl border border-[#0B2E28]/20
                                                p-5 text-left hover:border-[#0B2E28]
                                                transition
                                            "
                                        >
                                            <p className="font-semibold text-gray-900">
                                                Pause Subscription Instead
                                            </p>

                                            <p className="mt-1 text-sm text-gray-500">
                                                Keep your subscription active
                                                while taking a temporary break.
                                            </p>
                                        </button>

                                        <button
                                            onClick={() =>
                                                setManageView("cancel-final")
                                            }
                                            className="
                                                rounded-2xl border border-red-200
                                                p-5 text-left hover:border-red-400
                                                transition
                                            "
                                        >
                                            <p className="font-semibold text-red-700">
                                                Continue Cancellation
                                            </p>

                                            <p className="mt-1 text-sm text-gray-500">
                                                Permanently stop future recurring billing.
                                            </p>
                                        </button>

                                    </div>

                                </div>
                            )}

                            {/* FINAL CANCEL */}

                            {manageView === "cancel-final" && (
                                <div className="space-y-6">

                                    <button
                                        onClick={() =>
                                            setManageView("cancel-warning")
                                        }
                                        className="text-sm text-gray-500 hover:text-gray-900"
                                    >
                                        ← Back
                                    </button>

                                    <div>

                                        <h3 className="text-xl font-semibold text-gray-900">
                                            Cancel Subscription
                                        </h3>

                                        <p className="mt-3 text-sm text-gray-600 leading-relaxed">
                                            Your subscription will remain active
                                            until the end of your current billing period.
                                        </p>

                                    </div>

                                    <ul className="space-y-3 text-sm text-gray-700">

                                        <li>
                                            • Future recurring billing will stop
                                        </li>

                                        <li>
                                            • No rollover visits or credits are created
                                        </li>

                                        <li>
                                            • Re-subscription depends on availability
                                        </li>

                                        <li>
                                            • Current pricing may change in the future
                                        </li>

                                    </ul>

                                    <button
                                        onClick={handleCancel}
                                        disabled={actionLoading}
                                        className="
                                            w-full rounded-full bg-red-600
                                            text-white py-3 font-medium
                                            hover:bg-red-700 transition
                                        "
                                    >
                                        {actionLoading
                                            ? "Cancelling..."
                                            : "Cancel Subscription"}
                                    </button>

                                </div>
                            )}

                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}

/* ---------- MANAGE CARD ---------- */

function ManageCard({
    icon,
    title,
    description,
    onClick,
    danger = false,
}: {
    icon: React.ReactNode;
    title: string;
    description: string;
    onClick: () => void;
    danger?: boolean;
}) {
    return (
        <button
            onClick={onClick}
            className={`
                w-full rounded-xl border p-5 text-left transition-all
                ${danger
                    ? "border-red-200 hover:border-red-400"
                    : "border-gray-200 hover:border-[#0B2E28]/30"
                }
            `}
        >
            <div className="flex gap-4">

                <div
                    className={`
                        w-12 h-12 rounded-2xl flex items-center justify-center
                        ${danger
                            ? "bg-red-50 text-red-600"
                            : "bg-[#0B2E28]/5 text-[#0B2E28]"
                        }
                    `}
                >
                    {icon}
                </div>

                <div>
                    <p
                        className={`font-semibold ${danger
                                ? "text-red-700"
                                : "text-gray-900"
                            }`}
                    >
                        {title}
                    </p>

                    <p className="text-sm text-gray-500 mt-1">
                        {description}
                    </p>
                </div>

            </div>
        </button>
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
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
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