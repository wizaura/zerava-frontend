"use client";

import { Dispatch, SetStateAction, useMemo } from "react";
import { SubscriptionDraft } from "./types";
import { SubscriptionService } from "./Call";

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

    /* ---------------- DERIVED FREQUENCIES ---------------- */

    const frequencies = useMemo(() => {
        const cycles = new Set<string>();

        services.forEach(service => {
            service.prices.forEach(price => {
                cycles.add(price.billingCycle);
            });
        });

        return Array.from(cycles);
    }, [services]);

    /* ---------------- DERIVED VEHICLE CATEGORIES ---------------- */

    const vehicleCategories = useMemo(() => {
        const map = new Map<string, { id: string; name: string; description: string }>();

        services.forEach(service => {
            service.prices.forEach(price => {
                map.set(price.vehicleCategory.id, price.vehicleCategory);
            });
        });

        return Array.from(map.values());
    }, [services]);

    /* ---------------- FILTERED SERVICES ---------------- */

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
                }))
        );
    }, [draft.plan, draft.vehicleCategoryId, services]);

    const canContinue = Boolean(draft.servicePriceId);

    return (
        <div className="max-w-4xl mx-auto space-y-12">

            {/* FREQUENCY */}
            <section>
                <h2 className="text-2xl font-medium mb-4">
                    Choose your frequency
                </h2>

                <div className="grid md:grid-cols-2 gap-4">
                    {frequencies.map(freq => {
                        const selected = draft.plan === freq;

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
                                    "rounded-xl p-6 text-left border transition",
                                    selected
                                        ? "border-electric-teal bg-electric-teal/15"
                                        : "border-gray-200 hover:border-gray-300",
                                ].join(" ")}
                            >
                                <p className="font-medium">{freq}</p>
                            </button>
                        );
                    })}
                </div>
            </section>

            {/* VEHICLE CATEGORY */}
            <section>
                <h3 className="text-lg font-medium mb-3">
                    Vehicle size
                </h3>

                <div className="grid md:grid-cols-3 gap-4">
                    {vehicleCategories.map(v => {
                        const selected = draft.vehicleCategoryId === v.id;

                        return (
                            <button
                                key={v.id}
                                onClick={() =>
                                    setDraft(d => ({
                                        ...d,
                                        vehicleCategoryId: v.id,
                                        vehicleCategory: v.name,
                                        servicePriceId: null,
                                        stripePriceId: null,
                                    }))
                                }
                                className={[
                                    "rounded-xl p-5 text-left border transition",
                                    selected
                                        ? "border-black"
                                        : "border-gray-200 hover:border-gray-300",
                                ].join(" ")}
                            >
                                <p className="font-medium">{v.name}</p>
                                <p className="text-sm text-gray-500">
                                    {v.description}
                                </p>
                            </button>
                        );
                    })}
                </div>
            </section>

            {/* SERVICES */}
            {draft.plan && draft.vehicleCategoryId && (
                <section className="space-y-4">
                    <h3 className="text-lg font-medium">
                        Select service
                    </h3>

                    {availableServicePrices.map(s => {
                        const selected =
                            draft.servicePriceId === s.servicePriceId;

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
                                    "w-full rounded-2xl p-6 text-left border transition",
                                    selected
                                        ? "border-electric-teal bg-electric-teal/15"
                                        : "border-gray-200 hover:border-gray-300",
                                ].join(" ")}
                            >
                                <div className="flex justify-between items-start">
                                    <div>
                                        <p className="font-medium">
                                            {s.serviceName}
                                        </p>
                                        {s.description && (
                                            <p className="text-sm text-gray-500">
                                                {s.description}
                                            </p>
                                        )}
                                    </div>

                                    <div className="text-right">
                                        <p className="text-lg font-medium">
                                            £{(s.price / 100).toFixed(2)}
                                        </p>
                                    </div>
                                </div>
                            </button>
                        );
                    })}
                </section>
            )}

            {/* CONTINUE */}
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
