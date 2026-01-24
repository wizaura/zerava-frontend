"use client";

import Link from "next/link";
import Image from "next/image";
import { Building2, Clock, ShieldCheck } from "lucide-react";

const benefits = [
    {
        title: "Fleet maintenance programs",
        description:
            "Planned cleaning schedules to keep vehicles consistently presentable.",
        icon: Building2,
    },
    {
        title: "On-site workplace cleaning",
        description:
            "Professional vehicle cleaning delivered on-site, without disruption.",
        icon: Clock,
    },
    {
        title: "Employee benefit packages",
        description:
            "A convenient vehicle-care benefit that supports employee wellbeing.",
        icon: ShieldCheck,
    },
];


export default function FleetPreview() {
    return (
        <section className="relative bg-gray-100 py-24">
            <div className="mx-auto max-w-7xl px-6">
                <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">

                    {/* Left content */}
                    <div>
                        <p
                            data-aos="fade-up"
                            className="mb-3 text-sm font-semibold uppercase tracking-wider text-electric-teal"
                        >
                            For Business
                        </p>

                        <h2
                            data-aos="fade-up"
                            className="text-3xl font-light leading-tight text-gray-900 sm:text-5xl"
                        >
                            Fleet & Corporate <br />
                            <span className="text-electric-teal">Solutions</span>
                        </h2>

                        <p
                            data-aos="fade-up"
                            className="mt-5 max-w-xl text-sm text-gray-600 sm:text-lg"
                        >
                            Keep your fleet spotless while meeting sustainability goals.
                            Designed for organisations managing vehicles at scale.
                        </p>

                        <Link
                            data-aos="fade-up"
                            href="/fleet"
                            className="mt-10 inline-flex items-center rounded-full
                            bg-electric-teal px-8 py-3
                            text-sm font-semibold text-white
                            transition-all hover:scale-105 hover:brightness-110"
                        >
                            Learn More
                        </Link>
                    </div>

                    {/* Right side */}
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">

                        {/* Image card */}
                        <div className="group relative overflow-hidden rounded-3xl bg-white shadow-md
                            transition-all hover:-translate-y-2 hover:shadow-xl sm:col-span-1">
                            <Image
                                src="/images/fleet-preview.jpg"
                                alt="Fleet and corporate vehicle cleaning"
                                width={800}
                                height={500}
                                className="h-full w-full object-cover transition-transform
                                duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t
                                from-black/40 via-transparent to-black/10" />
                        </div>

                        {/* Benefit cards */}
                        {benefits.map((item) => {
                            const Icon = item.icon;
                            return (
                                <div
                                    key={item.title}
                                    data-aos="fade-up"
                                    className="group flex flex-col justify-between
                                    rounded-2xl bg-white p-6 shadow-sm
                                    transition-all hover:-translate-y-2 hover:shadow-lg"
                                >
                                    <div className="mb-4 flex h-11 w-11 items-center justify-center
                                        rounded-xl bg-electric-teal/10 text-electric-teal
                                        group-hover:bg-electric-teal group-hover:text-white">
                                        <Icon size={18} />
                                    </div>

                                    <h3 className="text-md font-semibold text-gray-900">
                                        {item.title}
                                    </h3>

                                    <p className="mt-2 text-sm leading-relaxed text-gray-600">
                                        {item.description}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
