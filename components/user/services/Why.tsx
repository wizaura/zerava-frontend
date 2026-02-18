import Link from "next/link";
import { Calendar, PoundSterling, ShieldCheck } from "lucide-react";

const benefits = [
    {
        title: "Better value over time",
        description:
            "Save more per clean compared to one-off bookings with predictable monthly costs.",
        icon: PoundSterling,
    },
    {
        title: "Priority scheduling",
        description:
            "Subscribers get preferred booking slots, even during busy periods.",
        icon: Calendar,
    },
    {
        title: "Consistent vehicle care",
        description:
            "Regular cleaning keeps your vehicle protected, polished, and presentable.",
        icon: ShieldCheck,
    },
];

const plans = [
    {
        name: "Fortnightly",
        discount: "15% off",
        description: "Keep consistently clean",
        highlight: true,
    },
    {
        name: "Monthly",
        discount: "10% off",
        description: "Regular maintenance",
    },
];

export default function WhySubscribe() {
    return (
        <section className="bg-gray-50 py-20">
            <div className="mx-auto max-w-7xl px-6">

                {/* Header */}
                <div className="mx-auto mb-16 max-w-3xl text-center">
                    <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-electric-teal">
                        Subscribe & Save
                    </p>

                    <h2 className="text-3xl font-light text-gray-900 sm:text-4xl">
                        Regular care, better value
                    </h2>

                    <p className="mx-auto mt-6 max-w-2xl text-sm text-gray-600 sm:text-base">
                        Set up a recurring schedule and enjoy exclusive discounts with
                        hassle-free, sustainable car care.
                    </p>
                </div>

                {/* Benefits */}
                <div className="mx-auto mb-16 grid max-w-5xl grid-cols-1 gap-10 md:grid-cols-3">
                    {benefits.map((item) => {
                        const Icon = item.icon;

                        return (
                            <div
                                key={item.title}
                                className="rounded-2xl bg-white p-8 text-center transition hover:shadow-lg"
                            >
                                <div className="mx-auto mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-electric-teal/10 text-electric-teal">
                                    <Icon size={20} />
                                </div>

                                <h3 className="text-base font-semibold text-gray-900">
                                    {item.title}
                                </h3>

                                <p className="mt-3 text-sm text-gray-600">
                                    {item.description}
                                </p>
                            </div>
                        );
                    })}
                </div>

                {/* Subscription plans */}
                <div className="mx-auto max-w-5xl">
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">

                        {plans.map((plan) => (
                            <div
                                key={plan.name}
                                className={`relative rounded-2xl border bg-white p-8 text-center transition hover:-translate-y-1 hover:shadow-xl
                                    ${plan.highlight
                                        ? "border-electric-teal"
                                        : "border-gray-200"
                                    }`}
                            >
                                {plan.highlight && (
                                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-electric-teal px-4 py-1 text-xs font-semibold text-eco-black">
                                        Most Popular
                                    </span>
                                )}

                                <h4 className="text-lg font-semibold text-gray-900">
                                    {plan.name}
                                </h4>

                                <p className="mt-3 text-3xl font-semibold text-electric-teal">
                                    {plan.discount}
                                </p>

                                <p className="mt-3 text-sm text-gray-600">
                                    {plan.description}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* CTA */}
                    <div className="mt-16 text-center">
                        <Link
                            href="/subscribe"
                            className="inline-flex rounded-full bg-electric-teal px-12 py-4 text-sm font-semibold text-eco-black transition hover:brightness-110"
                        >
                            Start Your Subscription
                        </Link>
                    </div>
                </div>

            </div>
        </section>
    );
}
