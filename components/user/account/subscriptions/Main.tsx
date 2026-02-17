"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/user/axios";
import {
    Calendar,
    MapPin,
    Clock,
    CreditCard,
    AlertTriangle,
    RefreshCcw,
} from "lucide-react";

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

/* ---------- COMPONENT ---------- */

export default function Subscription() {
    const router = useRouter();

    const [subscription, setSubscription] = useState<Subscription | null>(null);
    const [loading, setLoading] = useState(true);

    /* ---------- LOAD DATA ---------- */

    useEffect(() => {
        api.get("/subscriptions/me")
            .then((res) => {
                setSubscription(res.data);
            })
            .finally(() => setLoading(false));
    }, []);

    if (loading) return null;
    if (!subscription) return null;

    const statusColor =
        subscription.status === "active"
            ? "bg-emerald-100 text-emerald-700"
            : subscription.status === "past_due"
                ? "bg-yellow-100 text-yellow-700"
                : "bg-red-100 text-red-700";

    return (
        <div className="min-h-screen bg-white px-6 py-14">
            <div className="max-w-5xl mx-auto space-y-12">

                {/* HEADER */}
                <div>
                    <h1 className="text-4xl font-semibold tracking-tight text-gray-900">
                        Your Subscription
                    </h1>
                    <p className="text-gray-500 mt-2">
                        Manage your recurring vehicle care effortlessly.
                    </p>
                </div>

                {/* MAIN CARD */}
                <div className="rounded-3xl border border-gray-200 p-10 shadow-sm bg-white">

                    <div className="flex justify-between items-start">
                        <div>
                            <h2 className="text-2xl font-medium text-gray-900">
                                {subscription.planName}
                            </h2>
                            <p className="text-[#38D6C4] mt-1 font-medium">
                                {subscription.price}
                            </p>
                        </div>

                        <span
                            className={`px-4 py-1 rounded-full text-sm font-medium ${statusColor}`}
                        >
                            {subscription.status}
                        </span>
                    </div>

                    {/* DETAILS */}
                    <div className="mt-10 grid md:grid-cols-2 gap-10 text-sm">

                        {/* Schedule */}
                        <div className="flex gap-4">
                            <Calendar className="text-[#38D6C4]" />
                            <div>
                                <p className="font-medium text-gray-900">
                                    {formatWeekday(subscription.weekday)}
                                </p>
                                <p className="text-gray-600">
                                    {formatTime(subscription.timeFrom)} –{" "}
                                    {formatTime(subscription.timeTo)}
                                </p>
                            </div>
                        </div>

                        {/* Address */}
                        <div className="flex gap-4">
                            <MapPin className="text-[#38D6C4]" />
                            <div>
                                <p className="font-medium text-gray-900">
                                    {subscription.postcode}
                                </p>
                                <p className="text-gray-600">
                                    {subscription.address}
                                </p>
                            </div>
                        </div>

                        {/* Billing */}
                        <div className="flex gap-4">
                            <CreditCard className="text-[#38D6C4]" />
                            <div>
                                <p className="font-medium text-gray-900">
                                    Next billing
                                </p>
                                <p className="text-gray-600">
                                    {formatDate(subscription.nextBillingDate)}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* ACTIONS */}
                    <div className="mt-12 pt-8 border-t border-gray-200 flex justify-between items-center">

                        <button className="flex items-center gap-2 text-yellow-600 text-sm hover:underline">
                            <RefreshCcw size={16} />
                            Pause subscription
                        </button>

                        <button className="flex items-center gap-2 text-red-600 text-sm hover:underline">
                            <AlertTriangle size={16} />
                            Cancel subscription
                        </button>
                    </div>
                </div>

                {/* UPCOMING BOOKINGS */}
                <div className="rounded-3xl border border-gray-200 p-8 bg-white shadow-sm">
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
        <div className="flex justify-between items-center border border-gray-200 rounded-2xl p-5 hover:border-[#38D6C4] transition">

            <div>
                <p className="font-medium text-gray-900">
                    {formatDate(booking.date)}
                </p>
                <p className="text-gray-600 text-sm">
                    {formatTime(booking.timeFrom)} –{" "}
                    {formatTime(booking.timeTo)}
                </p>
            </div>

            <button
                onClick={onReschedule}
                className="px-5 py-2 rounded-full bg-[#38D6C4] text-white text-sm font-medium hover:opacity-90 transition"
            >
                Reschedule
            </button>
        </div>
    );
}

/* ---------- HELPERS ---------- */

function formatWeekday(day: number) {
    const days = [
        "Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"
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
