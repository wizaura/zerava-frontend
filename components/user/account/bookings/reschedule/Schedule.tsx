"use client";

import { useEffect, useRef, useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import api from "@/lib/user/axios";
import { CheckCircleIcon, ClockIcon } from "@heroicons/react/20/solid";
import { RescheduleDraft } from "./Main";
import { Clock } from "lucide-react";

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const UK_POSTCODE_REGEX = /^SO\d{2}$/;

type Slot = {
    startTime: string;
    endTime: string;
    serviceSlotId: string;
};

type Props = {
    draft: RescheduleDraft;
    setDraft: React.Dispatch<React.SetStateAction<RescheduleDraft>>;
    onContinue: () => void;
};

export default function ScheduleStep({
    draft,
    setDraft,
    onContinue,
}: Props) {
    const [postcode, setPostcode] = useState(draft.postcode || "");
    const [serviceDays, setServiceDays] = useState<number[] | null>(null);
    const [selectedDate, setSelectedDate] = useState<string | null>(
        draft.date
    );
    const [address, setAddress] = useState(draft.address || "");
    const [slots, setSlots] = useState<Slot[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const oldSchedule = useRef<{
        date: string | null;
        timeFrom: string | null;
        timeTo: string | null;
        postcode: string | null;
    }>({
        date: draft.date,
        timeFrom: draft.timeFrom,
        timeTo: draft.timeTo,
        postcode: draft.postcode,
    });


    console.log(address,'ad')

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
                    setSelectedDate(null);
                    setSlots([]);
                    return;
                }

                setServiceDays(res.data.serviceDays);

                setDraft((d) => ({
                    ...d,
                    postcode: postcode.toUpperCase(),
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
    }, [postcode]);

    /* ---------------- AVAILABILITY ---------------- */

    async function fetchAvailability(date: string, postcode: string) {
        try {
            setLoading(true);
            setError(null);

            const res = await api.post("/availability/check-reschedule", {
                bookingId: draft.bookingId,
                date,
                postcode,
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
        if (!UK_POSTCODE_REGEX.test(postcode)) return;

        fetchAvailability(selectedDate, postcode);
    }, [selectedDate, postcode]);

    /* ---------------- HELPERS ---------------- */

    function selectDate(localDate: string) {
        setSelectedDate(localDate);

        setDraft((d) => ({
            ...d,
            date: localDate,
            serviceSlotId: null,
            timeFrom: null,
            timeTo: null,
        }));
    }

    function selectSlot(slot: Slot) {
        setDraft((d) => ({
            ...d,
            serviceSlotId: slot.serviceSlotId,
            timeFrom: slot.startTime,
            timeTo: slot.endTime,
        }));
    }

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
        });
    }

    function renderSchedule(
        date: string | null,
        timeFrom: string | null,
        timeTo: string | null,
        postcode: string | null,
    ) {
        if (!date || !timeFrom || !timeTo || !postcode) return null;

        return (
            <div className="flex items-center gap-4 rounded-xl bg-gray-50 border border-gray-200 px-4 py-3 shadow-sm">
                {/* Icon */}
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-electric-teal/10">
                    <ClockIcon className="h-5 w-5 text-electric-teal" />
                </div>

                {/* Schedule Details */}
                <div className="flex flex-col text-sm text-gray-800">
                    <span className="font-medium">
                        {new Date(date).toLocaleDateString("en-GB", {
                            weekday: "long",
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                        })}
                    </span>

                    <span className="text-gray-600">
                        {formatTime12h(timeFrom)} – {formatTime12h(timeTo)} · {postcode}
                    </span>
                    
                </div>
            </div>
        );
    }

    /* ---------------- UI ---------------- */

    return (
        <div className="space-y-4 max-w-4xl mx-auto py-6">

            <h2 className="text-2xl font-medium">
                Reschedule your booking
            </h2>

            {/* OLD SCHEDULE */}
            {renderSchedule(
                oldSchedule.current.date,
                oldSchedule.current.timeFrom,
                oldSchedule.current.timeTo,
                oldSchedule.current.postcode
            )}


            {/* POSTCODE */}
            <div className="rounded-2xl border p-6 space-y-4">
                <label className="text-sm font-medium text-gray-600">
                    Your Postcode
                </label>

                <input
                    value={postcode}
                    onChange={(e) =>
                        setPostcode(e.target.value.toUpperCase())
                    }
                    placeholder="SO16"
                    className="w-full rounded-xl border px-4 py-3 text-sm focus:border-electric-teal focus:outline-none"
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

            {/* CALENDAR */}
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

            {/* SLOTS */}
            {selectedDate && (
                <div className="rounded-2xl border p-6 space-y-4">
                    <p className="text-sm font-medium">
                        Choose a new time slot
                    </p>

                    {slots.length === 0 ? (
                        <div className="flex flex-col items-center justify-center border border-dashed rounded-xl p-8 text-center text-gray-500">
                            <ClockIcon className="h-8 w-8 mb-3" />
                            No slots available
                        </div>
                    ) : (
                        <div className="grid md:grid-cols-3 gap-4">
                            {slots.map((slot) => {
                                const isSelected =
                                    draft.serviceSlotId ===
                                    slot.serviceSlotId &&
                                    draft.timeFrom === slot.startTime;

                                return (
                                    <button
                                        key={`${slot.serviceSlotId}-${slot.startTime}`}
                                        onClick={() => selectSlot(slot)}
                                        className={`flex gap-2 items-center rounded-xl border px-4 py-3 transition ${isSelected
                                            ? "border-electric-teal bg-electric-teal/10"
                                            : "hover:border-black"
                                            }`}
                                    >
                                        <Clock size={16} />
                                        {formatTime12h(slot.startTime)} –{" "}
                                        {formatTime12h(slot.endTime)}
                                    </button>
                                );
                            })}
                        </div>
                    )}
                </div>
            )}
            {/* ADDRESS */}
            <div className="rounded-2xl border p-6 space-y-3">
                <label className="text-sm font-medium text-gray-600">
                    Service Address
                </label>

                <input
                    value={address}
                    onChange={(e) => {
                        setAddress(e.target.value);
                        setDraft((d) => ({ ...d, address: e.target.value }));
                    }}
                    placeholder="Enter service address"
                    className="w-full rounded-xl border px-4 py-3 text-sm focus:border-electric-teal focus:outline-none"
                />

                <p className="text-xs text-gray-400">
                    You can update the address if needed.
                </p>
            </div>


            {/* CONTINUE */}
            <div className="flex justify-end">
                <button
                    disabled={!draft.serviceSlotId}
                    onClick={onContinue}
                    className={`rounded-full px-8 py-2 text-sm text-white ${draft.serviceSlotId
                        ? "bg-black hover:bg-gray-800"
                        : "bg-gray-300 cursor-not-allowed"
                        }`}
                >
                    Review changes →
                </button>
            </div>
        </div>
    );
}

