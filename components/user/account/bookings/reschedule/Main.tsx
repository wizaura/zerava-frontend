"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import api from "@/lib/user/axios";

import ScheduleStep from "./Schedule";
import ConfirmRescheduleStep from "./Confirm";
import Stepper from "@/components/ui/Stepper";
import FlowHero from "@/components/ui/FlowHero";

/* ---------- TYPES ---------- */

export type RescheduleDraft = {
    bookingId: string;

    // editable
    postcode: string | null;
    date: string | null;

    serviceSlotId: string | null;
    templateId: string | null;
    isTemplate: boolean;
    operatorId: string | null;

    timeFrom: string | null;
    timeTo: string | null;
    address: string | null;

    // readonly
    service: string;
    vehicleCategory: string;
    price: number;
};

/* ---------- COMPONENT ---------- */

export default function RescheduleClient() {
    const { bookingId } = useParams<{ bookingId: string }>();

    const [step, setStep] = useState(0);
    const [loading, setLoading] = useState(true);
    const [draft, setDraft] = useState<RescheduleDraft | null>(null);

    /* ---------- LOAD BOOKING ---------- */

    useEffect(() => {
        if (!bookingId) return;

        api.get(`/bookings/${bookingId}`)
            .then((res) => {
                const booking = res.data;

                console.log(booking, 'bk')

                setDraft({
                    bookingId: booking.id,

                    postcode: booking.postcode,
                    date: booking.date,

                    serviceSlotId: booking.serviceSlotId ?? null,
                    templateId: null,
                    isTemplate: false,
                    operatorId: booking.operatorId ?? null,

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
        <>
            <FlowHero
                title="Reschedule Your Booking"
                subtitle="Update your booking Details"
            />
            <Stepper
                steps={["Schedule", "Confirm"]}
                currentStep={step}
            />
            <main className="mx-auto bg-white px-4 py-10">

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
            </main>
        </>
    );
}
