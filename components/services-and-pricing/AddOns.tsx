import {
    Sparkles,
    ShieldCheck,
    Wind,
    Sun,
} from "lucide-react";

const addons = [
    {
        title: "Ceramic Spray Coating",
        description: "Long-lasting protection and shine.",
        icon: ShieldCheck,
    },
    {
        title: "Leather Conditioning",
        description: "Nourish and protect leather surfaces.",
        icon: Sparkles,
    },
    {
        title: "Odour Elimination",
        description: "Deep neutralising treatment.",
        icon: Wind,
    },
    {
        title: "Headlight Restoration",
        description: "Clarity and brightness restored.",
        icon: Sun,
    },
];

export default function AddOnsSection() {
    return (
        <section className="bg-white pb-8">
            <div className="mx-auto max-w-7xl px-6">

                {/* Add-ons container */}
                <div className="rounded-xl border border-gray-200 bg-eco-black px-8 py-10">

                    {/* Heading */}
                    <div className="mb-8">
                        <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-electric-teal">
                            Optional add-ons
                        </p>
                        <h3 className="text-xl font-medium text-gray-100">
                            Enhance your clean
                        </h3>
                    </div>

                    {/* 2x2 Add-ons grid */}
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {addons.map((addon) => {
                            const Icon = addon.icon;

                            return (
                                <div
                                    key={addon.title}
                                    className="flex items-start gap-4 rounded-lg bg-mobility-green p-5 transition hover:shadow-sm hover:scale-[1.03]"
                                >
                                    {/* Icon */}
                                    <div className="flex h-9 w-9 items-center justify-center rounded-md bg-gray-100 text-eco-black">
                                        <Icon size={16} />
                                    </div>

                                    {/* Content */}
                                    <div>
                                        <p className="text-sm font-semibold text-gray-100">
                                            {addon.title}
                                        </p>
                                        <p className="mt-1 text-sm text-gray-400">
                                            {addon.description}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                </div>
            </div>
        </section>
    );
}
