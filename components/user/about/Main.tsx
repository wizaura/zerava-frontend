import Image from "next/image";

export default function OurStorySection() {
    return (
        <section className="bg-white px-6 py-20">
            <div className="mx-auto grid max-w-6xl gap-14 md:grid-cols-2 md:items-center">

                {/* Text Content */}
                <div>
                    <p
                        data-aos="fade-right"
                        data-aos-delay="100"
                        className="mb-4 text-sm font-semibold uppercase tracking-wider text-electric-teal"
                    >
                        Our Story
                    </p>

                    <h2
                        data-aos="fade-right"
                        data-aos-delay="200"
                        className="text-4xl font-normal leading-tight text-eco-black sm:text-5xl"
                    >
                        Born from a
                        <br />
                        <span
                            data-aos="fade-right"
                            data-aos-delay="300"
                            className="font-light text-gray-400"
                        >
                            simple question
                        </span>
                    </h2>

                    <p
                        data-aos="fade-right"
                        data-aos-delay="400"
                        className="mt-6 text-md leading-relaxed text-gray-600 sm:text-lg"
                    >
                        Why does keeping a vehicle clean still mean wasting hundreds of litres
                        of water or planning time around a physical location? There had to be
                        a better, more considered way.
                    </p>

                    <p
                        data-aos="fade-right"
                        data-aos-delay="500"
                        className="mt-4 text-md leading-relaxed text-gray-600 sm:text-lg"
                    >
                        Zerava was founded on the belief that premium vehicle care and
                        environmental responsibility can exist together. By combining
                        waterless technology with biodegradable products, we’ve created a
                        service that respects vehicles, people, and the planet — designed to
                        fit naturally into everyday life.
                    </p>

                    <p
                        data-aos="fade-right"
                        data-aos-delay="600"
                        className="mt-4 text-md leading-relaxed text-gray-600 sm:text-lg"
                    >
                        Based in Southampton, we’re growing with a clear mission: to redefine
                        what mobility care means in the 21st century.
                    </p>
                </div>

                {/* Image */}
                <div
                    data-aos="fade-left"
                    data-aos-delay="300"
                    className="relative overflow-hidden rounded-2xl"
                >
                    <div className="relative h-[420px] w-full">
                        <Image
                            src="/about-1.png"
                            alt="A modern vehicle parked on a calm urban street, reflecting premium care as part of everyday city life"
                            fill
                            className="object-cover transition-transform duration-700 ease-out hover:scale-[1.08]"
                            priority
                        />
                    </div>
                </div>

            </div>
        </section>
    );
}
