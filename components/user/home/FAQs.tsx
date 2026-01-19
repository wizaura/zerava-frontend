"use client";

import Link from "next/link";
import { Plus } from "lucide-react";

const faqs = [
    {
        question: "Is your waterless cleaning safe for my car?",
        answer:
            "Yes. We use premium nano-tech solutions and microfiber methods that are safe for all vehicle surfaces.",
    },
    {
        question: "Do you clean vehicles in the rain?",
        answer:
            "Light rain is not an issue. In extreme weather, we’ll reschedule at no extra cost.",
    },
    {
        question: "What areas do you currently cover?",
        answer:
            "We operate across Southampton and surrounding areas, with expansion planned.",
    },
    {
        question: "How long does a clean take?",
        answer:
            "Most cleans take around 30–40 minutes depending on the service selected.",
    },
];

export default function FAQsPreview() {
    return (
        <section className="bg-white py-16">
            <div className="mx-auto max-w-6xl px-6">

                {/* Heading */}
                <div className="mb-14 text-center">
                    <p
                        data-aos="fade-up"
                        data-aos-duration="700"
                        className="mb-3 text-xs font-semibold uppercase tracking-wider text-electric-teal"
                    >
                        FAQs
                    </p>

                    <h2
                        data-aos="fade-up"
                        data-aos-delay="100"
                        data-aos-duration="800"
                        className="text-3xl font-light text-gray-900 sm:text-5xl"
                    >
                        Common questions, answered
                    </h2>

                    <p
                        data-aos="fade-up"
                        data-aos-delay="200"
                        data-aos-duration="900"
                        className="mx-auto mt-4 max-w-2xl text-sm text-gray-600 sm:text-base"
                    >
                        Everything you need to know before booking with Zerava.
                    </p>
                </div>

                {/* FAQ Grid */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    {faqs.map((faq, i) => (
                        <div
                            key={faq.question}
                            data-aos="fade-up"
                            data-aos-delay={300 + i * 120}
                            data-aos-duration="800"
                            data-aos-easing="ease-out-cubic"
                            className="group rounded-xl border border-gray-200 
                         bg-gradient-to-br from-gray-50 via-white to-gray-100 
                         p-6 transition-all duration-300 ease-out
                         hover:-translate-y-1 hover:shadow-md hover:border-gray-300"
                        >
                            <div className="flex items-start justify-between gap-4">
                                <h3 className="text-md font-semibold text-gray-900 leading-snug">
                                    {faq.question}
                                </h3>

                                <span className="flex h-6 w-6 items-center justify-center rounded-full 
                                 border border-gray-300 text-gray-400 transition
                                 group-hover:border-electric-teal group-hover:text-electric-teal">
                                    <Plus size={14} />
                                </span>
                            </div>

                            <p className="mt-4 text-sm leading-relaxed text-gray-600">
                                {faq.answer}
                            </p>
                        </div>
                    ))}
                </div>

                {/* CTA */}
                <div className="mt-8 text-center">
                    <Link
                        data-aos="fade-up"
                        data-aos-delay="900"
                        href="/faqs"
                        className="inline-flex items-center rounded-full border border-gray-300 px-6 py-3 
                       text-sm font-semibold text-gray-900 transition-all
                       hover:bg-gray-200 hover:scale-105"
                    >
                        View All FAQs
                    </Link>
                </div>
            </div>
        </section>
    );
}
