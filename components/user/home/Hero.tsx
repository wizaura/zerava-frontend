"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Leaf } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";
import Image from "next/image";

const slides = [
    {
        pill: "New Era of Mobility Care",
        title: "A New Standard of Vehicle Care",
        highlight: "for Modern Mobility",
        image: "/hr-1.jpg",
        desc: "Premium, on-site vehicle care — delivered where you're parked. Sustainable by design. Built for modern life.",
    },
    {
        pill: "New Era of Mobility Care",
        title: "Zero Water.",
        highlight: "Maximum Quality",
        image: "/hr-5.jpg",
        desc: "Professional vehicle care without disrupting your day.",
    },
    {
        pill: "New Era of Mobility Care",
        title: "Journey",
        highlight: "That Matters",
        image: "/hr-4.jpg",
        desc: "Clean vehicles for life's important moments",
    },
];

export default function HeroSlideshow() {
    const [active, setActive] = useState(0);

    // Init AOS
    useEffect(() => {
        AOS.init({
            duration: 800,
            easing: "ease-out-cubic",
            once: false,
        });
    }, []);

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
        <section className="relative isolate min-h-[90vh] sm:min-h-screen overflow-hidden bg-eco-black">

            {/* Background Slides */}
            <div className="absolute inset-0 -z-10">

                {slides.map((slide, i) => (
                    <Image
                        key={slide.image}
                        src={slide.image}
                        alt="Mobile car wash service in Southampton by Zerava"
                        fill
                        priority={i === 0}
                        className={`object-cover transition-opacity duration-[1400ms] ${active === i ? "opacity-100" : "opacity-0"
                            }`}
                    />
                ))}

                {/* Dark overlay for readability */}
                <div className="absolute inset-0 bg-black/20" />

                {/* Premium gradient layer */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-black/40" />

            </div>

            <h1 className="sr-only">
                Mobile Car Wash Southampton | Eco-Friendly Car Cleaning | Zerava
            </h1>


            {/* CONTENT */}
            <div className="relative z-10 mx-auto text-center flex min-h-[90vh] sm:min-h-screen max-w-6xl flex-col items-center justify-end px-6 pb-8">

                {/* Pill */}
                <div className="relative mb-4 inline-flex">
                    <div className="absolute inset-0 -z-10 rounded-full bg-black/40 blur-md" />
                    <div
                        data-aos="fade-down"
                        className="inline-flex items-center gap-2 rounded-full
              border border-electric-teal/30
              bg-white/10 px-4 py-2
              text-xs font-medium text-gray-200
              backdrop-blur-sm"
                    >
                        <Leaf size={14} className="text-electric-teal" />
                        {slides[active].pill}
                    </div>
                </div>

                {/* Heading */}
                <div className="relative inline-block">
                    <div
                        className="pointer-events-none absolute inset-0 -z-10
              rounded-2xl
              bg-gradient-to-b from-black/50 via-black/30 to-transparent
              blur-2xl"
                    />

                    <h2 className="leading-[1.15] relative z-10">
                        <span
                            data-aos="fade-up"
                            data-aos-delay="100"
                            className="block pb-2 text-4xl font-semibold
                text-gray-200 sm:text-6xl md:text-7xl
                drop-shadow-lg"
                        >
                            {slides[active].title}
                        </span>

                        <span
                            data-aos="fade-up"
                            data-aos-delay="200"
                            className="block text-4xl font-medium
                text-electric-teal sm:text-6xl md:text-7xl
                drop-shadow-lg"
                        >
                            {slides[active].highlight}
                        </span>
                    </h2>
                </div>

                {/* Description */}
                <div className="relative mt-6 max-w-2xl mx-auto">
                    <div
                        className="pointer-events-none absolute inset-x-0 -inset-y-2
              -z-10 rounded-xl bg-black/30 blur-xl"
                    />
                    <p
                        data-aos="fade-up"
                        data-aos-delay="300"
                        className="text-md sm:text-lg leading-relaxed
              text-white drop-shadow-md"
                    >
                        {slides[active].desc}
                    </p>
                    <p className="sr-only">
                        Zerava provides premium mobile car wash services in Southampton using
                        eco-friendly waterless cleaning technology. We offer convenient,
                        professional car cleaning and fleet washing services across Southampton.
                    </p>
                </div>

                {/* CTAs */}
                <div
                    data-aos="zoom-in"
                    data-aos-delay="400"
                    className="mt-3 sm:mt-8 flex items-center gap-4 flex-row"
                >
                    <Link
                        href="/booking"
                        className="flex items-center gap-2 rounded-full
              bg-electric-teal px-6 py-3
              text-sm font-semibold text-eco-black
              transition hover:brightness-110"
                    >
                        Book Your Clean
                        <ArrowRight size={15} />
                    </Link>

                    <div className="relative inline-flex">
                        <div className="absolute inset-0 -z-10 rounded-full bg-black/40 blur-lg" />
                        <Link
                            href="/services"
                            className="relative z-10 rounded-full
              border border-white/70 px-8 py-3
              text-sm font-semibold text-gray-200
              backdrop-blur-sm transition
              hover:border-electric-teal hover:text-electric-teal"
                        >
                            View Services
                        </Link>
                    </div>
                </div>

                {/* Scroll Indicator */}
                <div
                    data-aos="fade-up"
                    data-aos-delay="200"
                    className="absolute bottom-12 flex flex-col items-center gap-2 text-gray-400"
                >
                    <MouseIcon />
                </div>

                {/* Dots */}
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

/* Mouse Icon */
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
            <circle cx="11" cy="10" r="2" fill="currentColor" />
        </svg>
    );
}
