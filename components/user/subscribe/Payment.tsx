"use client";

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

export default function PaymentStep({
    draft,
    onBack,
    onSubscribe,
}: Props) {
    const stripe = useStripe();
    const elements = useElements();
    const [loading, setLoading] = useState(false);

    const canSubscribe =
        draft.postcode &&
        draft.address &&
        draft.templateId &&
        draft.timeFrom &&
        draft.timeTo &&
        draft.servicePriceId &&
        draft.stripePriceId &&
        draft.preferredDay !== null;

    const handleSubscribe = async () => {
        if (!stripe || !elements) return;

        if (!canSubscribe) {
            toast.error("Please complete your schedule selection");
            return;
        }

        try {
            setLoading(true);

            /* 1️⃣ Setup Intent */
            const { clientSecret } =
                await SubscriptionsAPI.createSetupIntent();

            const card = elements.getElement(CardElement);
            if (!card) throw new Error("Card element not found");

            const { setupIntent, error } =
                await stripe.confirmCardSetup(clientSecret, {
                    payment_method: { card },
                });

            if (error || !setupIntent?.payment_method) {
                throw new Error(error?.message || "Card setup failed");
            }

            /* 2️⃣ Create Subscription */
            await SubscriptionsAPI.createSubscription({
                paymentMethodId: setupIntent.payment_method as string,
                subscriptionData: {
                    servicePriceId: draft.servicePriceId!,
                    stripePriceId: draft.stripePriceId!,
                    postcode: draft.postcode!,
                    address: draft.address!,
                    preferredDay: draft.preferredDay!,
                    templateId: draft.templateId!,
                    timeFrom: draft.timeFrom!,
                    timeTo: draft.timeTo!,
                },
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

            {/* CTA */}
            <button
                disabled={!canSubscribe || loading}
                onClick={handleSubscribe}
                className="w-full rounded-2xl bg-black py-4 text-white font-medium disabled:opacity-60"
            >
                {loading
                    ? "Processing…"
                    : `Subscribe • £${((draft.basePrice ?? 0) / 100).toFixed(2)} / ${draft.plan?.toLowerCase()}`}
            </button>

            {/* SUMMARY */}
            <div className="rounded-2xl bg-black text-white p-6 space-y-4">
                <h3 className="font-medium text-lg">Subscription Summary</h3>

                <div className="text-sm space-y-2">
                    <Row label="Plan" value={draft.plan} />
                    <Row label="Service" value={draft.serviceName} />
                    <Row label="Vehicle Type" value={draft.vehicleCategory} />
                    <Row
                        label="Schedule"
                        value={`${formatWeekday(draft.preferredDay)} • ${formatTimeRange(
                            draft.timeFrom,
                            draft.timeTo
                        )}`}
                    />
                    <Row label="Postcode" value={draft.postcode} />
                </div>

                <div className="border-t border-white/10 pt-4 flex justify-between">
                    <span className="text-sm">Recurring charge</span>
                    <span className="font-medium">
                        £{((draft.basePrice ?? 0) / 100).toFixed(2)}
                    </span>
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
                You can cancel or pause anytime from your dashboard.
            </p>
        </div>
    );
}

/* Helpers */

function Row({ label, value }: { label: string; value: any }) {
    return (
        <div className="flex justify-between">
            <span className="text-gray-400">{label}</span>
            <span>{value ?? "—"}</span>
        </div>
    );
}

function formatWeekday(day?: number | null) {
    if (day === null || day === undefined) return "—";
    const days = [
        "Sunday", "Monday", "Tuesday", "Wednesday",
        "Thursday", "Friday", "Saturday"
    ];
    return days[day];
}

function formatTimeRange(from?: string | null, to?: string | null) {
    if (!from || !to) return "—";

    const f = new Date(`1970-01-01T${from}`);
    const t = new Date(`1970-01-01T${to}`);

    const fmt = (d: Date) =>
        d.toLocaleTimeString("en-GB", {
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
        });

    return `${fmt(f)} – ${fmt(t)}`;
}
