export default function MissionVisionSection() {
    return (
        <section className="bg-eco-black px-6 py-20 text-text-primary">
            <div className="mx-auto max-w-6xl">

                <div className="grid gap-16 md:grid-cols-5 md:items-center">

                    {/* Mission */}
                    <div
                        data-aos="fade-up"
                        className="space-y-6 col-span-2 text-center md:text-left"
                    >
                        <h2 className="text-4xl text-center font-light text-gray-300 sm:text-5xl md:text-left">
                            Our{" "}
                            <span className="text-electric-teal">
                                <br />Mission
                            </span>
                        </h2>

                        <div className="space-y-4 text-sm leading-relaxed text-text-secondary sm:text-lg">
                            <p>
                                To deliver sustainable, convenient vehicle care that fits
                                seamlessly into modern life — proving that premium quality
                                and environmental responsibility can coexist.
                            </p>

                            <p>
                                By bringing advanced, biodegradable, waterless care directly
                                to our customers, we reduce water waste while delivering
                                results that meet or exceed traditional methods.
                            </p>
                        </div>
                    </div>

                    {/* Divider */}
                    {/* Divider */}
                    <div className="col-span-full flex justify-center md:col-auto">
                        {/* Horizontal (mobile) */}
                        <span className="h-px w-24 bg-gradient-to-r from-transparent via-electric-teal/60 to-transparent md:hidden" />

                        {/* Vertical (md+) */}
                        <span className="hidden h-48 w-px bg-gradient-to-b from-transparent via-electric-teal/60 to-transparent md:block" />
                    </div>

                    {/* Vision */}
                    <div
                        data-aos="fade-up"
                        data-aos-delay="100"
                        className="space-y-6 col-span-2 text-center md:text-left"
                    >
                        <h2 className="text-4xl text-center font-light text-gray-300 sm:text-5xl md:text-left">
                            Our{" "}
                            <span className="text-electric-teal">
                                <br />Vision
                            </span>
                        </h2>

                        <div className="space-y-4 text-sm leading-relaxed text-text-secondary sm:text-lg">
                            <p>
                                To build a future-ready mobility care ecosystem — where
                                sustainability, technology, and premium service work
                                together seamlessly.
                            </p>

                            <p>
                                We envision a world where every vehicle, from personal use
                                to corporate fleets, receives intelligent care without
                                environmental compromise — designed to evolve alongside
                                the future of mobility and modern cities.
                            </p>
                        </div>
                    </div>

                </div>

            </div>
        </section>
    );
}
