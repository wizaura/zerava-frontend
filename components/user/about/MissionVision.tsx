export default function MissionVisionSection() {
    return (
        <section className="bg-eco-black px-6 py-20 text-text-primary">
            <div className="mx-auto max-w-6xl space-y-20">

                {/* Mission */}
                <div className="grid gap-12 md:grid-cols-[1fr_auto_1fr] md:items-center">

                    {/* Heading */}
                    <h2 className="text-3xl text-center font-light leading-tight sm:text-4xl md:text-5xl">
                        Our
                        <br />
                        <span className="text-electric-teal">Mission</span>
                    </h2>

                    {/* Vertical Divider */}
                    <span className="hidden h-40 w-px bg-gradient-to-b from-transparent via-electric-teal/60 to-transparent md:block" />

                    {/* Content */}
                    <div className="space-y-6 text-sm leading-relaxed text-text-secondary sm:text-lg">
                        <p>
                            To redefine mobility care for modern cities — making premium,
                            sustainable vehicle maintenance the standard, not the exception.
                        </p>

                        <p>
                            We deliver waterless, on-site care that respects your time, your
                            vehicle, and the planet. This isn't just about cleaning cars —
                            it's about changing how mobility fits into urban life.
                        </p>
                    </div>

                </div>


                {/* Vision */}
                <div className="grid gap-12 md:grid-cols-[1fr_auto_1fr] md:items-center">

                    {/* Mobile Heading */}
                    <h2 className="text-3xl text-center font-light leading-tight sm:text-4xl md:hidden">
                        Our
                        <br />
                        <span className="text-electric-teal">Vision</span>
                    </h2>

                    {/* Content (Left) */}
                    <div className="space-y-6 text-sm leading-relaxed text-text-secondary sm:text-lg">
                        <p>
                            To build a future-ready mobility care ecosystem — where
                            sustainability, technology, and premium service work together
                            seamlessly.
                        </p>

                        <p>
                            We envision a world where every vehicle, from personal cars to
                            corporate fleets, receives intelligent care without environmental
                            compromise. Zerava is designed to scale with the future of
                            mobility — EV-aligned, membership-driven, and city-integrated.
                        </p>
                    </div>

                    {/* Vertical Divider */}
                    <span className="hidden h-40 w-px bg-gradient-to-b from-transparent via-electric-teal/60 to-transparent md:block" />

                    {/* Desktop Heading */}
                    <h2 className="hidden text-4xl text-center font-light leading-tight md:block">
                        Our
                        <br />
                        <span className="text-electric-teal">Vision</span>
                    </h2>

                </div>
            </div>
        </section>
    );
}
