"use client";

import { useEffect, useState } from "react";
import { ShieldCheck, MapPin, CreditCard, CalendarClock } from "lucide-react";
import { getUserBookings } from "@/lib/user/booking.api";
import { useRouter } from "next/navigation";
import api from "@/lib/user/axios";

const STATUS_STYLE: Record<
    "confirmed" | "pending" | "cancelled",
    string
> = {
    confirmed: "bg-blue-100 text-blue-700",
    pending: "bg-yellow-100 text-yellow-700",
    cancelled: "bg-red-100 text-red-700",
};


type UIBooking = {
    id: string;
    service: string;
    date: string; // ISO string
    location: string;
    status: "confirmed" | "pending" | "cancelled";
    price: string;
};


export default function UserBookingsSection() {
    const [bookings, setBookings] = useState<UIBooking[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        load();
    }, []);

    function canReschedule(date: string) {
        const slotTime = new Date(date).getTime();
        const now = Date.now();

        const diffHours = (slotTime - now) / (1000 * 60 * 60);
        return diffHours >= 24;
    }

    function mapStatus(
        status: "CONFIRMED" | "PENDING_PAYMENT" | "CANCELLED"
    ): "confirmed" | "pending" | "cancelled" {
        switch (status) {
            case "CONFIRMED":
                return "confirmed";
            case "CANCELLED":
                return "cancelled";
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
                    service: "Full Valet",
                    date: b.serviceSlot.date,
                    location: b.serviceSlot.operator.name,
                    status: mapStatus(b.status),
                    price: `£${b.price}`,
                }))
            );
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="rounded-xl border bg-white p-6">
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
                                <p className="font-medium">{b.service}</p>
                                <p className="text-sm text-gray-500">
                                    {new Date(b.date).toLocaleString()}
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
                            {b.status === "pending" && (
                                <button
                                    onClick={() => goToStripe(b.id)}
                                    className="text-sm font-medium text-electric-teal hover:underline"
                                >
                                    Complete payment
                                </button>
                            )}

                            {b.status === "confirmed" && canReschedule(b.date) && (
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

                            {b.status === "confirmed" && !canReschedule(b.date) && (
                                <p className="text-xs text-gray-400">
                                    Reschedule locked (within 24h)
                                </p>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

