"use client";

import { Dispatch, SetStateAction, useMemo } from "react";
import { SubscriptionDraft } from "./types";
import { SubscriptionService } from "./Call";
import { Sparkles, Shield, Droplet, Leaf } from "lucide-react";

const serviceIconMap: Record<string, any> = {
    sparkles: Sparkles,
    shield: Shield,
    droplet: Droplet,
    leaf: Leaf,
};

type Props = {
    draft: SubscriptionDraft;
    setDraft: Dispatch<SetStateAction<SubscriptionDraft>>;
    onContinue: () => void;
    services: SubscriptionService[];
};

export default function PlanServiceStep({
    draft,
    setDraft,
    onContinue,
    services,
}: Props) {

    /* ================= FREQUENCIES ================= */

    const frequencies = useMemo(() => {
        const cycles = new Set<string>();
        services.forEach(service =>
            service.prices.forEach(price =>
                cycles.add(price.billingCycle)
            )
        );
        return Array.from(cycles);
    }, [services]);

    /* ================= VEHICLE CATEGORIES ================= */

    const vehicleCategories = useMemo(() => {
        const map = new Map<string, any>();
        services.forEach(service =>
            service.prices.forEach(price =>
                map.set(price.vehicleCategory.id, price.vehicleCategory)
            )
        );
        return Array.from(map.values());
    }, [services]);

    /* ================= FILTERED SERVICES ================= */

    const availableServicePrices = useMemo(() => {
        if (!draft.plan || !draft.vehicleCategoryId) return [];

        return services.flatMap(service =>
            service.prices
                .filter(
                    p =>
                        p.billingCycle === draft.plan &&
                        p.vehicleCategory.id === draft.vehicleCategoryId
                )
                .map(p => ({
                    serviceId: service.id,
                    serviceName: service.name,
                    description: service.description,
                    durationMin: service.durationMin,
                    servicePriceId: p.id,
                    stripePriceId: p.stripePriceId,
                    price: p.price,
                    icon: service.icon,
                    isPopular: service.isPopular,
                }))
        );
    }, [draft.plan, draft.vehicleCategoryId, services]);

    const canContinue = Boolean(draft.servicePriceId);

    return (
        <div className="space-y-12 max-w-4xl mx-auto">

            {/* ================= FREQUENCY ================= */}
            <div>
                <div>
                    <h2 className="text-2xl font-medium text-gray-900 mb-8">
                        Choose your frequency
                    </h2>

                    <div className="grid sm:grid-cols-3 gap-6">
                        {frequencies.map(freq => {
                            const selected = draft.plan === freq;

                            const isPopular = freq === "MONTHLY"; // mark monthly popular

                            const title =
                                freq === "MONTHLY"
                                    ? "Monthly Maintenance"
                                    : "Twice-Monthly Maintenance";

                            const subtitle =
                                freq === "MONTHLY"
                                    ? "Set & forget vehicle care"
                                    : "For high-mileage drivers";

                            const visits =
                                freq === "MONTHLY"
                                    ? "1 visit per month"
                                    : "2 visits per month";

                            return (
                                <button
                                    key={freq}
                                    onClick={() =>
                                        setDraft(d => ({
                                            ...d,
                                            plan: freq as "FORTNIGHTLY" | "MONTHLY",
                                            servicePriceId: null,
                                            stripePriceId: null,
                                        }))
                                    }
                                    className={[
                                        "relative rounded-2xl p-6 text-left transition border",
                                        selected
                                            ? "border-emerald-500 bg-emerald-50"
                                            : "border-gray-200 hover:shadow-md bg-white hover:border-gray-300",
                                    ].join(" ")}
                                >
                                    {/* MOST POPULAR BADGE */}
                                    {isPopular && (
                                        <span className="absolute -top-3 left-6 bg-emerald-500 text-white text-xs font-medium px-3 py-1 rounded-full">
                                            Most Popular
                                        </span>
                                    )}

                                    <p className="font-medium text-lg text-gray-900">
                                        {title}
                                    </p>

                                    <p className="text-sm text-gray-500 mt-1">
                                        {subtitle}
                                    </p>

                                    <p className="text-xs text-gray-400 mt-3">
                                        {visits}
                                    </p>
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* ================= VEHICLE SIZE ================= */}
            <div>
                <p className="mb-3 text-sm font-medium text-gray-600">
                    Vehicle Size
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {vehicleCategories.map(c => {
                        const selected = draft.vehicleCategoryId === c.id;

                        return (
                            <button
                                key={c.id}
                                onClick={() =>
                                    setDraft(d => ({
                                        ...d,
                                        vehicleCategoryId: c.id,
                                        vehicleCategory: c.name,
                                        servicePriceId: null,
                                        stripePriceId: null,
                                    }))
                                }
                                className={[
                                    "rounded-lg px-5 py-4 text-center transition border bg-white shadow-sm",
                                    selected
                                        ? "border-black ring-1 ring-black"
                                        : "border-gray-200 hover:shadow-md",
                                ].join(" ")}
                            >
                                <p className="font-medium text-gray-900">
                                    {c.name}
                                </p>
                                <p className="mt-1 text-sm text-gray-500">
                                    {c.description}
                                </p>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* ================= SERVICES ================= */}
            {draft.plan && draft.vehicleCategoryId && (
                <div className="space-y-6">
                    <h3 className="text-xl font-medium text-gray-900">
                        Select your service
                    </h3>

                    {availableServicePrices.map(s => {
                        const selected =
                            draft.servicePriceId === s.servicePriceId;

                        const Icon =
                            serviceIconMap[s.icon] ?? Sparkles;

                        return (
                            <button
                                key={s.servicePriceId}
                                onClick={() =>
                                    setDraft(d => ({
                                        ...d,
                                        servicePriceId: s.servicePriceId,
                                        stripePriceId: s.stripePriceId,
                                        serviceName: s.serviceName,
                                        basePrice: s.price,
                                        durationMin: s.durationMin,
                                    }))
                                }
                                className={[
                                    "relative w-full rounded-xl p-6 text-left transition border shadow-sm",
                                    selected
                                        ? "border-electric-teal bg-electric-teal/10"
                                        : "border-gray-200 hover:shadow-md hover:border-electric-teal/80",
                                ].join(" ")}
                            >

                                {/* 🔥 POPULAR BADGE */}
                                {s.isPopular && (
                                    <span className="absolute -top-3 right-4 bg-emerald-500 text-white text-xs font-medium px-3 py-1 rounded-full shadow">
                                        Popular
                                    </span>
                                )}

                                <div className="flex items-center justify-between">

                                    <div className="flex items-center gap-4">

                                        <div
                                            className={[
                                                "rounded-lg p-3 transition",
                                                selected
                                                    ? "bg-electric-teal text-white"
                                                    : "bg-gray-100 text-gray-700",
                                            ].join(" ")}
                                        >
                                            <Icon className="h-6 w-6" />
                                        </div>

                                        <div>
                                            <p className="font-medium text-gray-900">
                                                {s.serviceName}
                                            </p>

                                            {s.description && (
                                                <p className="text-xs text-gray-400">
                                                    {s.description}
                                                </p>
                                            )}

                                            <p className="text-xs text-gray-400 mt-1">
                                                ⏱ Up to {s.durationMin} min
                                            </p>
                                        </div>
                                    </div>

                                    <p className="text-xl font-semibold">
                                        £{(s.price / 100).toFixed(2)}
                                    </p>
                                </div>
                            </button>
                        );
                    })}
                </div>
            )}

            {/* ================= CONTINUE ================= */}
            <div className="flex justify-end pt-6">
                <button
                    disabled={!canContinue}
                    onClick={onContinue}
                    className={[
                        "rounded-full px-8 py-2 text-sm text-white transition",
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