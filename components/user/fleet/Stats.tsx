"use client";

import { useEffect, useRef, useState } from "react";

function CountUp({ value }: { value: string }) {
    const [display, setDisplay] = useState(value);
    const [started, setStarted] = useState(false);
    const ref = useRef<HTMLSpanElement | null>(null);

    // Extract number safely
    const numericPart = value.match(/\d+/);
    const numeric = numericPart ? parseInt(numericPart[0], 10) : null;
    const suffix = numeric !== null ? value.replace(/\d+/g, "") : "";

    useEffect(() => {
        if (numeric === null) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !started) {
                    setStarted(true);
                }
            },
            { threshold: 0.4 }
        );

        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [started, numeric]);

    useEffect(() => {
        if (!started || numeric === null) return;

        const duration = 1200;
        const steps = 40;
        const increment = numeric / steps;
        let current = 0;

        const interval = setInterval(() => {
            current += increment;
            if (current >= numeric) {
                setDisplay(value);
                clearInterval(interval);
            } else {
                setDisplay(Math.floor(current).toString() + suffix);
            }
        }, duration / steps);

        return () => clearInterval(interval);
    }, [started, numeric, suffix, value]);

    return <span ref={ref}>{display}</span>;
}

export default function FleetStatsSection() {
    const stats = [
        { value: "3+", label: "Minimum fleet size" },
        { value: "150L", label: "Water saved per clean" },
        { value: "0L", label: "Water used" },
        { value: "On-site", label: "Service delivery" },
    ];

    return (
        <section className="bg-emerald-600 px-6 py-14">
            <div className="mx-auto max-w-6xl">

                <div className="grid grid-cols-2 gap-y-12 text-center sm:grid-cols-4">
                    {stats.map((stat, i) => (
                        <div
                            key={i}
                            data-aos="fade-up"
                            data-aos-delay={i * 120}
                            data-aos-duration="800"
                            data-aos-easing="ease-out-cubic"
                        >
                            <p className="text-3xl font-light text-white sm:text-4xl md:text-5xl">
                                <CountUp value={stat.value} />
                            </p>
                            <p className="mt-2 text-xs uppercase tracking-wider text-gray-300">
                                {stat.label}
                            </p>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}
