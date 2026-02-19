"use client";

import { useEffect, useState } from "react";
import { ShieldCheck, MapPin, CreditCard, CalendarClock } from "lucide-react";
import { getUserBookings } from "@/lib/user/booking.api";
import { useRouter } from "next/navigation";
import api from "@/lib/user/axios";
import ConfirmModal from "@/components/ui/ConfirmModal";

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
    service: string;
    date: string;        // YYYY-MM-DD
    timeFrom: string;    // "10:00"
    timeTo: string;      // "10:50"
    location: string;
    rescheduleCount: number;
    subscriptionId: string;
    status: "confirmed" | "pending" | "cancelled" | "completed";
    price: string;
};



export default function UserBookingsSection() {
    const [bookings, setBookings] = useState<UIBooking[]>([]);
    const [loading, setLoading] = useState(true);
    const [cancelTarget, setCancelTarget] = useState<UIBooking | null>(null);
    const [cancelLoading, setCancelLoading] = useState(false);

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
                    service: b.service.name,
                    date: b.date,
                    timeFrom: b.timeFrom,
                    timeTo: b.timeTo,
                    location: `${b.address}, ${b.postcode}`,
                    subscriptionId: b.subscriptionId,
                    rescheduleCount: b.rescheduleCount,
                    status: mapStatus(b.status),
                    price: `£${b.price}`,
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

            <div className="space-y-3">
                {bookings.map((b) => (
                    <div
                        key={b.id}
                        className="flex items-center justify-between rounded-xl bg-gray-50 p-4"
                    >
                        {/* Left */}
                        <div className="flex items-center gap-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-200">
                                <ShieldCheck size={22} />
                            </div>

                            <div>
                                <div className="flex items-center gap-2">
                                    <p className="font-medium">{b.service}</p>

                                    {b.subscriptionId && (
                                        <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-700">
                                            Subscription
                                        </span>
                                    )}
                                </div>

                                <p className="text-sm text-gray-500">
                                    {formatDateTime(b.date, b.timeFrom, b.timeTo)}
                                </p>

                                <p className="flex items-center gap-1 text-sm text-gray-500">
                                    <MapPin size={14} />
                                    {b.location}
                                </p>
                            </div>
                        </div>

                        {/* Right */}
                        <div className="flex flex-col items-end gap-2">
                            <span
                                className={`rounded-md px-3 py-1 text-xs font-medium ${STATUS_STYLE[b.status]}`}
                            >
                                {b.status}
                            </span>

                            <p className="font-semibold">{b.price}</p>

                            {/* Actions */}
                            {/* Actions */}
                            {b.status === "pending" && (
                                <button
                                    onClick={() => goToStripe(b.id)}
                                    className="text-sm font-medium text-electric-teal hover:underline"
                                >
                                    Complete payment
                                </button>
                            )}

                            {/* RESCHEDULE */}
                            {b.status === "confirmed" && canReschedule(b.date, b.timeFrom) && b.rescheduleCount < 1 && (
                                <button
                                    onClick={() =>
                                        router.push(`/account/bookings/${b.id}/reschedule`)
                                    }
                                    className="flex items-center gap-1 text-sm font-medium text-electric-teal hover:underline"
                                >
                                    <CalendarClock size={14} />
                                    Reschedule
                                </button>
                            )}
                            {b.status === "confirmed" && canReschedule(b.date, b.timeFrom) && (
                                <button
                                    onClick={() => setCancelTarget(b)}
                                    className="text-sm font-semibold text-red-600 hover:underline"
                                >
                                    Cancel Booking
                                </button>
                            )}

                            {b.status === "confirmed" && canReschedule(b.date, b.timeFrom) && b.rescheduleCount >= 1 && (
                                <p className="text-xs text-gray-400">
                                    Reschedule limit reached
                                </p>
                            )}

                            {/* LOCK MESSAGE */}
                            {b.status === "confirmed" && !canReschedule(b.date, b.timeFrom) && (
                                <p className="text-xs text-gray-400">
                                    Changes locked (within 24h)
                                </p>
                            )}
                        </div>
                    </div>
                ))}
            </div>
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
