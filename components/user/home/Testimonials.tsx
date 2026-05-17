"use client";

import { Star, Quote } from "lucide-react";

const reviewData = [
    {
        author_name: "Anthony Wilkinson",
        rating: 5,
        text: `Excellent job
Nice and shiny
Good workmanship and pleasant staff`,
    },
    {
        author_name: "David Bailey",
        rating: 5,
        text: `I received a quality flier and went through an easy booking process. The guys turned up on time and completed a very good value for money clean inside and out. Their service is really convenient for me and anyone else as they are not dependent on water and electricity points being available.`,
    },
    {
        author_name: "Sherin Joji",
        rating: 5,
        text: `Honestly so convenient. I work in the NHS and barely get time. I just booked Zerava and they came home and did everything. Didn’t have to move the car. Really recommend.`,
    },
    {
        author_name: "Julia Newman",
        rating: 5,
        text: `Fantastic service - punctual, friendly, brilliant attention to detail and all at a fair price! Highly recommended and will use again!`,
    }
];

export default function TestimonialsSection() {

    return (
        <section className="bg-white px-6 py-24">

            <div className="mx-auto max-w-7xl">

                <div className="mb-4 sm:mb-8 flex flex-col space-y-4 md:space-y-0 sm:flex-row items-center justify-between">

                    <div>

                        <p className="text-sm font-semibold uppercase tracking-wider text-electric-teal">
                            Testimonials
                        </p>

                        <h2
                            data-aos="fade-up"
                            data-aos-delay="100"
                            className="text-4xl font-light text-gray-800 sm:text-5xl"
                        >
                            Loved by our customers
                        </h2>

                    </div>

                    <a
                        href="https://maps.app.goo.gl/awWpiPDCy4qJfGpv9?g_st=ic"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="
            flex md:inline-flex ml-auto
            items-center gap-2
            rounded-full border border-gray-200
            bg-white px-5 py-2.5
            text-sm font-medium text-gray-700
            transition-all duration-300
            hover:border-electric-teal
            hover:text-electric-teal
            hover:shadow-md
        "
                    >

                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 48 48"
                            className="h-4 w-4"
                        >
                            <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.3 36 24 36c-6.6 0-12-5.4-12-12S17.4 12 24 12c3 0 5.7 1.1 7.8 3l5.7-5.7C34.1 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.7-.4-3.5z" />
                            <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 16 19 12 24 12c3 0 5.7 1.1 7.8 3l5.7-5.7C34.1 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" />
                            <path fill="#4CAF50" d="M24 44c5.2 0 10-2 13.5-5.3l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.3 0-9.7-3.3-11.3-8H6.5v5.5C9.8 39.7 16.4 44 24 44z" />
                            <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-1.1 3.1-3.3 5.5-6.2 7.1l6.2 5.2C39.7 36.7 44 31 44 24c0-1.3-.1-2.7-.4-3.5z" />
                        </svg>

                        View on Google

                    </a>

                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 items-stretch">

                    {reviewData.slice(0, 4).map((item, i) => (

                        <div
                            key={i}
                            className="
        relative flex h-full flex-col
        rounded-3xl border border-gray-100
        bg-white p-7
        shadow-md transition-all duration-300
        hover:-translate-y-2
        hover:shadow-2xl
    "
                        >

                            {/* TOP */}

                            <div className="mb-5 flex items-start justify-between">

                                {/* LEFT */}

                                <div className="flex items-center gap-3">

                                    {/* Avatar */}

                                    <div
                                        className="
                    flex h-11 w-11
                    items-center justify-center
                    rounded-full
                    bg-electric-teal
                    text-sm font-semibold
                    text-white
                "
                                    >
                                        {item.author_name.charAt(0)}
                                    </div>

                                    {/* Name + Meta */}

                                    <div>

                                        <p className="text-sm font-semibold text-gray-900">
                                            {item.author_name}
                                        </p>

                                        <div className="mt-0.5 flex items-center gap-1">

                                            {/* Google Icon */}

                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 48 48"
                                                className="h-4 w-4"
                                            >
                                                <path
                                                    fill="#FFC107"
                                                    d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.3 36 24 36c-6.6 0-12-5.4-12-12S17.4 12 24 12c3 0 5.7 1.1 7.8 3l5.7-5.7C34.1 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.7-.4-3.5z"
                                                />
                                                <path
                                                    fill="#FF3D00"
                                                    d="M6.3 14.7l6.6 4.8C14.7 16 19 12 24 12c3 0 5.7 1.1 7.8 3l5.7-5.7C34.1 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"
                                                />
                                                <path
                                                    fill="#4CAF50"
                                                    d="M24 44c5.2 0 10-2 13.5-5.3l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.3 0-9.7-3.3-11.3-8H6.5v5.5C9.8 39.7 16.4 44 24 44z"
                                                />
                                                <path
                                                    fill="#1976D2"
                                                    d="M43.6 20.5H42V20H24v8h11.3c-1.1 3.1-3.3 5.5-6.2 7.1l6.2 5.2C39.7 36.7 44 31 44 24c0-1.3-.1-2.7-.4-3.5z"
                                                />
                                            </svg>

                                            <span className="text-xs text-gray-500">
                                                Google Review
                                            </span>

                                        </div>

                                    </div>

                                </div>

                                {/* Quote */}

                                <div
                                    className="
                flex h-10 w-10
                items-center justify-center
                rounded-2xl
                bg-gray-100
            "
                                >
                                    <Quote className="h-5 w-5 text-gray-400" />
                                </div>

                            </div>

                            {/* STARS + TIME */}

                            <div className="mb-5 flex items-center gap-2">

                                <div className="flex gap-0.5 text-[#fbbc04]">

                                    {Array.from({ length: item.rating }).map((_, i) => (

                                        <Star
                                            key={i}
                                            size={15}
                                            fill="currentColor"
                                            strokeWidth={1.5}
                                        />

                                    ))}

                                </div>

                                <span className="text-xs text-gray-400">
                                    • 1 month ago
                                </span>

                            </div>

                            {/* Review text */}

                            <p
                                className="
            flex-1 whitespace-pre-line
            text-[15px] leading-[1.9]
            text-gray-700
        "
                            >
                                {item.text}
                            </p>

                        </div>

                    ))}

                </div>

            </div>

        </section>
    );
}