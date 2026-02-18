"use client";

import { useEffect, useState } from "react";
// import SubscribeHero from "../Hero";
// import SubscribeSteps from "../Steps";
import RescheduleScheduleStep from "./Schedule";
import api from "@/lib/user/axios";
import { useParams } from "next/navigation";
import ConfirmSubscriptionRescheduleStep from "./Confirm";
import Stepper from "@/components/ui/Stepper";
import FlowHero from "@/components/ui/FlowHero";

type Props = {
    subscriptionId: string;
};

export default function RescheduleClient() {
    const [currentStep, setCurrentStep] = useState(0);
    const [loading, setLoading] = useState(true);

    const [draft, setDraft] = useState<any>(null);
    const { subscriptionId } = useParams<{ subscriptionId: string }>();

    /* =========================================
       LOAD EXISTING SUBSCRIPTION
    ========================================= */

    useEffect(() => {
        async function fetchSubscription() {
            try {
                const res = await api.get(
                    `/subscriptions/${subscriptionId}`
                );

                const sub = res.data;

                setDraft({
                    plan: sub.plan,
                    vehicleCategoryId: sub.vehicleCategoryId,
                    servicePriceId: sub.servicePriceId,
                    stripePriceId: sub.stripePriceId,
                    vehicleCategory: sub.vehicleCategory,

                    serviceName: sub.serviceName,
                    basePrice: sub.basePrice,
                    durationMin: sub.durationMin,

                    postcode: sub.postcode,
                    address: sub.address,

                    preferredDay: sub.weekday,
                    templateId: sub.templateId,
                    timeFrom: sub.timeFrom,
                    timeTo: sub.timeTo,

                    serviceable: true,

                    pricePerClean: sub.pricePerClean,
                });
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        }

        fetchSubscription();
    }, [subscriptionId]);

    if (loading || !draft) {
        return (
            <div className="p-10 text-center">
                Loading subscription...
            </div>
        );
    }

    return (
        <>
            <FlowHero
                title="Reschedule Subscription"
                subtitle="Update your recurring clean schedule"
            />
            <Stepper
                steps={["Schedule", "Confirm"]}
                currentStep={currentStep}
            />
            <main className="mx-auto bg-white px-4 py-10">
                {currentStep === 0 && (
                    <RescheduleScheduleStep
                        draft={draft}
                        setDraft={setDraft}
                        onContinue={() => setCurrentStep(1)}
                        onBack={() =>
                        (window.location.href =
                            "/account/subscriptions")
                        }
                    />
                )}

                {currentStep === 1 && (
                    <ConfirmSubscriptionRescheduleStep
                        draft={draft}
                        subscriptionId={subscriptionId}
                        onBack={() => setCurrentStep(0)}
                    />
                )}
            </main>
        </>
    );
}
