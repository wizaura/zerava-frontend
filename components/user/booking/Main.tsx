"use client";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import ServiceStep from "./Service";
import ScheduleStep from "./Schedule";
import ConfirmStep from "./Confirm";
import ProcessingStep from "./Processing";
import Stepper from "@/components/ui/Stepper";
import FlowHero from "@/components/ui/FlowHero";

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
    icon: string;
    isPopular?: boolean;
    badgeLabel?: string;
    description?: string | null;
    isMaintenance: boolean;
    prices: ServicePrice[];
    durationMin: number;
};

export type AddOns = {
    id: string;
    name: string;
    icon?: string;
    description?: string | null;
    price: number;
    durationMin: number;
};



export type BookingDraft = {
    /* ================= CORE SERVICE ================= */

    servicePriceId: string | null;

    // Display only
    serviceName: string | null;
    vehicleCategory: string | null;
    basePrice: number | null;

    serviceDurationMin: number;
    addOns: AddOns[];
    addOnDurationMin: number;

    /* ================= SCHEDULING ================= */

    postcode: string | null;
    date: string | null;

    timeFrom: string | null;
    timeTo: string | null;

    /* Real Slot OR Template Slot */

    serviceSlotId: string | null;   // if real slot
    templateId: string | null;      // if template slot
    isTemplate: boolean;            // true if template used
    operatorId: string | null;      // assigned operator

    /* ================= CONTACT ================= */

    make: string | null;
    model: string | null;
    registrationNumber: string | null;
    parkingInstructions: string | null;

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

        serviceName: null,
        vehicleCategory: null,
        basePrice: null,

        serviceDurationMin: 0,
        addOns: [],
        addOnDurationMin: 0,

        postcode: null,
        date: null,

        make: null,
        model: null,
        registrationNumber:  null,
        parkingInstructions:  null,

        timeFrom: null,
        timeTo: null,

        serviceSlotId: null,
        templateId: null,
        isTemplate: false,
        operatorId: null,

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
            <FlowHero
                title="Book Your Clean"
                subtitle="Premium waterless car care, delivered to you"
            />
            <Stepper
                steps={["Service", "Schedule", "Details", "Payment"]}
                currentStep={currentStep}
            />
            <main className="mx-auto bg-white px-4 py-10">
                {currentStep === 0 && (
                    <ServiceStep
                        services={services}
                        addOns={addOns}
                        bookingDraft={bookingDraft}
                        setBookingDraft={setBookingDraft}
                        onContinue={() => setCurrentStep(1)}
                    />
                )}

                {currentStep === 1 && (
                    <ScheduleStep
                        bookingDraft={bookingDraft}
                        setBookingDraft={setBookingDraft}
                        onBack={() => setCurrentStep(0)}
                        onContinue={() => setCurrentStep(2)}
                    />
                )}

                {/* {currentStep === 2 && (
                    <AddressStep
                        bookingDraft={bookingDraft}
                        setBookingDraft={setBookingDraft}
                        onBack={() => setCurrentStep(1)}
                        onContinue={() => setCurrentStep(3)}
                    />
                )} */}

                {currentStep === 2 && (
                    <ConfirmStep
                        bookingDraft={bookingDraft}
                        setBookingDraft={setBookingDraft}
                        onBack={() => setCurrentStep(1)}
                        onSuccess={() => setCurrentStep(3)}
                    />
                )}

                {currentStep === 3 && <ProcessingStep />}
            </main>
        </>
    );
}
