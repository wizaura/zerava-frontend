"use client";

import { useState } from "react";
import {
    Search,
    Filter,
    MoreVertical,
    X,
    User,
    Mail,
    Phone,
    MapPin,
} from "lucide-react";
import BookingDetailsModal from "./DetailsModal";

export type Booking = {
    reference: string;
    customerName: string;
    customerEmail: string;
    service: string;
    date: string;
    status: "confirmed" | "pending" | "cancelled";
    price: string;
};

const STATUS_STYLES: Record<Booking["status"], string> = {
    confirmed: "bg-emerald-100 text-emerald-700",
    pending: "bg-yellow-100 text-yellow-700",
    cancelled: "bg-red-100 text-red-700",
};

export default function BookingsTable({
    bookings,
    loading,
    onSearch,
}: {
    bookings: Booking[];
    loading?: boolean;
    onSearch?: (value: string) => void;
}) {
    const [statusFilter, setStatusFilter] = useState<
        "all" | Booking["status"]
    >("all");
    const [activeMenu, setActiveMenu] = useState<string | null>(null);
    const [selectedBooking, setSelectedBooking] = useState<Booking | null>(
        null
    );

    const filteredBookings =
        statusFilter === "all"
            ? bookings
            : bookings.filter((b) => b.status === statusFilter);

    return (
        <>
            <div className="rounded-xl border bg-white">
                {/* Search + Filter */}
                <div className="flex items-center justify-between gap-4 border-b p-4">
                    <div className="relative w-full max-w-md">
                        <Search
                            size={16}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                        />
                        <input
                            placeholder="Search by name, reference, or postcode..."
                            className="w-full rounded-md border pl-9 pr-3 py-2 text-sm"
                            onChange={(e) => onSearch?.(e.target.value)}
                        />
                    </div>

                    <div className="flex items-center gap-3">
                        <select
                            value={statusFilter}
                            onChange={(e) =>
                                setStatusFilter(
                                    e.target.value as
                                    | "all"
                                    | Booking["status"]
                                )
                            }
                            className="rounded-md border px-3 py-2 text-sm"
                        >
                            <option value="all">All statuses</option>
                            <option value="confirmed">Confirmed</option>
                            <option value="pending">Pending</option>
                            <option value="cancelled">Cancelled</option>
                        </select>

                        <button className="flex items-center gap-2 rounded-md border px-4 py-2 text-sm">
                            <Filter size={16} />
                            Filter
                        </button>
                    </div>
                </div>

                {loading && (
                    <div className="p-6 text-sm text-gray-500">
                        Loading bookings…
                    </div>
                )}

                {!loading && (
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead className="border-b bg-gray-50 text-gray-500">
                                <tr>
                                    <th className="px-6 py-3 text-left">
                                        Reference
                                    </th>
                                    <th className="px-6 py-3 text-left">
                                        Customer
                                    </th>
                                    <th className="px-6 py-3 text-left">
                                        Service
                                    </th>
                                    <th className="px-6 py-3 text-left">
                                        Date
                                    </th>
                                    <th className="px-6 py-3 text-left">
                                        Status
                                    </th>
                                    <th className="px-6 py-3 text-left">
                                        Price
                                    </th>
                                    <th className="px-6 py-3 text-right">
                                        Actions
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {filteredBookings.map((b) => (
                                    <tr
                                        key={b.reference}
                                        className="border-b last:border-b-0"
                                    >
                                        <td className="px-6 py-4 font-medium">
                                            {b.reference}
                                        </td>

                                        <td className="px-6 py-4">
                                            <div className="font-medium">
                                                {b.customerName}
                                            </div>
                                            <div className="text-xs text-gray-500">
                                                {b.customerEmail}
                                            </div>
                                        </td>

                                        <td className="px-6 py-4">
                                            {b.service}
                                        </td>

                                        <td className="px-6 py-4">
                                            {b.date}
                                        </td>

                                        <td className="px-6 py-4">
                                            <span
                                                className={`rounded-full px-3 py-1 text-xs font-medium ${STATUS_STYLES[b.status]}`}
                                            >
                                                {b.status}
                                            </span>
                                        </td>

                                        <td className="px-6 py-4 font-medium">
                                            {b.price}
                                        </td>

                                        <td className="relative px-6 py-4 text-right">
                                            <button
                                                onClick={() =>
                                                    setActiveMenu(
                                                        activeMenu ===
                                                            b.reference
                                                            ? null
                                                            : b.reference
                                                    )
                                                }
                                                className="rounded-md p-2 hover:bg-gray-100"
                                            >
                                                <MoreVertical size={16} />
                                            </button>

                                            {activeMenu === b.reference && (
                                                <div className="absolute right-6 top-10 z-50 w-40 rounded-md border bg-white shadow-md">
                                                    <button
                                                        onClick={() => {
                                                            setSelectedBooking(
                                                                b
                                                            );
                                                            setActiveMenu(null);
                                                        }}
                                                        className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
                                                    >
                                                        View details
                                                    </button>

                                                    <button className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-100">
                                                        Confirm
                                                    </button>

                                                    <button className="block w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-100">
                                                        Cancel
                                                    </button>
                                                </div>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* DETAILS MODAL */}
            {selectedBooking && (
                <BookingDetailsModal
                    booking={selectedBooking}
                    onClose={() => setSelectedBooking(null)}
                />
            )}
        </>
    );
}
