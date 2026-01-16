"use client";

import { Calendar, MapPin, ShieldCheck } from "lucide-react";

const steps = [
    {
        number: "01",
        title: "Book",
        description:
            "Choose your service and schedule a time that works for you. Takes less than 2 minutes.",
        icon: Calendar,
    },
    {
        number: "02",
        title: "We Come",
        description:
            "Our eco-technicians arrive at your location — home, office, or car park.",
        icon: MapPin,
    },
    {
        number: "03",
        title: "Drive Clean",
        description:
            "Your vehicle is pristine and protected. No water used, no mess left behind.",
        icon: ShieldCheck,
    },
];

export default function HowItWorks() {
    return (
        <section data-aos="fade-up" className="bg-white py-20">
            <div className="mx-auto max-w-7xl px-6 text-center">

                {/* Small label */}
                <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-electric-teal">
                    How it works
                </p>

                {/* Heading */}
                <h2 className="text-3xl font-light text-gray-900 sm:text-5xl">
                    Simple. Sustainable. Seamless.
                </h2>

                {/* Description */}
                <p className="mx-auto mt-4 max-w-2xl text-sm text-gray-600 sm:text-base">
                    Premium car care that comes to you, using zero water and
                    100% biodegradable products.
                </p>

                {/* Cards */}
                <div className="max-w-4xl mx-auto mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
                    {steps.map((step) => {
                        const Icon = step.icon;

                        return (
                            <div
                                key={step.number}
                                className="group relative rounded-xl bg-gray-50 p-8 text-left transition hover:bg-gray-100"
                            >

                                {/* Icon */}
                                {/* Icon + Number */}
                                <div className="mb-6 flex items-center gap-1">
                                    {/* Icon box */}
                                    <div className="flex h-10 w-10 items-center justify-center rounded-md bg-gray-900 text-white transition group-hover:bg-electric-teal">
                                        <Icon size={18} />
                                    </div>

                                    {/* Step number */}
                                    <span className="text-4xl font-medium text-gray-200">
                                        {step.number}
                                    </span>
                                </div>

                                {/* Content */}
                                <h3 className="text-lg font-semibold text-gray-900">
                                    {step.title}
                                </h3>

                                <p className="mt-2 text-md text-gray-600">
                                    {step.description}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
