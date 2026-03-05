import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function OurPromiseSection() {
    return (
        <section className="bg-white py-20 overflow-x-hidden">
            <div className="mx-auto max-w-6xl px-6 grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">

                {/* Text Content */}
                <div className="max-w-xl">
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
                        className="text-4xl sm:text-5xl font-normal leading-tight text-eco-black"
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
                        className="mt-6 text-base sm:text-lg leading-relaxed text-gray-600"
                    >
                        Every Zerava service is designed with sustainability at its core.
                        Our waterless technology saves over 150 litres of water per wash,
                        while our 99.78% readily biodegradable formulations are designed
                        to break down naturally and minimise environmental impact.
                    </p>

                    {/* CTA */}
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
                    className="relative w-full"
                >
                    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl">
                        <Image
                            src="/service-stock-1.jpg"
                            alt="A modern vehicle parked on a calm urban street, reflecting premium care as part of everyday city life"
                            fill
                            sizes="(max-width: 1024px) 100vw, 50vw"
                            className="object-cover transition-transform duration-700 ease-out hover:scale-[1.05]"
                            priority
                        />
                    </div>
                </div>

            </div>
        </section>
    );
}