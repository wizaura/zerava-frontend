type HeroButton = {
    label: string;
    href?: string;
    onClick?: () => void;
    variant?: "primary" | "secondary";
};

interface PageHeroProps {
    badge?: string;
    title: string;
    highlight?: string;
    description?: string;
    buttons?: HeroButton[];
}

export default function PageHero({
    badge,
    title,
    highlight,
    description,
    buttons = [],
}: PageHeroProps) {
    return (
        <section className="bg-eco-black py-20 pt-24">
            <div className="mx-auto max-w-5xl px-6 text-center">

                {/* Badge */}
                {badge && (
                    <p
                        data-aos="fade-down"
                        data-aos-delay="100"
                        className="my-4 inline-flex rounded-full border border-electric-teal/30 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-electric-teal"
                    >
                        {badge}
                    </p>
                )}

                {/* Heading */}
                <h1
                    data-aos="fade-up"
                    data-aos-delay="200"
                    className="text-4xl font-light leading-tight text-gray-100 sm:text-5xl md:text-6xl"
                >
                    {title}
                    {highlight && (
                        <>
                            <br />
                            <span
                                data-aos="fade-up"
                                data-aos-delay="300"
                                className="font-normal text-electric-teal"
                            >
                                {highlight}
                            </span>
                        </>
                    )}
                </h1>

                {/* Description */}
                {description && (
                    <p
                        data-aos="fade-up"
                        data-aos-delay="400"
                        className="mx-auto mt-6 max-w-2xl text-sm text-gray-400 sm:text-base"
                    >
                        {description}
                    </p>
                )}

                {/* Buttons */}
                {buttons.length > 0 && (
                    <div
                        data-aos="fade-up"
                        data-aos-delay="500"
                        className="mt-10 flex flex-wrap justify-center gap-4"
                    >
                        {buttons.map((btn, index) => {
                            const base =
                                "rounded-full px-6 py-3 text-sm font-medium transition-all duration-300";

                            const variants = {
                                primary:
                                    "bg-electric-teal text-eco-black hover:bg-electric-teal/90 hover:scale-[1.03]",
                                secondary:
                                    "border border-gray-600 text-gray-200 hover:border-electric-teal hover:text-electric-teal hover:scale-[1.03]",
                            };

                            const className = `${base} ${variants[btn.variant || "primary"]}`;

                            return btn.href ? (
                                <a
                                    key={index}
                                    href={btn.href}
                                    className={className}
                                >
                                    {btn.label}
                                </a>
                            ) : (
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
        </section>
    );
}
