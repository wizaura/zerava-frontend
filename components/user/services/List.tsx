"use client";

import { useEffect, useState } from "react";
import api from "@/lib/user/axios";
import {
    Sparkles,
    Droplets,
    Shield,
    Leaf,
    Clock,
    Check,
} from "lucide-react";

const ICON_MAP: Record<string, any> = {
    sparkles: Sparkles,
    droplet: Droplets,
    shield: Shield,
    leaf: Leaf,
};

export default function ServicesList() {
    const [services, setServices] = useState<any[]>([]);

    useEffect(() => {
        api.get("/services/user").then((res) => {
            setServices(res.data);
        });
    }, []);

    return (
        <section className="bg-white py-20">
            <div className="mx-auto max-w-6xl px-6">

                {/* SECTION HEADING */}
                <div className="mb-16 mx-auto text-center max-w-2xl">
                    <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-electric-teal">
                        Services
                    </p>
                    <h2 className="text-3xl font-light text-gray-900 sm:text-4xl">
                        Premium vehicle care, simplified
                    </h2>
                    <p className="mt-4 text-sm text-gray-600 sm:text-base">
                        Thoughtfully designed packages for regular upkeep and effortless maintenance.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
                    {services.map((service) => {
                        const Icon = ICON_MAP[service.icon];

                        const { standard, large, xl } = service.prices || {};

                        const fromPrice =
                            standard ?? large ?? xl ?? null;

                        return (
                            <div
                                key={service.id}
                                className="relative rounded-2xl border border-gray-50 hover:border-gray-100 bg-gray-50 hover:bg-gray-100 p-8 shadow-sm transition hover:shadow-md"
                            >
                                {/* POPULAR BADGE */}
                                {service.isPopular && (
                                    <span className="absolute right-6 -top-3 rounded-full bg-electric-teal px-4 py-1 text-xs font-medium text-eco-black">
                                        {service.badgeLabel || "Most Popular"}
                                    </span>
                                )}

                                {/* ICON */}
                                {Icon && (
                                    <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-xl bg-gray-900 text-white">
                                        <Icon size={30} />
                                    </div>
                                )}

                                {/* TITLE */}
                                <h3 className="text-2xl font-light text-gray-900">
                                    {service.name}
                                </h3>

                                {/* DESCRIPTION */}
                                <p className="mt-3 text-md font-light text-gray-600">
                                    {service.description}
                                </p>

                                {/* PRICE + DURATION */}
                                <div className="mt-6 flex items-center gap-6 text-sm text-gray-600">
                                    {fromPrice && (
                                        <>
                                            <div>
                                                <span className="text-xs text-gray-500">
                                                    From
                                                </span>
                                                <div className="text-2xl font-light text-gray-900">
                                                    £{fromPrice / 100}
                                                </div>
                                            </div>

                                            {/* Separator */}
                                            <div className="h-8 w-px bg-gray-300" />
                                        </>
                                    )}

                                    <div className="flex items-center gap-2">
                                        <Clock
                                            size={14}
                                            className="text-electric-teal"
                                        />
                                        up to {service.durationMin} minutes
                                    </div>
                                </div>

                                <hr className="my-6" />

                                {/* VEHICLE CONDITION */}
                                {service.vehicleConditionNote && (
                                    <p className="text-xs italic text-gray-500 mb-4">
                                        Vehicle condition:{" "}
                                        {service.vehicleConditionNote}
                                    </p>
                                )}

                                {/* FEATURES */}
                                <ul className="space-y-3 text-sm text-gray-700">
                                    {service.features.map(
                                        (feature: string) => (
                                            <li
                                                key={feature}
                                                className="flex items-start gap-3"
                                            >
                                                <Check
                                                    size={16}
                                                    className="mt-0.5 text-electric-teal shrink-0"
                                                    strokeWidth={2.5}
                                                />
                                                <span>{feature}</span>
                                            </li>
                                        )
                                    )}
                                </ul>

                                {/* HIGHLIGHT NOTE */}
                                {service.highlightNote && (
                                    <p className="mt-6 text-base italic text-gray-600">
                                        {service.highlightNote}
                                        {service.waterSavedLitres
                                            ? ` Saves ${service.waterSavedLitres}L of water per wash.`
                                            : ""}
                                    </p>
                                )}

                                {/* PRICE TIERS */}
                                <div className="mt-8 grid grid-cols-3 gap-4">
                                    {standard && (
                                        <div className="rounded-xl bg-white py-3 text-center shadow-sm">
                                            <p className="text-xs text-gray-500">
                                                Standard
                                            </p>
                                            <p className="font-medium text-gray-900">
                                                £{standard / 100}
                                            </p>
                                        </div>
                                    )}

                                    {large && (
                                        <div className="rounded-xl bg-white py-3 text-center shadow-sm">
                                            <p className="text-xs text-gray-500">
                                                Large
                                            </p>
                                            <p className="font-medium text-gray-900">
                                                £{large / 100}
                                            </p>
                                        </div>
                                    )}

                                    {xl && (
                                        <div className="rounded-xl bg-white py-3 text-center shadow-sm">
                                            <p className="text-xs text-gray-500">
                                                XL
                                            </p>
                                            <p className="font-medium text-gray-900">
                                                £{xl / 100}
                                            </p>
                                        </div>
                                    )}
                                </div>

                                {/* IMAGE SECTION (COMMENTED) */}
                                {/*
                                <div className="mt-8">
                                    <BeforeAfterSlider
                                        before={service.imageBefore}
                                        after={service.imageAfter}
                                        alt={service.name}
                                    />
                                </div>
                                */}
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
