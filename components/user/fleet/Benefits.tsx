import Image from "next/image";
import { CheckIcon } from "@heroicons/react/24/solid";

export default function EmployeeBenefitsSection() {
    return (
        <section className="bg-white py-20">
            <div className="mx-auto max-w-7xl px-4">
                <div className="grid grid-cols-1 items-center gap-20 lg:grid-cols-2">

                    {/* IMAGE */}
                    <div
                        data-aos="fade-right"
                        data-aos-delay="100"
                        className="relative h-[420px] w-full overflow-hidden rounded-3xl"
                    >
                        <Image
                            src="/fleet-bf.png"
                            alt="A modern office car park at the end of the workday, with an employee walking toward their car"
                            fill
                            className="object-cover transition-transform duration-700 ease-out hover:scale-[1.05]"
                            priority
                        />
                    </div>

                    {/* CONTENT */}
                    <div>
                        <p
                            data-aos="fade-up"
                            data-aos-delay="200"
                            className="mb-3 text-sm font-medium uppercase tracking-wider text-electric-teal"
                        >
                            Employee Benefits
                        </p>

                        <h2
                            data-aos="fade-up"
                            data-aos-delay="300"
                            className="mb-4 text-5xl font-light leading-tight text-gray-900"
                        >
                            Workplace car <br />
                            <span className="text-gray-400">cleaning</span>
                        </h2>

                        <p
                            data-aos="fade-up"
                            data-aos-delay="400"
                            className="mb-6 max-w-xl text-base leading-relaxed text-gray-600"
                        >
                            Offer on-site car cleaning as a premium employee benefit.
                            Staff can return to a spotless car after work, without
                            lifting a finger. A perk that truly makes a difference.
                        </p>

                        <ul className="space-y-4">
                            {[
                                "Boosts employee satisfaction",
                                "Zero workplace disruption",
                                "Enables employee-led sustainability",
                                "Flexible scheduling options",
                            ].map((item, i) => (
                                <li
                                    key={item}
                                    data-aos="fade-up"
                                    data-aos-delay={500 + i * 100}
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
