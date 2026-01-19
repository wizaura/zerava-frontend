import {
    ClockIcon,
    CurrencyPoundIcon,
    CheckIcon,
} from "@heroicons/react/24/outline";
import { LeafIcon } from "lucide-react";

const benefits = [
    {
        title: "Meet ESG Goals",
        desc: "Zero-water cleaning supports your sustainability reporting and environmental targets.",
        icon: LeafIcon,
    },
    {
        title: "No Downtime",
        desc: "We clean vehicles on-site, during work hours, without disrupting your operations.",
        icon: ClockIcon,
    },
    {
        title: "Cost Efficient",
        desc: "Volume discounts and tailored packages to fit your budget and fleet size.",
        icon: CurrencyPoundIcon,
    },
];

const includes = [
    "Dedicated account manager",
    "Flexible scheduling",
    "Volume-based pricing",
    "Monthly sustainability reports",
    "Custom service packages",
    "Priority booking slots",
    "Quality guarantee",
];

export default function WhyZeravaSection() {
    return (
        <section className="bg-white py-20">
            <div className="mx-auto max-w-7xl px-4">
                <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
                    {/* LEFT */}
                    <div>
                        <p className="mb-3 text-sm font-medium uppercase tracking-wider text-electric-teal">
                            Why Zerava
                        </p>

                        <h2 className="mb-6 text-5xl font-light text-gray-900">
                            Benefits that{" "}<br/>
                            <span className="text-gray-400">drive results</span>
                        </h2>

                        <div className="space-y-4">
                            {benefits.map((b) => (
                                <div key={b.title} className="flex gap-5">
                                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-electric-teal/15">
                                        <b.icon className="h-6 w-6 text-electric-teal" />
                                    </div>

                                    <div>
                                        <h3 className="font-medium text-gray-900">
                                            {b.title}
                                        </h3>
                                        <p className="mt-1 text-md text-gray-600">
                                            {b.desc}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* RIGHT CARD */}
                    <div className="flex items-center translate hover:scale-[1.01]">
                        <div className="w-full rounded-xl bg-gray-50 px-16 py-8 shadow-xl">
                            <h3 className="mb-6 text-lg font-medium text-gray-900">
                                What's included
                            </h3>

                            <ul className="space-y-4">
                                {includes.map((item) => (
                                    <li
                                        key={item}
                                        className="flex items-center gap-3 text-sm text-gray-700"
                                    >
                                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-electric-teal">
                                            <CheckIcon className="h-4 w-4 text-white" />
                                        </span>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
