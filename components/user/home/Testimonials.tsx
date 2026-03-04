

"use client";

import { useEffect, useState } from "react";
import { Quote, Star } from "lucide-react";
import Image from "next/image";

export default function TestimonialsSection() {
    const [reviews, setReviews] = useState<any[]>([]);

    useEffect(() => {
        fetch("/settings/google-reviews")
            .then((res) => res.json())
            .then((data) => setReviews(data));
    }, []);

    return (
        <section className="bg-white px-6 py-24">
            <div className="mx-auto max-w-6xl">

                {/* Header remains same */}

                <div className="grid gap-10 md:grid-cols-3">
                    {reviews.slice(0, 3).map((item, i) => (
                        <div
                            key={i}
                            className="relative rounded-3xl bg-white px-8 pb-8 pt-12
              shadow-lg transition-all duration-300
              hover:-translate-y-2 hover:scale-[1.04] hover:shadow-2xl"
                        >
                            {/* Quote icon */}
                            <div className="absolute -top-5 left-6 flex h-12 w-12
                items-center justify-center rounded-2xl
                bg-electric-teal shadow-xl rotate-6"
                            >
                                <Quote className="h-6 w-6 text-white" />
                            </div>

                            {/* Stars */}
                            <div className="mb-5 flex gap-1 text-electric-teal">
                                {Array.from({ length: item.rating }).map((_, i) => (
                                    <Star key={i} size={14} fill="currentColor" />
                                ))}
                            </div>

                            <p className="mb-8 text-sm leading-relaxed text-gray-600">
                                “{item.text}”
                            </p>

                            <div className="mb-4 h-px w-full bg-gray-100" />

                            <div className="flex items-center gap-3">
                                <div className="relative h-10 w-10 overflow-hidden rounded-full">
                                    <Image
                                        src={item.profile_photo_url}
                                        alt={item.author_name}
                                        fill
                                        className="object-cover"
                                    />
                                </div>

                                <div>
                                    <p className="text-sm font-semibold text-eco-black">
                                        {item.author_name}
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        Google Review
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}