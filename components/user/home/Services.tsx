"use client";

import Link from "next/link";
import BeforeAfterSlider from "../../ui/BeforeAfterSlider";
import { Droplets, Sparkles, Plus } from "lucide-react";

const services = [
    {
        title: "Exterior Care",
        tagline: "Clean. Protected. Refined.",
        icon: Droplets,
        description:
            "A thorough exterior clean using a refined, water-free process designed to safely remove dirt and enhance your vehicle’s finish.",
        note: "Ideal for regular maintenance and everyday cleanliness.",
        images: {
            before: "/image-2.jpg",
            after: "/image-1.jpg",
        },
    },
    {
        title: "Exterior + Interior Care",
        tagline: "Complete care, inside and out.",
        icon: Sparkles,
        description:
            "Includes our full exterior care, plus a focused interior refresh covering high-touch surfaces, mats, and cabin areas.",
        note: "Best when your vehicle needs a more complete refresh.",
        images: {
            before: "/images/services/interior-before.jpg",
            after: "/images/services/interior-after.jpg",
        },
    },
    {
        title: "Add-On Services",
        tagline: "Enhance your service",
        icon: Plus,
        description:
            "Optional additions designed to address specific needs and elevate your experience.",
        addons: [
            "Pet Hair Removal",
            "Odour Eliminator",
            "Biodegradable Floor Mat Pads",
            "Cabin Essentials",
        ],
        images: {
            before: "/images/services/addons-before.jpg",
            after: "/images/services/addons-after.jpg",
        },
    },
];


export default function ServiceHighlights() {
    return (
        <section className="bg-eco-black py-20">
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
                        className="text-4xl font-light text-gray-200 sm:text-5xl"
                    >
                        Premium services, minimal effort
                    </h2>

                    <p
                        data-aos="fade-up"
                        data-aos-delay="200"
                        className="mx-auto mt-5 max-w-2xl text-base text-gray-400"
                    >
                        Carefully designed services to keep your vehicle clean,
                        protected, and future-ready.
                    </p>
                </div>

                {/* Cards */}
                <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
                    {services.map((service, i) => {
                        const Icon = service.icon;

                        return (
                            <div
                                key={service.title}
                                data-aos="fade-up"
                                data-aos-delay={200 + i * 60}
                                className="
                                    group rounded-3xl
                                    border border-white/10 bg-white
                                    transition-all duration-300
                                    hover:-translate-y-2 hover:border-electric-teal/40
                                    hover:shadow-2xl
                                "
                            >
                                {/* Before / After */}
                                {/* <div className="relative">
                                    <BeforeAfterSlider
                                        before={service.images.before}
                                        after={service.images.after}
                                        alt={service.title}
                                    />

                                    <span className="pointer-events-none absolute left-3 top-3 rounded
                                        bg-black/70 px-2 py-1 text-[10px] text-white">
                                        Before
                                    </span>
                                    <span className="pointer-events-none absolute right-3 top-3 rounded
                                        bg-electric-teal px-2 py-1 text-[10px] font-semibold text-eco-black">
                                        After
                                    </span>
                                </div> */}

                                {/* Content */}
                                <div className="p-4">
                                    {/* Icon + title */}
                                    <div className="mb-4 flex items-center gap-4">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-xl
                                            bg-eco-black text-electric-teal">
                                            <Icon size={18} />
                                        </div>

                                        <h3 className="text-xl font-semibold text-gray-900">
                                            {service.title}
                                        </h3>
                                    </div>

                                    <p className="text-sm uppercase tracking-wide text-electric-teal">
                                        {service.tagline}
                                    </p>

                                    <p className="mt-4 text-md leading-relaxed text-gray-700">
                                        {service.description}
                                    </p>

                                    {service.note && (
                                        <p className="mt-4 text-sm italic text-gray-600">
                                            {service.note}
                                        </p>
                                    )}

                                    {service.addons && (
                                        <ul className="mt-4 space-y-2 text-sm text-gray-700 pb-2">
                                            {service.addons.map((addon) => (
                                                <li key={addon} className="flex gap-2">
                                                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-electric-teal" />
                                                    {addon}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* CTA */}
                <div className="mt-10 text-center">
                    <Link
                        href="/services"
                        className="inline-flex items-center gap-2 rounded-full
                            border border-gray-300 px-8 py-4
                            text-sm font-semibold text-gray-200
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
