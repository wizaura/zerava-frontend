"use client";

import { useState } from "react";
import BookingHero from "./Hero";
import BookingSteps from "./Steps";
import ServiceStep from "./Service";
import ScheduleStep from "./Schedule";
import AddressStep from "./Address";
import ConfirmStep from "./Confirm";

type ServicePrice = {
    vehicleSize: string;
    serviceType: string;
    price: number;
};

export type BookingDraft = {
    vehicleSize: string | null;
    serviceType: string | null;
    price: number | null;
    postcode: string | null;
    date: string | null;
    timeSlotId: string | null;
    timeFrom: string | null;
    timeTo: string | null;
    address: string | null;
    notes: string | null;
    name: string | null;
    email: string | null;
    phone: string | null;
};


export default function BookingClient({
    prices,
}: {
    prices: ServicePrice[];
}) {
    const [currentStep, setCurrentStep] = useState(0);

    const [bookingDraft, setBookingDraft] = useState<BookingDraft>({
        vehicleSize: null,
        serviceType: null,
        price: null,

        // next slides
        postcode: null,
        date: null,
        timeSlotId: null,
        timeFrom: null,
        timeTo: null,
        address: null,
        notes: null,
        name: null,
        email: null,
        phone: null,
    });

    return (
        <>
            <BookingHero />
            <BookingSteps currentStep={currentStep} />

            <main className="mx-auto bg-white px-4 py-10">
                {currentStep === 0 && (
                    <ServiceStep
                        prices={prices}
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
                {currentStep === 2 && (
                    <AddressStep
                        bookingDraft={bookingDraft}
                        setBookingDraft={setBookingDraft}
                        onBack={() => setCurrentStep(1)}
                        onContinue={() => setCurrentStep(3)}
                    />
                )}
                {currentStep === 3 && (
                    <ConfirmStep
                        bookingDraft={bookingDraft}
                        setBookingDraft={setBookingDraft}
                        onBack={() => setCurrentStep(2)}
                        onSuccess={() => setCurrentStep(4)}
                    />
                )}
            </main>
        </>
    );
}
