import { useEffect, useRef, useState } from "react";
import { BookingDraft } from "../Main";
import api from "@/lib/user/axios";
import { ServiceAvailabilityBanner } from "./ServiceAvailabilityBanner";
import { CalendarSection } from "./CalenderSection";
import { PostcodeSection } from "./PostcodeSection";
import { SlotSection } from "./SlotSection";
import { ScheduleFooter } from "./ScheduleFooter";
import toast from "react-hot-toast";

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const UK_POSTCODE_REGEX = /^[A-Z]{1,2}\d[A-Z\d]?$/;
const UK_POSTCODE_REGEX_FULL = /^[A-Z]{1,2}\d[A-Z\d]?\s?\d[A-Z]{2}$/i;

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
    const [zoneChecked, setZoneChecked] = useState(false);
    const [houseNumber, setHouseNumber] = useState(bookingDraft.houseNumber || "");
    const [selectedDate, setSelectedDate] = useState<string | null>(
        bookingDraft.date
    );
    const [slots, setSlots] = useState<Slot[]>([]);
    const [loading, setLoading] = useState(false);
    const [locking, setLocking] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const prevOutwardRef = useRef<string | null>(null);
    const addressRef = useRef<HTMLInputElement | null>(null);

    const outwardCode = postcode.toUpperCase().trim().split(" ")[0];

    /* ---------------- POSTCODE CHECK ---------------- */

    useEffect(() => {
        if (!UK_POSTCODE_REGEX.test(outwardCode)) return;

        if (prevOutwardRef.current === outwardCode) return;
        prevOutwardRef.current = outwardCode;

        const timeout = setTimeout(async () => {
            try {
                setLoading(true);
                setError(null);

                const res = await api.get(
                    `/service-zones/check/${outwardCode.toUpperCase()}`
                );

                if (res.data.available === null) {
                    setZoneChecked(false);
                    setServiceDays(null);
                    return;
                }

                // NOT AVAILABLE
                if (res.data.available === false) {
                    setError("Service not available in this postcode");
                    setZoneChecked(true);
                    setServiceDays(null);
                    return;
                }

                // AVAILABLE
                if (res.data.available === true) {
                    setZoneChecked(true);
                    setServiceDays(res.data.serviceDays);

                    setBookingDraft(d => ({
                        ...d,
                        serviceDays: res.data.serviceDays
                    }));
                }


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
        if (bookingDraft.date) {
            setSelectedDate(bookingDraft.date);
        }
    }, [bookingDraft.date]);

    useEffect(() => {
        if (!selectedDate) return;
        if (!UK_POSTCODE_REGEX.test(outwardCode)) return;

        fetchAvailability(selectedDate, outwardCode);
    }, [selectedDate, outwardCode]);

    useEffect(() => {
        const full = postcode.trim().toUpperCase();

        if (!UK_POSTCODE_REGEX_FULL.test(full)) return;

        setBookingDraft((d) => ({
            ...d,
            postcode: full,
        }));
    }, [postcode]);

    useEffect(() => {
        if (!bookingDraft.postcode) return;
        if (serviceDays) return;

        const outward = bookingDraft.postcode
            .toUpperCase()
            .trim()
            .split(" ")[0];

        if (!UK_POSTCODE_REGEX.test(outward)) return;

        (async () => {
            try {
                setLoading(true);

                const res = await api.get(
                    `/service-zones/check/${outward}`
                );

                if (!res.data.available) return;

                setZoneChecked(true);
                setServiceDays(res.data.serviceDays);
            } finally {
                setLoading(false);
            }
        })();
    }, []);

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

    function handleContinue() {

        if (!postcode.trim()) {
            toast.error("Please enter postcode");
            return;
        }

        if (!houseNumber.trim()) {
            toast.error("Enter house number");
            return;
        }

        if (!matchesFullPostcode) {
            toast.error("Invalid postcode");
            return;
        }

        if (!zoneChecked) {
            toast.error("Service not available here");
            return;
        }

        if (!selectedDate) {
            toast.error("Select a date");
            return;
        }

        if (!bookingDraft.timeFrom || !bookingDraft.timeTo) {
            toast.error("Select a slot");
            return;
        }

        // ✅ NO LOCK HERE
        onContinue();
    }

    const matchesFullPostcode =
        /^[A-Z]{1,2}\d{2}\s?\d[A-Z]{2}$/i.test(postcode.trim());

    const today = new Date();
    const maxDate = new Date();
    maxDate.setDate(today.getDate() + 30);

    return (
        <div className="space-y-8 max-w-5xl mx-auto bg-white 
        w-full min-w-0 overflow-x-hidden 
        px-4 sm:px-6 lg:px-0">

            <h2 className="text-2xl font-medium text-gray-900 break-words">
                Choose your schedule
            </h2>

            <PostcodeSection
                postcode={postcode}
                bookingDraft={bookingDraft}
                setBookingDraft={setBookingDraft}
                address={bookingDraft.address}
                setPostcode={setPostcode}
                setAddress={(value: string) =>
                    setBookingDraft((d: any) => ({
                        ...d,
                        address: value,
                    }))
                }
                houseNumber={houseNumber}
                setHouseNumber={setHouseNumber}
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
                    bookingDraft={bookingDraft}
                    selectSlot={selectSlot}
                />
            )}

            <ScheduleFooter
                onBack={onBack}
                onContinue={handleContinue}
                locking={locking}
            />
        </div>
    );
}