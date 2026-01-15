"use client";

import { ArrowRight, Leaf } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function Hero() {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const [mouse, setMouse] = useState({ x: 50, y: 50 });

    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;

        const handleMouseMove = (e: MouseEvent) => {
            const rect = el.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            setMouse({ x, y });
        };

        el.addEventListener("mousemove", handleMouseMove);

        return () => {
            el.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);


    return (
        <section
            ref={containerRef}
            className="relative min-h-screen overflow-hidden bg-[#0A0A0A]"
        >
            {/* ===== IMAGE REVEAL LAYER ===== */}
            <div
                className="pointer-events-none absolute inset-0 z-[1]"
                style={{
                    WebkitMaskImage: `radial-gradient(circle 320px at ${mouse.x}% ${mouse.y}%, white 0%, transparent 60%)`,
                    maskImage: `radial-gradient(circle 320px at ${mouse.x}% ${mouse.y}%, white 0%, transparent 60%)`,
                }}
            >
                <img
                    src="/home-1.jfif" // ← replace with your image
                    alt="Zerava vehicle care"
                    className="h-full w-full object-cover opacity-90"
                />
            </div>

            {/* ===== EXISTING BACKGROUND ===== */}
            <div className="absolute inset-0 pointer-events-none z-0">
                <div className="absolute inset-0 pointer-events-none">
                    {/* Main left glow */}
                    <div className="absolute left-[-200px] top-1/2 h-[900px] w-[900px] -translate-y-1/2 rounded-full" style={{ background: "radial-gradient(circle at 30% 50%, rgba(56,214,196,0.18) 0%, rgba(11,46,40,0.25) 35%, rgba(10,10,10,0.95) 70%)", }} />
                    {/* Right-side dark teal variation */}
                    <div className="absolute right-[-300px] top-[45%] h-[1000px] w-[1000px] -translate-y-1/2 rounded-full" style={{ background: "radial-gradient(circle at 70% 50%, rgba(56,214,196,0.08) 0%, rgba(11,46,40,0.15) 30%, rgba(10,10,10,0.98) 75%)", }} />
                    {/* Subtle depth wash */} <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/80" />
                </div>
            </div>

            {/* ===== CONTENT ===== */}
            <div className="relative z-10 mx-auto flex min-h-screen max-w-4xl flex-col items-center justify-center px-6 text-center">
                {/* Pill */}
                <div className="mb-6 mt-10 inline-flex items-center gap-2 rounded-full border border-electric-teal/30 bg-white/10 px-4 py-2 text-xs font-medium text-primary">
                    <Leaf size={14} className="text-electric-teal" />
                    Eco Smart Mobility Care
                </div>

                {/* Heading */}
                <h1 className="leading-[1.25]">
                    <span className="block pb-2 text-4xl font-light text-text-primary sm:text-7xl md:text-6xl">
                        A New Standard of Vehicle Care
                    </span>
                    <span className="block text-4xl font-light text-electric-teal sm:text-7xl md:text-6xl">
                        for Modern Mobility
                    </span>
                </h1>

                {/* Description */}
                <p className="mx-auto mt-6 max-w-2xl text-sm leading-relaxed text-text-secondary sm:text-base">
                    Premium, on-site waterless vehicle care that comes to you.
                    Sustainable by design. Built for modern life, ready for the future of mobility.
                </p>

                {/* CTAs */}
                <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row">
                    <button className="flex items-center gap-2 rounded-full bg-electric-teal px-6 py-3 text-sm font-semibold text-eco-black hover:brightness-110 transition">
                        Book Your Clean
                        <ArrowRight size={15} />
                    </button>

                    <button className="rounded-full border border-white/20 px-8 py-3 text-sm font-semibold text-text-primary hover:border-white/40 transition">
                        View Services
                    </button>
                </div>
            </div>
        </section>
    );
}
