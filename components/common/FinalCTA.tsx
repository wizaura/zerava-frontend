import Link from "next/link";

type CTAButton = {
    label: string;
    href?: string;
    onClick?: () => void;
    variant?: "primary" | "secondary";
};

interface FinalCTAProps {
    title: string;
    description?: string;
    buttons?: CTAButton[];
}

export default function FinalCTA({
    title,
    description,
    buttons = [],
}: FinalCTAProps) {
    return (
        <section data-aos="fade-up" className="px-6 py-20 bg-white">
            <div className="relative mx-auto max-w-6xl overflow-hidden rounded-2xl bg-eco-black py-20">

                {/* Gradient glow */}
                <div className="pointer-events-none absolute inset-0">
                    <div className="absolute left-1/4 top-1/2 h-[600px] w-[600px] -translate-y-1/2 rounded-full bg-electric-teal/20 blur-3xl" />
                    <div className="absolute right-1/4 top-1/3 h-[500px] w-[500px] rounded-full bg-mobility-green/40 blur-3xl" />
                </div>

                {/* Content */}
                <div className="relative mx-auto max-w-4xl px-6 text-center">
                    <h2 className="text-3xl font-light leading-tight text-gray-200 sm:text-4xl md:text-5xl">
                        {title}
                    </h2>

                    {description && (
                        <p className="mx-auto mt-6 max-w-2xl text-sm text-text-secondary sm:text-base">
                            {description}
                        </p>
                    )}

                    {/* Buttons */}
                    {buttons.length > 0 && (
                        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                            {buttons.map((btn, index) => {
                                const base =
                                    "rounded-full px-8 py-3 text-sm font-semibold transition";

                                const variants = {
                                    primary:
                                        "bg-electric-teal text-eco-black hover:brightness-110 hover:text-gray-200",
                                    secondary:
                                        "border border-white text-white hover:border-electric-teal hover:text-electric-teal",
                                };

                                const className = `${base} ${variants[btn.variant || "primary"]
                                    }`;

                                if (btn.href) {
                                    return (
                                        <Link key={index} href={btn.href} className={className}>
                                            {btn.label}
                                        </Link>
                                    );
                                }

                                return (
                                    <button
                                        key={index}
                                        onClick={btn.onClick}
                                        className={className}
                                    >
                                        {btn.label}
                                    </button>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
