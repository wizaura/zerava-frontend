import {
    BuildingOffice2Icon,
    TruckIcon,
    ShieldCheckIcon,
    UserGroupIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";

const cardsLeft = [
    {
        title: "Small Businesses",
        desc: "Keep your company vehicles looking professional without the hassle. We handle everything on-site, so you can focus on running your business.",
        icon: BuildingOffice2Icon,
    },
    {
        title: "Logistics & Delivery",
        desc: "Keep delivery fleets spotless with regular cleaning schedules that work around your operations — vehicles stay on the road, revenue keeps flowing.",
        icon: TruckIcon,
    },
];

const cardsRight = [
    {
        title: "Public & Healthcare",
        desc: "Supporting NHS trusts, councils, and essential services while meeting sustainability targets and simplifying procurement.",
        icon: UserGroupIcon,
    },
    {
        title: "Corporate Offices",
        desc: "Turn your employee car park into a premium workplace benefit. Staff cars cleaned during the workday — a perk that actually gets used.",
        icon: ShieldCheckIcon,
    },
];

function Card({
    title,
    desc,
    icon: Icon,
    delay = 0,
}: {
    title: string;
    desc: string;
    icon: React.ElementType;
    delay?: number;
}) {
    return (
        <div
            data-aos="fade-up"
            data-aos-delay={delay}
            className="rounded-2xl bg-gray-50 p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:scale-[1.03] hover:bg-gray-100"
        >
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-eco-black">
                <Icon className="h-6 w-6 text-white" />
            </div>

            <h3 className="mb-2 text-lg font-medium text-gray-900">
                {title}
            </h3>
            <p className="text-sm leading-relaxed text-gray-600">
                {desc}
            </p>
        </div>
    );
}

export default function WhoWeServeSection() {
    return (
        <section className="bg-white py-20">
            <div className="mx-auto max-w-6xl px-4">

                {/* Header */}
                <div
                    data-aos="fade-up"
                    data-aos-delay="100"
                    className="mb-20 text-center"
                >
                    <p className="mb-3 text-sm font-medium uppercase tracking-wider text-electric-teal">
                        Who we serve
                    </p>

                    <h2 className="text-4xl font-light text-gray-900">
                        Fleet solutions that scale with you
                    </h2>

                    <p className="mx-auto mt-4 max-w-2xl text-gray-500">
                        From small teams to enterprise operations, we adapt to your needs.
                        Our flexible service starts from just <strong>3 vehicles</strong> and
                        grows with your business.
                    </p>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-3">

                    {/* Left cards */}
                    <div className="space-y-8">
                        {cardsLeft.map((card, i) => (
                            <Card
                                key={card.title}
                                {...card}
                                delay={200 + i * 120}
                            />
                        ))}
                    </div>

                    {/* Center Image */}
                    <div
                        data-aos="zoom-in"
                        data-aos-delay="300"
                        className="flex justify-center"
                    >
                        <div className="relative h-[420px] w-[300px] overflow-hidden rounded-3xl">
                            <Image
                                src="/about-1.jpg"
                                alt="On-site fleet vehicle care in a modern urban setting"
                                fill
                                className="object-cover transition-transform duration-700 ease-out hover:scale-[1.10]"
                            />
                        </div>
                    </div>

                    {/* Right cards */}
                    <div className="space-y-8">
                        {cardsRight.map((card, i) => (
                            <Card
                                key={card.title}
                                {...card}
                                delay={400 + i * 120}
                            />
                        ))}
                    </div>

                </div>
            </div>
        </section>
    );
}
