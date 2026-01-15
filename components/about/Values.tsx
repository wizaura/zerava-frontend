import { Leaf, MapPin, Sparkles } from "lucide-react";

export function ValuesSection() {
    return (
        <section className="bg-white px-6 py-20">
            <div className="mx-auto max-w-6xl">

                {/* Header */}
                <div className="mb-14 text-center">
                    <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-electric-teal">
                        Our Values
                    </p>
                    <h2 className="text-3xl font-light text-eco-black sm:text-4xl">
                        What guides everything we do
                    </h2>
                </div>

                {/* Values */}
                <div className="grid gap-8 md:grid-cols-3">

                    {/* Value Card */}
                    <div className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-gray-50 p-8 transition hover:-translate-y-1 hover:shadow-xl">
                        <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-electric-teal/10 text-electric-teal">
                            <Leaf className="h-6 w-6" />
                        </div>

                        <h3 className="text-lg font-medium text-eco-black">
                            Sustainability First
                        </h3>

                        <p className="mt-4 text-sm leading-relaxed text-gray-600">
                            Every decision we make considers environmental impact. From our
                            formulas to our operations, we prioritise the planet.
                        </p>

                        {/* Accent glow */}
                        <span className="pointer-events-none absolute inset-0 opacity-0 transition group-hover:opacity-100 bg-gradient-to-tr from-electric-teal/10 via-transparent to-transparent" />
                    </div>

                    {/* Value Card */}
                    <div className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-gray-50 p-8 transition hover:-translate-y-1 hover:shadow-xl">
                        <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-electric-teal/10 text-electric-teal">
                            <MapPin className="h-6 w-6" />
                        </div>

                        <h3 className="text-lg font-medium text-eco-black">
                            Convenience Redefined
                        </h3>

                        <p className="mt-4 text-sm leading-relaxed text-gray-600">
                            We believe premium car care shouldn't require effort. We come to
                            you, wherever you are.
                        </p>

                        <span className="pointer-events-none absolute inset-0 opacity-0 transition group-hover:opacity-100 bg-gradient-to-tr from-electric-teal/10 via-transparent to-transparent" />
                    </div>

                    {/* Value Card */}
                    <div className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-gray-50 p-8 transition hover:-translate-y-1 hover:shadow-xl">
                        <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-electric-teal/10 text-electric-teal">
                            <Sparkles className="h-6 w-6" />
                        </div>

                        <h3 className="text-lg font-medium text-eco-black">
                            Quality Without Compromise
                        </h3>

                        <p className="mt-4 text-sm leading-relaxed text-gray-600">
                            Eco-friendly doesn't mean inferior. Our results match or exceed
                            traditional methods.
                        </p>

                        <span className="pointer-events-none absolute inset-0 opacity-0 transition group-hover:opacity-100 bg-gradient-to-tr from-electric-teal/10 via-transparent to-transparent" />
                    </div>

                </div>
            </div>
        </section>
    );
}
