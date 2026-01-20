"use client";

import { useEffect, useState } from "react";
import {
    getAdminBookings,
    AdminBooking,
    BookingStatus,
} from "@/app/lib/admin/booking.api";
import BookingsTable from "./List";

type UIBooking = {
    reference: string;
    customerName: string;
    customerEmail: string;
    service: string;
    date: string;
    status: "confirmed" | "pending" | "cancelled";
    price: string;
};

export default function AdminBookingsPage() {
    const [bookings, setBookings] = useState<AdminBooking[]>([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);

    async function load(searchValue?: string) {
        setLoading(true);
        try {
            const data = await getAdminBookings({
                search: searchValue,
            });
            setBookings(data);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        load();
    }, []);

    const uiBookings: UIBooking[] = bookings.map((b) => ({
        reference: b.referenceCode,
        customerName: b.name,
        customerEmail: b.email,
        service: b.serviceType.toLowerCase(),
        date: new Date(b.serviceSlot.date).toDateString(),
        status: mapStatus(b.status),
        price: `£${b.price}`,
    }));

    return (
        <BookingsTable
            bookings={uiBookings}
            loading={loading}
            onSearch={(v) => {
                setSearch(v);
                load(v);
            }}
        />
    );
}

function mapStatus(status: BookingStatus): "confirmed" | "pending" | "cancelled" {
    switch (status) {
        case "CONFIRMED":
            return "confirmed";
        case "CANCELLED":
            return "cancelled";
        default:
            return "pending";
    }
}
