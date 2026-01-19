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
        <section className="relative overflow-x-hidden bg-gray-100 py-20">
            <div className="mx-auto max-w-7xl px-6 overflow-x-hidden">
                <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2">

                    {/* Left content */}
                    <div>
                        <p data-aos="fade-up" className="mb-3 text-sm font-semibold uppercase tracking-wider text-electric-teal">
                            For Business
                        </p>

                        <h2 data-aos="fade-up" className="text-3xl font-light leading-tight text-gray-900 sm:text-5xl">
                            Fleet & Corporate <br />
                            <span className="text-electric-teal">Solutions</span>
                        </h2>

                        <p data-aos="fade-up" className="mt-4 max-w-xl text-sm text-gray-600 sm:text-lg">
                            Keep your fleet spotless while meeting sustainability goals.
                            Perfect for NHS trusts, councils, corporate campuses, and logistics companies.
                        </p>

                        <Link
                            data-aos="fade-up"
                            href="/fleet"
                            className="mt-8 inline-flex items-center rounded-full bg-electric-teal px-8 py-3 
              text-sm font-semibold text-white transition-all hover:brightness-110 hover:scale-105"
                        >
                            Learn More
                        </Link>
                    </div>

                    {/* Right side */}
                    <div className="grid max-w-full grid-cols-1 gap-6 sm:grid-cols-2 sm:auto-rows-fr overflow-hidden">

                        {/* Image card */}
                        <div className="group relative max-w-full overflow-hidden rounded-2xl bg-white shadow-md transition-all
              hover:-translate-y-2 hover:shadow-xl sm:row-span-1">
                            <Image
                                src="/images/fleet-preview.jpg"
                                alt="Fleet and corporate vehicle cleaning"
                                width={600}
                                height={400}
                                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10" />
                            <span className="absolute bottom-3 left-3 rounded-full bg-electric-teal px-4 py-1 text-xs font-semibold text-white shadow">
                                50+ Fleet Partners
                            </span>
                        </div>

                        {/* Benefit cards */}
                        {benefits.map((item, i) => {
                            const Icon = item.icon;
                            return (
                                <div
                                    key={item.title}
                                    data-aos="fade-up"
                                    className="group flex max-w-full flex-col justify-between overflow-hidden rounded-2xl 
                  bg-white p-6 shadow-sm transition-all hover:-translate-y-2 hover:shadow-lg"
                                >
                                    <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-md 
                    bg-electric-teal/10 text-electric-teal group-hover:bg-electric-teal group-hover:text-white">
                                        <Icon size={18} />
                                    </div>

                                    <h3 className="text-md font-semibold text-gray-900">{item.title}</h3>
                                    <p className="mt-2 text-sm text-gray-600">{item.description}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
