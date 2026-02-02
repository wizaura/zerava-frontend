export default function FutureVisionSection() {
    return (
        <section className="relative overflow-hidden bg-black py-20">
            {/* Background glow */}
            <div className="absolute inset-0 bg-gradient-to-b from-black via-black/90 to-black" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(56,214,196,0.08),transparent_60%)]" />

            <div className="relative mx-auto max-w-6xl px-4">
                {/* Header */}
                <div
                    data-aos="fade-up"
                    data-aos-delay="100"
                    className="mb-16 text-center"
                >
                    <p className="mb-3 text-xs font-semibold tracking-widest text-electric-teal">
                        THE FUTURE
                    </p>

                    <h2 className="text-3xl font-medium text-white md:text-4xl">
                        Where we&apos;re heading
                    </h2>

                    <p className="mx-auto mt-4 max-w-2xl text-sm text-gray-400 md:text-base">
                        Zerava is more than car cleaning. We&apos;re building a
                        complete mobility care ecosystem.
                    </p>
                </div>

                {/* Cards */}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <FeatureCard
                        delay={200}
                        title="Mobility Lounges"
                        description="Premium spaces where you can work, relax, and recharge while your vehicle is cared for."
                    />

                    <FeatureCard
                        delay={300}
                        title="EV Support Services"
                        description="Integrated charging assistance, range optimisation, and EV-specific care packages."
                    />

                    <FeatureCard
                        delay={400}
                        title="Traveller Solutions"
                        description="Airport and station services for travellers who want a clean car waiting for them."
                    />

                    <FeatureCard
                        delay={500}
                        title="Smart Subscriptions"
                        description="AI-powered scheduling that knows when your car needs attention before you do."
                    />
                </div>

                {/* Member line */}
                <p
                    className="mt-12 text-center text-xs uppercase tracking-wider font-medium text-emerald-500"
                >
                    Designed for Zerava members
                </p>
            </div>
        </section>
    );
}

/* ---------------- Card ---------------- */

function FeatureCard({
    title,
    description,
    delay = 0,
}: {
    title: string;
    description: string;
    delay?: number;
}) {
    return (
        <div
            data-aos="fade-up"
            data-aos-delay={delay}
            className="group rounded-2xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-electric-teal/40 hover:bg-white/[0.06]"
        >
            <h3 className="mb-3 text-lg font-medium text-white">
                {title}
            </h3>

            <p className="text-sm leading-relaxed text-gray-400">
                {description}
            </p>
        </div>
    );
}
