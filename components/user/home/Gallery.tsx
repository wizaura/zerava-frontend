"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Sparkles, ArrowRightLeft } from "lucide-react";
import { getGallery, GalleryItem } from "@/lib/user/gallery.api";

export default function GalleryPreview() {
    const [items, setItems] = useState<GalleryItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getGallery("All")
            .then((data) => setItems(data.slice(0, 5)))
            .finally(() => setLoading(false));
    }, []);

    console.log(items, 'items');

    const hasImages = items.length > 0;

    return (
        <section className="bg-white py-20">
            <div className="mx-auto max-w-7xl px-6 text-center">
                {/* Heading */}
                <div className="mb-14">
                    <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-emerald-500">
                        Our Work
                    </p>

                    <h2 className="text-3xl font-light text-gray-900 sm:text-5xl">
                        Clean results you can see
                    </h2>

                    <p className="mx-auto mt-4 max-w-2xl text-sm text-gray-600 sm:text-base">
                        A glimpse into the quality and care behind every Zerava clean.
                    </p>
                </div>

                {/* Loading */}
                {loading && (
                    <p className="text-sm text-gray-400">Loading gallery…</p>
                )}

                {/* Empty State */}
                {!loading && !hasImages && (
                    <div className="flex flex-col items-center gap-4 py-16 text-gray-400">
                        <Sparkles className="h-10 w-10" />
                        <p className="text-sm">Gallery coming soon</p>

                        <Link
                            href="/gallery"
                            className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-emerald-600 hover:underline"
                        >
                            Visit full gallery
                        </Link>
                    </div>
                )}

                {/* Gallery Grid */}
                {!loading && hasImages && (
                    <>
                        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
                            {items.slice(0, 5).map((item) => (
                                <div
                                    key={item.id}
                                    className="group relative aspect-square overflow-hidden rounded-xl bg-gray-100
               transition-all hover:-translate-y-1 hover:shadow-lg"
                                >
                                    {/* After image */}
                                    <img
                                        src={`${process.env.NEXT_PUBLIC_API_URL}/uploads/gallery/${item.afterImage}`}
                                        alt="After clean"
                                        className="object-cover transition-opacity duration-500 group-hover:opacity-0"
                                    />

                                    {/* Before image */}
                                    <img
                                        src={`${process.env.NEXT_PUBLIC_API_URL}/uploads/gallery/${item.beforeImage}`}
                                        alt="Before clean"
                                        className="object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                                    />

                                    {/* Hover overlay */}
                                    <div
                                        className="pointer-events-none absolute inset-0 flex items-center justify-center
                   bg-black/40 opacity-0 transition-opacity duration-300
                   group-hover:opacity-100"
                                    >
                                        <div className="flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-sm font-medium text-gray-900">
                                            <ArrowRightLeft size={16} />
                                            Before / After
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* CTA */}
                        <div className="mt-12">
                            <Link
                                href="/gallery"
                                className="inline-flex items-center gap-2 rounded-full border border-gray-300
                                           px-6 py-3 text-sm font-semibold text-gray-900
                                           transition-all hover:bg-gray-100 hover:scale-105"
                            >
                                View Full Gallery
                            </Link>
                        </div>
                    </>
                )}
            </div>
        </section>
    );
}
