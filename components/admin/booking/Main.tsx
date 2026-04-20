"use client";

import { useEffect, useState } from "react";
import {
    getAdminBookings,
    AdminBooking,
} from "@/lib/admin/booking.api";
import BookingsTable from "./List";
import { Plus } from "lucide-react";
import Link from "next/link";

export default function AdminBookingsPage() {
    const [bookings, setBookings] = useState<AdminBooking[]>([]);
    const [loading, setLoading] = useState(false);

    async function load(search?: string) {
        setLoading(true);
        try {
            const data = await getAdminBookings({
                search,
            });
            setBookings(data);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        load();
    }, []);

    return (
        <div className="space-y-6">

            {/* 🔥 HEADER */}
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-semibold">
                    Bookings
                </h1>

                <Link
                    href="/admin/bookings/new"
                    className="flex items-center gap-2 bg-electric-teal text-white px-4 py-2 rounded-full text-sm font-medium hover:opacity-90 transition"
                >
                    <Plus size={16} />
                    Manual Booking
                </Link>
            </div>

            {/* TABLE */}
            <BookingsTable
                bookings={bookings}
                loading={loading}
                onRefresh={() => load()}
                onSearch={(value) => load(value)}
            />
        </div>
    );
}