"use client";

import { useState } from "react";
import { GalleryItem } from "@/lib/user/gallery.api";
import { Star } from "lucide-react";

type Props = {
    item: GalleryItem;
};

export default function BeforeAfterCard({ item }: Props) {
    const [showBefore, setShowBefore] = useState(false);

    const imageSrc = showBefore ? item.beforeImage : item.afterImage;

    return (
        <div
            className="group relative overflow-hidden rounded-xl border bg-white"
            onMouseEnter={() => setShowBefore(true)}
            onMouseLeave={() => setShowBefore(false)}
        >
            {/* IMAGE */}
            <div className="relative">
                <img
                    src={`${process.env.NEXT_PUBLIC_API_URL}/uploads/gallery/${imageSrc}`}
                    alt={item.title}
                    className="h-56 w-full object-cover transition-all duration-300"
                />

                {/* BEFORE / AFTER BADGE */}
                <span className="absolute left-3 top-3 rounded-full bg-black/70 px-3 py-1 text-xs font-medium text-white">
                    {showBefore ? "Before" : "After"}
                </span>

                {/* FEATURED BADGE */}
                {item.featured && (
                    <span className="absolute left-3 bottom-3 flex items-center gap-1 rounded-full bg-emerald-500 px-3 py-1 text-xs font-medium text-white">
                        <Star className="h-3 w-3" />
                        Featured
                    </span>
                )}

                {/* MOBILE TOGGLE */}
                <button
                    onClick={() => setShowBefore((p) => !p)}
                    className="absolute right-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-gray-800 md:hidden"
                >
                    {showBefore ? "After" : "Before"}
                </button>
            </div>

            {/* INFO */}
            <div className="space-y-1 p-4 text-left">
                {/* Title */}
                <p className="font-medium text-gray-900">
                    {item.title}
                </p>

                {/* Vehicle type */}
                {item.vehicleType && (
                    <p className="text-xs text-gray-500">
                        {item.vehicleType}
                    </p>
                )}

                {/* Description */}
                {item.description && (
                    <p className="mt-1 line-clamp-2 text-sm text-gray-600">
                        {item.description}
                    </p>
                )}

                {/* Service type */}
                <p className="mt-2 inline-block rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
                    {item.serviceType}
                </p>
            </div>
        </div>
    );
}
