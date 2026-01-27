"use client";

import { Dispatch, SetStateAction } from "react";
import { Sparkles, Wind, ShieldCheck } from "lucide-react";
import { SubscriptionDraft } from "./types";

type Props = {
    draft: SubscriptionDraft;
    setDraft: Dispatch<SetStateAction<SubscriptionDraft>>;
    onContinue: () => void;
};

const plans = [
    {
        key: "WEEKLY",
        label: "Weekly",
        discount: 20,
        desc: "Perfect for high-mileage drivers",
        badge: "Best Value",
    },
    {
        key: "FORTNIGHTLY",
        label: "Fortnightly",
        discount: 15,
        desc: "Keep consistently clean",
    },
    {
        key: "MONTHLY",
        label: "Monthly",
        discount: 10,
        desc: "Regular maintenance",
    },
] as const;

const vehicleSizes = [
    { key: "SMALL", label: "Small", hint: "Polo, Fiesta, Corsa" },
    { key: "MEDIUM", label: "Medium", hint: "Golf, 3 Series, A4" },
    { key: "LARGE", label: "Large", hint: "Q7, X5, Discovery" },
] as const;

const services = [
    {
        key: "EXTERIOR",
        title: "Exterior Clean",
        desc: "Full exterior wash, wheels & windows",
        basePrice: 30,
        icon: Sparkles,
        popular: false
    },
    {
        key: "INTERIOR",
        title: "Interior Refresh",
        desc: "Vacuum, dashboard, seats & freshening",
        basePrice: 50,
        icon: Wind,
        popular: false
    },
    {
        key: "FULL_VALET",
        title: "Full Valet",
        desc: "Complete inside & out treatment",
        basePrice: 75,
        icon: ShieldCheck,
        popular: true,
    },
] as const;

export default function PlanServiceStep({
    draft,
    setDraft,
    onContinue,
}: Props) {
    const selectedPlan = plans.find(p => p.key === draft.plan);

    const calculatePrice = (base: number) => {
        if (!selectedPlan) return null;
        return Math.round(base * (1 - selectedPlan.discount / 100));
    };

    const canContinue =
        Boolean(
            draft.plan &&
            draft.vehicleSize &&
            draft.serviceType &&
            draft.pricePerClean !== null
        );

    return (
        <div className="max-w-4xl mx-auto space-y-12">

            {/* PLAN */}
            <section>
                <h2 className="text-2xl font-medium mb-4">Choose your frequency</h2>
                <div className="grid md:grid-cols-3 gap-4">
                    {plans.map(p => {
                        const selected = draft.plan === p.key;
                        return (
                            <button
                                key={p.key}
                                onClick={() =>
                                    setDraft(d => ({
                                        ...d,
                                        plan: p.key,
                                        serviceType: null,
                                        pricePerClean: null,
                                    }))
                                }
                                className={[
                                    "relative rounded-xl p-6 text-left border transition",
                                    selected
                                        ? "border-electric-teal bg-electric-teal/15"
                                        : "border-gray-200 bg-white hover:border-gray-300",
                                ].join(" ")}
                            >
                                <p className="font-medium">{p.label}</p>
                                <p className="text-sm text-electric-teal">{p.discount}% off</p>
                                <p className="text-sm text-gray-500">{p.desc}</p>
                            </button>
                        );
                    })}
                </div>
            </section>

            {/* VEHICLE SIZE */}
            <section>
                <h3 className="text-lg font-medium mb-3">Vehicle size</h3>
                <div className="grid md:grid-cols-3 gap-4">
                    {vehicleSizes.map(v => {
                        const selected = draft.vehicleSize === v.key;
                        return (
                            <button
                                key={v.key}
                                onClick={() =>
                                    setDraft(d => ({
                                        ...d,
                                        vehicleSize: v.key,
                                        serviceType: null,
                                        pricePerClean: null,
                                    }))
                                }
                                className={[
                                    "rounded-xl p-5 text-left border transition",
                                    selected
                                        ? "border-black"
                                        : "border-gray-200 hover:border-gray-300",
                                ].join(" ")}
                            >
                                <p className="font-medium">{v.label}</p>
                                <p className="text-sm text-gray-500">{v.hint}</p>
                            </button>
                        );
                    })}
                </div>
            </section>

            {/* SERVICE */}
            {draft.vehicleSize && selectedPlan && (
                <section className="space-y-4">
                    <h3 className="text-lg font-medium">Select service</h3>

                    {services.map(s => {
                        const Icon = s.icon;
                        const discounted = calculatePrice(s.basePrice);
                        if (discounted === null) return null;

                        const selected = draft.serviceType === s.key;

                        return (
                            <button
                                key={s.key}
                                onClick={() =>
                                    setDraft(d => ({
                                        ...d,
                                        serviceType: s.key,
                                        pricePerClean: discounted,
                                    }))
                                }
                                className={[
                                    "relative w-full rounded-2xl p-6 text-left border transition",
                                    selected
                                        ? "border-electric-teal bg-electric-teal/15"
                                        : "border-gray-200 bg-white hover:border-gray-300",
                                ].join(" ")}
                            >
                                {s.popular && (
                                    <span className="absolute right-5 -top-3 rounded-full bg-electric-teal px-3 py-1 text-xs text-white">
                                        Popular
                                    </span>
                                )}

                                <div className="flex justify-between items-start gap-6">
                                    <div className="flex gap-4">
                                        <div
                                            className={[
                                                "h-10 w-10 rounded-xl flex items-center justify-center",
                                                selected
                                                    ? "bg-electric-teal text-white"
                                                    : "bg-gray-100 text-gray-600",
                                            ].join(" ")}
                                        >
                                            <Icon />
                                        </div>
                                        <div>
                                            <p className="font-medium">{s.title}</p>
                                            <p className="text-sm text-gray-500">{s.desc}</p>
                                        </div>
                                    </div>

                                    <div className="text-right">
                                        <p className="text-sm line-through text-gray-400">
                                            £{s.basePrice}
                                        </p>
                                        <p className="text-lg font-medium">
                                            £{discounted}
                                        </p>
                                    </div>
                                </div>
                            </button>
                        );
                    })}
                </section>
            )}

            {/* FOOTER */}
            <div className="flex justify-end pt-6">
                <button
                    disabled={!canContinue}
                    onClick={onContinue}
                    className={[
                        "rounded-full px-8 py-2 text-white transition",
                        canContinue
                            ? "bg-black hover:bg-gray-800"
                            : "bg-gray-300 cursor-not-allowed",
                    ].join(" ")}
                >
                    Continue →
                </button>
            </div>
        </div>
    );
}
