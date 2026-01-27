"use client";

import { useEffect, useState } from "react";
import {
    getAdminBookings,
    AdminBooking,
} from "@/lib/admin/booking.api";
import BookingsTable from "./List";

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
        <BookingsTable
            bookings={bookings}
            loading={loading}
            onSearch={(value) => load(value)}
        />
    );
}
