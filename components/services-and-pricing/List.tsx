import { Droplets, Sparkles, ShieldCheck } from "lucide-react";
import BeforeAfterSlider from "../ui/BeforeAfterSlider";

const services = [
    {
        title: "Exterior Clean",
        description:
            "Complete exterior wash using our eco-smart waterless formula. Safe for all paint types.",
        icon: Droplets,
        images: {
            before: "/image-2.jpg",
            after: "/image-1.jpg",
        },
        includes: [
            "Full body clean",
            "Wheel & tyre treatment",
            "Window polish",
            "Trim restoration",
        ],
    },
    {
        title: "Interior Refresh",
        description:
            "Deep interior cleaning with natural, biodegradable products. Fresh and toxin-free.",
        icon: Sparkles,
        images: {
            before: "/images/services/interior-before.jpg",
            after: "/images/services/interior-after.jpg",
        },
        includes: [
            "Vacuum & dust removal",
            "Dashboard & console clean",
            "Seat treatment",
            "Air freshening",
        ],
    },
    {
        title: "Full Valet",
        description:
            "The complete Zerava experience. Interior and exterior perfection, delivered to you.",
        icon: ShieldCheck,
        images: {
            before: "/images/services/valet-before.jpg",
            after: "/images/services/valet-after.jpg",
        },
        includes: [
            "Everything in Exterior",
            "Everything in Interior",
            "Engine bay wipe",
            "Premium finish",
        ],
    },
];

export default function ServicesList() {
    return (
        <section className="bg-white pt-20 pb-8">
            <div className="mx-auto max-w-7xl px-6">

                {/* Section heading */}
                <div className="mb-16 mx-auto text-center max-w-2xl">
                    <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-electric-teal">
                        Services
                    </p>
                    <h2 className="text-3xl font-light text-gray-900 sm:text-4xl">
                        Thoughtfully designed car care
                    </h2>
                    <p className="mt-4 text-sm text-gray-600 sm:text-base">
                        Every service is delivered using waterless, biodegradable products —
                        safe for your vehicle and the environment.
                    </p>
                </div>

                {/* Service cards */}
                <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                    {services.map((service) => {
                        const Icon = service.icon;

                        return (
                            <div
                                key={service.title}
                                className="group overflow-hidden rounded-xl border border-gray-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-electric-teal/50 hover:shadow-lg"
                            >
                                {/* Before / After */}
                                <div className="relative">
                                    <BeforeAfterSlider
                                        before={service.images.before}
                                        after={service.images.after}
                                        alt={service.title}
                                    />

                                    <span className="absolute left-2 top-2 rounded bg-black/70 px-2 py-0.5 text-[10px] font-medium text-white">
                                        Before
                                    </span>
                                    <span className="absolute right-2 top-2 rounded bg-electric-teal px-2 py-0.5 text-[10px] font-medium text-eco-black">
                                        After
                                    </span>
                                </div>

                                {/* Content */}
                                <div className="py-4 px-8">
                                    <div className="flex items-center gap-4">
                                        {/* Icon */}
                                        <div className="flex h-10 w-10 items-center justify-center rounded-md bg-gray-900 text-white transition group-hover:bg-electric-teal">
                                            <Icon size={18} />
                                        </div>

                                        {/* Title */}
                                        <h3 className="text-lg font-semibold text-gray-900">
                                            {service.title}
                                        </h3>
                                    </div>

                                    {/* Description */}
                                    <p className="mt-3 text-md text-gray-600">
                                        {service.description}
                                    </p>

                                    {/* Includes */}
                                    <div className="mt-6">
                                        <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
                                            What's included
                                        </p>
                                        <ul className="space-y-2 text-sm text-gray-700">
                                            {service.includes.map((item) => (
                                                <li key={item} className="flex items-start gap-2">
                                                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-electric-teal" />
                                                    <span>{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

            </div>
        </section>
    );
}
