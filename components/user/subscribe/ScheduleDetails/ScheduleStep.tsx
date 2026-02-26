"use client";

import { useEffect, useRef, useState } from "react";
import { SubscriptionDraft } from "../types";
import api from "@/lib/user/axios";
import toast from "react-hot-toast";

import { ServiceAvailabilityBanner } from "./ServiceAvailabilityBanner";
import { CalendarSection } from "./CalenderSection";
import { PostcodeSection } from "./PostcodeSection";
import { SlotSection } from "./SlotSection";
import { ScheduleFooter } from "./ScheduleFooter";

const UK_POSTCODE_REGEX = /^[A-Z]{1,2}\d{2}$/;
const UK_POSTCODE_REGEX_FULL = /^[A-Z]{1,2}\d{2}\s?\d[A-Z]{2}$/i;

type TemplateSlot = {
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

export default function SubscriptionScheduleStep({
    draft,
    setDraft,
    onBack,
    onContinue,
}: Props) {
    const [postcode, setPostcode] = useState(draft.postcode || "");
    const [serviceDays, setServiceDays] = useState<number[] | null>(null);
    const [zoneChecked, setZoneChecked] = useState(false);
    const [selectedDate, setSelectedDate] = useState<string | null>(
        draft.firstServiceDate
    );
    const [slots, setSlots] = useState<TemplateSlot[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const prevOutwardRef = useRef<string | null>(null);

    const outwardCode = postcode.toUpperCase().trim().split(" ")[0];

    /* ================= POSTCODE CHECK ================= */

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
                    setError("Service not available in this postcode");
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
                setError("Failed to check postcode");
            } finally {
                setLoading(false);
            }
        }, 600);

        return () => clearTimeout(timeout);
    }, [outwardCode]);

    /* ================= FETCH AVAILABILITY ================= */

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
            setError("Failed to load time slots");
            setSlots([]);
        } finally {
            setLoading(false);
        }
    }

    console.log(slots);

    useEffect(() => {
        if (!selectedDate) return;
        if (!zoneChecked) return;

        fetchAvailability(selectedDate);
    }, [selectedDate]);

    /* ================= DATE SELECT ================= */

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

    /* ================= SLOT SELECT ================= */

    function selectSlot(slot: any) {
        setDraft((d) => ({
            ...d,
            templateId: slot.templateId,
            timeFrom: slot.startTime,
            timeTo: slot.endTime,
        }));
    }

    /* ================= VALIDATION ================= */

    const matchesFirstStage =
        /^[A-Z]{1,2}\d{2}$/i.test(outwardCode);

    const matchesFullPostcode =
        /^[A-Z]{1,2}\d{2}\s?\d[A-Z]{2}$/i.test(postcode.trim());

    const canSubmit =
        zoneChecked &&
        matchesFullPostcode &&
        !!selectedDate;
        // !!draft.templateId;

    function handleContinue() {
        if (!canSubmit) {
            toast.error("Please complete schedule selection.");
            return;
        }

        onContinue();
    }

    /* ================= UI ================= */

    return (
        <div className="space-y-8 max-w-5xl mx-auto bg-white">

            <h2 className="text-2xl font-medium text-gray-900">
                Choose your first service
            </h2>

            <PostcodeSection
                postcode={postcode}
                setPostcode={setPostcode}
                loading={loading}
                error={error}
            />

            {zoneChecked && (
                <ServiceAvailabilityBanner
                    postcode={postcode}
                    serviceDays={serviceDays}
                />
            )}

            {serviceDays && (
                <CalendarSection
                    serviceDays={serviceDays}
                    selectedDate={selectedDate}
                    selectDate={selectDate}
                />
            )}

            {selectedDate && (
                <SlotSection
                    slots={slots}
                    bookingDraft={{
                        date: draft.firstServiceDate,
                        timeFrom: draft.timeFrom,
                        timeTo: draft.timeTo,
                    }}
                    selectSlot={selectSlot}
                />
            )}

            <ScheduleFooter
                onBack={onBack}
                onContinue={handleContinue}
                locking={false}
            />
        </div>
    );
}