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
import { openLoginModal } from "@/store/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";

const UK_POSTCODE_REGEX = /^[A-Z]{1,2}\d[A-Z\d]?$/;
const UK_POSTCODE_REGEX_FULL = /^[A-Z]{1,2}\d[A-Z\d]?\s?\d[A-Z]{2}$/i;

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

    const [serviceDays, setServiceDays] = useState<number[] | null>(null);
    const [zoneChecked, setZoneChecked] = useState(false);
    const [selectedDate, setSelectedDate] = useState<string | null>(
        draft.firstServiceDate
    );
    const [slots, setSlots] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const prevOutwardRef = useRef<string | null>(null);

    const postcode = draft.postcode || "";
    const outwardCode = postcode.toUpperCase().trim().split(" ")[0];

    const { isAuthenticated } = useSelector((s: any) => s.auth);
    const dispatch = useDispatch();

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

            console.log(slots, 'slots')
        } catch {
            setError("Failed to load time slots");
            setSlots([]);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (!selectedDate) return;
        if (!zoneChecked) return;

        fetchAvailability(selectedDate);
    }, [selectedDate, zoneChecked]);

    /* ================= DATE SELECT ================= */

    function selectDate(localDate: string) {
        setSelectedDate(localDate);

        const dateObj = new Date(localDate);
        const preferredDay = dateObj.getDay();

        setDraft((d) => ({
            ...d,
            firstServiceDate: localDate,
            preferredDay,
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

    const matchesFullPostcode =
        UK_POSTCODE_REGEX_FULL.test(postcode.trim());

    async function handleContinue() {

        if (!isAuthenticated) {
            toast.error("Please login to continue.");
            dispatch(openLoginModal());
            return;
        }

        if (!postcode.trim()) {
            toast.error("Please enter your postcode.");
            return;
        }

        if (!draft.houseNumber?.trim()) {
            toast.error("Please enter house number.");
            return;
        }

        if (!matchesFullPostcode) {
            toast.error("Please enter a valid UK postcode.");
            return;
        }

        if (!zoneChecked) {
            toast.error("We don’t currently serve this postcode.");
            return;
        }

        if (!selectedDate) {
            toast.error("Please select a service date.");
            return;
        }

        if (!draft.timeFrom || !draft.timeTo || !draft.templateId) {
            toast.error("Please select a time slot.");
            return;
        }

        try {
            setLoading(true);
            setError(null);

            const res = await api.post("/subscriptions/lock", {
                templateId: draft.templateId,
                date: draft.firstServiceDate,
                timeFrom: draft.timeFrom,
                timeTo: draft.timeTo,
                postcode: draft.postcode,
            });

            setDraft((d) => ({
                ...d,
                lockId: res.data.lockId,
                lockExpiresAt: res.data.expiresAt,
            }));

            onContinue();

        } catch (err: any) {
            setError(
                err?.response?.data?.message ||
                "Sorry, this slot was just taken. Please choose another."
            );

            if (draft.firstServiceDate) {
                fetchAvailability(draft.firstServiceDate);
            }

        } finally {
            setLoading(false);
        }
    }

    /* ================= UI ================= */

    return (
        <div className="space-y-8 max-w-5xl mx-auto bg-white">

            <h2 className="text-2xl font-medium text-gray-900">
                Choose your first service
            </h2>

            {/* ✅ UPDATED POSTCODE SECTION */}
            <PostcodeSection
                bookingDraft={draft}
                setBookingDraft={setDraft}
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