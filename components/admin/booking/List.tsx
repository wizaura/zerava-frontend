"use client";

import { useState } from "react";
import {
    Search,
    Filter,
    MoreVertical,
} from "lucide-react";
import BookingDetailsModal from "./DetailsModal";
import { AdminBooking, cancelAdminBooking, completeAdminBooking, confirmAdminBooking } from "@/lib/admin/booking.api";
import adminApi from "@/lib/admin/axios";
import toast from "react-hot-toast";

const STATUS_STYLES: Record<AdminBooking["status"], string> = {
    CONFIRMED: "bg-emerald-100 text-emerald-700",
    PENDING_PAYMENT: "bg-yellow-100 text-yellow-700",
    COMPLETED: "bg-blue-100 text-blue-700",
    CANCELLED: "bg-red-100 text-red-700",
};

export default function BookingsTable({
    bookings,
    loading,
    onRefresh,
    onSearch,
}: {
    bookings: AdminBooking[];
    loading?: boolean;
    onRefresh: () => void;
    onSearch?: (value: string) => void;
}) {
    const [statusFilter, setStatusFilter] = useState<
        "all" | AdminBooking["status"]
    >("all");

    const [activeMenu, setActiveMenu] = useState<string | null>(null);
    const [selectedBooking, setSelectedBooking] =
        useState<AdminBooking | null>(null);

    const filteredBookings =
        statusFilter === "all"
            ? bookings
            : bookings.filter((b) => b.status === statusFilter);

    async function confirmBooking(id: string) {
        if (!confirmAction("Confirm this booking?")) return;

        await confirmAdminBooking(id);

        toast.success("Booking confirmed");
        onRefresh();
    }

    async function cancelBooking(id: string) {
        if (!confirmAction("Cancel this booking? This cannot be undone.")) return;

        await cancelAdminBooking(id);

        toast.success("Booking cancelled");
        onRefresh();
    }

    async function completeBooking(id: string) {
        if (!confirmAction("Mark this booking as completed?")) return;

        await completeAdminBooking(id);

        toast.success("Booking completed");
        onRefresh();
    }


    function confirmAction(message: string) {
        return window.confirm(message);
    }


    return (
        <>
            <div className="rounded-xl border bg-white">
                {/* SEARCH + FILTER */}
                <div className="flex items-center justify-between gap-4 border-b p-4">
                    <div className="relative w-full max-w-md">
                        <Search
                            size={16}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                        />
                        <input
                            placeholder="Search by name, reference, or email..."
                            className="w-full rounded-md border pl-9 pr-3 py-2 text-sm"
                            onChange={(e) => onSearch?.(e.target.value)}
                        />
                    </div>

                    <div className="flex items-center gap-3">
                        <select
                            value={statusFilter}
                            onChange={(e) =>
                                setStatusFilter(
                                    e.target.value as "all" | AdminBooking["status"]
                                )
                            }
                            className="rounded-md border px-3 py-2 text-sm"
                        >
                            <option value="all">All statuses</option>
                            <option value="CONFIRMED">Confirmed</option>
                            <option value="PENDING_PAYMENT">Pending</option>
                            <option value="COMPLETED">Completed</option>
                            <option value="CANCELLED">Cancelled</option>
                        </select>

                        <button className="flex items-center gap-2 rounded-md border px-4 py-2 text-sm">
                            <Filter size={16} />
                            Filter
                        </button>
                    </div>
                </div>

                {/* TABLE */}
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
                                    <th className="px-6 py-3 text-left">Reference</th>
                                    <th className="px-6 py-3 text-left">Customer</th>
                                    <th className="px-6 py-3 text-left">Service</th>
                                    <th className="px-6 py-3 text-left">Date</th>
                                    <th className="px-6 py-3 text-left">Status</th>
                                    <th className="px-6 py-3 text-left">Price</th>
                                    <th className="px-6 py-3 text-right">Actions</th>
                                </tr>
                            </thead>

                            <tbody>
                                {filteredBookings.map((b) => (
                                    <tr
                                        key={b.id}
                                        className="border-b last:border-b-0"
                                    >
                                        <td className="px-6 py-4 font-medium">
                                            {b.referenceCode}
                                        </td>

                                        <td className="px-6 py-4">
                                            <div className="font-medium">{b.name}</div>
                                            <div className="text-xs text-gray-500">
                                                {b.email}
                                            </div>
                                        </td>

                                        <td className="px-6 py-4">
                                            {b.service.name}
                                        </td>

                                        <td className="px-6 py-4">
                                            {b?.serviceSlot?.date}
                                        </td>

                                        <td className="px-6 py-4">
                                            <span
                                                className={`rounded-full px-3 py-1 text-xs font-medium ${STATUS_STYLES[b.status]}`}
                                            >
                                                {b.status}
                                            </span>
                                        </td>

                                        <td className="px-6 py-4 font-medium">
                                            £{b.price.toFixed(2)}
                                        </td>

                                        <td className="relative px-6 py-4 text-right">
                                            <button
                                                onClick={() =>
                                                    setActiveMenu(
                                                        activeMenu === b.id ? null : b.id
                                                    )
                                                }
                                                className="rounded-md p-2 hover:bg-gray-100"
                                            >
                                                <MoreVertical size={16} />
                                            </button>

                                            {activeMenu === b.id && (
                                                <div className="absolute right-6 top-10 z-50 w-40 rounded-md border bg-white shadow-md">
                                                    {/* View */}
                                                    <button
                                                        onClick={() => {
                                                            setSelectedBooking(b);
                                                            setActiveMenu(null);
                                                        }}
                                                        className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
                                                    >
                                                        View details
                                                    </button>

                                                    {/* Confirm (only if pending) */}
                                                    {b.status === "PENDING_PAYMENT" && (
                                                        <button
                                                            onClick={() => {
                                                                setActiveMenu(null);
                                                                confirmBooking(b.id);
                                                            }}
                                                            className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
                                                        >
                                                            Confirm
                                                        </button>
                                                    )}

                                                    {/* Complete (only if confirmed) */}
                                                    {b.status === "CONFIRMED" && (
                                                        <button
                                                            onClick={() => {
                                                                setActiveMenu(null);
                                                                completeBooking(b.id);
                                                            }}
                                                            className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
                                                        >
                                                            Complete
                                                        </button>
                                                    )}

                                                    {/* Cancel (confirmed or pending) */}
                                                    {(b.status === "CONFIRMED" ||
                                                        b.status === "PENDING_PAYMENT") && (
                                                            <button
                                                                onClick={() => {
                                                                    setActiveMenu(null);
                                                                    cancelBooking(b.id);
                                                                }}
                                                                className="block w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-100"
                                                            >
                                                                Cancel
                                                            </button>
                                                        )}
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
                    onSave={(updates) => {
                        // PATCH /admin/bookings/:id
                        setSelectedBooking(null);
                    }}
                />
            )}
        </>
    );
}
