export default function MissionVisionSection() {
    return (
        <section className="bg-eco-black px-6 py-20 text-text-primary">
            <div className="mx-auto max-w-6xl space-y-20">

                {/* Mission */}
                <div className="grid gap-12 md:grid-cols-[1fr_auto_1fr] md:items-center">

                    {/* Heading */}
                    <h2
                        data-aos="fade-up"
                        data-aos-delay="100"
                        className="text-3xl text-center text-gray-300 font-light leading-tight sm:text-4xl md:text-5xl"
                    >
                        Our
                        <br />
                        <span className="text-electric-teal">Mission</span>
                    </h2>

                    {/* Vertical Divider */}
                    <span
                        data-aos="fade-in"
                        data-aos-delay="200"
                        className="hidden h-40 w-px bg-gradient-to-b from-transparent via-electric-teal/60 to-transparent md:block"
                    />

                    {/* Content */}
                    <div
                        data-aos="fade-up"
                        data-aos-delay="300"
                        className="space-y-6 text-sm leading-relaxed text-text-secondary sm:text-lg"
                    >
                        <p>
                            To deliver sustainable, convenient vehicle care that fits
                            seamlessly into modern life — proving that premium quality and
                            environmental responsibility can coexist.
                        </p>

                        <p>
                            By bringing advanced, biodegradable, waterless care directly to
                            our customers, we reduce water waste while delivering results
                            that meet or exceed traditional methods.
                        </p>
                    </div>

                </div>

                {/* Vision */}
                <div className="grid gap-12 md:grid-cols-[1fr_auto_1fr] md:items-center">

                    {/* Mobile Heading */}
                    <h2
                        data-aos="fade-up"
                        data-aos-delay="100"
                        className="text-3xl text-center text-gray-300 font-light leading-tight sm:text-4xl md:hidden"
                    >
                        Our
                        <br />
                        <span className="text-electric-teal">Vision</span>
                    </h2>

                    {/* Content */}
                    <div
                        data-aos="fade-up"
                        data-aos-delay="200"
                        className="space-y-6 text-sm leading-relaxed text-text-secondary sm:text-lg"
                    >
                        <p>
                            To build a future-ready mobility care ecosystem — where
                            sustainability, technology, and premium service work together
                            seamlessly.
                        </p>

                        <p>
                            We envision a world where every vehicle, from personal use to
                            corporate fleets, receives intelligent care without environmental
                            compromise — designed to evolve alongside the future of mobility
                            and modern cities.
                        </p>
                    </div>

                    {/* Vertical Divider */}
                    <span
                        data-aos="fade-in"
                        data-aos-delay="300"
                        className="hidden h-40 w-px bg-gradient-to-b from-transparent via-electric-teal/60 to-transparent md:block"
                    />

                    {/* Desktop Heading */}
                    <h2
                        data-aos="fade-up"
                        data-aos-delay="400"
                        className="hidden text-4xl text-gray-300 text-center font-light leading-tight md:block"
                    >
                        Our
                        <br />
                        <span className="text-electric-teal">Vision</span>
                    </h2>

                </div>
            </div>
        </section>
    );
}
