import Link from "next/link";
import {Check, Minus} from "lucide-react";

export default function PricingSection() {
    return (
        <section id="pricing" className="bg-white py-20">
            <div className="mx-auto max-w-7xl px-6">

                {/* Section header */}
                <div className="mx-auto mb-20 max-w-5xl text-center">
                    <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-electric-teal">
                        Pricing
                    </p>

                    <h2 className="text-3xl font-light text-gray-900 sm:text-4xl">
                        Simple, transparent pricing
                    </h2>

                    <p className="mx-auto mt-6 max-w-2xl text-sm text-gray-600 sm:text-base">
                        Choose a one-off clean or save more with flexible subscription plans.
                        No hidden fees. No surprises.
                    </p>
                </div>

                {/* Pricing cards */}
                <div className="mx-auto grid max-w-5xl grid-cols-1 gap-10 md:grid-cols-2">

                    {/* One-off pricing */}
                    <div className="group rounded-2xl border border-gray-200 bg-white p-10 transition-all duration-300 hover:-translate-y-1 hover:border-gray-300 hover:shadow-xl">
                        <h3 className="text-xl font-semibold text-gray-900">
                            One-off Clean
                        </h3>

                        <p className="mt-3 text-md text-gray-600">
                            Ideal for occasional cleans or first-time customers.
                        </p>

                        <p className="mt-8 text-4xl font-semibold text-gray-900">
                            From £29
                        </p>

                        <ul className="mt-8 space-y-3 text-sm text-gray-700">
                            <li className="flex items-center gap-2">
                                <span className="h-1.5 w-1.5 rounded-full bg-electric-teal" />
                                Exterior or interior clean
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="h-1.5 w-1.5 rounded-full bg-electric-teal" />
                                Eco-friendly waterless products
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="h-1.5 w-1.5 rounded-full bg-electric-teal" />
                                On-site service
                            </li>
                        </ul>

                        <Link
                            href="/booking"
                            className="mt-10 inline-flex rounded-full bg-gray-900 px-10 py-3 text-sm font-semibold text-white transition hover:bg-gray-800"
                        >
                            Pay One-Off (Stripe)
                        </Link>
                    </div>

                    {/* Subscription pricing */}
                    <div className="group relative rounded-2xl border border-electric-teal/60 bg-gray-50 p-10 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                        <span className="absolute -top-3 right-8 rounded-full bg-electric-teal px-4 py-1 text-xs font-semibold text-eco-black">
                            Best Value
                        </span>

                        <h3 className="text-xl font-semibold text-gray-900">
                            Subscription Plans
                        </h3>

                        <p className="mt-3 text-md text-gray-600">
                            Designed for regular care and long-term savings.
                        </p>

                        <p className="mt-8 text-2xl font-medium text-gray-900">
                            Monthly <strong className="text-electric-teal">·</strong> Fortnightly
                        </p>

                        <ul className="mt-8 space-y-3 text-sm text-gray-700">
                            <li className="flex items-center gap-2">
                                <span className="h-1.5 w-1.5 rounded-full bg-electric-teal" />
                                Reduced cost per clean
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="h-1.5 w-1.5 rounded-full bg-electric-teal" />
                                Priority booking slots
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="h-1.5 w-1.5 rounded-full bg-electric-teal" />
                                Consistent vehicle care
                            </li>
                        </ul>

                        <Link
                            href="/subscribe"
                            className="mt-10 inline-flex rounded-full bg-electric-teal px-10 py-3 text-sm font-semibold text-eco-black transition hover:brightness-110"
                        >
                            Subscribe (Stripe)
                        </Link>
                    </div>

                </div>

                {/* Comparison table */}

                <div className="mx-auto mt-10 max-w-5xl overflow-x-auto">
                    <div className="overflow-hidden rounded-xl border border-gray-200">
                        <table className="w-full border-collapse text-sm">
                            <thead className="bg-eco-black">
                                <tr>
                                    <th className="px-6 py-4 text-left font-medium text-gray-100">
                                        Features
                                    </th>
                                    <th className="px-6 py-4 text-center font-medium text-gray-100">
                                        One-off
                                    </th>
                                    <th className="px-6 py-4 text-center font-medium text-gray-100">
                                        Subscription
                                    </th>
                                </tr>
                            </thead>

                            <tbody className="divide-y text-gray-700">
                                {[
                                    ["Eco-friendly cleaning", true, true],
                                    ["On-site service", true, true],
                                    ["Cost savings", false, true],
                                    ["Priority scheduling", false, true],
                                ].map(([feature, oneOff, sub]) => (
                                    <tr
                                        key={feature as string}
                                        className="transition hover:bg-gray-50"
                                    >
                                        <td className="px-6 py-4 font-medium text-gray-800">
                                            {feature}
                                        </td>

                                        <td className="px-6 py-4 text-center">
                                            {oneOff ? (
                                                <Check className="mx-auto h-4 w-4 text-electric-teal" />
                                            ) : (
                                                <Minus className="mx-auto h-4 w-4 text-gray-400" />
                                            )}
                                        </td>

                                        <td className="px-6 py-4 text-center">
                                            {sub ? (
                                                <Check className="mx-auto h-4 w-4 text-electric-teal" />
                                            ) : (
                                                <Minus className="mx-auto h-4 w-4 text-gray-400" />
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </section>
    );
}
