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
        <section className="bg-white py-20">
            <div className="mx-auto max-w-7xl px-6 text-center">

                {/* Label */}
                <p
                    data-aos="fade-up"
                    data-aos-duration="700"
                    className="mb-3 text-sm font-semibold uppercase tracking-wider text-electric-teal"
                >
                    How it works
                </p>

                {/* Heading */}
                <h2
                    data-aos="fade-up"
                    data-aos-delay="100"
                    data-aos-duration="800"
                    className="text-3xl font-light text-gray-900 sm:text-5xl"
                >
                    Simple. Sustainable. Seamless.
                </h2>

                {/* Description */}
                <p
                    data-aos="fade-up"
                    data-aos-delay="200"
                    data-aos-duration="900"
                    className="mx-auto mt-4 max-w-2xl text-sm text-gray-600 sm:text-base"
                >
                    Premium car care that comes to you, using zero water and
                    100% biodegradable products.
                </p>

                {/* Cards */}
                <div className="mx-auto mt-14 grid max-w-4xl grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
                    {steps.map((step, i) => {
                        const Icon = step.icon;

                        return (
                            <div
                                key={step.number}
                                data-aos="fade-up"
                                data-aos-delay={300 + i * 150}
                                data-aos-duration="900"
                                data-aos-easing="ease-out-cubic"
                                className="group relative rounded-xl bg-gray-50 p-8 text-left
                                    transition-all duration-400 ease-out
                                    hover:scale-[1.06] hover:-translate-y-1.5 hover:shadow-xl hover:bg-gray-100"
                            >
                                {/* Icon + Number */}
                                <div className="mb-6 flex items-center gap-2">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-md bg-gray-900 text-white transition group-hover:bg-electric-teal">
                                        <Icon size={18} />
                                    </div>

                                    <span className="text-4xl font-medium text-gray-200">
                                        {step.number}
                                    </span>
                                </div>

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
