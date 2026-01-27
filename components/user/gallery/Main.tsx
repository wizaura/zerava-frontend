"use client";

import { useEffect, useState } from "react";
import { getGallery, GalleryItem } from "@/lib/user/gallery.api";
import { Sparkles } from "lucide-react";
import BeforeAfterCard from "@/components/ui/BeforeAterCard";

const filters = ["All", "Exterior", "Interior", "Full"] as const;

export default function BeforeAfterSection() {
    const [active, setActive] = useState<(typeof filters)[number]>("All");
    const [items, setItems] = useState<GalleryItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        getGallery(active)
            .then(setItems)
            .finally(() => setLoading(false));
    }, [active]);

    return (
        <section className="bg-white py-24">
            <div className="mx-auto max-w-7xl px-6 text-center">
                {/* TITLE */}
                <h2 className="text-3xl font-semibold text-gray-900">
                    Before & After
                </h2>

                {/* FILTERS */}
                <div className="mt-6 flex justify-center gap-3">
                    {filters.map((f) => (
                        <button
                            key={f}
                            onClick={() => setActive(f)}
                            className={`rounded-full px-5 py-2 text-sm font-medium transition
                ${active === f
                                    ? "bg-emerald-500 text-white"
                                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                }
              `}
                        >
                            {f}
                        </button>
                    ))}
                </div>

                {/* CONTENT */}
                <div className="mt-20">
                    {loading ? (
                        <p className="text-gray-400">Loading...</p>
                    ) : items.length === 0 ? (
                        <div className="flex flex-col items-center gap-4 text-gray-400">
                            <Sparkles className="h-10 w-10" />
                            <p className="text-sm">Gallery coming soon</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                            {items.map((item) => (
                                <BeforeAfterCard key={item.id} item={item} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
