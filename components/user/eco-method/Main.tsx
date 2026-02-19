"use client";

import {
    FlaskConical,
    Shield,
    Recycle,
    Droplets,
} from "lucide-react";

const features = [
    {
        title: "Advanced Polymer Technology",
        description:
            "Our formula uses advanced polymer technology to encapsulate dirt particles, lifting them safely from the surface. Each vehicle is cleaned using multiple premium microfibre towels, rotated and dedicated to specific surfaces to minimise friction and help protect modern paint finishes.",
        icon: FlaskConical,
    },
    {
        title: "Protective Coating",
        description:
            "Each clean leaves behind a thin, temporary protective layer with hydrophobic properties, helping water bead and reduce dust build-up so your vehicle stays cleaner for longer.",
        icon: Shield,
    },
    {
        title: "Biodegradable Formulations",
        description:
            "Formulated with 99.78% biodegradable ingredients, designed to break down naturally after use and reduce environmental impact.",
        icon: Recycle,
    },
    {
        title: "Zero Water Required",
        description:
            "Traditional car washes can use over 150 litres of water per wash. Our method requires no on-site water, helping conserve water resources.",
        icon: Droplets,
    },
];

export default function InnovationSection() {
    return (
        <section className="bg-white py-24 px-6">
            <div className="mx-auto max-w-6xl">

                {/* Heading */}
                <div className="text-center mb-16">
                    <p className="text-xs uppercase tracking-wider text-electric-teal font-semibold">
                        How It Works
                    </p>

                    <h2 className="mt-4 text-4xl sm:text-5xl font-light text-eco-black">
                        Revolutionary waterless formula
                    </h2>

                    <p className="mt-6 text-gray-600 text-lg max-w-2xl mx-auto">
                        Years of research condensed into a powerful, planet-friendly solution.
                    </p>
                </div>

                {/* Feature Grid */}
                <div className="grid gap-8 md:grid-cols-2">

                    {features.map((item) => {
                        const Icon = item.icon;

                        return (
                            <div
                                key={item.title}
                                className="flex gap-6 rounded-3xl bg-gray-50 p-8 transition hover:shadow-md"
                            >
                                {/* Icon */}
                                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-electric-teal/10 text-electric-teal shrink-0">
                                    <Icon size={24} />
                                </div>

                                {/* Content */}
                                <div>
                                    <h3 className="text-lg font-semibold text-eco-black">
                                        {item.title}
                                    </h3>

                                    <p className="mt-3 text-gray-600 leading-relaxed">
                                        {item.description}
                                    </p>
                                </div>
                            </div>
                        );
                    })}

                </div>
            </div>
        </section>
    );
}
