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
        description:
            "Traditional car washes use 150+ litres. We use none.",
        icon: Droplets,
    },
    {
        title: "99.78% Biodegradable",
        description:
            "Plant-based formulas that are safe for your car and the planet.",
        icon: Leaf,
    },
    {
        title: "Time-Saving",
        description:
            "We come to you — no queues, no waiting, no hassle.",
        icon: Clock,
    },
    {
        title: "Paint Protection",
        description:
            "Advanced polymers that clean and protect every surface.",
        icon: Shield,
    },
    {
        title: "Any Location",
        description:
            "Home, office, gym, airport — wherever you park.",
        icon: MapPin,
    },
    {
        title: "Eco Certified",
        description:
            "Verified sustainable practices and products.",
        icon: BadgeCheck,
    },
];

export default function WhyZerava() {
    return (
        <section className="relative bg-eco-black py-20">
            <div className="mx-auto max-w-7xl px-6 text-center">

                {/* Label */}
                <p className="mb-3 text-xs font-semibold uppercase letter-spacing tracking-wider text-electric-teal">
                    Why Zerava
                </p>

                {/* Heading */}
                <h2 className="text-3xl font-light text-text-primary sm:text-4xl">
                    Designed for the future
                </h2>

                {/* Description */}
                <p className="mx-auto mt-4 max-w-2xl text-md text-text-secondary sm:text-base">
                    Every detail crafted with sustainability, convenience,
                    and premium quality in mind.
                </p>

                {/* Cards */}
                <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {features.map((item) => {
                        const Icon = item.icon;

                        return (
                            <div
                                key={item.title}
                                className="group rounded-xl border border-white/5 bg-eco-black hover:bg-black/90 p-8 text-left transition hover:border-electric-teal/40 hover:bg-eco-black/80 hover:scale-[1.03]"
                            >
                                {/* Icon */}
                                <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-md border border-electric-teal/40 text-electric-teal">
                                    <Icon size={18} />
                                </div>

                                {/* Title */}
                                <h3 className="text-base font-semibold text-text-primary">
                                    {item.title}
                                </h3>

                                {/* Description */}
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
