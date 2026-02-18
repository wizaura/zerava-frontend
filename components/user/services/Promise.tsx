import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function OurPromiseSection() {
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
                        Our Promise
                    </p>

                    <h2
                        data-aos="fade-right"
                        data-aos-delay="200"
                        className="text-4xl font-normal leading-tight text-eco-black sm:text-5xl"
                    >
                        Clean Car,
                        <br />
                        <span
                            data-aos="fade-right"
                            data-aos-delay="300"
                            className="font-light text-gray-400"
                        >
                            clean conscience
                        </span>
                    </h2>

                    <p
                        data-aos="fade-right"
                        data-aos-delay="400"
                        className="mt-6 text-md leading-relaxed text-gray-600 sm:text-lg"
                    >
                        Every Zerava service is designed with sustainability at its core.
                        Our waterless technology saves over 150 litres of water per wash,
                        while our 99.78% readily biodegradable products break down naturally
                        without harming the environment.
                    </p>

                    {/* CTA BUTTON */}
                    <div
                        data-aos="fade-right"
                        data-aos-delay="500"
                        className="mt-10"
                    >
                        <Link
                            href="/eco-method"
                            className="inline-flex items-center gap-3 rounded-full border border-electric-teal px-8 py-3 text-sm font-medium text-electric-teal transition-all duration-300 hover:bg-electric-teal hover:text-eco-black"
                        >
                            Learn About Our Method
                            <ArrowRight size={16} />
                        </Link>
                    </div>
                </div>

                {/* Image */}
                <div
                    data-aos="fade-left"
                    data-aos-delay="300"
                    className="relative overflow-hidden rounded-2xl"
                >
                    <div className="relative h-[420px] w-full">
                        <Image
                            src="/service-2.png"
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
