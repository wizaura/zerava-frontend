"use client";

import { useEffect, useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import api from "@/lib/user/axios";
import { CheckCircleIcon } from "@heroicons/react/20/solid";
import { Clock10Icon } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

type Slot = {
    serviceSlotId: string;
    timeFrom: string;
    timeTo: string;
    active: boolean;
};

export default function ReschedulePage() {
    const { id } = useParams<{ id: string }>();
    const router = useRouter();

    const [postcode, setPostcode] = useState("");
    const [selectedDate, setSelectedDate] = useState<string | null>(null);
    const [slots, setSlots] = useState<Slot[]>([]);
    const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);
    const [loading, setLoading] = useState(false);

    /* ---------- LOAD BOOKING ---------- */
    useEffect(() => {
        async function loadBooking() {
            const res = await api.get(`/bookings/${id}`);
            setPostcode(res.data.postcode);
        }

        loadBooking();
    }, [id]);

    /* ---------- AVAILABILITY ---------- */
    async function fetchAvailability(date: string) {
        try {
            setLoading(true);
            const res = await api.post("/availability/check", {
                date,
                postcode,
            });

            setSlots(res.data.slots || []);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (selectedDate && postcode) {
            fetchAvailability(selectedDate);
        }
    }, [selectedDate, postcode]);

    /* ---------- CONFIRM ---------- */
    async function confirmReschedule() {
        if (!selectedSlot) return;

        await api.post(`/bookings/${id}/reschedule`, {
            serviceSlotId: selectedSlot.serviceSlotId,
            timeFrom: selectedSlot.timeFrom,
            timeTo: selectedSlot.timeTo,
        });

        router.push("/account/bookings");
    }

    function formatTime12h(time: string) {
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

    /* ---------- UI ---------- */

    return (
        <div className="max-w-5xl mx-auto space-y-8 bg-white">
            <h1 className="text-2xl font-medium">Reschedule booking</h1>

            <div className="rounded-2xl border bg-gray-50 p-5 text-sm">
                You can reschedule your booking up to{" "}
                <b>24 hours</b> before the service.
            </div>

            {/* Calendar */}
            <div className="rounded-2xl max-w-2xl border bg-white p-10 shadow-sm mx-auto">
                <DayPicker
                    mode="single"
                    selected={
                        selectedDate ? new Date(selectedDate) : undefined
                    }
                    onSelect={(date) => {
                        if (!date) return;

                        const d = [
                            date.getFullYear(),
                            String(date.getMonth() + 1).padStart(2, "0"),
                            String(date.getDate()).padStart(2, "0"),
                        ].join("-");

                        setSelectedDate(d);
                        setSelectedSlot(null);
                    }}
                    disabled={{ before: new Date() }}
                />
            </div>

            {/* Slots */}
            {selectedDate && (
                <div className="rounded-2xl border bg-white p-6 space-y-4">
                    <p className="text-sm font-medium">
                        Choose a new time slot
                    </p>

                    <div className="grid md:grid-cols-3 gap-4">
                        {slots.map((slot) => {
                            const selected =
                                selectedSlot?.serviceSlotId ===
                                slot.serviceSlotId;

                            return (
                                <button
                                    key={`${slot.serviceSlotId}-${slot.timeFrom}`}
                                    disabled={!slot.active}
                                    onClick={() => setSelectedSlot(slot)}
                                    className={[
                                        "rounded-xl border p-4 text-left text-sm transition",
                                        slot.active
                                            ? selected
                                                ? "border-electric-teal bg-electric-teal/10"
                                                : "border-gray-300 hover:border-gray-500"
                                            : "border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed",
                                    ].join(" ")}
                                >
                                    <div className="flex items-center gap-2 font-semibold">
                                        <Clock10Icon className="h-4 w-4" />
                                        {formatTime12h(slot.timeFrom)} –{" "}
                                        {formatTime12h(slot.timeTo)}
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* Summary */}
            {selectedDate && selectedSlot && (
                <div className="flex justify-center">
                    <div className="flex items-center gap-3 rounded-2xl bg-gray-900 px-6 py-4 text-white">
                        <CheckCircleIcon className="h-5 w-5 text-emerald-400" />
                        {new Date(selectedDate).toDateString()} •{" "}
                        {formatTime12h(selectedSlot.timeFrom)} –{" "}
                        {formatTime12h(selectedSlot.timeTo)}
                    </div>
                </div>
            )}

            {/* Footer */}
            <div className="flex justify-between pt-6">
                <button
                    onClick={() => router.back()}
                    className="rounded-full border px-6 py-2 text-sm"
                >
                    ← Cancel
                </button>

                <button
                    disabled={!selectedSlot}
                    onClick={confirmReschedule}
                    className={[
                        "rounded-full px-8 py-2 text-sm text-white",
                        selectedSlot
                            ? "bg-black hover:bg-gray-800"
                            : "bg-gray-300 cursor-not-allowed",
                    ].join(" ")}
                >
                    Confirm reschedule
                </button>
            </div>
        </div>
    );
}
