"use client";

import api from "@/lib/user/axios";
import { X, MapPin, ShieldCheck, Car, User, CreditCard } from "lucide-react";
import { useRouter } from "next/navigation";

export default function BookingManageModal({
    booking,
    onClose,
}: any) {
    const router = useRouter();

    if (!booking) return null;

    function getHoursBefore(date: string, timeFrom: string) {
        const bookingDateStr = new Date(date).toISOString().split("T")[0];
        const slotStart = new Date(`${bookingDateStr}T${timeFrom}:00`);
        return (slotStart.getTime() - Date.now()) / (1000 * 60 * 60);
    }

    async function goToStripe() {
        try {
            const session = await api.post("/payments/create-session", {
                bookingId: booking.id,
            });

            window.location.href = session.data.url;
        } catch (err) {
            console.error("Stripe payment error", err);
        }
    }

    const paymentPending = booking.status === "pending";

    const hoursBefore =
        booking.status === "confirmed"
            ? getHoursBefore(booking.date, booking.timeFrom)
            : 0;

    const alreadyRescheduled = booking.rescheduleCount > 0;
    const isLockedReschedule = hoursBefore < 12;

    const canModify = booking.status === "confirmed";

    const disableReschedule = alreadyRescheduled || isLockedReschedule;

    const isWithin24Hours = hoursBefore < 24 && hoursBefore >= 12;

    function getRescheduleLabel() {
        if (alreadyRescheduled) return "Already Rescheduled";
        if (isLockedReschedule) return "Reschedule Unavailable (<12h)";
        if (isWithin24Hours) return "Reschedule Visit (€5)";
        return "Reschedule Visit";
    }
    
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
                        <div className="h-14 w-14 rounded-2xl bg-emerald-100 flex items-center justify-center">
                            <ShieldCheck className="text-emerald-600" size={22} />
                        </div>

                        <div>
                            <h2 className="text-xl font-semibold">{booking.service}</h2>
                            <p className="text-sm text-gray-500">
                                Ref: {booking.referenceCode ?? booking.id}
                            </p>
                        </div>
                    </div>

                    <button onClick={onClose} className="text-gray-400 hover:text-black">
                        <X size={20} />
                    </button>
                </div>

                {/* BODY */}
                <div className="flex-1 overflow-y-auto px-8 py-6 space-y-6">
                    <Section label="Schedule">
                        {formatDateTime(booking.date, booking.timeFrom, booking.timeTo)}
                    </Section>

                    <Section label="Service Address" icon={<MapPin size={14} />}>
                        {booking.location}
                    </Section>

                    {booking.vehicle && (
                        <Section label="Vehicle" icon={<Car size={14} />}>
                            {booking.vehicle}
                        </Section>
                    )}

                    {booking.operatorName && (
                        <Section label="Assigned Operator" icon={<User size={14} />}>
                            {booking.operatorName}
                        </Section>
                    )}

                    <Section label="Status">
                        <span className="capitalize font-medium">{booking.status}</span>
                    </Section>
                </div>

                {paymentPending && (
                    <div className="border-t px-8 py-6 bg-white space-y-3">
                        <button
                            onClick={goToStripe}
                            className="w-full rounded-full py-3 font-semibold bg-electric-teal text-eco-black hover:brightness-110 transition flex items-center justify-center gap-2"
                        >
                            <CreditCard size={16} />
                            Complete Payment
                        </button>
                    </div>
                )}


                {/* FOOTER */}
                {canModify && (
                    <div className="border-t px-8 py-6 bg-white space-y-3">

                        {/* RESCHEDULE */}
                        <button
                            disabled={disableReschedule}
                            onClick={() =>
                                router.push(`/account/bookings/${booking.id}/reschedule`)
                            }
                            className={`w-full rounded-full py-3 font-semibold transition ${disableReschedule
                                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                                : "bg-emerald-600 text-white hover:bg-emerald-700"
                                }`}
                        >
                            {getRescheduleLabel()}
                        </button>

                        {/* CANCEL */}
                        <button
                            onClick={() =>
                                router.push(`/account/bookings/${booking.id}/cancel`)
                            }
                            className="w-full rounded-full border border-gray-300 text-gray-600 py-3 font-medium hover:bg-gray-50 transition"
                        >
                            Cancel Visit
                        </button>

                        <p className="text-xs text-gray-400 text-center">
                            Free changes &gt;24h • Route adjustment 24–12h • Not available &lt;12h
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}

function Section({ label, children, icon }: any) {
    return (
        <div>
            <p className="text-gray-500 flex items-center gap-2 mb-1">
                {icon}
                {label}
            </p>
            <p className="font-medium text-gray-800">{children}</p>
        </div>
    );
}

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

    return d.toLocaleTimeString("en-GB", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
    });
}