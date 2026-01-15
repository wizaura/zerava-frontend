import Image from "next/image";

export default function OurStorySection() {
    return (
        <section className="bg-white px-6 py-20">
            <div className="mx-auto grid max-w-6xl gap-14 md:grid-cols-2 md:items-center">

                {/* Text Content */}
                <div>
                    <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-electric-teal">
                        Our Story
                    </p>

                    <h2 className="text-4xl font-normal leading-tight text-eco-black sm:text-5xl">
                        Born from a
                        <br />
                        <span className="font-light text-gray-400">simple question</span>
                    </h2>

                    <p className="mt-6 text-md leading-relaxed text-gray-600 sm:text-lg">
                        Why does keeping a car clean require wasting hundreds of litres of
                        water and visiting a physical location? There had to be a better way.
                    </p>

                    <p className="mt-4 text-md leading-relaxed text-gray-600 sm:text-lg">
                        Zerava was founded on the belief that premium car care and
                        environmental responsibility aren't mutually exclusive. Using
                        cutting-edge waterless technology and 100% biodegradable products,
                        we've created a service that's better for cars, people, and the
                        planet.
                    </p>

                    <p className="mt-4 text-md leading-relaxed text-gray-600 sm:text-lg">
                        Based in Southampton, we're growing with a clear mission: to redefine
                        what mobility care means in the 21st century.
                    </p>
                </div>

                {/* Image */}
                <div className="relative overflow-hidden rounded-2xl">
                    <div
                        className="relative h-[420px] w-full"
                    >
                        <Image
                            src="/about-1.jfif"
                            alt="Premium eco-friendly car care by Zerava"
                            fill
                            className="object-cover transition hover:scale-[1.20]"
                            priority
                        />
                    </div>
                </div>

            </div>
        </section>
    );
}
