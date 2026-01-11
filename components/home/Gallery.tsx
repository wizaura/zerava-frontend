import Link from "next/link";
import Image from "next/image";

const galleryImages = [
    "/images/gallery/gallery-1.jpg",
    "/images/gallery/gallery-2.jpg",
    "/images/gallery/gallery-3.jpg",
    "/images/gallery/gallery-4.jpg",
    "/images/gallery/gallery-5.jpg",
];

export default function GalleryPreview() {
    return (
        <section className="bg-white py-16">
            <div className="mx-auto max-w-7xl px-6 text-center">

                {/* Heading */}
                <div className="mb-14">
                    <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-electric-teal">
                        Our Work
                    </p>

                    <h2 className="text-3xl font-semibold text-gray-900 sm:text-4xl">
                        Clean results you can see
                    </h2>

                    <p className="mx-auto mt-4 max-w-2xl text-sm text-gray-600 sm:text-base">
                        A glimpse into the quality and care behind every Zerava clean.
                    </p>
                </div>

                {/* Gallery grid */}
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
                    {galleryImages.map((src, index) => (
                        <div
                            key={index}
                            className="group relative overflow-hidden rounded-xl bg-gray-100"
                        >
                            <Image
                                src={src}
                                alt={`Zerava gallery ${index + 1}`}
                                width={400}
                                height={400}
                                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                        </div>
                    ))}
                </div>

                {/* CTA */}
                <div className="mt-12">
                    <Link
                        href="/gallery"
                        className="inline-flex items-center rounded-full border border-gray-300 px-6 py-3 text-sm font-semibold text-gray-900 hover:bg-gray-100 transition"
                    >
                        View Full Gallery
                    </Link>
                </div>
            </div>
        </section>
    );
}
