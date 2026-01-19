import { Check, ArrowRight } from "lucide-react";

export default function JourneySection() {
    const journey = [
        { year: "2024", title: "Zerava founded in Southampton", status: "done" },
        { year: "2024", title: "First 500 vehicles cleaned", status: "done" },
        { year: "2025", title: "Fleet partnerships launched", status: "done" },
        { year: "Future", title: "Expanding across the UK", status: "future" },
    ];

    return (
        <section className="bg-white px-6 py-16">
            <div className="mx-auto max-w-4xl">

                {/* Header */}
                <h2 className="mb-16 text-left text-3xl font-light text-eco-black sm:text-4xl">
                    Our journey
                </h2>

                {/* Timeline wrapper */}
                <div className="relative">

                    {/* Vertical line */}
                    <div className="absolute left-[120px] top-0 h-full w-px bg-gray-200" />

                    {/* Timeline items */}
                    <div className="space-y-14">
                        {journey.map((item, index) => (
                            <div key={index} className="relative flex items-start">

                                {/* Year */}
                                <div
                                    className={`w-[100px] pr-6 text-right text-sm font-medium ${
                                        item.status === "future"
                                            ? "text-electric-teal"
                                            : "text-gray-500"
                                    }`}
                                >
                                    {item.year}
                                </div>

                                {/* Node */}
                                <div className="relative z-10 flex h-10 w-10 items-top justify-center">
                                    {item.status === "done" ? (
                                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-mobility-green">
                                            <Check className="h-4 w-4 text-white" />
                                        </span>
                                    ) : (
                                        <span className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-electric-teal bg-white">
                                            <ArrowRight className="h-4 w-4 text-electric-teal" />
                                        </span>
                                    )}
                                </div>

                                {/* Content */}
                                <div className="pl-6 text-sm text-gray-700 sm:text-base">
                                    {item.title}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
