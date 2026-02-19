"use client";

import { Check } from "lucide-react";

export default function EnvironmentalImpactSection() {
    return (
        <section className="bg-eco-black text-white py-24 px-6">
            <div className="mx-auto max-w-6xl">

                {/* Heading */}
                <div className="text-center mb-20">
                    <p className="text-xs uppercase tracking-wider text-electric-teal font-semibold">
                        Environmental Impact
                    </p>

                    <h2 className="mt-6 text-4xl sm:text-5xl font-light">
                        Every clean makes a difference
                    </h2>
                </div>

                {/* Stats Row */}
                <div className="grid grid-cols-2 gap-12 md:grid-cols-4 text-center mb-20">

                    <div>
                        <p className="text-5xl font-light">
                            0 <span className="text-electric-teal text-2xl">litres</span>
                        </p>
                        <p className="mt-3 text-sm text-gray-400">
                            Water per wash
                        </p>
                    </div>

                    <div>
                        <p className="text-5xl font-light">
                            150+ <span className="text-electric-teal text-2xl">litres</span>
                        </p>
                        <p className="mt-3 text-sm text-gray-400">
                            Saved vs traditional
                        </p>
                    </div>

                    <div>
                        <p className="text-5xl font-light">
                            99.78%
                        </p>
                        <p className="mt-3 text-sm text-gray-400">
                            Readily biodegradable
                        </p>
                    </div>

                    <div>
                        <p className="text-5xl font-light">
                            28 <span className="text-electric-teal text-2xl">days</span>
                        </p>
                        <p className="mt-3 text-sm text-gray-400">
                            breakdown time
                        </p>
                    </div>

                </div>

                {/* Certification Card */}
                <div className="rounded-3xl border border-white/10 bg-white/5 p-10 backdrop-blur-sm">

                    <div className="grid gap-12 md:grid-cols-2">

                        {/* Left Text */}
                        <div>
                            <h3 className="text-2xl font-light">
                                Responsible Formulation
                            </h3>

                            <p className="mt-6 text-gray-400 leading-relaxed">
                                Our products meet the highest environmental standards. We continuously work to improve our formulations and reduce our impact.
                            </p>
                        </div>

                        {/* Right Checklist */}
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">

                            {[
                                "Biodegradable ingredients",
                                "No phosphates or nitrates",
                                "Zero Run-off",
                                "VOC compliant",
                                "Safe for all paint types",
                                "pH neutral formula",
                            ].map((item) => (
                                <div
                                    key={item}
                                    className="flex items-center gap-3 text-sm text-gray-300"
                                >
                                    <Check
                                        size={16}
                                        className="text-electric-teal shrink-0"
                                        strokeWidth={2.5}
                                    />
                                    {item}
                                </div>
                            ))}

                        </div>

                    </div>
                </div>

            </div>
        </section>
    );
}
