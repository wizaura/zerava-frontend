"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/user/axios";
import ConfirmModal from "@/components/ui/ConfirmModal";
import {
    Calendar,
    MapPin,
    CreditCard,
    AlertTriangle,
    RefreshCcw,
} from "lucide-react";
import Link from "next/link";

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
    postcode: string;
    address: string;
    nextBillingDate: string;
    upcomingBookings: UpcomingBooking[];
};

export default function Subscription() {
    const router = useRouter();

    const [subscription, setSubscription] =
        useState<Subscription | null>(null);
    const [loading, setLoading] = useState(true);

    const [confirmType, setConfirmType] =
        useState<"pause" | "cancel" | null>(null);

    const [actionLoading, setActionLoading] = useState(false);

    useEffect(() => {
        api.get("/subscriptions/me")
            .then((res) => setSubscription(res.data))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return null;
    if (!subscription) return null;

    const statusStyles = {
        active:
            "bg-electric-teal/10 text-electric-teal border border-electric-teal/30",
        past_due:
            "bg-yellow-100 text-yellow-700 border border-yellow-300",
        canceled:
            "bg-red-100 text-red-700 border border-red-300",
    };

    const handleConfirm = async () => {
        if (!confirmType) return;

        setActionLoading(true);
        try {
            await api.post(
                `/subscriptions/${subscription.id}/${confirmType}`
            );
            setConfirmType(null);
        } finally {
            setActionLoading(false);
        }
    };

    return (
        <div className="min-h-screen px-6 py-16">
            <div className="mx-auto max-w-5xl space-y-12">

                {/* HEADER */}
                <div>
                    <h1 className="text-4xl font-light tracking-tight text-gray-900">
                        Your Subscription
                    </h1>
                    <p className="mt-2 text-gray-500">
                        Manage your recurring Zerava vehicle care.
                    </p>
                </div>

                {/* MAIN CARD */}
                <div className="rounded-3xl max-w-3xl mx-auto border border-gray-200 bg-white p-10 shadow-lg">

                    <div className="flex justify-between items-start">
                        <div>
                            <h2 className="text-2xl font-medium text-gray-900">
                                {subscription.planName}
                            </h2>
                            <p className="mt-1 font-medium text-electric-teal">
                                {subscription.price}
                            </p>
                        </div>

                        <span
                            className={`px-4 py-1 rounded-full text-sm font-medium ${statusStyles[subscription.status]}`}
                        >
                            {subscription.status}
                        </span>
                    </div>

                    {/* DETAILS */}
                    <div className="mt-10 grid md:grid-cols-2 gap-10 text-sm">

                        <DetailItem
                            icon={<Calendar />}
                            title={formatWeekday(subscription.weekday)}
                            subtitle={`${formatTime(subscription.timeFrom)} – ${formatTime(subscription.timeTo)}`}
                        />

                        <DetailItem
                            icon={<MapPin />}
                            title={subscription.postcode}
                            subtitle={subscription.address}
                        />

                        <DetailItem
                            icon={<CreditCard />}
                            title="Next billing"
                            subtitle={formatDate(subscription.nextBillingDate)}
                        />
                    </div>

                    {/* ACTIONS */}
                    <div className="mt-12 pt-8 border-t border-gray-200 flex flex-wrap gap-4 justify-between items-center">

                        <Link
                            href={`/account/subscriptions/${subscription.id}/reschedule`}
                            className="rounded-full bg-electric-teal px-6 py-2 text-sm font-medium text-white hover:opacity-90 transition inline-block"
                        >
                            Reschedule Subscription
                        </Link>
                        <div className="flex gap-8 flex-wrap">
                            <button
                                onClick={() => setConfirmType("pause")}
                                className="flex items-center gap-2 text-yellow-600 text-sm hover:underline"
                            >
                                <RefreshCcw size={16} />
                                Pause Subscription
                            </button>
                            <button
                                onClick={() => setConfirmType("cancel")}
                                className="flex items-center gap-2 text-red-600 text-sm hover:underline"
                            >
                                <AlertTriangle size={16} />
                                Cancel Subscription
                            </button>
                        </div>

                    </div>
                </div>

                {/* UPCOMING BOOKINGS */}
                <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
                    <h3 className="text-xl font-medium text-gray-900 mb-6">
                        Upcoming Visits
                    </h3>

                    <div className="space-y-4">
                        {subscription.upcomingBookings.map((booking) => (
                            <VisitItem
                                key={booking.id}
                                booking={booking}
                                onReschedule={() =>
                                    router.push(`/reschedule/${booking.id}`)
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
                        : "Pause Subscription?"
                }
                description={
                    confirmType === "cancel"
                        ? "This will permanently stop your subscription and future bookings."
                        : "Your subscription will be paused until you reactivate it."
                }
                confirmText={
                    confirmType === "cancel" ? "Cancel Subscription" : "Pause"
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

function DetailItem({
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
            <div className="text-electric-teal">{icon}</div>
            <div>
                <p className="font-medium text-gray-900">{title}</p>
                <p className="text-gray-500">{subtitle}</p>
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
        <div className="flex justify-between items-center rounded-2xl border border-gray-200 p-5 hover:border-electric-teal transition">

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
                className="rounded-full border border-electric-teal px-5 py-2 text-sm font-medium text-electric-teal hover:bg-electric-teal hover:text-white transition"
            >
                Reschedule
            </button>
        </div>
    );
}

/* ---------- HELPERS ---------- */

function formatWeekday(day: number) {
    const days = [
        "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
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
