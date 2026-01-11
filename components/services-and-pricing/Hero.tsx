export default function ServicesPricingHero() {
    return (
        <section className="bg-eco-black py-28">
            <div className="mx-auto max-w-5xl px-6 text-center">

                {/* Label */}
                <p className="mb-4 text-xs inline-flex rounded-full font-semibold uppercase tracking-wider border border-electric-teal/30 bg-white/10 px-4 py-2 text-xs font-medium text-electric-teal">
                    Services & Pricing
                </p>

                {/* Heading */}
                <h1 className="text-4xl font-light leading-tight text-gray-100 sm:text-5xl md:text-6xl">
                    Premium care,
                    <br />
                    <span className="font-normal">zero compromise</span>
                </h1>

                {/* Description */}
                <p className="mx-auto mt-6 max-w-2xl text-sm text-gray-400 sm:text-base">
                    From quick exterior refreshes to complete valet packages, every service
                    uses our signature waterless, biodegradable formula — with simple,
                    transparent pricing and no hidden fees.
                </p>

            </div>
        </section>
    );
}
