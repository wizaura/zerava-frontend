"use client";

import { ArrowRight, Leaf } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
    return (
        <section className="relative isolate min-h-screen overflow-hidden bg-[#0A0A0A]">
            {/* ===== IMAGE LAYER ===== */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <Image
                    src="/hero.jpg"
                    alt="Zerava vehicle care"
                    className="h-full w-full object-cover"
                    fill
                    priority
                />
                <div className="absolute inset-0 bg-black/30" />
            </div>

            {/* ===== CONTENT ===== */}
            <div className="relative z-10 m-auto flex min-h-screen max-w-5xl flex-col items-center justify-center px-6 text-center">
                {/* Pill */}
                <div
                    data-aos="fade-down"
                    className="mb-6 mt-10 ml-8 inline-flex self-start gap-2 rounded-full border border-electric-teal/30 px-4 py-2 text-xs font-medium text-gray-200"
                >
                    <Leaf size={14} className="text-electric-teal" />
                    Eco Smart Mobility Care
                </div>

                {/* Heading */}
                <h1 className="leading-[1.25]">
                    <span
                        data-aos="fade-up"
                        data-aos-delay="100"
                        className="block pb-2 text-4xl font-light text-gray-200 sm:text-6xl md:text-7xl"
                    >
                        A New Standard of Vehicle Care
                    </span>
                    <span
                        data-aos="fade-up"
                        data-aos-delay="200"
                        className="block text-4xl font-light text-electric-teal sm:text-6xl md:text-7xl"
                    >
                        for Modern Mobility
                    </span>
                </h1>

                {/* Description */}
                <p
                    data-aos="fade-up"
                    data-aos-delay="300"
                    className="mx-auto mt-6 max-w-2xl text-sm leading-relaxed text-text-secondary sm:text-base"
                >
                    Premium, on-site waterless vehicle care that comes to you.
                    Sustainable by design. Built for modern life, ready for the future of mobility.
                </p>

                {/* CTAs */}
                <div
                    data-aos="zoom-in"
                    data-aos-delay="400"
                    className="mt-8 flex flex-col items-center gap-4 sm:flex-row"
                >
                    <Link
                        href="/booking"
                        className="relative z-30 flex items-center gap-2 rounded-full bg-electric-teal px-6 py-3 text-sm font-semibold text-eco-black transition hover:brightness-110"
                    >
                        Book Your Clean
                        <ArrowRight size={15} />
                    </Link>

                    <Link
                        href="/services"
                        className="relative z-30 rounded-full border border-white/70 px-8 py-3 text-sm font-semibold text-gray-200 transition hover:border-electric-teal hover:text-electric-teal"
                    >
                        View Services
                    </Link>

                </div>
            </div>
        </section>
    );
}
