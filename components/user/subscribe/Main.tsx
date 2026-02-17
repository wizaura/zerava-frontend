"use client";

import { useState } from "react";
import SubscribeHero from "./Hero";
import SubscribeSteps from "./Steps";
import PlanServiceStep from "./PlanService";
import { SubscriptionDraft } from "./types";
import ScheduleStep from "./Schedule";
import PaymentStep from "./Payment";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { SubscriptionService } from "./Call";

const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

export default function SubscribeClient({
    services,
}: {
    services: SubscriptionService[];
}) {
    const [currentStep, setCurrentStep] = useState(0);


    const [draft, setDraft] = useState<SubscriptionDraft>({
        plan: null,
        vehicleCategoryId: null,
        servicePriceId: null,
        stripePriceId: null,
        vehicleCategory: null,

        serviceName: undefined,
        basePrice: undefined,
        durationMin: undefined,

        postcode: null,
        address: null,

        preferredDay: null,
        templateId: null,
        timeFrom: null,
        timeTo: null,

        serviceable: null,

        pricePerClean: undefined,
    });


    const handleSubscribe = () => {
        window.location.href = "/account/subscriptions";
    };


    return (
        <>
            <SubscribeHero />
            <SubscribeSteps currentStep={currentStep} />

            <main className="mx-auto bg-white px-4 py-10">
                {currentStep === 0 && (
                    <PlanServiceStep
                        draft={draft}
                        setDraft={setDraft}
                        onContinue={() => setCurrentStep(1)}
                        services={services}
                    />
                )}

                {currentStep === 1 && (
                    <ScheduleStep
                        draft={draft}
                        setDraft={setDraft}
                        onContinue={() => setCurrentStep(2)}
                        onBack={() => setCurrentStep(0)}
                    />
                )}

                {currentStep === 2 && (
                    <Elements stripe={stripePromise}>
                        <PaymentStep
                            draft={draft}
                            onBack={() => setCurrentStep(1)}
                            onSubscribe={handleSubscribe}
                        />
                    </Elements>
                )}
            </main>
        </>
    );
}
