"use client";

import Link from "next/link";
import BeforeAfterSlider from "../../ui/BeforeAfterSlider";
import { Droplets, Sparkles, Plus, Shield, Leaf, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import api from "@/lib/user/axios";

const ICON_MAP: Record<string, any> = {
    sparkles: Sparkles,
    droplet: Droplets,
    shield: Shield,
    leaf: Leaf,
};


export default function ServiceHighlights() {
    const [services, setServices] = useState<any[]>([]);
    const [addons, setAddons] = useState<any[]>([]);

    useEffect(() => {
        api.get("/services/user").then((res) => {
            setServices(res.data.slice(0, 2)); // only first 2
        });

        api.get("/services/addons").then((res) => {
            setAddons(res.data);
        });
    }, []);
    return (
        <section id="services" className="bg-gray-100 py-20">
            <div className="mx-auto max-w-7xl px-6">

                {/* Heading */}
                <div className="mb-20 text-center">
                    <p
                        data-aos="fade-up"
                        className="mb-3 text-sm font-semibold uppercase tracking-wider text-electric-teal"
                    >
                        Services
                    </p>

                    <h2
                        data-aos="fade-up"
                        data-aos-delay="100"
                        className="text-4xl font-light text-gray-800 sm:text-5xl"
                    >
                        Premium services, minimal effort
                    </h2>

                    <p
                        data-aos="fade-up"
                        data-aos-delay="200"
                        className="mx-auto mt-5 max-w-2xl text-base text-gray-600"
                    >
                        Carefully designed services to keep your vehicle clean,
                        protected, and future-ready.
                    </p>
                </div>

                {/* Cards */}
                <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
                    {services.map((service) => {
                        const Icon = ICON_MAP[service.icon];

                        return (
                            <div
                                key={service.id}
                                className="group rounded-3xl border border-gray-200 bg-white p-8 transition hover:-translate-y-1 hover:shadow-xl"
                            >
                                {/* Icon */}
                                {Icon && (
                                    <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-eco-black text-electric-teal">
                                        <Icon size={22} />
                                    </div>
                                )}

                                {/* Title */}
                                <h3 className="text-xl font-semibold text-gray-900">
                                    {service.name}
                                </h3>

                                {/* Highlight */}
                                {service.highlightNote && (
                                    <p className="mt-3 text-sm font-medium text-electric-teal">
                                        {service.highlightNote.split(".")[0].trim()}
                                        {service.highlightNote.includes(".") ? "." : ""}
                                    </p>
                                )}

                                {/* Description */}
                                <p className="mt-3 text-md text-gray-600 leading-relaxed">
                                    {service.description}
                                </p>

                                {/* Vehicle Condition */}
                                {service.vehicleConditionNote && (
                                    <p className="mt-4 text-sm text-gray-500">
                                        {service.vehicleConditionNote}
                                    </p>
                                )}

                                {/* Learn More */}
                                <Link
                                    href="/services"
                                    className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-eco-black group-hover:text-electric-teal transition"
                                >
                                    Learn more
                                    <ArrowRight
                                        size={16}
                                        className="transition group-hover:translate-x-1"
                                    />
                                </Link>
                            </div>
                        );
                    })}
                    <div className="group rounded-3xl border border-gray-200 bg-gray-50 p-8 transition hover:-translate-y-1 hover:shadow-xl">

                        <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-electric-teal text-eco-black">
                            <Droplets size={22} />
                        </div>

                        <h3 className="text-xl font-semibold text-gray-900">
                            Add-On Services
                        </h3>

                        <p className="mt-3 text-sm font-medium text-electric-teal">
                            Elevate your clean
                        </p>

                        <p className="mt-3 text-sm text-gray-600 leading-relaxed">
                            Optional enhancements designed to complement your selected
                            service package.
                        </p>

                        {/* Add-on titles */}
                        <ul className="mt-4 space-y-2 text-sm text-gray-700">
                            {addons.slice(0, 4).map((addon) => (
                                <li key={addon.id}>{addon.name}</li>
                            ))}
                        </ul>

                        <Link
                            href="/services"
                            className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-eco-black group-hover:text-electric-teal transition"
                        >
                            Explore add-ons
                            <ArrowRight
                                size={16}
                                className="transition group-hover:translate-x-1"
                            />
                        </Link>
                    </div>
                </div>

                {/* CTA */}
                <div className="mt-10 text-center">
                    <Link
                        href="/services"
                        className="inline-flex items-center gap-2 rounded-full
                            border border-gray-700 px-8 py-4
                            text-sm font-semibold text-gray-800
                            transition-all hover:scale-105
                            hover:border-electric-teal hover:bg-electric-teal
                            hover:text-eco-black"
                    >
                        View All Services
                    </Link>
                </div>
            </div>
        </section>
    );
}
