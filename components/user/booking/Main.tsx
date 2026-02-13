"use client";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import BookingHero from "./Hero";
import BookingSteps from "./Steps";
import ServiceStep from "./Service";
import AddOnsStep from "./AddOns";
import ScheduleStep from "./Schedule";
import AddressStep from "./Address";
import ConfirmStep from "./Confirm";
import ProcessingStep from "./Processing";

/* ---------- TYPES ---------- */

export type VehicleCategory = {
    id: string;
    name: string;
    description: string;
};

export type ServicePrice = {
    id: string;        // servicePriceId
    price: number;     // pence
    vehicleCategory: VehicleCategory;
};

export type Service = {
    id: string;
    name: string;
    slug: string;
    description?: string | null;
    isMaintenance: boolean;
    prices: ServicePrice[];
    durationMin: number;
};

export type AddOns = {
    id: string;
    name: string;
    description?: string | null;
    price: number;
    durationMin: number;
};



export type BookingDraft = {
    servicePriceId: string | null;

    // derived (display only)
    serviceName?: string;
    vehicleCategory?: string;
    basePrice?: number;

    serviceDurationMin?: number;
    addOns: AddOns[];
    addOnDurationMin?: number;

    postcode: string | null;
    date: string | null;
    serviceSlotId: string | null;
    timeFrom: string | null;
    timeTo: string | null;

    address: string | null;
    notes: string | null;
    name: string | null;
    email: string | null;
    phone: string | null;
};

/* ---------- COMPONENT ---------- */

export default function BookingClient({
    services,
    addOns,
}: {
    services: Service[];
    addOns: AddOns[];
}) {
    const [currentStep, setCurrentStep] = useState(0);
    const user = useSelector((state: any) => state.auth.user);

    const [bookingDraft, setBookingDraft] = useState<BookingDraft>({
        servicePriceId: null,
        addOns: [],

        postcode: null,
        date: null,
        serviceSlotId: null,
        timeFrom: null,
        timeTo: null,

        address: null,
        notes: null,
        name: null,
        email: null,
        phone: null,
    });

    /* ---------- PREFILL USER DATA ---------- */

    useEffect(() => {
        if (!user) return;

        setBookingDraft((d) => ({
            ...d,
            name: d.name ?? user.fullName ?? "",
            email: d.email ?? user.email ?? "",
            phone: d.phone ?? user.phone ?? "",
            address: d.address ?? user.address ?? "",
            postcode: d.postcode ?? user.postcode ?? "",
        }));
    }, [user]);

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }, [currentStep]);


    /* ---------- RENDER ---------- */

    return (
        <>
            <BookingHero />
            <BookingSteps currentStep={currentStep} />

            <main className="mx-auto bg-white px-4 py-10">
                {currentStep === 0 && (
                    <ServiceStep
                        services={services}
                        bookingDraft={bookingDraft}
                        setBookingDraft={setBookingDraft}
                        onContinue={() => setCurrentStep(1)}
                    />
                )}

                {currentStep === 1 && (
                    <AddOnsStep
                        addOns={addOns}
                        bookingDraft={bookingDraft}
                        setBookingDraft={setBookingDraft}
                        onBack={() => setCurrentStep(0)}
                        onContinue={() => setCurrentStep(2)}
                    />
                )}

                {currentStep === 2 && (
                    <ScheduleStep
                        bookingDraft={bookingDraft}
                        setBookingDraft={setBookingDraft}
                        onBack={() => setCurrentStep(1)}
                        onContinue={() => setCurrentStep(3)}
                    />
                )}

                {currentStep === 3 && (
                    <AddressStep
                        bookingDraft={bookingDraft}
                        setBookingDraft={setBookingDraft}
                        onBack={() => setCurrentStep(2)}
                        onContinue={() => setCurrentStep(4)}
                    />
                )}

                {currentStep === 4 && (
                    <ConfirmStep
                        bookingDraft={bookingDraft}
                        setBookingDraft={setBookingDraft}
                        onBack={() => setCurrentStep(3)}
                        onSuccess={() => setCurrentStep(5)}
                    />
                )}

                {currentStep === 5 && <ProcessingStep />}
            </main>
        </>
    );
}
