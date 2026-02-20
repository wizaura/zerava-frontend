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
            <div className="mx-auto max-w-5xl px-6">

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
                                className="group relative rounded-3xl border border-gray-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                            >

                                {/* POPULAR BADGE */}
                                {service.isPopular && (
                                    <span className="absolute -top-4 right-6 rounded-full bg-electric-teal px-4 py-1 text-xs font-semibold text-eco-black shadow-md">
                                        {service.badgeLabel || "Most Popular"}
                                    </span>
                                )}

                                {/* ICON */}
                                {Icon && (
                                    <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-eco-black text-electric-teal transition group-hover:scale-105">
                                        <Icon size={26} />
                                    </div>
                                )}

                                {/* TITLE */}
                                <h3 className="text-2xl font-semibold tracking-tight text-gray-900">
                                    {service.name}
                                </h3>

                                {/* DESCRIPTION */}
                                <p className="mt-3 text-sm leading-relaxed text-gray-600">
                                    {service.description}
                                </p>

                                {/* PRICE + DURATION */}
                                <div className="mt-6 flex items-center gap-6 text-sm text-gray-600">

                                    {fromPrice && (
                                        <>
                                            <div>
                                                <span className="text-xs uppercase tracking-wide text-gray-400">
                                                    From
                                                </span>
                                                <div className="text-3xl font-semibold text-gray-900">
                                                    £{fromPrice / 100}
                                                </div>
                                            </div>

                                            <div className="h-10 w-px bg-gray-200" />
                                        </>
                                    )}

                                    <div className="flex items-center gap-2 text-gray-500">
                                        <Clock size={14} className="text-electric-teal" />
                                        up to {service.durationMin} minutes
                                    </div>
                                </div>

                                {/* DIVIDER */}
                                <div className="my-8 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

                                {/* VEHICLE CONDITION */}
                                {service.vehicleConditionNote && (
                                    <p className="mb-5 text-xs italic text-gray-500">
                                        {service.vehicleConditionNote}
                                    </p>
                                )}

                                {/* FEATURES */}
                                <ul className="space-y-3 text-sm text-gray-700">
                                    {service.features.map((feature: string) => (
                                        <li key={feature} className="flex items-start gap-3">
                                            <Check
                                                size={16}
                                                className="mt-0.5 text-electric-teal shrink-0"
                                                strokeWidth={2.5}
                                            />
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>

                                {/* HIGHLIGHT NOTE */}
                                {service.highlightNote && (
                                    <div className="mt-6 rounded-xl bg-electric-teal/10 shadow-md p-4 text-sm text-gray-700">
                                        {service.highlightNote}
                                        {service.waterSavedLitres
                                            ? ` Saves ${service.waterSavedLitres}L of water per wash.`
                                            : ""}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
