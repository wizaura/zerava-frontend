import Link from "next/link";

export default function PricingPreview() {
    return (
        <section className="bg-white py-20">
            <div className="mx-auto max-w-7xl px-6 text-center">

                {/* Heading */}
                <div className="mb-14">
                    <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-electric-teal">
                        Pricing
                    </p>
                    <h2 className="text-3xl font-semibold text-gray-900 sm:text-4xl">
                        Simple, transparent pricing
                    </h2>
                    <p className="mx-auto mt-4 max-w-2xl text-sm text-gray-600 sm:text-base">
                        Pay once or save more with flexible subscription plans.
                    </p>
                </div>

                {/* Preview Cards */}
                <div className="mx-auto grid max-w-4xl grid-cols-1 gap-6 sm:grid-cols-2">

                    {/* One-off */}
                    <div className="rounded-xl border border-gray-200 bg-gradient-to-br from-gray-50 via-white to-gray-100 p-8 text-left transition hover:border-gray-300 hover:transform hover:scale-[1.03]">
                        <h3 className="text-lg font-semibold text-gray-900">
                            One-off Clean
                        </h3>

                        <p className="mt-2 text-sm text-gray-600">
                            Ideal for occasional or first-time cleans.
                        </p>

                        <p className="mt-6 text-2xl font-semibold text-gray-900">
                            From £25
                        </p>

                        <Link
                            href="/book"
                            className="mt-6 inline-block rounded-md bg-gray-900 px-6 py-3 text-sm font-semibold text-white hover:bg-gray-800 transition"
                        >
                            Book One-Off
                        </Link>
                    </div>


                    {/* Subscription */}
                    <div className="rounded-xl border border-mint-glow bg-gradient-to-br from-white via-mint-glow/20 to-electric-teal/20 p-8 text-left transition hover:border-electric-teal hover:transform hover:scale-[1.03]">
                        <h3 className="text-lg font-semibold text-gray-900">
                            Subscription Plans
                        </h3>

                        <p className="mt-2 text-sm text-gray-600">
                            Best value for regular vehicle care.
                        </p>

                        <p className="mt-6 text-2xl font-semibold text-gray-900">
                            Monthly · Quarterly · Annual
                        </p>

                        <Link
                            href="/pricing"
                            className="mt-6 inline-block rounded-md bg-electric-teal px-6 py-3 text-sm font-semibold text-eco-black hover:brightness-110 transition"
                        >
                            View Plans
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
