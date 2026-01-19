"use client";

import { Droplets, Sparkles, Disc, Plus } from "lucide-react";
import Link from "next/link";
import BeforeAfterSlider from "../../ui/BeforeAfterSlider";

const services = [
    {
        title: "Exterior Waterless Wash",
        icon: Droplets,
        description: "Premium waterless exterior clean using nano-tech solutions.",
        images: {
            before: "/image-2.jpg",
            after: "/image-1.jpg",
        },
    },
    {
        title: "Interior Quick Clean",
        icon: Sparkles,
        description: "A fast interior refresh for everyday comfort.",
        images: {
            before: "/images/services/interior-before.jpg",
            after: "/images/services/interior-after.jpg",
        },
    },
    {
        title: "Wheels & Tyres",
        icon: Disc,
        description: "Alloy-safe cleaning with a refined finish.",
        images: {
            before: "/images/services/wheels-before.jpg",
            after: "/images/services/wheels-after.jpg",
        },
    },
    {
        title: "Add-ons",
        icon: Plus,
        description: "Optional extras tailored to your needs.",
        images: {
            before: "/images/services/addons-before.jpg",
            after: "/images/services/addons-after.jpg",
        },
    },
];

export default function ServiceHighlights() {
    return (
        <section className="bg-eco-black py-20">
            <div className="mx-auto max-w-7xl px-6 text-center">

                {/* Heading */}
                <div className="mb-14">
                    <p
                        data-aos="fade-up"
                        data-aos-duration="700"
                        className="mb-3 text-sm font-semibold uppercase tracking-wider text-electric-teal"
                    >
                        Services
                    </p>

                    <h2
                        data-aos="fade-up"
                        data-aos-delay="100"
                        data-aos-duration="800"
                        className="text-3xl font-light text-gray-200 sm:text-5xl"
                    >
                        Premium services, minimal effort
                    </h2>

                    <p
                        data-aos="fade-up"
                        data-aos-delay="200"
                        data-aos-duration="900"
                        className="mx-auto mt-4 max-w-2xl text-sm text-gray-400 sm:text-base"
                    >
                        Carefully designed services to keep your vehicle clean, protected,
                        and future-ready.
                    </p>
                </div>

                {/* Cards */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {services.map((service, i) => {
                        const Icon = service.icon;

                        return (
                            <div
                                key={service.title}
                                data-aos="fade-up"
                                data-aos-delay={300 + i * 120}
                                data-aos-duration="900"
                                data-aos-easing="ease-out-cubic"
                                className="
                    group relative flex flex-col overflow-hidden rounded-2xl
                    bg-mobility-green backdrop-blur-md
                    border border-white/10
                    transition-all duration-300 ease-out
                    hover:-translate-y-2 hover:scale-[1.05]
                    hover:border-electric-teal/40
                    hover:shadow-[0_12px_20px_-12px_rgba(56,214,196,0.35)]
                    "
                            >
                                {/* Image */}
                                <div className="relative overflow-hidden">
                                    <div className="transition-transform duration-500 group-hover:scale-105">
                                        <BeforeAfterSlider
                                            before={service.images.before}
                                            after={service.images.after}
                                            alt={service.title}
                                        />
                                    </div>

                                    <span className="pointer-events-none absolute left-2 top-2 rounded bg-black/70 px-2 py-0.5 text-[10px] font-medium text-white">
                                        Before
                                    </span>
                                    <span className="pointer-events-none absolute right-2 top-2 rounded bg-electric-teal px-2 py-0.5 text-[10px] font-medium text-eco-black">
                                        After
                                    </span>
                                </div>

                                {/* Content */}
                                <div className="mx-auto w-full p-4">
                                    <div className="mb-2 mx-auto flex items-center justify-center gap-3">
                                        <div className="flex h-8 w-8 items-center justify-center rounded-md 
                        bg-white/10 text-electric-teal transition
                        group-hover:bg-electric-teal group-hover:text-eco-black">
                                            <Icon size={14} />
                                        </div>

                                        <h3 className="text-md font-semibold text-gray-200 tracking-tight">
                                            {service.title}
                                        </h3>
                                    </div>

                                    <p className="text-sm leading-relaxed text-text-secondary">
                                        {service.description}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* CTA */}
                <div className="mt-12">
                    <Link
                        href="/services"
                        className="inline-flex items-center gap-2 rounded-full border border-gray-300 px-6 py-3 
                       text-sm font-semibold text-text-secondary transition-all
                       hover:bg-electric-teal hover:border-electric-teal hover:text-eco-black hover:scale-105"
                    >
                        View All Services
                    </Link>
                </div>
            </div>
        </section>
    );
}
