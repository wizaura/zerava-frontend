"use client";

import { Calendar, MapPin, ShieldCheck } from "lucide-react";

const steps = [
    {
        number: "01",
        title: "Book",
        points: [
            "Effortless scheduling in seconds",
            "Choose your service and a time that suits you",
            "Booking takes less than two minutes",
        ],
        icon: Calendar,
    },
    {
        number: "02",
        title: "We Come",
        points: [
            "On-site, wherever you are",
            "Our Zerava Care Specialists arrive where your vehicle is parked",
            "Fully equipped, self-contained, and zero disruption",
        ],
        icon: MapPin,
    },
    {
        number: "03",
        title: "Drive Clean",
        points: [
            "Clean, protected, and ready to go",
            "Waterless, eco-safe cleaning process",
            "No runoff. No mess. Just results.",
        ],
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

                {/* Sub-heading */}
                <p
                    data-aos="fade-up"
                    data-aos-delay="200"
                    data-aos-duration="900"
                    className="mx-auto mt-4 max-w-2xl text-sm text-gray-600 sm:text-base"
                >
                    Premium vehicle care that comes to you — delivered on-site
                    with precision and care, using a waterless process and
                    biodegradable formulations.
                </p>

                {/* Cards */}
                <div className="mx-auto mt-14 grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
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
                                <div className="mb-6 flex items-center gap-3">
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

                                {/* Point-based description */}
                                <ul className="mt-3 space-y-2 text-md text-gray-600">
                                    {step.points.map((point, idx) => (
                                        <li key={idx} className="flex gap-2">
                                            <span className="mt-1 h-1.5 w-1.5 rounded-full bg-electric-teal" />
                                            <span>{point}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
