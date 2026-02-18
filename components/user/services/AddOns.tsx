"use client";

import { useEffect, useState } from "react";
import api from "@/lib/user/axios";
import { Clock, Droplets, ShieldCheck, Sparkles, Sun, Wind } from "lucide-react";

const ICON_MAP: Record<string, any> = {
    droplet: Droplets,
    shield: ShieldCheck,
    sparkles: Sparkles,
    wind: Wind,
    sun: Sun,
};

export default function AddOnsSection() {
    const [addons, setAddons] = useState<any[]>([]);

    useEffect(() => {
        api.get("/services/addons").then((res) => {
            setAddons(res.data);
        });
    }, []);

    return (
        <section className="bg-gray-100 py-20">
            <div className="mx-auto max-w-7xl px-6">

                <div className="text-center mb-14">
                    <p className="text-xs uppercase tracking-wider text-electric-teal">
                        Enhancements
                    </p>
                    <h2 className="text-4xl font-light text-gray-900 mt-2">
                        Add-on treatments
                    </h2>
                    <p className="mt-4 text-gray-600">
                        Elevate your clean with our premium add-on services.
                    </p>
                </div>

                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                    {addons.map((addon) => {
                        const Icon = ICON_MAP[addon.icon];

                        return (
                            <div
                                key={addon.id}
                                className="rounded-2xl bg-white border border-gray-200 hover:bg-white/95 p-6 transition hover:shadow-md"
                            >
                                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-electric-teal/10 text-electric-teal">
                                    {Icon && <Icon size={18} />}
                                </div>

                                <h3 className="text-lg font-medium text-gray-900">
                                    {addon.name}
                                </h3>

                                <p className="mt-2 text-sm text-gray-600">
                                    {addon.description}
                                </p>

                                <hr className="my-4" />

                                <div className="flex items-center justify-between">
                                    <p className="text-lg font-medium text-gray-900">
                                        £{addon.price / 100}
                                    </p>

                                    <div className="flex items-center gap-1 text-sm text-gray-500">
                                        <Clock size={14} />
                                        +{addon.durationMin} min
                                    </div>
                                </div>

                                {addon.highlightText && (
                                    <p className="mt-3 text-xs text-electric-teal">
                                        {addon.highlightText}
                                    </p>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
