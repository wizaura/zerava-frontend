import Link from "next/link";
import Image from "next/image";
import { Instagram, Linkedin, Mail, MailIcon, MapPin } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

export default function Footer() {
    return (
        <footer className="bg-eco-black pt-20 text-text-secondary">
            <div className="mx-auto max-w-7xl px-6">

                <div className="grid grid-cols-1 gap-12 md:grid-cols-4">

                    {/* BRAND + ECOLOGI */}
                    <div className="space-y-6">

                        {/* Logo */}
                        <Link href="/" className="flex items-center">
                            <div className="relative h-8 w-[110px] sm:h-9 sm:w-[160px]">
                                <Image
                                    src={ "/wordmark_white.png"}
                                    alt="Zerava Logo"
                                    fill
                                    className="object-contain transition duration-300"
                                    priority
                                />
                            </div>
                        </Link>

                        <p className="text-sm text-text-muted max-w-xs">
                            A new era of mobility care. Premium, sustainable, convenient.
                        </p>

                        {/* ECOLOGI BADGE */}
                        <div className="pt-2 flex items-center gap-3">
                            <Image
                                src="/ecologi-2.png"
                                alt="Ecologi Climate Positive"
                                width={72}
                                height={36}
                                className="bg-black h-12 w-auto rounded-full"
                            />

                            <p className="text-sm text-text-muted leading-tight">
                                Supporting climate <br /> projects via Ecologi.
                            </p>
                        </div>
                    </div>

                    {/* SERVICES */}
                    <div>
                        <h4 className="mb-4 text-xs font-semibold uppercase tracking-wider text-text-muted">
                            Services
                        </h4>

                        <ul className="space-y-3 text-sm">

                            <li className="hover:text-emerald-500">
                                <Link href="/services">
                                    Waterless Wash
                                </Link>
                            </li>

                            <li className="hover:text-emerald-500">
                                <Link href="/services#pricing">
                                    Pricing
                                </Link>
                            </li>

                            <li className="hover:text-emerald-500">
                                <Link href="/fleet">
                                    Fleet
                                </Link>
                            </li>

                        </ul>
                    </div>

                    {/* COMPANY */}
                    <div>
                        <h4 className="mb-4 text-xs font-semibold uppercase tracking-wider text-text-muted">
                            Company
                        </h4>

                        <ul className="space-y-3 text-sm">

                            <li className="hover:text-emerald-500">
                                <Link href="/about">
                                    About
                                </Link>
                            </li>

                            <li className="hover:text-emerald-500">
                                <Link href="/eco-method">
                                    Eco Method
                                </Link>
                            </li>

                            <li className="hover:text-emerald-500">
                                <Link href="/FAQs">
                                    FAQs
                                </Link>
                            </li>

                            <li className="hover:text-emerald-500">
                                <Link href="/contact">
                                    Contact
                                </Link>
                            </li>

                        </ul>
                    </div>

                    {/* CONTACT + SOCIAL */}
                    <div>
                        <h4 className="mb-4 text-xs font-semibold uppercase tracking-wider text-text-muted">
                            Connect
                        </h4>

                        <ul className="space-y-3 text-sm">

                            <li className="flex items-center gap-2 hover:text-emerald-500">
                                <MailIcon size={14} />
                                <a href="mailto:info@zerava.uk">
                                    <span>info@zerava.uk</span>
                                </a>
                            </li>

                            <li className="flex items-center gap-2 hover:text-emerald-500">
                                <MapPin size={14} />
                                <span>Southampton, UK</span>
                            </li>


                        </ul>

                        {/* SOCIAL ICONS */}
                        <div className="flex gap-4 pt-5">

                            <a
                                href="https://wa.me/447000000000"
                                className="hover:text-emerald-500"
                            >
                                <FaWhatsapp size={18} />
                            </a>

                            <a
                                href="mailto:info@zerava.uk"
                                className="hover:text-emerald-500"
                            >
                                <Mail size={18} />
                            </a>

                            <a
                                href="https://www.instagram.com/zerava.uk"
                                className="hover:text-emerald-500"
                            >
                                <Instagram size={18} />
                            </a>

                            <a
                                href="https://www.linkedin.com/company/zerava"
                                className="hover:text-emerald-500"
                            >
                                <Linkedin size={18} />
                            </a>

                        </div>
                    </div>

                </div>

                {/* Divider */}
                <div className="mt-16 border-t border-white/10" />

                {/* Bottom */}
                <div className="flex flex-col items-center justify-between gap-4 py-6 text-xs text-text-muted sm:flex-row">

                    <p>
                        © {new Date().getFullYear()} Zerava. All rights reserved.
                    </p>

                    <div className="flex gap-6">

                        <Link href="/terms">
                            Terms & Conditions
                        </Link>

                        <Link href="/cookies">
                            Cookie Policy
                        </Link>

                        <Link href="/privacy">
                            Privacy Policy
                        </Link>

                    </div>

                </div>

            </div>
        </footer>
    );
}