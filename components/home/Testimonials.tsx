import { Quote, Star } from "lucide-react";

export default function TestimonialsSection() {
    const testimonials = [
        {
            name: "James Cooper",
            role: "Fleet Manager, TechCorp",
            content:
                "We switched our entire company fleet to Zerava and couldn't be happier. The convenience of on-site cleaning saves our team hours each week, and the cost savings from their corporate plan are significant. Highly recommended for any business.",
        },
        {
            name: "Sarah Williams",
            role: "Private Customer",
            content:
                "Zerava transformed my weekly car care routine. No more driving to the car wash — they come to my office! The waterless method is brilliant, and my BMW looks incredible.",
        },
        {
            name: "Emma Richardson",
            role: "NHS Worker",
            content:
                "As an NHS worker with long shifts, finding time for car maintenance was impossible. Zerava’s service is perfect — they clean my car while I'm at work.",
        },
    ];

    return (
        <section className="bg-white px-6 py-20">
            <div className="mx-auto max-w-6xl">

                {/* Header */}
                <div className="mb-16 text-center">
                    <p className="mb-3 text-xs font-semibold tracking-widest text-electric-teal">
                        TESTIMONIALS
                    </p>
                    <h2 className="mb-6 text-3xl font-light text-eco-black sm:text-4xl">
                        Loved by thousands across Southampton
                    </h2>
                    <p className="mx-auto max-w-xl text-sm text-gray-500 sm:text-base">
                        Don't just take our word for it – hear what our customers
                        have to say about their Zerava experience.
                    </p>
                </div>

                {/* Cards */}
                <div className="grid gap-10 md:grid-cols-3">
                    {testimonials.map((item, index) => (
                        <div
                            key={index}
                            className="relative rounded-3xl bg-white px-8 pb-8 pt-12 shadow-lg transition hover:shadow-3xl hover:scale-[1.03]"
                        >
                            {/* Floating quote */}
                            <div className="absolute -top-5 left-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-electric-teal shadow-xl rotate-6">
                                <Quote className="h-6 w-6 text-white" />
                            </div>

                            {/* Stars */}
                            <div className="mb-5 flex gap-1 text-electric-teal">
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <Star key={i} size={14} fill="currentColor" />
                                ))}
                            </div>

                            {/* Content */}
                            <p className="mb-8 text-sm leading-relaxed text-gray-600">
                                “{item.content}”
                            </p>

                            {/* Divider */}
                            <div className="mb-4 h-px w-full bg-gray-100" />

                            {/* Footer */}
                            <div className="flex items-center gap-3">
                                {/* Avatar placeholder */}
                                <div className="h-10 w-10 rounded-full bg-gray-200" />

                                <div>
                                    <p className="text-sm font-semibold text-eco-black">
                                        {item.name}
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        {item.role}
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
