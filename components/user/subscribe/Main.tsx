"use client";

import { useState } from "react";
import SubscribeHero from "./Hero";
import SubscribeSteps from "./Steps";
import PlanServiceStep from "./PlanService";
// import ScheduleStep from "./Schedule";
// import PaymentStep from "./Payment";
import { SubscriptionDraft } from "./types";
import ScheduleStep from "./Schedule";
import PaymentStep from "./Payment";

export default function SubscribeClient() {
    const [currentStep, setCurrentStep] = useState(0);

    const [draft, setDraft] = useState<SubscriptionDraft>({
        plan: null,
        vehicleSize: null,
        serviceType: null,
        pricePerClean: null,
        address: null,
        postcode: null,
        serviceable: null,
        subscriptionDay: null,
        timeWindow: null,
    });

    const handleSubscribe = () => {
        console.log("Final subscription payload:", draft);
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
                    <PaymentStep
                        draft={draft}
                        onBack={() => setCurrentStep(1)}
                        onSubscribe={handleSubscribe}
                    />
                )}

            </main>
        </>
    );
}
