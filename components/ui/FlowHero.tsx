type FlowHeroProps = {
    title: string;
    subtitle?: string;
};

export default function FlowHero({
    title,
    subtitle,
}: FlowHeroProps) {
    return (
        <section className="w-full bg-black text-white pt-16 pb-6">
            <div className="mx-auto max-w-6xl px-4 py-10 text-center">
                <h1 className="text-3xl md:text-4xl font-semibold">
                    {title}
                </h1>

                {subtitle && (
                    <p className="mt-2 text-sm md:text-base text-gray-300">
                        {subtitle}
                    </p>
                )}
            </div>
        </section>
    );
}
