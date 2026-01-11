import { Droplets, Sparkles, Disc, Plus } from "lucide-react";
import Link from "next/link";
import BeforeAfterSlider from "../ui/BeforeAfterSlider";

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
                    <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-electric-teal">
                        Services
                    </p>
                    <h2 className="text-3xl font-semibold text-text-primary sm:text-4xl">
                        Premium services, minimal effort
                    </h2>
                    <p className="mx-auto mt-4 max-w-2xl text-sm text-gray-400 sm:text-base">
                        Carefully designed services to keep your vehicle clean, protected,
                        and future-ready.
                    </p>
                </div>

                {/* Cards */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {services.map((service) => {
                        const Icon = service.icon;
                        return (
                            <div
                                key={service.title}
                                className="group relative flex flex-col overflow-hidden rounded-xl border border-white/10 bg-eco-black/60 transition hover:border-electric-teal/40 hover:scale-[1.03]"
                            >
                                {/* Image slider */}
                                <div className="relative">
                                    <BeforeAfterSlider
                                        before={service.images.before}
                                        after={service.images.after}
                                        alt={service.title}
                                    />

                                    {/* Labels */}
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
                                        <div className="flex h-8 w-8 items-center justify-center rounded-md bg-gray-900 text-electric-teal">
                                            <Icon size={14} />
                                        </div>

                                        <h3 className="text-md font-semibold text-text-primary tracking-tight">
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
                        className="inline-flex items-center gap-2 rounded-full border border-gray-300 px-6 py-3 text-sm font-semibold text-text-secondary hover:bg-electric-teal hover:text-text-primary transition"
                    >
                        View All Services
                    </Link>
                </div>
            </div>
        </section>
    );
}
