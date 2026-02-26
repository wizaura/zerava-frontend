"use client";

import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

import { SubscriptionDraft } from "../types";
import { SubscriptionsAPI } from "@/lib/user/subscriptions.api";
import { useGoogleAutocomplete } from "@/hooks/useGoogleAutocomplete";
import SubscriptionSummary from "./SubscriptionSummary";
import { openLoginModal } from "@/store/slices/authSlice";

type Props = {
    draft: SubscriptionDraft;
    setDraft: React.Dispatch<React.SetStateAction<SubscriptionDraft>>;
    onBack: () => void;
    onSubscribe: () => void;
};

export default function SubscriptionFinalDetailsStep({
    draft,
    setDraft,
    onBack,
    onSubscribe,
}: Props) {
    const stripe = useStripe();
    const elements = useElements();
    const dispatch = useDispatch();
    const { isAuthenticated } = useSelector((s: any) => s.auth);

    const [loading, setLoading] = useState(false);
    const [pendingSubmit, setPendingSubmit] = useState(false);

    const addressRef = useRef<HTMLInputElement | null>(null);

    useGoogleAutocomplete({
        inputRef: addressRef,
        setBookingDraft: setDraft,
    });

    function isValidUKReg(reg: string) {
        const cleaned = reg.toUpperCase().replace(/\s/g, "");
        return /^[A-Z]{2}[0-9]{2}[A-Z]{3}$/.test(cleaned);
    }

    const canSubmit =
        draft.name &&
        draft.email &&
        draft.phone &&
        draft.address &&
        draft.postcode &&
        draft.templateId &&
        draft.timeFrom &&
        draft.timeTo &&
        draft.servicePriceId &&
        draft.stripePriceId &&
        isValidUKReg(draft.registrationNumber || "");

    useEffect(() => {
        if (isAuthenticated && pendingSubmit) {
            setPendingSubmit(false);
            handleSubscribe();
        }
    }, [isAuthenticated]);

    async function handleSubscribe() {
        if (!stripe || !elements) return;

        if (!canSubmit) {
            toast.error("Please complete all required fields");
            return;
        }

        if (!isAuthenticated) {
            setPendingSubmit(true);
            dispatch(openLoginModal());
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
                subscriptionData: draft,
            });

            toast.success("Subscription activated 🎉");
            onSubscribe();
        } catch (err: any) {
            toast.error(err.message || "Payment failed");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="max-w-4xl mx-auto space-y-10">

            <h2 className="text-2xl font-medium text-gray-900">
                Final details
            </h2>

            {/* FORM */}
            <div className="rounded-2xl border bg-white p-6 shadow-sm space-y-6">

                {/* Personal */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Input label="Full name" value={draft.name}
                        onChange={(v: string) =>
                            setDraft(d => ({ ...d, name: v }))
                        }
                    />
                    <Input label="Email" type="email" value={draft.email}
                        onChange={(v: string) =>
                            setDraft(d => ({ ...d, email: v }))
                        }
                    />
                    <Input label="Phone" value={draft.phone}
                        onChange={(v: string) =>
                            setDraft(d => ({ ...d, phone: v }))
                        }
                    />
                </div>

                {/* Vehicle */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Input label="Make" value={draft.make || ""}
                        onChange={(v: string) =>
                            setDraft(d => ({ ...d, make: v }))
                        }
                    />
                    <Input label="Model" value={draft.model || ""}
                        onChange={(v: string) =>
                            setDraft(d => ({ ...d, model: v }))
                        }
                    />
                    <Input label="Registration"
                        value={draft.registrationNumber || ""}
                        onChange={(v: string) =>
                            setDraft(d => ({ ...d, registrationNumber: v }))
                        }
                    />
                </div>

                {/* Address */}
                <div>
                    <label className="text-sm font-medium">Full address</label>
                    <input
                        ref={addressRef}
                        value={draft.address || ""}
                        onChange={(e) =>
                            setDraft(d => ({ ...d, address: e.target.value }))
                        }
                        className="w-full rounded-xl border px-4 py-3 text-sm mt-1"
                    />
                </div>

                {/* Stripe */}
                <div className="rounded-xl border p-4">
                    <CardElement
                        options={{
                            hidePostalCode: true,
                            style: {
                                base: {
                                    fontSize: "16px",
                                    color: "#111",
                                },
                            },
                        }}
                    />
                </div>
            </div>

            {/* SUMMARY */}
            <SubscriptionSummary draft={draft} />

            {/* FOOTER */}
            <div className="flex justify-between">
                <button
                    onClick={onBack}
                    className="rounded-full border px-6 py-2 text-sm"
                >
                    ← Back
                </button>

                <button
                    disabled={!canSubmit || loading}
                    onClick={handleSubscribe}
                    className="rounded-full px-8 py-2 text-sm text-white bg-black"
                >
                    {loading ? "Processing…" : "Confirm & Subscribe"}
                </button>
            </div>
        </div>
    );
}

/* ---------- Input ---------- */

function Input({ label, value, onChange, type = "text" }: any) {
    return (
        <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">
                {label}
            </label>
            <input
                type={type}
                value={value || ""}
                onChange={e => onChange(e.target.value)}
                className="w-full rounded-xl border px-4 py-3 text-sm"
            />
        </div>
    );
}