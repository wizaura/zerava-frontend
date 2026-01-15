export default function FleetStatsSection() {
    const stats = [
        {
            value: "50+",
            label: "Fleet partners",
        },
        {
            value: "2000+",
            label: "Vehicles monthly",
        },
        {
            value: "300K",
            label: "Litres saved",
        },
        {
            value: "98%",
            label: "Satisfaction rate",
        },
    ];

    return (
        <section className="bg-mobility-green px-6 py-14">
            <div className="mx-auto max-w-6xl">

                <div className="grid grid-cols-2 gap-y-12 text-center sm:grid-cols-4">
                    {stats.map((stat, index) => (
                        <div key={index}>
                            <p className="text-3xl font-light text-white sm:text-4xl md:text-5xl">
                                {stat.value}
                            </p>
                            <p className="mt-2 text-xs uppercase tracking-wider text-gray-400">
                                {stat.label}
                            </p>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}
