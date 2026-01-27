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
        title: "Responsible Water Use",
        description:
            "Traditional car washes can use over 150 litres of water. Zerava delivers vehicle care without hoses, runoff, or on-site water infrastructure.",
        icon: Droplets,
    },
    {
        title: "Biodegradable Formulations",
        description:
            "Our 99.78% biodegradable formulations break down naturally and are safe for your vehicle and the planet.",
        icon: Leaf,
    },
    {
        title: "Convenience",
        description:
            "Vehicle care delivered where your car is parked — no queues, no waiting, no hassle.",
        icon: Clock,
    },
    {
        title: "Paint Protection",
        description:
            "Advanced polymer technology designed to clean and protect vehicle surfaces.",
        icon: Shield,
    },
    {
        title: "Any Location",
        description:
            "Home, office, gym, airport — wherever you park.",
        icon: MapPin,
    },
    {
        title: "UN Sustainable Development Goals",
        description:
            "Zerava aligns its operations with selected UN Sustainable Development Goals through practical service design.",
        icon: BadgeCheck,
    },
];

export default function WhyZerava() {
    return (
        <section className="relative bg-eco-black py-24">
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
                    className="mx-auto mt-5 max-w-2xl text-base text-text-secondary"
                >
                    Every detail is crafted with sustainability, convenience,
                    and premium vehicle care in mind.
                </p>

                {/* Feature Cards */}
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
                                    group rounded-3xl border border-white/10
                                    bg-black backdrop-blur-md
                                    px-6 py-4 text-left
                                    transition-all duration-300 ease-out
                                    hover:-translate-y-2 hover:scale-[1.03]
                                    hover:border-electric-teal/40
                                    hover:shadow-mobility-green
                                "
                            >
                                {/* Icon */}
                                <div
                                    className="mb-6 flex h-11 w-11 items-center justify-center rounded-xl
                                    bg-white/10 text-electric-teal transition
                                    group-hover:bg-electric-teal group-hover:text-eco-black"
                                >
                                    <Icon size={18} />
                                </div>

                                {/* Title */}
                                <h3 className="text-lg font-semibold text-gray-200">
                                    {item.title}
                                </h3>

                                {/* Description */}
                                <p className="mt-3 text-sm leading-relaxed text-text-secondary">
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
