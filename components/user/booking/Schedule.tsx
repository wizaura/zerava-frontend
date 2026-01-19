"use client";

import { useEffect, useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import api from "@/app/lib/axios";
import { CheckCircleIcon, ClockIcon } from "@heroicons/react/20/solid";
import { BookingDraft } from "./Main";

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const UK_POSTCODE_REGEX = /^[A-Z]{1,2}\d[A-Z\d]?\s?\d[A-Z]{2}$/;

type Slot = {
    id: string;
    timeFrom: string;
    timeTo: string;
    operator: string;
};

type Props = {
    bookingDraft: BookingDraft;
    setBookingDraft: React.Dispatch<React.SetStateAction<BookingDraft>>;
    onBack: () => void;
    onContinue: () => void;
};

export default function ScheduleStep({
    bookingDraft,
    setBookingDraft,
    onBack,
    onContinue,
}: Props) {
    const [postcode, setPostcode] = useState(bookingDraft.postcode || "");
    const [serviceDays, setServiceDays] = useState<number[] | null>(null);
    const [selectedDate, setSelectedDate] = useState<string | null>(
        bookingDraft.date
    );
    const [slots, setSlots] = useState<Slot[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    /* ---------------- POSTCODE CHECK ---------------- */

    useEffect(() => {
        if (!UK_POSTCODE_REGEX.test(postcode)) return;

        const timeout = setTimeout(async () => {
            try {
                setLoading(true);
                setError(null);

                const res = await api.get(
                    `/service-zones/check/${postcode.toUpperCase()}`
                );

                if (!res.data.available) {
                    setError("Service not available in this postcode");
                    setServiceDays(null);
                    return;
                }

                setServiceDays(res.data.serviceDays);

                setBookingDraft((d) => ({
                    ...d,
                    postcode: postcode.toUpperCase(),
                    date: null,
                    timeSlotId: null,
                }));
            } catch {
                setError("Failed to check postcode");
            } finally {
                setLoading(false);
            }
        }, 600);

        return () => clearTimeout(timeout);
    }, [postcode, setBookingDraft]);


    /* ---------------- DATE ---------------- */

    async function selectDate(date: string) {
        setSelectedDate(date);
        setBookingDraft((d) => ({
            ...d,
            date,
            timeSlotId: null,
        }));

        const res = await api.post("/availability/check", {
            date,
            postcode,
        });

        setSlots(res.data.slots || []);
        console.log(slots, 'slots')
    }

    function isAllowedDate(date: Date) {
        if (!serviceDays) return false;

        const jsDay = date.getDay(); // 0–6
        const dbDay = jsDay === 0 ? 7 : jsDay;

        return serviceDays.includes(dbDay);
    }


    /* ---------------- UI ---------------- */

    return (
        <div className="space-y-8 max-w-5xl mx-auto bg-white">
            <h2 className="text-2xl font-medium text-gray-900">
                Choose your schedule
            </h2>

            {/* Postcode */}
            <div className="rounded-2xl border bg-white p-6 shadow-sm space-y-4">
                <label className="text-sm font-medium text-gray-600">
                    Your Postcode
                </label>

                <input
                    value={postcode}
                    onChange={(e) =>
                        setPostcode(e.target.value.toUpperCase())
                    }
                    placeholder="SO16"
                    className="w-full rounded-xl border px-4 py-3 text-sm uppercase
                               focus:border-electric-teal focus:outline-none"
                />

                {loading && (
                    <p className="text-xs text-gray-400">
                        Checking availability…
                    </p>
                )}

                {error && (
                    <p className="text-sm text-red-600">{error}</p>
                )}
            </div>

            {/* Success Banner */}
            {serviceDays && (
                <div className="flex gap-4 rounded-2xl border border-electric-teal bg-electric-teal/10 p-5">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-electric-teal">
                        <CheckCircleIcon className="h-5 w-5 text-white" />
                    </div>

                    <div className="text-sm">
                        <p className="font-medium">
                            Great! We serve your area
                        </p>
                        <p>
                            Zerava cleans on{" "}
                            <span className="font-medium text-electric-teal">
                                {serviceDays
                                    ?.map((d) => WEEKDAYS[d % 7])
                                    .join(", ")}
                            </span>

                        </p>
                    </div>
                </div>
            )}

            {/* Calendar */}
            {serviceDays && (
                <div className="rounded-2xl border bg-white p-6 shadow-sm">
                    <DayPicker
                        mode="single"
                        selected={
                            selectedDate
                                ? new Date(selectedDate)
                                : undefined
                        }
                        onSelect={(date) => {
                            if (!date) return;
                            const localDate = [
                                date.getFullYear(),
                                String(date.getMonth() + 1).padStart(2, "0"),
                                String(date.getDate()).padStart(2, "0"),
                            ].join("-");

                            selectDate(localDate);
                        }}
                        disabled={[
                            { before: new Date() },
                            (date) => !isAllowedDate(date),
                        ]}
                        modifiersClassNames={{
                            selected: "bg-electric-teal text-white",
                        }}
                    />
                </div>
            )}

            {/* Slots */}
            {selectedDate && (
                <div className="rounded-2xl border bg-white p-6 shadow-sm space-y-4">
                    <p className="text-sm font-medium text-gray-700">
                        Choose your time slot
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {slots.map((slot) => {
                            const selected =
                                bookingDraft.timeSlotId === slot.id;

                            return (
                                <button
                                    key={slot.id}
                                    onClick={() =>
                                        setBookingDraft((d) => ({
                                            ...d,
                                            timeSlotId: slot.id,
                                            timeFrom: slot.timeFrom,
                                            timeTo: slot.timeTo
                                        }))
                                    }
                                    className={[
                                        "rounded-xl border p-4 text-left text-sm",
                                        selected
                                            ? "border-electric-teal bg-electric-teal/10"
                                            : "border-gray-300 hover:border-gray-500",
                                    ].join(" ")}
                                >
                                    <div className="flex items-center gap-2">
                                        <ClockIcon className="h-4 w-4" />
                                        {slot.timeFrom} – {slot.timeTo}
                                    </div>
                                    <p className="mt-1 text-xs text-gray-500">
                                        Operator: {slot.operator}
                                    </p>
                                </button>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* Footer */}
            <div className="flex justify-between pt-6">
                <button
                    onClick={onBack}
                    className="rounded-full border px-6 py-2 text-sm"
                >
                    ← Previous
                </button>

                <button
                    disabled={!bookingDraft.timeSlotId}
                    onClick={onContinue}
                    className={[
                        "rounded-full px-8 py-2 text-sm text-white",
                        bookingDraft.timeSlotId
                            ? "bg-black hover:bg-gray-800"
                            : "bg-gray-300 cursor-not-allowed",
                    ].join(" ")}
                >
                    Continue →
                </button>
            </div>
        </div>
    );
}
