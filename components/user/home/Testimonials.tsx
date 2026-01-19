"use client";

import { Quote, Star } from "lucide-react";
import Image from "next/image";

export default function TestimonialsSection() {
    const testimonials = [
        {
            name: "James Cooper",
            role: "Fleet Manager, TechCorp",
            image: "/about-1.jpg",
            content:
                "We switched our entire company fleet to Zerava and couldn't be happier. The convenience of on-site cleaning saves our team hours each week, and the cost savings from their corporate plan are significant. Highly recommended for any business.",
        },
        {
            name: "Sarah Williams",
            role: "Private Customer",
            image: "/avatars/sarah.jpg",
            content:
                "Zerava transformed my weekly car care routine. No more driving to the car wash — they come to my office! The waterless method is brilliant, and my BMW looks incredible.",
        },
        {
            name: "Emma Richardson",
            role: "NHS Worker",
            image: "/avatars/emma.jpg",
            content:
                "As an NHS worker with long shifts, finding time for car maintenance was impossible. Zerava’s service is perfect — they clean my car while I'm at work.",
        },
    ];

    return (
        <section className="bg-white px-6 py-20">
            <div className="mx-auto max-w-6xl">

                {/* Header */}
                <div className="mb-16 text-center">
                    <p
                        data-aos="fade-up"
                        data-aos-duration="700"
                        className="mb-3 text-xs font-semibold tracking-widest text-electric-teal"
                    >
                        TESTIMONIALS
                    </p>

                    <h2
                        data-aos="fade-up"
                        data-aos-delay="100"
                        data-aos-duration="800"
                        className="mb-6 text-3xl font-light text-eco-black sm:text-5xl"
                    >
                        Loved by thousands across Southampton
                    </h2>

                    <p
                        data-aos="fade-up"
                        data-aos-delay="200"
                        data-aos-duration="900"
                        className="mx-auto max-w-xl text-sm text-gray-500 sm:text-base"
                    >
                        Don't just take our word for it – hear what our customers
                        have to say about their Zerava experience.
                    </p>
                </div>

                {/* Cards */}
                <div className="grid gap-10 md:grid-cols-3">
                    {testimonials.map((item, i) => (
                        <div
                            key={i}
                            data-aos="fade-up"
                            data-aos-delay={300 + i * 150}
                            data-aos-duration="900"
                            data-aos-easing="ease-out-cubic"
                            className="relative rounded-3xl bg-white px-8 pb-8 pt-12 
                         shadow-lg transition-all duration-300 ease-out
                         hover:-translate-y-2 hover:scale-[1.04] hover:shadow-2xl"
                        >
                            {/* Floating quote */}
                            <div className="absolute -top-5 left-6 flex h-12 w-12 items-center justify-center 
                              rounded-2xl bg-electric-teal shadow-xl rotate-6">
                                <Quote className="h-6 w-6 text-white" />
                            </div>

                            {/* Stars */}
                            <div className="mb-5 flex gap-1 text-electric-teal">
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <Star key={i} size={14} fill="currentColor" />
                                ))}
                            </div>

                            <p className="mb-8 text-sm leading-relaxed text-gray-600">
                                “{item.content}”
                            </p>

                            <div className="mb-4 h-px w-full bg-gray-100" />

                            <div className="flex items-center gap-3">
                                <div className="relative h-10 w-10 overflow-hidden rounded-full">
                                    <Image src={item.image} alt={item.name} fill className="object-cover" />
                                </div>

                                <div>
                                    <p className="text-sm font-semibold text-eco-black">
                                        {item.name}
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        {item.role}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
