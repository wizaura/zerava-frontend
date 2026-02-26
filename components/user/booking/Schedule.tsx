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
    serviceSlotId?: string;
    templateId?: string;
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
    const [locking, setLocking] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const outwardCode = postcode.toUpperCase().trim().split(" ")[0];

    /* ---------------- POSTCODE CHECK ---------------- */

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
                    lockId: null,
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

    /* ---------------- AVAILABILITY ---------------- */

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

            setSlots(res.data.slots || []);
        } catch {
            setError("Failed to load time slots");
            setSlots([]);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (!selectedDate) return;
        if (!UK_POSTCODE_REGEX.test(outwardCode)) return;

        fetchAvailability(selectedDate, outwardCode);
    }, [selectedDate]);

    useEffect(() => {
        const full = postcode.trim().toUpperCase();

        if (!UK_POSTCODE_REGEX_FULL.test(full)) return;

        setBookingDraft((d) => ({
            ...d,
            postcode: full,
        }));
    }, [postcode]);

    /* ---------------- DATE ---------------- */

    function selectDate(localDate: string) {
        setSelectedDate(localDate);

        setBookingDraft((d) => ({
            ...d,
            date: localDate,
            serviceSlotId: null,
            timeFrom: null,
            timeTo: null,
            lockId: null,
        }));
    }

    /* ---------------- SLOT SELECT ---------------- */

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

    /* ---------------- LOCK ON CONTINUE ---------------- */

    async function handleContinue() {

        if (!bookingDraft.serviceSlotId && !bookingDraft.templateId) return;

        try {
            setLocking(true);
            setError(null);

            const res = await api.post("/booking/lock", {
                serviceSlotId: bookingDraft.serviceSlotId,
                templateId: bookingDraft.templateId,
                isTemplate: bookingDraft.isTemplate,
                operatorId: bookingDraft.operatorId,
                date: bookingDraft.date,
                timeFrom: bookingDraft.timeFrom,
                timeTo: bookingDraft.timeTo,
                postcode: bookingDraft.postcode,
            });

            setBookingDraft((d) => ({
                ...d,
                lockId: res.data.lockId,
                serviceSlotId: res.data.serviceSlotId,
                lockExpiresAt: res.data.expiresAt,
            }));

            onContinue();

        } catch (err: any) {
            setError(
                err?.response?.data?.message ||
                "Sorry, this slot was just taken. Please choose another."
            );

            if (bookingDraft.date) {
                fetchAvailability(bookingDraft.date, outwardCode);
            }

        } finally {
            setLocking(false);
        }
    }

    /* ---------------- HELPERS ---------------- */

    function isAllowedDate(date: Date) {
        if (!serviceDays) return false;
        const jsDay = date.getDay();
        const dbDay = jsDay === 0 ? 7 : jsDay;
        return serviceDays.includes(dbDay);
    }

    function formatTime12h(time: string) {
        const [h, m] = time.split(":").map(Number);
        const date = new Date();
        date.setHours(h, m);

        return date.toLocaleTimeString("en-GB", {
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
        }).replace("am", "AM").replace("pm", "PM");
    }

    const matchesFirstStage =
        /^[A-Z]{1,2}\d{2}$/i.test(outwardCode);

    const matchesFullPostcode =
        /^[A-Z]{1,2}\d{2}\s?\d[A-Z]{2}$/i.test(postcode.trim());

    const showPostcodeError =
        matchesFirstStage && !matchesFullPostcode;

    const canSubmit =
        matchesFullPostcode &&
        selectedDate &&
        bookingDraft.timeFrom &&
        bookingDraft.timeTo;

    const today = new Date();
    const maxDate = new Date();
    maxDate.setDate(today.getDate() + 30);

    /* ---------------- UI ---------------- */

    return (
        <div className="space-y-8 max-w-5xl mx-auto bg-white">

            <h2 className="text-2xl font-medium text-gray-900">
                Choose your schedule
            </h2>

            {/* Postcode + Banner */}
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
                    className="w-full rounded-xl border px-4 py-3 text-sm uppercase focus:border-electric-teal focus:outline-none"
                />

                {showPostcodeError && (
                    <p className="mt-2 text-sm text-red-500">
                        Please enter full postcode to continue (Eg: SO16 4ER)
                    </p>
                )}

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
                                Slot issue
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
                        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-gray-300 bg-gray-50 p-8 text-center">
                            <ClockIcon className="h-8 w-8 text-gray-400 mb-3" />
                            <p className="text-sm font-medium text-gray-700">
                                No slots available
                            </p>
                        </div>
                    ) : (
                        <>
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
                                            <Clock size={16} />
                                            {formatTime12h(slot.startTime)} – {formatTime12h(slot.endTime)}
                                        </button>
                                    );
                                })}
                            </div>

                            <p className="text-xs text-gray-500 text-center mt-3">
                                Your selected time will be reserved for 10 minutes after continuing.
                            </p>
                        </>
                    )}
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
                    disabled={!canSubmit || locking}
                    onClick={handleContinue}
                    className="rounded-full px-8 py-2 text-sm text-white bg-black hover:bg-gray-800 flex items-center gap-2"
                >
                    {locking && <Loader2 className="animate-spin" size={16} />}
                    Continue →
                </button>
            </div>
        </div>
    );
}