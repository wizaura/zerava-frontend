"use client";

import { useEffect, useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import api from "@/lib/axios";
import {
    CheckCircleIcon,
    ClockIcon,
} from "@heroicons/react/20/solid";
import { BookingDraft } from "./Main";

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const UK_POSTCODE_REGEX = /^[A-Z]{1,2}\d[A-Z\d]?\s?\d[A-Z]{2}$/;

type Slot = {
    id: string;
    time: string;
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
    const [allowedWeekdays, setAllowedWeekdays] = useState<number[] | null>(null);
    const [selectedDate, setSelectedDate] = useState<string | null>(
        bookingDraft.date
    );
    const [slots, setSlots] = useState<Slot[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    /* ---------------- AUTO POSTCODE CHECK ---------------- */

    useEffect(() => {
        if (!UK_POSTCODE_REGEX.test(postcode)) return;

        const timeout = setTimeout(async () => {
            try {
                setLoading(true);
                setError(null);

                const res = await api.get(
                    `/service-areas/${postcode.toUpperCase()}`
                );

                if (!res.data.available) {
                    setError("Service not available in this postcode");
                    setAllowedWeekdays(null);
                    return;
                }

                setAllowedWeekdays(res.data.weekdays);
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

        const res = await api.get("/slots", { params: { date } });
        setSlots(res.data);
    }

    function isAllowedDate(date: Date) {
        return allowedWeekdays?.includes(date.getDay());
    }

    /* ---------------- UI ---------------- */

    return (
        <div className="space-y-8 max-w-5xl mx-auto bg-white">
            <h2 className="text-2xl font-medium text-gray-900">
                Choose your schedule
            </h2>

            {/* Postcode */}
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm space-y-4">
                <label className="text-sm font-medium text-gray-600">
                    Your Postcode
                </label>

                <input
                    value={postcode}
                    onChange={(e) => setPostcode(e.target.value.toUpperCase())}
                    placeholder="SO16"
                    className="w-full rounded-xl border border-gray-300 text-gray-700 px-4 py-3 text-sm uppercase
               focus:border-electric-teal focus:outline-none"
                />

                {loading && (
                    <p className="text-xs text-gray-400">
                        Checking availability…
                    </p>
                )}

                {error && (
                    <p className="text-sm text-red-600">
                        {error}
                    </p>
                )}
            </div>


            {/* Success Banner */}
            {allowedWeekdays && (
                <div className="flex items-start gap-4 rounded-2xl border border-electric-teal bg-electric-teal/10 p-5">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-electric-teal">
                        <CheckCircleIcon className="h-5 w-5 text-white" />
                    </div>

                    <div className="text-sm text-gray-800">
                        <p className="font-medium">
                            Great! We serve your area
                        </p>
                        <p>
                            Zerava cleans in{" "}
                            <span className="font-medium">{postcode.toUpperCase()}</span>{" "}
                            on{" "}
                            <span className="font-medium text-electric-teal">
                                {allowedWeekdays.map((d) => WEEKDAYS[d]).join(", ")}
                            </span>
                        </p>
                    </div>
                </div>
            )}


            {/* Calendar */}
            {allowedWeekdays && (
                <div className="rounded-2xl w-full border border-gray-300 bg-white p-6 shadow-sm">
                    <DayPicker
                        mode="single"
                        selected={selectedDate ? new Date(selectedDate) : undefined}
                        onSelect={(date) => {
                            if (!date) return;
                            selectDate(date.toISOString().slice(0, 10));
                        }}
                        disabled={[
                            { before: new Date() },
                            (date) => !allowedWeekdays.includes(date.getDay()),
                        ]}
                        modifiersClassNames={{
                            selected: "bg-electric-teal text-white",
                            today: "border border-electric-teal",
                            disabled: "text-gray-300",
                        }}

                        classNames={{
                            root: "text-gray-900 mx-auto", // center calendar
                            months: "flex justify-center",
                            month: "space-y-6", // space between header & grid
                            caption: "flex justify-between items-center px-4 text-lg font-medium text-black",
                            caption_label: "text-lg",
                            nav: "flex items-center gap-4",
                            table: "border-separate border-spacing-y-4", // vertical spacing between weeks
                            head_row: "text-gray-500",
                            head_cell: "text-sm font-medium",
                            row: "gap-y-4",
                            cell: "h-16 w-16 text-center", // ⬅️ BIGGER CELLS
                            day: `
    text-black rounded-2xl 
    hover:bg-electric-teal/10 
    transition
  `,
                            day_selected: "bg-electric-teal text-white",
                            day_today: "border border-electric-teal",
                            day_outside: "text-gray-300",
                        }}

                    />

                    {/* Legend */}
                    <div className="mt-4 flex items-center gap-6 text-sm text-gray-500">
                        <div className="flex items-center gap-2">
                            <span className="h-3 w-3 rounded-full bg-electric-teal" />
                            Available Wednesdays
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="h-3 w-3 rounded-full bg-gray-300" />
                            Unavailable
                        </div>
                    </div>
                </div>
            )}

            {/* Slots */}
            {selectedDate && (
                <div className="rounded-2xl border border-gray-300 bg-white p-6 shadow-sm space-y-4">
                    <p className="text-sm font-medium text-gray-700">
                        Choose your time slot
                    </p>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
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
                                        }))
                                    }
                                    className={[
                                        "flex items-center justify-center gap-2 rounded-xl border p-4 text-sm",
                                        selected
                                            ? "border-electric-teal bg-electric-teal/10"
                                            : "border-gray-300 hover:border-gray-500",
                                    ].join(" ")}
                                >
                                    <ClockIcon className="h-4 w-4" />
                                    {slot.time}
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
                    className="rounded-full border border-gray-300 bg-white px-6 py-2 text-sm"
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
