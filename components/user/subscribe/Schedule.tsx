"use client";

import { useEffect, useRef, useState } from "react";
import { SubscriptionDraft } from "./types";
import api from "@/lib/user/axios";
import toast from "react-hot-toast";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const UK_POSTCODE_REGEX = /^[A-Z]{1,2}\d{2}$/;
const UK_POSTCODE_REGEX_FULL = /^[A-Z]{1,2}\d{2}\s?\d[A-Z]{2}$/i;

type Slot = {
    templateId: string;
    startTime: string;
    endTime: string;
};

type Props = {
    draft: SubscriptionDraft;
    setDraft: React.Dispatch<React.SetStateAction<SubscriptionDraft>>;
    onBack: () => void;
    onContinue: () => void;
};

export default function ScheduleStep({
    draft,
    setDraft,
    onBack,
    onContinue,
}: Props) {
    const [postcode, setPostcode] = useState(draft.postcode || "");
    const [serviceDays, setServiceDays] = useState<number[] | null>(null);
    const [zoneChecked, setZoneChecked] = useState(false);
    const [selectedDate, setSelectedDate] = useState<string | null>(
        draft.firstServiceDate || null
    );
    const [slots, setSlots] = useState<Slot[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const prevOutwardRef = useRef<string | null>(null);

    const outwardCode = postcode.toUpperCase().trim().split(" ")[0];

    /* =========================================================
       1️⃣ ZONE CHECK (POSTCODE)
    ========================================================= */

    useEffect(() => {
        if (!UK_POSTCODE_REGEX.test(outwardCode)) return;

        if (prevOutwardRef.current === outwardCode) return;
        prevOutwardRef.current = outwardCode;

        const timeout = setTimeout(async () => {
            try {
                setLoading(true);
                setError(null);

                const res = await api.get(
                    `/service-zones/check/${outwardCode}`
                );

                if (!res.data.available) {
                    setError("We don’t serve this postcode yet.");
                    setZoneChecked(false);
                    setServiceDays(null);
                    return;
                }

                setZoneChecked(true);
                setServiceDays(res.data.serviceDays);

                setDraft((d) => ({
                    ...d,
                    postcode: postcode.trim().toUpperCase(),
                }));
            } catch {
                setError("Failed to check postcode.");
            } finally {
                setLoading(false);
            }
        }, 600);

        return () => clearTimeout(timeout);
    }, [outwardCode]);

    /* =========================================================
       2️⃣ DATE SELECT
    ========================================================= */

    function selectDate(localDate: string) {
        setSelectedDate(localDate);

        setDraft((d) => ({
            ...d,
            firstServiceDate: localDate,
            templateId: null,
            timeFrom: null,
            timeTo: null,
        }));
    }

    /* =========================================================
       3️⃣ FETCH AVAILABILITY
    ========================================================= */

    async function fetchAvailability(date: string) {
        try {
            setLoading(true);
            setError(null);

            const res = await api.post(
                "/availability/subscription-check-date",
                {
                    date,
                    postcode: draft.postcode,
                    serviceDuration: draft.durationMin,
                    addonDuration: 0,
                    plan: draft.plan,
                }
            );

            setSlots(res.data.slots || []);
        } catch {
            setError("Failed to load time slots.");
            setSlots([]);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (!selectedDate) return;
        if (!zoneChecked) return;

        fetchAvailability(selectedDate);
    }, [selectedDate]);

    /* =========================================================
       4️⃣ SLOT SELECT
    ========================================================= */

    function selectSlot(slot: Slot) {
        setDraft((d) => ({
            ...d,
            templateId: slot.templateId,
            timeFrom: slot.startTime,
            timeTo: slot.endTime,
        }));
    }

    /* =========================================================
       VALIDATION
    ========================================================= */

    const matchesFirstStage =
        /^[A-Z]{1,2}\d{2}$/i.test(outwardCode);

    const matchesFullPostcode =
        /^[A-Z]{1,2}\d{2}\s?\d[A-Z]{2}$/i.test(postcode.trim());

    const showPostcodeError =
        matchesFirstStage && !matchesFullPostcode;

    const canContinue =
        zoneChecked &&
        matchesFullPostcode &&
        !!selectedDate;
        // !!draft.templateId;

    /* =========================================================
       UI
    ========================================================= */

    return (
        <div className="space-y-8 max-w-5xl mx-auto bg-white">

            <h2 className="text-2xl font-medium text-gray-900">
                Choose your first service
            </h2>

            {/* ================= POSTCODE ================= */}
            <div>
                <label className="block text-sm font-medium mb-2">
                    Postcode
                </label>

                <input
                    value={postcode}
                    onChange={(e) =>
                        setPostcode(e.target.value.toUpperCase())
                    }
                    placeholder="SO15 4ER"
                    className="w-full border rounded-xl px-4 py-3"
                />

                {showPostcodeError && (
                    <p className="text-sm text-red-500 mt-2">
                        Please enter full postcode (Eg: SO16 4ER)
                    </p>
                )}

                {error && (
                    <p className="text-sm text-red-500 mt-2">
                        {error}
                    </p>
                )}
            </div>

            {/* ================= SERVICE DAYS INFO ================= */}
            {zoneChecked && serviceDays && (
                <div className="bg-electric-teal/10 border border-electric-teal rounded-xl p-4">
                    <p className="text-sm">
                        We service your area on:
                        <span className="font-medium ml-2">
                            {serviceDays
                                .map((d) =>
                                    WEEKDAYS[d === 7 ? 0 : d]
                                )
                                .join(", ")}
                        </span>
                    </p>
                </div>
            )}

            {/* ================= CALENDAR ================= */}
            {serviceDays && (
                <div>
                    <p className="mb-4 font-medium">
                        Select your first service date
                    </p>

                    <div className="rounded-2xl border p-8 flex justify-center">
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
                                {
                                    after: (() => {
                                        const d = new Date();
                                        d.setDate(d.getDate() + 30);
                                        return d;
                                    })(),
                                },
                                (date) => {
                                    const jsDay = date.getDay();
                                    const dbDay = jsDay === 0 ? 7 : jsDay;
                                    return !serviceDays.includes(dbDay);
                                },
                            ]}
                            modifiers={{
                                active: (date) => {
                                    const jsDay = date.getDay();
                                    const dbDay = jsDay === 0 ? 7 : jsDay;
                                    return serviceDays.includes(dbDay);
                                },
                            }}
                            modifiersClassNames={{
                                selected:
                                    "bg-black text-white font-bold mx-auto",
                                active:
                                    "text-electric-teal font-bold",
                                today:
                                    "bg-electric-teal/20 text-electric-teal font-bold",
                            }}
                        />
                    </div>
                </div>
            )}

            {/* ================= TIME SLOTS ================= */}
            {selectedDate && (
                <div>
                    <p className="mb-4 font-medium">
                        Available time slots
                    </p>

                    {loading && <p>Loading slots...</p>}

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {slots.map((slot, i) => {
                            const selected =
                                draft.templateId === slot.templateId &&
                                draft.timeFrom === slot.startTime;

                            return (
                                <button
                                    key={i}
                                    type="button"
                                    onClick={() => selectSlot(slot)}
                                    className={[
                                        "rounded-xl border px-4 py-3 text-left",
                                        selected
                                            ? "bg-black text-white border-black"
                                            : "bg-white hover:border-gray-400",
                                    ].join(" ")}
                                >
                                    {slot.startTime} – {slot.endTime}
                                </button>
                            );
                        })}
                    </div>

                    {!loading && slots.length === 0 && (
                        <p className="text-sm text-gray-500 mt-3">
                            No slots available for this date.
                        </p>
                    )}
                </div>
            )}

            {/* ================= FOOTER ================= */}
            <div className="flex justify-between pt-6">
                <button
                    onClick={onBack}
                    className="border rounded-full px-6 py-2"
                >
                    Back
                </button>

                <button
                    disabled={!canContinue}
                    onClick={() => {
                        if (!canContinue) {
                            toast.error(
                                "Please complete schedule selection."
                            );
                            return;
                        }
                        onContinue();
                    }}
                    className={[
                        "rounded-full px-8 py-2 text-white transition",
                        canContinue
                            ? "bg-black hover:bg-gray-800"
                            : "bg-gray-300 cursor-not-allowed",
                    ].join(" ")}
                >
                    Continue
                </button>
            </div>
        </div>
    );
}