"use client";

import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import toast from "react-hot-toast";

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
                colour: res.data.colour,
            }));
        } catch {
            // silent fail
        } finally {
            setRegLoading(false);
        }
    }

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
        if (!draft.name) return toast.error("Name is required");
        if (!draft.email) return toast.error("Email is required");
        if (!draft.phone) return toast.error("Phone is required");
        if (!draft.address) return toast.error("Address is required");
        if (!draft.postcode) return toast.error("Postcode is required");
        if (!draft.templateId) return toast.error("Service type missing");
        if (!draft.timeFrom || !draft.timeTo)
            return toast.error("Select a valid time slot");
        if (!draft.servicePriceId || !draft.stripePriceId)
            return toast.error("Pricing not selected");
        if (!draft.registrationNumber)
            return toast.error("Vehicle registration is required");
        if (!isValidUKReg(draft.registrationNumber))
            return toast.error("Invalid vehicle registration");
        if (!draft.make) return toast.error("Vehicle make is required");
        if (!draft.model) return toast.error("Vehicle model is required");
        if (!draft.colour) return toast.error("Vehicle colour is required");

        if (!isAuthenticated) {
            setPendingSubmit(true);
            dispatch(openLoginModal());
            return;
        }

        try {
            setLoading(true);

            const { draftId } = await SubscriptionsAPI.createDraft(draft);

            const { url } =
                await SubscriptionsAPI.createCheckoutSession({draftId});

            window.location.href = url;
        } catch (err: any) {
            toast.error(err.message || "Checkout failed");
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

                {/* INFO */}
                <p className="text-xs text-gray-500">
                    You will be redirected to a secure payment page to complete your subscription.
                </p>
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
                    disabled={loading}
                    onClick={handleSubscribe}
                    className="rounded-full px-8 py-2 text-sm text-white bg-black"
                >
                    {loading ? "Redirecting…" : "Continue to payment"}
                </button>
            </div>
        </div>
    );
}

/* ---------- Input ---------- */

function Input({ label, value, onChange, type = "text", disabled = false }: any) {
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