"use client";

import Image from "next/image";
import { useState } from "react";

type Props = {
    before: string;
    after: string;
    alt?: string;
};

export default function BeforeAfterSlider({ before, after, alt }: Props) {
    const [value, setValue] = useState(50);

    return (
        <div className="relative aspect-[15/8] w-full overflow-hidden bg-black">
            {/* After image */}
            <Image
                src={after}
                alt={`${alt ?? "after"} image`}
                fill
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover"
                priority={false}
            />

            {/* Before image (clipped) */}
            <Image
                src={before}
                alt={`${alt ?? "before"} image`}
                fill
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover"
                style={{ clipPath: `inset(0 ${100 - value}% 0 0)` }}
                priority={false}
            />

            {/* Divider line */}
            <div
                className="absolute top-0 h-full w-[2px] bg-electric-teal"
                style={{ left: `${value}%` }}
            />

            {/* Slider handle */}
            <div
                className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gray-900 p-1"
                style={{ left: `${value}%` }}
            >
                <div className="h-3 w-3 rounded-full bg-gray-600" />
            </div>

            {/* Range input */}
            <input
                type="range"
                min={0}
                max={100}
                value={value}
                onChange={(e) => setValue(Number(e.target.value))}
                className="absolute inset-0 z-20 h-full w-full cursor-ew-resize opacity-0"
                aria-label="Before and after comparison slider"
            />
        </div>
    );
}
