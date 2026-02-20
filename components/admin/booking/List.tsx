"use client";

import { useState } from "react";
import {
    Search,
    Filter,
    MoreVertical,
} from "lucide-react";
import BookingDetailsModal from "./DetailsModal";
import { AdminBooking, cancelAdminBooking, completeAdminBooking, confirmAdminBooking, updateAdminBooking } from "@/lib/admin/booking.api";
import ConfirmModal from "@/components/ui/ConfirmModal";
import toast from "react-hot-toast";
import { formatDate } from "@/lib/utils";

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
    const [actionBookingId, setActionBookingId] = useState<string | null>(null);
    const [actionType, setActionType] = useState<
        "confirm" | "cancel" | "complete" | null
    >(null);
    const [actionLoading, setActionLoading] = useState(false);


    const filteredBookings =
        statusFilter === "all"
            ? bookings
            : bookings.filter((b) => b.status === statusFilter);




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
                                    <th className="px-6 py-3 text-left">Type</th>
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
                                            {b.serviceSlot?.date
                                                ? formatDate(b.serviceSlot.date)
                                                : "-"}
                                        </td>

                                        <td className="px-6 py-4">
                                            <span
                                                className={`rounded-full px-3 py-1 text-xs font-medium ${STATUS_STYLES[b.status]}`}
                                            >
                                                {b.status}
                                            </span>
                                        </td>

                                        <td className="px-6 py-4">
                                            {b.subscriptionId ? (
                                                <span className="rounded-full bg-purple-100 text-purple-700 px-3 py-1 text-xs font-medium">
                                                    Subscription
                                                </span>
                                            ) : (
                                                <span className="rounded-full bg-gray-100 text-gray-700 px-3 py-1 text-xs font-medium">
                                                    One-time
                                                </span>
                                            )}
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
                                                                setActionBookingId(b.id);
                                                                setActionType("confirm");
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
                                                                setActionBookingId(b.id);
                                                                setActionType("complete");
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
                                                                    setActionBookingId(b.id);
                                                                    setActionType("cancel");
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

            <ConfirmModal
                open={!!actionBookingId}
                title={
                    actionType === "confirm"
                        ? "Confirm Booking"
                        : actionType === "complete"
                            ? "Complete Booking"
                            : "Cancel Booking"
                }
                description={
                    actionType === "cancel"
                        ? "Are you sure you want to cancel this booking? This cannot be undone."
                        : "Are you sure you want to proceed?"
                }
                confirmText={
                    actionType === "confirm"
                        ? "Confirm"
                        : actionType === "complete"
                            ? "Complete"
                            : "Cancel Booking"
                }
                variant={actionType === "cancel" ? "danger" : "default"}
                loading={actionLoading}
                onCancel={() => {
                    setActionBookingId(null);
                    setActionType(null);
                }}
                onConfirm={async () => {
                    if (!actionBookingId || !actionType) return;

                    try {
                        setActionLoading(true);

                        if (actionType === "confirm") {
                            await confirmAdminBooking(actionBookingId);
                            toast.success("Booking confirmed");
                        }

                        if (actionType === "complete") {
                            await completeAdminBooking(actionBookingId);
                            toast.success("Booking completed");
                        }

                        if (actionType === "cancel") {
                            await cancelAdminBooking(actionBookingId);
                            toast.success("Booking cancelled");
                        }

                        setActionBookingId(null);
                        setActionType(null);
                        onRefresh();
                    } catch (err) {
                        toast.error("Action failed");
                    } finally {
                        setActionLoading(false);
                    }
                }}
            />

            {/* DETAILS MODAL */}
            {selectedBooking && (
                <BookingDetailsModal
                    booking={selectedBooking}
                    onClose={() => setSelectedBooking(null)}
                    onSave={async (updates) => {
                        try {
                            if (!selectedBooking) return;

                            await updateAdminBooking(
                                selectedBooking.id,
                                updates
                            );

                            toast.success("Booking updated successfully");
                            setSelectedBooking(null);
                            onRefresh();
                        } catch (err) {
                            toast.error("Failed to update booking");
                        }
                    }}
                />
            )}
        </>
    );
}
