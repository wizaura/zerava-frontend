import { ArrowRight, Leaf } from "lucide-react";

export default function Hero() {
    return (
        <section className="relative min-h-screen overflow-hidden bg-[#0A0A0A]">
            {/* ===== Background layers ===== */}
            <div className="absolute inset-0 pointer-events-none">
                {/* Main left glow */}
                <div
                    className="absolute left-[-200px] top-1/2 h-[900px] w-[900px] -translate-y-1/2 rounded-full"
                    style={{
                        background:
                            "radial-gradient(circle at 30% 50%, rgba(56,214,196,0.18) 0%, rgba(11,46,40,0.25) 35%, rgba(10,10,10,0.95) 70%)",
                    }}
                />

                {/* Right-side dark teal variation */}
                <div
                    className="absolute right-[-300px] top-[45%] h-[1000px] w-[1000px] -translate-y-1/2 rounded-full"
                    style={{
                        background:
                            "radial-gradient(circle at 70% 50%, rgba(56,214,196,0.08) 0%, rgba(11,46,40,0.15) 30%, rgba(10,10,10,0.98) 75%)",
                    }}
                />

                {/* Subtle depth wash */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/80" />

            </div>

            {/* ===== Content ===== */}
            <div className="relative z-10 mx-auto flex min-h-screen max-w-4xl flex-col items-center justify-center px-6 text-center">
                {/* Pill */}
                <div className="mb-6 mt-10 inline-flex items-center gap-2 rounded-full border border-electric-teal/30 bg-white/10 px-4 py-2 text-xs font-medium text-primary">
                    <Leaf size={14} className="text-electric-teal" />
                    Eco Smart Mobility Care
                </div>

                {/* Heading */}
                <h1 className="leading-[1.25]">
                    <span className="block text-4xl pb-2 font-light text-text-primary sm:text-7xl md:text-6xl">
                        A new era of
                    </span>
                    <span className="block text-4xl font-light text-electric-teal sm:text-7xl md:text-6xl">
                        mobility care
                    </span>
                </h1>

                {/* Description */}
                <p className="mx-auto mt-6 max-w-2xl text-sm leading-relaxed text-text-secondary sm:text-base">
                    Premium waterless car cleaning, delivered wherever you are.
                    Zero water waste. Maximum convenience. Future-ready mobility support.
                </p>

                {/* CTAs */}
                <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row">
                    <button className="flex items-center gap-2 rounded-full bg-electric-teal px-6 py-3 text-sm font-semibold text-eco-black hover:brightness-110 transition">
                        Book Your Clean
                        <ArrowRight size={15}/>
                    </button>

                    <button className="rounded-full border border-white/20 px-8 py-3 text-sm font-semibold text-text-primary hover:border-white/40 transition">
                        View Services
                    </button>
                </div>

                {/* Stats */}
                <div className="mt-16 grid grid-cols-3 gap-16 md:gap-36 text-center">
                    <div>
                        <p className="text-3xl font-semibold text-text-primary">0L</p>
                        <p className="mt-1 text-sm text-[#8A8A8A]">Water Used</p>
                    </div>
                    <div>
                        <p className="text-3xl font-semibold text-text-primary">99.78%</p>
                        <p className="mt-1 text-sm text-[#8A8A8A]">Biodegradable</p>
                    </div>
                    <div>
                        <p className="text-3xl font-semibold text-text-primary">40min</p>
                        <p className="mt-1 text-sm text-[#8A8A8A]">Average Clean</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
