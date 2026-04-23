"use client";

import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

import { SubscriptionDraft } from "../types";
import { SubscriptionsAPI } from "@/lib/user/subscriptions.api";
import SubscriptionSummary from "./SubscriptionSummary";
import { openLoginModal } from "@/store/slices/authSlice";
import { userApi } from "@/lib/user/user.api";
import api from "@/lib/user/axios";

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
    const [regLoading, setRegLoading] = useState(false);

    const addressRef = useRef<HTMLInputElement | null>(null);

    /* ---------------- VALIDATION ---------------- */

    function isValidUKReg(reg: string) {
        const cleaned = reg.toUpperCase().replace(/\s/g, "");
        return /^[A-Z]{2}[0-9]{2}[A-Z]{3}$/.test(cleaned);
    }

    function isLikelyReg(reg: string) {
        const cleaned = reg.toUpperCase().replace(/\s/g, "");
        return cleaned.length >= 2 && cleaned.length <= 8;
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
        isValidUKReg(draft.registrationNumber || "") &&
        draft.make &&
        draft.model &&
        draft.colour;

    /* ---------------- PROFILE AUTO-FILL ---------------- */

    useEffect(() => {
        async function loadProfile() {
            try {
                const res = await userApi.getProfile();
                const user = res.data;

                setDraft((d) => ({
                    ...d,
                    name: d.name || user.fullName || "",
                    email: d.email || user.email || "",
                    phone: d.phone || user.phone || "",
                    address: d.address || user.address || "",
                    postcode: d.postcode || user.postcode || "",
                    registrationNumber: d.registrationNumber || user.registrationNumber || "",
                    model: d.model || user.model || "",
                    make: d.make || user.make || "",
                    colour: d.colour || user.colour || "",
                }));
            } catch {
                console.log("Profile load failed");
            }
        }

        if (isAuthenticated) loadProfile();
    }, [isAuthenticated]);

    /* ---------------- VEHICLE LOOKUP ---------------- */

    async function lookupVehicle(reg: string) {
        if (!isLikelyReg(reg)) return;

        try {
            setRegLoading(true);

            const res = await api.post("/vehicle/lookup", {
                registrationNumber: reg,
            });

            setDraft((d) => ({
                ...d,
                make: res.data.make,
                model: res.data.model,
                colour: res.data.colour,
            }));
        } catch {
            // silent fail
        } finally {
            setRegLoading(false);
        }
    }

    /* Debounce lookup */
    useEffect(() => {
        const reg = draft.registrationNumber;

        if (!reg) return;

        const delay = setTimeout(() => {
            lookupVehicle(reg);
        }, 500);

        return () => clearTimeout(delay);
    }, [draft.registrationNumber]);

    /* ---------------- AUTH CONTINUE ---------------- */

    useEffect(() => {
        if (isAuthenticated && pendingSubmit) {
            setPendingSubmit(false);
            handleSubscribe();
        }
    }, [isAuthenticated]);

    /* ---------------- SUBSCRIBE ---------------- */

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

            const subscriptionData = {
                servicePriceId: draft.servicePriceId!,
                stripePriceId: draft.stripePriceId!,
                postcode: draft.postcode!,
                address: draft.address!,
                firstServiceDate: draft.firstServiceDate!,
                preferredDay: draft.preferredDay!,
                templateId: draft.templateId!,
                timeFrom: draft.timeFrom!,
                timeTo: draft.timeTo!,
                name: draft.name!,
                email: draft.email!,
                phone: draft.phone!,
                make: draft.make || undefined,
                model: draft.model || undefined,
                colour: draft.colour || undefined,
                registrationNumber: draft.registrationNumber || undefined,
                parkingInstructions: draft.parkingInstructions || undefined,
            };

            await SubscriptionsAPI.createSubscription({
                paymentMethodId: setupIntent.payment_method as string,
                subscriptionData,
            });

            toast.success("Subscription activated 🎉");
            onSubscribe();
        } catch (err: any) {
            toast.error(err.message || "Payment failed");
        } finally {
            setLoading(false);
        }
    }

    /* ---------------- UI ---------------- */

    return (
        <div className="max-w-4xl mx-auto space-y-10">

            <h2 className="text-2xl font-medium text-gray-900">
                Final details
            </h2>

            <div className="rounded-2xl border bg-white p-6 shadow-sm space-y-6">

                {/* PERSONAL */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Input label="Full name" value={draft.name}
                        onChange={(v: string) =>
                            setDraft(d => ({ ...d, name: v }))
                        }
                    />
                    <Input label="Email" type="email" value={draft.email} disabled
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

                {/* VEHICLE */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <Input label="Registration"
                        value={draft.registrationNumber || ""}
                        onChange={(v: string) =>
                            setDraft(d => ({ ...d, registrationNumber: v }))
                        }
                    />

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
                    <Input label="Colour" value={draft.colour || ""}
                        onChange={(v: string) =>
                            setDraft(d => ({ ...d, colour: v }))
                        }
                    />
                </div>

                {regLoading && (
                    <p className="text-xs text-gray-500">
                        Fetching vehicle details…
                    </p>
                )}

                {/* ADDRESS */}
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

                {/* STRIPE */}
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

function Input({ label, value, onChange, type = "text", disabled = false, }: any) {
    return (
        <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">
                {label}
            </label>
            <input
                type={type}
                value={value || ""}
                disabled={disabled}
                onChange={e => onChange(e.target.value)}
                className="w-full rounded-xl border px-4 py-3 text-sm"
            />
        </div>
    );
}