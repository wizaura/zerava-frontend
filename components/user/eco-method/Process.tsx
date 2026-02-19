"use client";

import Image from "next/image";

const steps = [
    {
        number: "1",
        title: "Apply",
        description: "Eco-formula is sprayed onto the surface",
    },
    {
        number: "2",
        title: "Encapsulate",
        description: "Polymers surround dirt particles to minimise surface friction",
    },
    {
        number: "3",
        title: "Lift",
        description: "Premium microfibre cloths gently remove residue",
    },
    {
        number: "4",
        title: "Protect",
        description: "Invisible layer shields the paint",
    },
];

export default function ProcessSection() {
    return (
        <section className="bg-gray-50 py-24 px-6">
            <div className="mx-auto grid max-w-6xl gap-16 md:grid-cols-2 md:items-center">

                {/* LEFT CONTENT */}
                <div>

                    {/* Micro heading */}
                    <p className="text-xs uppercase tracking-wider text-electric-teal font-semibold">
                        The Process
                    </p>

                    {/* Main heading */}
                    <h2 className="mt-6 text-4xl sm:text-5xl font-light text-eco-black">
                        Spray. Lift. Shine.
                    </h2>

                    {/* Steps */}
                    <div className="mt-12 space-y-10">

                        {steps.map((step) => (
                            <div key={step.number} className="flex items-start gap-6">

                                {/* Number Circle */}
                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-electric-teal/15 text-electric-teal font-semibold">
                                    {step.number}
                                </div>

                                {/* Text */}
                                <div>
                                    <h3 className="text-lg font-medium text-eco-black">
                                        {step.title}
                                    </h3>
                                    <p className="mt-2 text-gray-600">
                                        {step.description}
                                    </p>
                                </div>

                            </div>
                        ))}

                    </div>
                </div>

                {/* RIGHT IMAGE */}
                <div className="relative rounded-3xl">
                    <div className="relative h-[520px] w-full">
                        <Image
                            src="/eco-method-1.png"
                            alt="Technician applying Zerava eco-formula treatment"
                            fill
                            className="object-cover rounded-2xl transition-transform duration-700 ease-out hover:scale-[1.05]"
                        />
                    </div>

                    {/* Floating Badge */}
                    <div className="absolute -bottom-4 -right-6 z-20 rounded-2xl bg-black/80 backdrop-blur-md px-6 py-6 text-white shadow-lg">
                        <p className="text-2xl font-light leading-none">
                            Zero
                        </p>
                        <p className="mt-1 text-xs uppercase tracking-wide text-gray-300">
                            water waste
                        </p>
                    </div>
                </div>

            </div>
        </section>
    );
}
