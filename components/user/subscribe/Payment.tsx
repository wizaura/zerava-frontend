"use client";

import { Lock } from "lucide-react";
import { SubscriptionDraft } from "./types";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useState } from "react";
import { SubscriptionsAPI } from "@/lib/user/subscriptions.api";
import toast from "react-hot-toast";

type Props = {
    draft: SubscriptionDraft;
    onBack: () => void;
    onSubscribe: () => void;
};

export default function PaymentStep({ draft, onBack, onSubscribe }: Props) {

    const stripe = useStripe();
    const elements = useElements();
    const [loading, setLoading] = useState(false);

    const handleSubscribe = async () => {
        if (!stripe || !elements) return;

        try {
            setLoading(true);

            // 1️⃣ Get SetupIntent
            const { clientSecret } =
                await SubscriptionsAPI.createSetupIntent();

            // 2️⃣ Confirm card
            const card = elements.getElement(CardElement);
            if (!card) throw new Error("Card element not found");

            const { setupIntent, error } =
                await stripe.confirmCardSetup(clientSecret, {
                    payment_method: {
                        card,
                    },
                });

            if (error || !setupIntent?.payment_method) {
                throw new Error(error?.message || "Card setup failed");
            }

            // 3️⃣ Create subscription
            await SubscriptionsAPI.createSubscription({
                paymentMethodId: setupIntent.payment_method as string,
                draft,
            });

            toast.success("Subscription activated 🎉");
            onSubscribe();
        } catch (err: any) {
            toast.error(err.message || "Payment failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto space-y-10">

            {/* CARD */}
            <div className="rounded-2xl border p-6 bg-white">
                <CardElement
                    options={{
                        hidePostalCode: true,
                        style: {
                            base: {
                                fontSize: "16px",
                                color: "#111",
                                "::placeholder": { color: "#9CA3AF" },
                            },
                        },
                    }}
                />
            </div>

            {/* SUBSCRIBE CTA */}
            <button
                disabled={loading}
                onClick={handleSubscribe}
                className="w-full rounded-2xl bg-black py-4 text-white font-medium disabled:opacity-60"
            >
                {loading
                    ? "Processing…"
                    : `Subscribe • £${draft.pricePerClean}/month`}
            </button>

            {/* SUMMARY */}
            <div className="rounded-2xl bg-black text-white p-6 space-y-4">
                <h3 className="font-medium text-lg">Subscription Summary</h3>

                <div className="text-sm space-y-2">
                    <Row label="Plan" value={draft.plan} />
                    <Row label="Service" value={draft.serviceType} />
                    <Row label="Vehicle" value={draft.vehicleSize} />
                    <Row
                        label="Schedule"
                        value={`${draft.subscriptionDay}s • ${draft.timeWindow}`}
                    />
                </div>

                <div className="border-t border-white/10 pt-4 flex justify-between">
                    <div>
                        <p className="text-sm">Price per clean</p>
                        <p className="text-xs text-electric-teal">
                            Save vs one-time booking
                        </p>
                    </div>
                    <p className="font-medium">£{draft.pricePerClean}</p>
                </div>
            </div>

            {/* FOOTER */}
            <button
                onClick={onBack}
                className="rounded-full border px-6 py-2 text-sm"
            >
                ← Back
            </button>

            <p className="text-center text-xs text-gray-500">
                You can cancel or pause your subscription anytime from your account
                dashboard.
            </p>
        </div>
    );
}

function Row({ label, value }: { label: string; value: any }) {
    return (
        <div className="flex justify-between">
            <span className="text-gray-400">{label}</span>
            <span>{value}</span>
        </div>
    );
}
