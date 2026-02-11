"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import api from "@/lib/user/axios";

import ScheduleStep from "./Schedule";
import ConfirmRescheduleStep from "./Confirm";

/* ---------- TYPES ---------- */

export type RescheduleDraft = {
    bookingId: string;

    // editable
    postcode: string | null;
    date: string | null;
    serviceSlotId: string | null;
    timeFrom: string | null;
    timeTo: string | null;
    address: string | null;

    // readonly (display only)
    service: string;
    vehicleCategory: string;
    price: number;
};

/* ---------- COMPONENT ---------- */

export default function RescheduleClient() {
    const { bookingId } = useParams<{ bookingId: string }>();
    const router = useRouter();

    const [step, setStep] = useState(0);
    const [loading, setLoading] = useState(true);
    const [draft, setDraft] = useState<RescheduleDraft | null>(null);

    /* ---------- LOAD BOOKING ---------- */

    useEffect(() => {
        if (!bookingId) return;

        api.get(`/bookings/${bookingId}`)
            .then((res) => {
                const booking = res.data;

                console.log(booking,'bk')

                setDraft({
                    bookingId: booking.id,

                    postcode: booking.postcode,
                    date: booking.date,
                    serviceSlotId: booking.serviceSlotId,
                    timeFrom: booking.timeFrom,
                    timeTo: booking.timeTo,
                    address: booking.address,

                    service: booking.service,
                    vehicleCategory: booking.vehicleCategory,
                    price: booking.price,
                });
            })
            .finally(() => setLoading(false));
    }, [bookingId]);

    if (loading || !draft) return null;

    /* ---------- RENDER ---------- */

    return (
        <div className="mx-auto max-w-6xl border border-gray-200 rounded-2xl bg-white px-4 py-10">
            {step === 0 && (
                <ScheduleStep
                    draft={draft}
                    setDraft={setDraft as React.Dispatch<
                        React.SetStateAction<RescheduleDraft>
                    >}
                    onContinue={() => setStep(1)}
                />
            )}

            {step === 1 && (
                <ConfirmRescheduleStep
                    draft={draft}
                    onBack={() => setStep(0)}
                />
            )}
        </div>
    );
}
