"use client";

import { useEffect, useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import api from "@/lib/user/axios";
import { CheckCircleIcon, ClockIcon } from "@heroicons/react/20/solid";
import { BookingDraft } from "./Main";
import { Clock, Loader2, MapPin } from "lucide-react";

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const UK_POSTCODE_REGEX = /^[A-Z]{1,2}\d{2}$/;
const UK_POSTCODE_REGEX_FULL = /^[A-Z]{1,2}\d{2}\s?\d[A-Z]{2}$/i;

type AvailableOperator = {
    operatorId: string;
    serviceSlotId?: string;   // real slot
    templateId?: string;      // template fallback
    isTemplate?: boolean;
};

type Slot = {
    startTime: string;
    endTime: string;
    availableOperators: AvailableOperator[];
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
    const outwardCode = postcode
        .toUpperCase()
        .trim()
        .split(" ")[0];

    useEffect(() => {


        if (!UK_POSTCODE_REGEX.test(outwardCode)) return;

        const timeout = setTimeout(async () => {
            try {
                setLoading(true);
                setError(null);

                const res = await api.get(
                    `/service-zones/check/${outwardCode.toUpperCase()}`
                );

                if (!res.data.available) {
                    setError("Service not available in this postcode");
                    setServiceDays(null);
                    setSelectedDate(null);
                    setSlots([]);
                    return;
                }

                setServiceDays(res.data.serviceDays);

                setBookingDraft((d) => ({
                    ...d,
                    date: null,
                    serviceSlotId: null,
                    timeFrom: null,
                    timeTo: null,
                }));

                setSelectedDate(null);
                setSlots([]);
            } catch {
                setError("Failed to check postcode");
            } finally {
                setLoading(false);
            }
        }, 600);

        return () => clearTimeout(timeout);
    }, [outwardCode]);


    /* ---------------- DATE ---------------- */

    async function fetchAvailability(date: string, postcode: string) {
        try {
            setLoading(true);
            setError(null);

            const res = await api.post("/availability/check", {
                date,
                postcode,
                serviceDuration: bookingDraft.serviceDurationMin,
                addonDuration: bookingDraft.addOnDurationMin ?? 0,
            });

            console.log(res, 'res');

            setSlots(res.data.slots || []);
        } catch {
            setError("Failed to load time slots");
            setSlots([]);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        const full = postcode.trim().toUpperCase();

        if (!UK_POSTCODE_REGEX_FULL.test(full)) return;

        setBookingDraft((d) => ({
            ...d,
            postcode: full,
        }));
    }, [postcode]);

    function selectDate(localDate: string) {
        setSelectedDate(localDate);

        setBookingDraft((d) => ({
            ...d,
            date: localDate,
            serviceSlotId: null,
            timeFrom: null,
            timeTo: null,
        }));
    }


    function selectSlot(slot: Slot) {
        if (!slot.availableOperators?.length) return;

        const assigned = slot.availableOperators[0];

        setBookingDraft((d) => ({
            ...d,
            serviceSlotId: assigned.serviceSlotId ?? null,
            templateId: assigned.templateId ?? null,
            isTemplate: assigned.isTemplate ?? false,
            operatorId: assigned.operatorId,
            timeFrom: slot.startTime,
            timeTo: slot.endTime,
        }));
    }

    useEffect(() => {
        if (!selectedDate) return;
        if (!UK_POSTCODE_REGEX.test(outwardCode)) return;

        fetchAvailability(selectedDate, outwardCode);
    }, [selectedDate, postcode]);



    function isAllowedDate(date: Date) {
        if (!serviceDays) return false;

        const jsDay = date.getDay(); // 0–6
        const dbDay = jsDay === 0 ? 7 : jsDay;

        return serviceDays.includes(dbDay);
    }

    function formatTime12h(time: string) {
        const [h, m] = time.split(":").map(Number);
        const date = new Date();
        date.setHours(h, m);

        return date.
            toLocaleTimeString("en-GB", {
                hour: "numeric",
                minute: "2-digit",
                hour12: true,
            })
            .replace("am", "AM")
            .replace("pm", "PM");
    }

    const matchesFirstStage =
        /^[A-Z]{1,2}\d{2}$/i.test(outwardCode);

    const matchesFullPostcode =
        /^[A-Z]{1,2}\d{2}\s?\d[A-Z]{2}$/i.test(postcode.trim());

    const showPostcodeError =
        matchesFirstStage && !matchesFullPostcode;


    const canSubmit =
        matchesFullPostcode && selectedDate && bookingDraft.timeFrom && bookingDraft.timeTo;


    const today = new Date();
    const maxDate = new Date();
    maxDate.setDate(today.getDate() + 30);


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

                {showPostcodeError && (
                    <p className="mt-2 text-sm text-red-500">
                        Please enter full postcode to continue (Eg: SO16 4ER)
                    </p>
                )}

                {/* LOADER */}
                {loading && (
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Loader2 className="animate-spin" size={16} />
                        Checking availability…
                    </div>
                )}

                {error && (
                    <div className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-100">
                            <MapPin size={16} className="text-red-600" />
                        </div>

                        <div>
                            <p className="font-medium text-red-700">
                                No time slots available
                            </p>
                            <p className="text-sm text-red-600">
                                {error}
                            </p>
                        </div>
                    </div>
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
                            Zerava cleans in{" "}
                            <span className="font-medium">{postcode}</span>{" "}
                            on{" "}
                            <span className="font-medium text-electric-teal">
                                {serviceDays?.map((d) => WEEKDAYS[d % 7]).join(", ")}
                            </span>
                        </p>
                    </div>
                </div>
            )}

            {/* Calendar */}
            {serviceDays && (
                <div className="rounded-2xl border p-8 flex justify-center">
                    <DayPicker
                        mode="single"
                        selected={selectedDate ? new Date(selectedDate) : undefined}
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
                            { after: maxDate },
                            (date) => !isAllowedDate(date),
                        ]}
                        modifiers={{
                            active: (date) => isAllowedDate(date),
                        }}
                        modifiersClassNames={{
                            selected: "bg-electric-teal text-white font-bold mx-auto",
                            active: "active-day text-electric-teal font-bold",
                            today: "text-mobility-green bg-electric-teal/30 font-bold",
                        }}
                        styles={{
                            caption: {
                                fontSize: "1.5rem",
                                fontWeight: 600,
                                marginBottom: "1.5rem",
                                textAlign: "center",
                            },
                            nav_button: {
                                color: "#38D6C4",
                            },
                            head_cell: {
                                fontSize: "0.9rem",
                                fontWeight: 500,
                                color: "#9CA3AF",
                                paddingBottom: "0.75rem",
                            },
                            table: {
                                width: "100%",
                                margin: "0 auto",
                            },
                            cell: {
                                padding: "0.75rem",
                            },
                            day: {
                                width: "7.75rem",
                                height: "7.75rem",
                                fontSize: "1.25rem",
                                borderRadius: "1rem",
                                margin: "0 auto",
                            },
                        }}
                    />
                </div>
            )}

            {/* Slots */}
            {selectedDate && (
                <div className="rounded-2xl border bg-white p-6 shadow-sm space-y-4">
                    <p className="text-md text-center font-medium text-gray-700">
                        Choose your time slot
                    </p>

                    {slots.length === 0 ? (
                        /* ---------- NO SLOTS STATE ---------- */
                        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-gray-300 bg-gray-50 p-8 text-center">
                            <ClockIcon className="h-8 w-8 text-gray-400 mb-3" />

                            <p className="text-sm font-medium text-gray-700">
                                No slots available
                            </p>

                            <p className="mt-1 text-xs text-gray-500 max-w-xs">
                                All operators are fully booked for this day.
                                Try selecting a different date.
                            </p>
                        </div>
                    ) : (
                        /* ---------- SLOTS GRID ---------- */
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {slots.map((slot) => {
                                const isSelected =
                                    bookingDraft.timeFrom === slot.startTime;

                                return (
                                    <button
                                        key={`${slot.startTime}-${slot.endTime}`}
                                        onClick={() => selectSlot(slot)}
                                        className={[
                                            "flex items-center gap-3 rounded-xl border px-4 py-3 transition text-sm",
                                            isSelected
                                                ? "border-electric-teal bg-electric-teal/10"
                                                : "hover:border-black",
                                        ].join(" ")}
                                    >
                                        <Clock
                                            size={16}
                                            className={
                                                isSelected ? "text-electric-teal" : "text-gray-500"
                                            }
                                        />

                                        <span className="font-medium text-center text-gray-700">
                                            {formatTime12h(slot.startTime)} – {formatTime12h(slot.endTime)}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>
                    )}
                </div>
            )}

            {bookingDraft.date && bookingDraft.timeFrom && bookingDraft.timeTo && (
                <div className="mb-4 flex justify-center">
                    <div className="flex items-center gap-3 rounded-2xl bg-gray-900 px-6 py-4 text-white shadow-md">
                        <span className="flex h-6 w-6 items-center justify-center rounded-full font-semibold text-emerald-500">
                            ✓
                        </span>

                        <p className="text-lg font-light text-center flex flex-wrap items-center justify-center gap-3">
                            <span>
                                {new Date(bookingDraft.date).toLocaleDateString("en-GB", {
                                    weekday: "long",
                                })}
                            </span>

                            <span className="text-2xl leading-none">•</span>

                            <span>
                                {new Date(bookingDraft.date).toLocaleDateString("en-GB", {
                                    month: "long",
                                    day: "numeric",
                                })}
                            </span>

                            <span className="text-2xl leading-none">•</span>

                            <span>
                                {formatTime12h(bookingDraft.timeFrom)} – {formatTime12h(bookingDraft.timeTo)}
                            </span>
                        </p>
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
                    disabled={!canSubmit}
                    onClick={onContinue}
                    className={[
                        "rounded-full px-8 py-2 text-sm text-white",
                        canSubmit
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
