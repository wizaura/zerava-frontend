"use client";

import {
    Droplets,
    Leaf,
    Clock,
    Shield,
    MapPin,
    BadgeCheck,
} from "lucide-react";

const features = [
    {
        title: "Zero Water Waste",
        description: "Traditional car washes use 150+ litres. We use none.",
        icon: Droplets,
    },
    {
        title: "99.78% Biodegradable",
        description: "Plant-based formulas that are safe for your car and the planet.",
        icon: Leaf,
    },
    {
        title: "Time-Saving",
        description: "We come to you — no queues, no waiting, no hassle.",
        icon: Clock,
    },
    {
        title: "Paint Protection",
        description: "Advanced polymers that clean and protect every surface.",
        icon: Shield,
    },
    {
        title: "Any Location",
        description: "Home, office, gym, airport — wherever you park.",
        icon: MapPin,
    },
    {
        title: "Eco Certified",
        description: "Verified sustainable practices and products.",
        icon: BadgeCheck,
    },
];

export default function WhyZerava() {
    return (
        <section className="relative bg-eco-black py-20">
            <div className="mx-auto max-w-7xl px-6 text-center">

                {/* Label */}
                <p
                    data-aos="fade-up"
                    data-aos-duration="700"
                    className="mb-3 text-sm font-semibold uppercase tracking-wider text-electric-teal"
                >
                    Why Zerava
                </p>

                {/* Heading */}
                <h2
                    data-aos="fade-up"
                    data-aos-delay="100"
                    data-aos-duration="800"
                    className="text-3xl font-light text-gray-200 sm:text-5xl"
                >
                    Designed for the future
                </h2>

                {/* Description */}
                <p
                    data-aos="fade-up"
                    data-aos-delay="200"
                    data-aos-duration="900"
                    className="mx-auto mt-4 max-w-2xl text-md text-text-secondary sm:text-base"
                >
                    Every detail crafted with sustainability, convenience,
                    and premium quality in mind.
                </p>

                {/* Cards */}
                <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {features.map((item, i) => {
                        const Icon = item.icon;

                        return (
                            <div
                                key={item.title}
                                data-aos="fade-up"
                                data-aos-delay={300 + i * 120}
                                data-aos-duration="900"
                                data-aos-easing="ease-out-cubic"
                                className="
                  group rounded-2xl border border-white/10
                  bg-white/5 backdrop-blur-md
                  px-8 py-4 text-left transition-all duration-300 ease-out
                  hover:-translate-y-2 hover:scale-[1.05]
                  hover:border-electric-teal/40
                  hover:shadow-[0_12px_20px_-12px_rgba(56,214,196,0.35)]
                "
                            >
                                <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-md 
                                bg-white/10 text-electric-teal transition
                                group-hover:bg-electric-teal group-hover:text-eco-black">
                                    <Icon size={18} />
                                </div>

                                <h3 className="text-base font-semibold text-gray-200">
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
        </section>
    );
}
