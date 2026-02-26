"use client";

import { X, MapPin, ShieldCheck, Car, User } from "lucide-react";
import { useRouter } from "next/navigation";

export default function BookingManageModal({
    booking,
    onClose,
    onCancelClick,
    goToStripe,
}: any) {
    const router = useRouter();

    if (!booking) return null;

    /* ===============================
       TIME CALCULATION
    =============================== */

    function getHoursBefore(date: string, timeFrom: string) {
        const bookingDateStr = new Date(date)
            .toISOString()
            .split("T")[0];

        const slotStart = new Date(
            `${bookingDateStr}T${timeFrom}:00`
        );

        return (
            (slotStart.getTime() - Date.now()) /
            (1000 * 60 * 60)
        );
    }

    const hoursBefore =
        booking.status === "confirmed"
            ? getHoursBefore(booking.date, booking.timeFrom)
            : 0;

    /* ===============================
       RESCHEDULE RULES
    =============================== */

    const isFreeReschedule = hoursBefore >= 24;
    const isFeeReschedule = hoursBefore >= 12 && hoursBefore < 24;
    const isLockedReschedule = hoursBefore < 12;

    /* ===============================
       CANCEL RULES
    =============================== */

    const isFreeCancel = hoursBefore >= 24;
    const isHalfCancel =
        hoursBefore < 24 && hoursBefore > 0;
    const isNoShow = hoursBefore <= 0;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-4"
            onClick={onClose}
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-2xl max-h-[90vh] bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden"
            >
                {/* HEADER */}
                <div className="flex items-center justify-between px-8 py-6 border-b">
                    <div className="flex items-center gap-4">
                        <div className="h-14 w-14 rounded-2xl bg-electric-teal/20 flex items-center justify-center">
                            <ShieldCheck
                                className="text-electric-teal"
                                size={22}
                            />
                        </div>

                        <div>
                            <h2 className="text-xl font-semibold">
                                {booking.service}
                            </h2>
                            <p className="text-sm text-gray-500">
                                Ref: {booking.referenceCode ?? booking.id}
                            </p>
                        </div>
                    </div>

                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-black transition"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* BODY */}
                <div className="flex-1 overflow-y-auto px-8 py-6 space-y-6">

                    <Section label="Schedule">
                        {formatDateTime(
                            booking.date,
                            booking.timeFrom,
                            booking.timeTo
                        )}
                    </Section>

                    <Section
                        label="Service Address"
                        icon={<MapPin size={14} />}
                    >
                        {booking.location}
                    </Section>

                    {booking.vehicle && (
                        <Section
                            label="Vehicle"
                            icon={<Car size={14} />}
                        >
                            {booking.vehicle}
                        </Section>
                    )}

                    {booking.operatorName && (
                        <Section
                            label="Assigned Operator"
                            icon={<User size={14} />}
                        >
                            {booking.operatorName}
                        </Section>
                    )}

                    {/* PAYMENT */}
                    <div>
                        <p className="text-gray-500 mb-2">Payment</p>

                        {booking.originalPrice &&
                            booking.discountAmount > 0 && (
                                <>
                                    <p className="text-gray-400 line-through text-sm">
                                        £{booking.originalPrice.toFixed(2)}
                                    </p>
                                    <p className="text-electric-teal text-sm font-medium">
                                        Discount: -£
                                        {booking.discountAmount.toFixed(2)}
                                    </p>
                                </>
                            )}

                        <p className="font-semibold text-xl mt-1">
                            £{booking.price.toFixed(2)}
                        </p>
                    </div>

                    <Section label="Status">
                        <span className="capitalize font-medium">
                            {booking.status}
                        </span>
                    </Section>
                </div>

                {/* FOOTER */}
                <div className="border-t px-8 py-6 bg-white">

                    <div className="flex flex-col md:flex-row gap-3">

                        {/* COMPLETE PAYMENT */}
                        {booking.status === "pending" && (
                            <button
                                onClick={() =>
                                    goToStripe(booking.id)
                                }
                                className="flex-1 rounded-full bg-electric-teal text-white py-3 font-semibold hover:opacity-90 transition"
                            >
                                Complete Payment
                            </button>
                        )}

                        {/* RESCHEDULE */}
                        {booking.status === "confirmed" &&
                            booking.rescheduleCount < 1 && (
                                <>
                                    {isFreeReschedule && (
                                        <button
                                            onClick={() =>
                                                router.push(
                                                    `/account/bookings/${booking.id}/reschedule`
                                                )
                                            }
                                            className="flex-1 rounded-full border border-electric-teal py-3 font-medium text-electric-teal hover:bg-electric-teal hover:text-white transition"
                                        >
                                            Reschedule (Free)
                                        </button>
                                    )}

                                    {isFeeReschedule && (
                                        <button
                                            onClick={() =>
                                                router.push(
                                                    `/account/bookings/${booking.id}/reschedule`
                                                )
                                            }
                                            className="flex-1 rounded-full border border-orange-500 py-3 font-medium text-orange-600 hover:bg-orange-500 hover:text-white transition"
                                        >
                                            Reschedule (£5 fee)
                                        </button>
                                    )}

                                    {isLockedReschedule && (
                                        <button
                                            disabled
                                            className="flex-1 rounded-full border border-gray-300 py-3 font-medium text-gray-400 cursor-not-allowed"
                                        >
                                            Reschedule Unavailable
                                        </button>
                                    )}
                                </>
                            )}

                        {/* CANCEL */}
                        {booking.status === "confirmed" && (
                            <>
                                {isFreeCancel && (
                                    <button
                                        onClick={onCancelClick}
                                        className="flex-1 rounded-full border border-red-500 text-red-600 py-3 font-semibold hover:bg-red-50 transition"
                                    >
                                        Cancel (Full Refund)
                                    </button>
                                )}

                                {isHalfCancel && (
                                    <button
                                        onClick={onCancelClick}
                                        className="flex-1 rounded-full border border-red-600 text-red-700 py-3 font-semibold hover:bg-red-50 transition"
                                    >
                                        Cancel (50% Retained)
                                    </button>
                                )}

                                {isNoShow && (
                                    <button
                                        disabled
                                        className="flex-1 rounded-full border border-gray-300 py-3 font-medium text-gray-400 cursor-not-allowed"
                                    >
                                        No-Show (Charged in Full)
                                    </button>
                                )}
                            </>
                        )}
                    </div>

                    {/* POLICY SUMMARY */}
                    {booking.status === "confirmed" && (
                        <p className="mt-4 text-xs text-gray-400 text-center">
                            Reschedule: Free &gt;24h • £5 between 24–12h • Not allowed &lt;12h
                            <br />
                            Cancel: Free &gt;24h • 50% retained &lt;24h • No-show charged in full
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}

/* ---------- Section ---------- */

function Section({
    label,
    children,
    icon,
}: any) {
    return (
        <div>
            <p className="text-gray-500 flex items-center gap-2 mb-1">
                {icon}
                {label}
            </p>
            <p className="font-medium text-gray-800">
                {children}
            </p>
        </div>
    );
}

/* ---------- Helpers ---------- */

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