"use client";

import { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

import {
    getAdminBookings,
    AdminBooking,
    BookingStatus,
    updateAdminBooking,
} from "@/lib/admin/booking.api";

import BookingDetailsModal from "../booking/DetailsModal";
import toast from "react-hot-toast";

/* ---------- CALENDAR EVENT TYPE ---------- */
type CalendarEvent = {
    id: string;
    title: string;
    start: string;
    backgroundColor: string;
};

/* ---------- STATUS COLORS ---------- */
const STATUS_COLORS: Record<BookingStatus, string> = {
    CONFIRMED: "#22c55e", // green
    PENDING_PAYMENT: "#facc15",   // yellow
    COMPLETED: "#3b82f6", // blue
    CANCELLED: "#ef4444", // red
};

export default function AdminCalendarPage() {
    const [bookings, setBookings] = useState<AdminBooking[]>([]);
    const [events, setEvents] = useState<CalendarEvent[]>([]);
    const [selectedBooking, setSelectedBooking] =
        useState<AdminBooking | null>(null);

    /* ---------- LOAD BOOKINGS ---------- */
    useEffect(() => {
        getAdminBookings().then((data) => {
            setBookings(data);

            setEvents(
                data.map((b) => ({
                    id: b.id,
                    title: `${b.timeFrom} – ${b.timeTo}\n${b.serviceSlot?.operator?.name ?? ""}`,
                    start: new Date(b.serviceSlot!.date).toISOString(),
                    backgroundColor: STATUS_COLORS[b.status],
                }))
            );
        });
    }, []);

    return (
        <div className="space-y-6">
            {/* CALENDAR */}
            <div className="rounded-xl border bg-white p-6">
                <FullCalendar
                    plugins={[dayGridPlugin, interactionPlugin]}
                    initialView="dayGridMonth"
                    headerToolbar={{
                        left: "prev",
                        center: "title",
                        right: "today next",
                    }}
                    events={events}
                    height="auto"
                    dayMaxEvents
                    eventDisplay="block"
                    displayEventTime={false}
                    eventClassNames={() =>
                        "rounded-lg px-2 py-1 text-xs font-medium text-black leading-tight cursor-pointer transition-all duration-200 hover:brightness-90 hover:scale-[1.02] hover:shadow-md"
                    }
                    eventClick={(info) => {
                        const booking = bookings.find(
                            (b) => b.id === info.event.id
                        );
                        if (booking) {
                            setSelectedBooking(booking);
                        }
                    }}
                />
            </div>

            {/* LEGEND */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600">
                <Legend color={STATUS_COLORS.CONFIRMED} label="Confirmed" />
                <Legend color={STATUS_COLORS.PENDING_PAYMENT} label="Pending" />
                <Legend color={STATUS_COLORS.COMPLETED} label="Completed" />
                <Legend color={STATUS_COLORS.CANCELLED} label="Cancelled" />
            </div>

            {/* DETAILS MODAL */}
            {selectedBooking && (
                <BookingDetailsModal
                    booking={selectedBooking}
                    onClose={() => setSelectedBooking(null)}
                    onSave={async (updates) => {
                        if (!selectedBooking) return;

                        try {
                            await updateAdminBooking(
                                selectedBooking.id,
                                updates
                            );

                            const updatedBooking = {
                                ...selectedBooking,
                                ...updates,
                            };

                            // Optimistic update (notes only)
                            setBookings((prev) =>
                                prev.map((b) =>
                                    b.id === selectedBooking.id
                                        ? updatedBooking
                                        : b
                                )
                            );

                            setEvents((prev) =>
                                prev.map((event) =>
                                    event.id === selectedBooking.id
                                        ? {
                                            ...event,
                                            backgroundColor:
                                                updates.status
                                                    ? STATUS_COLORS[updates.status]
                                                    : event.backgroundColor,
                                        }
                                        : event
                                )
                            );

                            toast.success("Booking updated");
                            setSelectedBooking(null);
                        } catch (err) {
                            toast.error("Failed to update booking");
                        }
                    }}
                />
            )}
        </div>
    );
}

/* ---------- LEGEND ---------- */
function Legend({ color, label }: { color: string; label: string }) {
    return (
        <div className="flex items-center gap-2">
            <span
                className="h-3 w-3 rounded-full"
                style={{ backgroundColor: color }}
            />
            <span>{label}</span>
        </div>
    );
}
