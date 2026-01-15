import Image from "next/image";
import { CheckIcon } from "@heroicons/react/24/solid";

export default function EmployeeBenefitsSection() {
    return (
        <section className="bg-white py-20">
            <div className="mx-auto max-w-7xl px-4">
                <div className="grid grid-cols-1 items-center gap-20 lg:grid-cols-2">
                    {/* IMAGE */}
                    <div className="relative h-[420px] w-full overflow-hidden rounded-3xl">
                        <Image
                            src="/fleet-2.jfif"
                            alt="Modern workplace interior"
                            fill
                            className="object-cover translate hover:scale-[1.05]"
                            priority
                        />
                    </div>

                    {/* CONTENT */}
                    <div>
                        <p className="mb-3 text-sm font-medium uppercase tracking-wider text-electric-teal">
                            Employee Benefits
                        </p>

                        <h2 className="mb-4 text-5xl font-light text-gray-900 leading-tight">
                            Workplace car{" "} <br />
                            <span className="text-gray-400">cleaning</span>
                        </h2>

                        <p className="mb-6 max-w-xl text-base text-gray-600 leading-relaxed">
                            Offer on-site car cleaning as a premium employee benefit.
                            Staff can return to a spotless car after work, without
                            lifting a finger. A perk that truly makes a difference.
                        </p>

                        <ul className="space-y-4">
                            {[
                                "Boosts employee satisfaction",
                                "No disruption to workday",
                                "Eco-friendly office initiative",
                                "Flexible scheduling options",
                            ].map((item) => (
                                <li
                                    key={item}
                                    className="flex items-center gap-3 text-sm text-gray-700"
                                >
                                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-electric-teal">
                                        <CheckIcon className="h-4 w-4 text-white" />
                                    </span>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
}
