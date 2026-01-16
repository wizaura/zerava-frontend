"use client";

import Link from "next/link";
import Image from "next/image";
import { Building2, Clock, ShieldCheck } from "lucide-react";

const benefits = [
    {
        title: "Fleet maintenance programs",
        description: "Planned cleaning schedules to keep vehicles consistently presentable.",
        icon: Building2,
    },
    {
        title: "On-site workplace cleaning",
        description: "Vehicles cleaned at your premises without disrupting operations.",
        icon: Clock,
    },
    {
        title: "Employee benefit packages",
        description: "A convenient car-care benefit for teams and staff.",
        icon: ShieldCheck,
    },
];

export default function FleetPreview() {
    return (
        <section data-aos="fade-up" className="relative bg-eco-black py-20">
            <div className="mx-auto max-w-7xl px-6">
                <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2">

                    {/* Left content */}
                    <div>
                        <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-electric-teal">
                            For Business
                        </p>

                        <h2 className="text-3xl font-light text-gray-200 sm:text-5xl leading-tight">
                            Fleet & Corporate <br />
                            <span className="text-electric-teal">Solutions</span>
                        </h2>

                        <p className="mt-4 max-w-xl text-sm text-text-secondary sm:text-base">
                            Keep your fleet spotless while meeting sustainability goals.
                            Perfect for NHS trusts, councils, corporate campuses, and
                            logistics companies.
                        </p>

                        <Link
                            href="/fleet"
                            className="mt-8 inline-flex items-center rounded-full bg-electric-teal px-8 py-3 text-sm font-semibold text-eco-black hover:brightness-110 transition"
                        >
                            Learn More
                        </Link>
                    </div>

                    {/* Right side: benefits + image */}
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">

                        {/* Image block (FIRST CARD) */}
                        {/* Image card (NORMAL GRID ITEM) */}
                        <div className="relative overflow-visible text-gray-200 rounded-xl border border-white/10 bg-eco-black/60 hover:scale-[1.03]">
                            <div className="relative h-full overflow-hidden rounded-xl">
                                <Image
                                    src="/images/fleet-preview.jpg"
                                    alt="Fleet and corporate vehicle cleaning"
                                    width={600}
                                    height={400}
                                    className="h-full w-full object-cover"
                                />

                                {/* Subtle overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10" />
                            </div>

                            {/* Fleet partners badge */}
                            <span className="absolute bottom-3 left-3 rounded-full bg-electric-teal px-4 py-1 text-xs font-semibold text-eco-black shadow-sm">
                                50+ Fleet Partners
                            </span>
                        </div>

                        {/* Benefit cards */}
                        {benefits.map((item) => {
                            const Icon = item.icon;
                            return (
                                <div
                                    key={item.title}
                                    className="rounded-xl border border-white/10 bg-eco-black/60 p-6 transition hover:border-electric-teal/40 hover:scale-[1.03]"
                                >
                                    <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-md border border-electric-teal/40 text-electric-teal">
                                        <Icon size={18} />
                                    </div>

                                    <h3 className="text-md font-semibold text-gray-200">
                                        {item.title}
                                    </h3>

                                    <p className="mt-2 text-sm text-text-secondary">
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
