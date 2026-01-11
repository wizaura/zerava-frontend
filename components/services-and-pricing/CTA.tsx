import Link from "next/link";

export default function ServicesFinalCTA() {
    return (
        <section className="px-6 py-20 bg-white">
            {/* CTA Box */}
            <div className="relative mx-auto max-w-6xl overflow-hidden rounded-2xl bg-eco-black py-20">

                {/* Gradient spots */}
                <div className="pointer-events-none absolute inset-0">
                    <div className="absolute left-1/4 top-1/2 h-[600px] w-[600px] -translate-y-1/2 rounded-full bg-electric-teal/20 blur-3xl" />
                    <div className="absolute right-1/4 top-1/3 h-[500px] w-[500px] rounded-full bg-mobility-green/40 blur-3xl" />
                </div>

                {/* Content */}
                <div className="relative mx-auto max-w-4xl px-6 text-center">
                    <h2 className="text-3xl font-light leading-tight text-text-primary sm:text-4xl md:text-5xl">
                        Questions about pricing?
                    </h2>

                    <p className="mx-auto mt-6 max-w-2xl text-sm text-text-secondary sm:text-base">
                        Get in touch and we'll help you find the perfect package for your needs.
                    </p>

                    {/* Buttons */}
                    <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                        <Link
                            href="/booking"
                            className="rounded-full bg-electric-teal px-8 py-3 text-sm font-semibold text-eco-black hover:brightness-110 transition"
                        >
                            Book Now
                        </Link>

                        <Link
                            href="/contact"
                            className="rounded-full border border-white/20 px-8 py-3 text-sm font-semibold text-text-primary hover:border-white/40 transition"
                        >
                            View Pricing
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
