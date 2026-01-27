"use client";

import { useEffect, useState } from "react";
import { ShieldCheck, MapPin } from "lucide-react";
import {
    getUserBookings,
    UserBooking,
} from "@/lib/user/booking.api";

type UIBooking = {
    id: string;
    service: string;
    date: string;
    location: string;
    status: "confirmed" | "pending" | "cancelled";
    price: string;
};

const STATUS_STYLE: Record<UIBooking["status"], string> = {
    confirmed: "bg-blue-100 text-blue-700",
    pending: "bg-yellow-100 text-yellow-700",
    cancelled: "bg-red-100 text-red-700",
};

export default function UserBookingsSection() {
    const [bookings, setBookings] = useState<UIBooking[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        load();
    }, []);

    async function load() {
        setLoading(true);
        try {
            const data = await getUserBookings();

            setBookings(
                data.map((b) => ({
                    id: b.id,
                    service: "Full Valet", // or map from serviceType if needed
                    date: new Date(b.serviceSlot.date).toDateString(),
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

            {loading && (
                <p className="text-sm text-gray-500">Loading bookings…</p>
            )}

            {!loading && bookings.length === 0 && (
                <p className="text-sm text-gray-500">
                    You don’t have any bookings yet.
                </p>
            )}

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
                                    {b.date}
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
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
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
