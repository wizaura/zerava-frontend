"use client";

import { useEffect, useState } from "react";
import { ShieldCheck, MapPin, CreditCard, CalendarClock, Calendar } from "lucide-react";
import { getUserBookings } from "@/lib/user/booking.api";
import { useRouter } from "next/navigation";
import api from "@/lib/user/axios";
import ConfirmModal from "@/components/ui/ConfirmModal";
import Link from "next/link";
import BookingManageModal from "./BookingManageModule";

const STATUS_STYLE: Record<
    "confirmed" | "pending" | "cancelled" | "completed",
    string
> = {
    confirmed: "bg-blue-100 text-blue-700",
    pending: "bg-yellow-100 text-yellow-700",
    cancelled: "bg-red-100 text-red-700",
    completed: "bg-blue-100 text-blue-700",
};


type UIBooking = {
    id: string;
    referenceCode: string | null;

    service: string;

    date: string;
    timeFrom: string;
    timeTo: string;

    location: string;

    vehicle: string | null;

    rescheduleCount: number;
    subscriptionId: string | null;

    status: "confirmed" | "pending" | "cancelled" | "completed";

    price: number;
    originalPrice: number | null;
    discountAmount: number;

    operatorName: string | null;
};



export default function UserBookingsSection() {
    const [bookings, setBookings] = useState<UIBooking[]>([]);
    const [loading, setLoading] = useState(true);
    const [cancelTarget, setCancelTarget] = useState<UIBooking | null>(null);
    const [cancelLoading, setCancelLoading] = useState(false);
    const [selectedBooking, setSelectedBooking] = useState<UIBooking | null>(null);

    const router = useRouter();

    useEffect(() => {
        load();
    }, []);

    function canReschedule(date: string, timeFrom: string) {
        const [h, m] = timeFrom.split(":").map(Number);
        const d = new Date(date);
        d.setHours(h, m, 0, 0);

        const diffHours = (d.getTime() - Date.now()) / (1000 * 60 * 60);
        return diffHours >= 24;
    }


    function mapStatus(
        status: "CONFIRMED" | "PENDING_PAYMENT" | "CANCELLED" | "COMPLETED"
    ): "confirmed" | "pending" | "cancelled" | "completed" {
        switch (status) {
            case "CONFIRMED":
                return "confirmed";
            case "CANCELLED":
                return "cancelled";
            case "COMPLETED":
                return "completed";
            default:
                return "pending";
        }
    }


    async function goToStripe(bookingId: string) {
        const session = await api.post("/payments/create-session", {
            bookingId,
        });

        window.location.href = session.data.url;
    }



    async function load() {
        setLoading(true);
        try {
            const data = await getUserBookings();

            setBookings(
                data.map((b) => ({
                    id: b.id,
                    referenceCode: b.referenceCode,

                    service: b.service.name,

                    date: b.date,
                    timeFrom: b.timeFrom,
                    timeTo: b.timeTo,

                    location: `${b.address}, ${b.postcode}`,

                    vehicle: b.make
                        ? `${b.make} ${b.model} (${b.registrationNumber})`
                        : null,

                    subscriptionId: b.subscriptionId,
                    rescheduleCount: b.rescheduleCount,

                    status: mapStatus(b.status),

                    price: b.price,
                    originalPrice: b.originalPrice,
                    discountAmount: b.discountAmount,

                    operatorName: b.operator?.name ?? null,
                }))
            );
        } finally {
            setLoading(false);
        }
    }

    async function handleCancelConfirm() {
        if (!cancelTarget) return;

        try {
            setCancelLoading(true);

            await api.patch(`/bookings/${cancelTarget.id}/cancel`);

            setCancelTarget(null);
            await load();
        } finally {
            setCancelLoading(false);
        }
    }

    function getCancelMessage(b: UIBooking) {
        if (b.subscriptionId) {
            return "This booking is part of a subscription. No refund will be issued.";
        }

        if (canReschedule(b.date, b.timeFrom)) {
            return "You will receive a 100% refund. This cannot be undone.";
        }

        return "This booking is within 24 hours. No refund will be issued.";
    }

    return (
        <div className="mt-6 rounded-xl max-w-6xl mx-auto border bg-white p-6">
            <h2 className="mb-4 text-lg font-semibold">All Bookings</h2>
            {bookings.length === 0 ? (
                /* ---------- EMPTY STATE ---------- */
                <div className="py-16 text-center">

                    <div className="mx-auto w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center mb-5">
                        <Calendar className="w-6 h-6 text-gray-500" />
                    </div>

                    <h3 className="text-lg font-medium text-gray-900">
                        No bookings yet
                    </h3>

                    <p className="mt-2 text-sm text-gray-500">
                        You haven’t scheduled any Zerava services.
                        Book your first eco-friendly vehicle care today.
                    </p>

                    <Link
                        href="/booking"
                        className="mt-6 inline-flex items-center justify-center rounded-full bg-[#0B2E28] px-6 py-2.5 text-sm font-medium text-white hover:opacity-90 transition"
                    >
                        Book a Service
                    </Link>
                </div>
            ) : (
                <div className="space-y-3">
                    {bookings.map((b) => (
                        <div
                            key={b.id}
                            className="flex flex-col sm:flex-row sm:items-center sm:justify-between rounded-xl bg-gray-50 p-4 gap-4"
                        >
                            {/* LEFT SIDE */}
                            <div className="flex items-start gap-4">
                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-200 shrink-0">
                                    <ShieldCheck size={22} />
                                </div>

                                <div className="flex-1">
                                    {/* Top row */}
                                    <div className="flex items-center justify-between sm:justify-start gap-2">
                                        <p className="font-medium">{b.service}</p>

                                        <span
                                            className={`sm:hidden rounded-md px-2 py-0.5 text-xs font-medium ${STATUS_STYLE[b.status]}`}
                                        >
                                            {b.status}
                                        </span>
                                    </div>

                                    {b.subscriptionId && (
                                        <span className="mt-1 inline-block rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-700">
                                            Subscription
                                        </span>
                                    )}

                                    <p className="mt-1 text-sm text-gray-500">
                                        {formatDateTime(b.date, b.timeFrom, b.timeTo)}
                                    </p>

                                    <p className="flex items-center gap-1 text-sm text-gray-500">
                                        <MapPin size={14} />
                                        {b.location}
                                    </p>
                                </div>
                            </div>

                            {/* RIGHT SIDE */}
                            <div className="flex flex-col sm:items-end gap-2 w-full sm:w-auto">
                                {/* Status (desktop only) */}
                                <span
                                    className={`hidden sm:inline rounded-md px-3 py-1 text-xs font-medium ${STATUS_STYLE[b.status]}`}
                                >
                                    {b.status}
                                </span>

                                <p className="font-semibold text-sm sm:text-base">
                                    {b.price}
                                </p>

                                {/* ACTIONS */}
                                <button
                                    onClick={() => setSelectedBooking(b)}
                                    className="rounded-full border border-[#0B2E28] px-4 py-1.5 text-sm font-medium text-[#0B2E28] hover:bg-[#0B2E28] hover:text-white transition"
                                >
                                    Manage
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            <BookingManageModal
                booking={selectedBooking}
                onClose={() => setSelectedBooking(null)}
                onCancelClick={() => {
                    if (selectedBooking) {
                        setCancelTarget(selectedBooking);
                        setSelectedBooking(null);
                    }
                }}
                canReschedule={canReschedule}
                goToStripe={goToStripe}
            />
            <ConfirmModal
                open={!!cancelTarget}
                title="Cancel Booking"
                description={cancelTarget ? getCancelMessage(cancelTarget) : ""}
                confirmText="Yes, Cancel Booking"
                cancelText="Keep Booking"
                loading={cancelLoading}
                variant="danger"
                onCancel={() => setCancelTarget(null)}
                onConfirm={handleCancelConfirm}
            />
        </div>
    );
}

function formatDateTime(date: string, from: string, to: string) {
    const d = new Date(date);

    const datePart = d.toLocaleDateString("en-GB", {
        weekday: "short",
        day: "numeric",
        month: "short",
        year: "numeric",
    });

    return `${datePart} · ${formatTime(from)} – ${formatTime(to)}`;
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
