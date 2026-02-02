"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Leaf } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";

const slides = [
    {
        image: "/home-hero-1.png",
        pill: "New Era of Mobility Care",
        title: "Journey",
        highlight: "That Matters",
        desc: "Clean vehicles for life's important moments",
    },
    {
        image: "/hero-20.png",
        pill: "New Era of Mobility Care",
        title: "A New Standard of Vehicle Care",
        highlight: "for Modern Mobility",
        desc: "Premium, on-site waterless vehicle care that comes to you. Sustainable by design. Built for modern life.",
    },
    {
        image: "/home-2.jpg",
        pill: "New Era of Mobility Care",
        title: "Zero Water.",
        highlight: "Maximum Quality",
        desc: "Professional detailing without disrupting your day.",
    },
];

export default function HeroSlideshow() {
    const [active, setActive] = useState(0);

    // Init AOS once
    useEffect(() => {
        AOS.init({
            duration: 800,
            easing: "ease-out-cubic",
            once: false,
        });
    }, []);

    // Refresh AOS on slide change
    useEffect(() => {
        AOS.refresh();
    }, [active]);

    // Auto slide
    useEffect(() => {
        const interval = setInterval(() => {
            setActive((prev) => (prev + 1) % slides.length);
        }, 6500);

        return () => clearInterval(interval);
    }, []);

    return (
        <section className="relative isolate min-h-screen overflow-hidden bg-eco-black">

            {/* IMAGE LAYER */}
            <div className="absolute inset-0 z-0">
                {slides.map((slide, i) => (
                    <div
                        key={i}
                        className={`absolute inset-0 transition-opacity duration-[1600ms] ease-in-out ${active === i ? "opacity-100" : "opacity-0"
                            }`}
                    >
                        <Image
                            src={slide.image}
                            alt={slide.title}
                            fill
                            className={`object-cover transition-transform duration-[7000ms] ease-out ${active === i ? "scale-100" : "scale-[1.08]"
                                }`}
                            priority={i === 0}
                        />
                        <div className="absolute inset-0 bg-black/70" />
                    </div>
                ))}
            </div>

            {/* CONTENT */}
            <div className="relative z-10 m-auto flex min-h-screen max-w-5xl flex-col items-center justify-center px-6 text-center">

                {/* Pill */}
                <div
                    data-aos="fade-down"
                    className="mb-4 inline-flex items-center gap-2 rounded-full border bg-white/10 border-electric-teal/30 px-4 py-2 text-xs font-medium text-gray-200"
                >
                    <Leaf size={14} className="text-electric-teal" />
                    {slides[active].pill}
                </div>

                {/* Heading */}
                <h1 className="leading-[1.2]">
                    <span
                        data-aos="fade-up"
                        data-aos-delay="100"
                        className="block pb-2 text-4xl font-light text-gray-200 sm:text-6xl md:text-7xl"
                    >
                        {slides[active].title}
                    </span>
                    <span
                        data-aos="fade-up"
                        data-aos-delay="200"
                        className="block text-4xl font-light text-electric-teal sm:text-6xl md:text-7xl"
                    >
                        {slides[active].highlight}
                    </span>
                </h1>

                {/* Description */}
                <p
                    data-aos="fade-up"
                    data-aos-delay="300"
                    className="mx-auto mt-6 max-w-2xl text-sm leading-relaxed text-text-secondary sm:text-base"
                >
                    {slides[active].desc}
                </p>

                {/* CTAs */}
                <div
                    data-aos="zoom-in"
                    data-aos-delay="400"
                    className="mt-8 flex flex-col items-center gap-4 sm:flex-row"
                >
                    <Link
                        href="/"
                        className="flex items-center gap-2 rounded-full bg-electric-teal px-6 py-3 text-sm font-semibold text-eco-black transition hover:brightness-110"
                    >
                        Book Your Clean
                        <ArrowRight size={15} />
                    </Link>

                    <Link
                        href="#services"
                        className="rounded-full border border-white/70 px-8 py-3 text-sm font-semibold text-gray-200 transition hover:border-electric-teal hover:text-electric-teal"
                    >
                        View Services
                    </Link>
                </div>

                {/* SCROLL INDICATOR */}
                <div
                    data-aos="fade-up"
                    data-aos-delay="200"
                    className="absolute bottom-12 flex flex-col items-center gap-2 text-gray-400"
                >
                    <MouseIcon />
                </div>

                {/* DOTS */}
                <div className="mt-14 flex gap-2">
                    {slides.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setActive(i)}
                            className={`h-2 w-2 rounded-full transition-all duration-300 ${active === i
                                    ? "w-6 bg-electric-teal"
                                    : "bg-white/30"
                                }`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}

/* -------- Mouse Icon -------- */
function MouseIcon() {
    return (
        <svg
            width="22"
            height="36"
            viewBox="0 0 22 36"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="animate-mouse text-electric-teal"
        >
            <rect
                x="1"
                y="1"
                width="20"
                height="34"
                rx="10"
                stroke="currentColor"
                strokeWidth="2"
            />
            <circle
                cx="11"
                cy="10"
                r="2"
                fill="currentColor"
            />
        </svg>
    );
}
