"use client";

import { SubscriptionDraft } from "./types";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useState } from "react";
import { SubscriptionsAPI } from "@/lib/user/subscriptions.api";
import toast from "react-hot-toast";
import { Leaf } from "lucide-react";

type Props = {
    draft: SubscriptionDraft;
    setDraft: React.Dispatch<React.SetStateAction<SubscriptionDraft>>;
    onBack: () => void;
    onSubscribe: () => void;
};

export default function PaymentStep({
    draft,
    setDraft,
    onBack,
    onSubscribe,
}: Props) {
    const stripe = useStripe();
    const elements = useElements();
    const [loading, setLoading] = useState(false);

    function isValidUKReg(reg: string) {
        const cleaned = reg.toUpperCase().replace(/\s/g, "");

        const ukRegRegex = /^[A-Z]{2}[0-9]{2}[A-Z]{3}$/;

        return ukRegRegex.test(cleaned);
    }

    const hasValidReg =
        draft.registrationNumber
            ? isValidUKReg(draft.registrationNumber)
            : false;
    const canSubscribe =
        draft.postcode &&
        draft.address &&
        draft.templateId &&
        draft.timeFrom &&
        draft.timeTo &&
        draft.servicePriceId &&
        draft.stripePriceId &&
        draft.preferredDay !== null &&
        draft.name?.trim() &&
        draft.email?.trim() &&
        draft.phone?.trim() &&
        hasValidReg;

    const handleSubscribe = async () => {
        if (!stripe || !elements) return;

        if (!canSubscribe) {
            toast.error("Please complete all required fields");
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
                    name: draft.name!,
                    email: draft.email!,
                    phone: draft.phone!,
                    make: draft.make,
                    model: draft.model,
                    registrationNumber: draft.registrationNumber,
                    parkingInstructions: draft.parkingInstructions,
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
        <div className="max-w-4xl mx-auto space-y-10">

            <h2 className="text-2xl font-medium text-gray-900">
                Final details
            </h2>

            {/* CONTACT + VEHICLE + ADDRESS */}
            <div className="rounded-2xl border bg-white p-6 shadow-sm space-y-6">

                {/* Personal Info */}
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
                    <div>
                        <Input label="Registration number"
                            value={draft.registrationNumber || ""}
                            onChange={(v: string) =>
                                setDraft(d => ({ ...d, registrationNumber: v }))
                            }
                        />
                        {draft.registrationNumber &&
                            !isValidUKReg(draft.registrationNumber) && (
                                <p className="text-sm text-red-500 mt-1">
                                    Please enter a valid UK registration (Eg: AB12 CDE)
                                </p>
                            )}
                    </div>
                </div>

                {/* Address */}
                <div>
                    <label className="text-sm font-medium">Full address</label>
                    <input
                        value={draft.address || ""}
                        onChange={(e) =>
                            setDraft(d => ({ ...d, address: e.target.value }))
                        }
                        className="w-full rounded-xl border px-4 py-3 text-sm mt-1"
                    />
                </div>

                {/* Parking */}
                <div>
                    <label className="text-sm font-medium">
                        Parking / access instructions
                    </label>
                    <textarea
                        rows={3}
                        value={draft.parkingInstructions || ""}
                        onChange={(e) =>
                            setDraft(d => ({
                                ...d,
                                parkingInstructions: e.target.value,
                            }))
                        }
                        className="w-full rounded-xl border px-4 py-3 text-sm mt-1"
                    />
                </div>

            </div>

            {/* ECO BANNER */}
            <div className="flex items-center gap-3 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800">
                <Leaf size={16} />
                Each clean saves <strong>150 litres of water</strong>
            </div>

            {/* STRIPE CARD */}
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

            {/* SUMMARY */}
            <div className="rounded-2xl bg-black text-white p-6 space-y-4">
                <h3 className="font-medium text-lg">Subscription Summary</h3>

                <SummaryRow label="Plan" value={draft.plan} />
                <SummaryRow label="Service" value={draft.serviceName} />
                <SummaryRow label="Vehicle" value={draft.vehicleCategory} />
                <SummaryRow
                    label="Schedule"
                    value={`${formatWeekday(draft.preferredDay)} • ${formatTimeRange(
                        draft.timeFrom,
                        draft.timeTo
                    )}`}
                />
                <SummaryRow label="Postcode" value={draft.postcode} />

                <div className="border-t border-white/10 pt-4 flex justify-between text-lg font-semibold">
                    <span>Recurring</span>
                    <span>
                        £{((draft.basePrice ?? 0) / 100).toFixed(2)} / {draft.plan?.toLowerCase()}
                    </span>
                </div>
            </div>

            {/* CTA */}
            <button
                disabled={!canSubscribe || loading}
                onClick={handleSubscribe}
                className="w-full rounded-full bg-black py-3 text-white font-medium disabled:opacity-50"
            >
                {loading ? "Processing…" : "Confirm & Subscribe"}
            </button>

            {/* BACK */}
            <button
                onClick={onBack}
                className="rounded-full border px-6 py-2 text-sm"
            >
                ← Back
            </button>
        </div>
    );
}

/* ---------- Helpers ---------- */

function Input({
    label,
    value,
    onChange,
    placeholder,
    type = "text",
}: any) {
    return (
        <div>
            <label className="mb-1 block text-xs font-medium text-gray-600">
                {label}
            </label>
            <input
                type={type}
                value={value || ""}
                onChange={e => onChange(e.target.value)}
                placeholder={placeholder}
                className="w-full rounded-xl border px-4 py-3 text-sm"
            />
        </div>
    );
}

function SummaryRow({
    label,
    value,
}: {
    label: string;
    value?: string | null;
}) {
    return (
        <div className="flex justify-between">
            <p className="text-gray-400">{label}</p>
            <p className="font-medium">
                {value || "—"}
            </p>
        </div>
    );
}

function formatTimeRange(
    from?: string | null,
    to?: string | null,
) {
    if (!from || !to) return "—";
    const f = new Date(`1970-01-01T${from}`);
    const t = new Date(`1970-01-01T${to}`);

    const fmt = (d: Date) =>
        d
            .toLocaleTimeString("en-GB", {
                hour: "numeric",
                minute: "2-digit",
                hour12: true,
            })
            .replace("am", "AM")
            .replace("pm", "PM");

    return `${fmt(f)} – ${fmt(t)}`;
}

function formatWeekday(day?: number | null) {
    if (day === null || day === undefined) return "—";

    const days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ] as const;

    if (day < 0 || day > 6) return "—";

    return days[day];
}