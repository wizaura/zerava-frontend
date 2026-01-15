import {
    BuildingOffice2Icon,
    TruckIcon,
    ShieldCheckIcon,
    UserGroupIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";

const cardsLeft = [
    {
        title: "NHS & Healthcare",
        desc: "Keep patient transport and emergency vehicles pristine while meeting sustainability targets.",
        icon: BuildingOffice2Icon,
    },
    {
        title: "Logistics & Delivery",
        desc: "Regular cleaning for delivery fleets without disrupting operations.",
        icon: TruckIcon,
    },
];

const cardsRight = [
    {
        title: "Local Councils",
        desc: "Eco-friendly fleet maintenance that supports your environmental commitments.",
        icon: UserGroupIcon,
    },
    {
        title: "Corporate Campuses",
        desc: "On-site car washing as a premium employee benefit.",
        icon: ShieldCheckIcon,
    },
];

function Card({
    title,
    desc,
    icon: Icon,
}: {
    title: string;
    desc: string;
    icon: React.ElementType;
}) {
    return (
        <div className="rounded-2xl bg-gray-50 hover:bg-gray-100 p-6 shadow-sm translate hover:scale-[1.03]">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-black">
                <Icon className="h-6 w-6 text-white" />
            </div>

            <h3 className="mb-2 text-lg font-medium text-gray-900">
                {title}
            </h3>
            <p className="text-sm text-gray-600">{desc}</p>
        </div>
    );
}

export default function WhoWeServeSection() {
    return (
        <section className="bg-white py-20">
            <div className="mx-auto max-w-6xl px-4">
                {/* Header */}
                <div className="mb-20 text-center">
                    <p className="mb-3 text-sm font-medium uppercase tracking-wider text-electric-teal">
                        Who we serve
                    </p>

                    <h2 className="text-4xl font-light text-gray-900">
                        Trusted by leading organisations
                    </h2>

                    <p className="mx-auto mt-4 max-w-2xl text-gray-500">
                        From emergency services to corporate campuses, we deliver
                        reliable, eco-friendly fleet care.
                    </p>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-3">
                    {/* Left cards */}
                    <div className="space-y-8">
                        {cardsLeft.map((card) => (
                            <Card key={card.title} {...card} />
                        ))}
                    </div>

                    {/* Center Image */}
                    <div className="flex justify-center">
                        <div className="relative h-[420px] w-[300px] overflow-hidden rounded-3xl">
                            <Image
                                src="/about-1.jpg"
                                alt="Fleet services"
                                fill
                                className="object-cover hover:translate hover:scale-[1.10]"
                            />
                        </div>
                    </div>

                    {/* Right cards */}
                    <div className="space-y-8">
                        {cardsRight.map((card) => (
                            <Card key={card.title} {...card} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
