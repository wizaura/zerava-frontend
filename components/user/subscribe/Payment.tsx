"use client";

import { Lock } from "lucide-react";
import { SubscriptionDraft } from "./types";

type Props = {
    draft: SubscriptionDraft;
    onBack: () => void;
    onSubscribe: () => void;
};

export default function PaymentStep({ draft, onBack, onSubscribe }: Props) {
    return (
        <div className="max-w-3xl mx-auto space-y-10">

            {/* CARD */}
            <div className="rounded-2xl border p-6 bg-white">
                <p className="mb-4 font-medium">Card Details</p>

                <div className="rounded-xl border px-4 py-3 text-sm text-gray-400">
                    Card number &nbsp;&nbsp; MM / YY &nbsp; CVC
                </div>

                <p className="mt-3 flex items-center gap-2 text-xs text-gray-500">
                    <Lock size={14} />
                    Secured by Stripe • Your payment info is encrypted
                </p>
            </div>

            {/* SUBSCRIBE CTA */}
            <button onClick={onSubscribe} className="w-full rounded-2xl bg-black py-4 text-white font-medium">
                Subscribe • £{draft.pricePerClean}/month
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
