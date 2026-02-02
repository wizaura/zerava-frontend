import Link from "next/link";
import { Instagram, Leaf, Mail } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

export default function Footer() {
    return (
        <footer className="relative bg-eco-black pt-20">
            <div className="mx-auto max-w-7xl px-6">

                {/* Top grid */}
                <div className="grid grid-cols-1 gap-12 md:grid-cols-4">

                    {/* Brand */}
                    <div>
                        <div className="mb-4 flex items-center gap-2">
                            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-electric-teal">
                                <Leaf size={16} className="text-eco-black" />
                            </div>
                            <span className="text-lg font-semibold text-text-secondary">
                                Zerava
                            </span>
                        </div>

                        <p className="max-w-xs text-sm leading-relaxed text-text-secondary">
                            A new era of mobility care. Premium, sustainable, convenient.
                        </p>
                    </div>

                    {/* Services */}
                    <div>
                        <h4 className="mb-4 text-xs font-semibold uppercase tracking-wider text-text-muted">
                            Services
                        </h4>
                        <ul className="space-y-3 text-sm text-text-secondary">
                            {/* <li>
                                <Link href="/services" className="transition hover:text-emerald-600">
                                    Waterless Wash
                                </Link>
                            </li>
                            <li>
                                <Link href="/services#pricing" className="transition hover:text-emerald-600">
                                    Pricing
                                </Link>
                            </li> */}
                            <li>
                                <Link href="/fleet" className="transition hover:text-emerald-600">
                                    Fleet
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h4 className="mb-4 text-xs font-semibold uppercase tracking-wider text-text-muted">
                            Company
                        </h4>
                        <ul className="space-y-3 text-sm text-text-secondary">
                            <li>
                                <Link href="/about" className="transition hover:text-emerald-600">
                                    About
                                </Link>
                            </li>
                            {/* <li>
                                <Link href="/eco-method" className="transition hover:text-emerald-600">
                                    Eco Method
                                </Link>
                            </li>
                            <li>
                                <Link href="/blog" className="transition hover:text-emerald-600">
                                    Blog
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="transition hover:text-emerald-600">
                                    Contact
                                </Link>
                            </li> */}
                        </ul>
                    </div>

                    {/* Connect */}
                    <div>
                        <h4 className="mb-4 text-xs font-semibold uppercase tracking-wider text-text-muted">
                            Connect
                        </h4>

                        <ul className="flex items-center gap-4 text-text-secondary">
                            <li>
                                <a
                                    href="/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="transition hover:text-emerald-600"
                                    aria-label="WhatsApp"
                                >
                                    <FaWhatsapp size={18} />
                                </a>
                            </li>

                            <li>
                                <a
                                    href="/"
                                    className="transition hover:text-emerald-600"
                                    aria-label="Email"
                                >
                                    <Mail size={18} />
                                </a>
                            </li>

                            <li>
                                <a
                                    href="/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="transition hover:text-emerald-600"
                                    aria-label="Instagram"
                                >
                                    <Instagram size={18} />
                                </a>
                            </li>
                        </ul>
                    </div>

                </div>

                {/* Divider */}
                <div className="mt-16 border-t border-white/10" />

                {/* Bottom bar */}
                <div className="flex flex-col items-center justify-between gap-4 py-6 text-xs text-text-muted sm:flex-row">
                    <p>© {new Date().getFullYear()} Zerava. All rights reserved.</p>

                    <div className="flex items-center gap-6">
                        <Link href="/terms" className="transition hover:text-emerald-600">
                            Terms & Conditions
                        </Link>
                        <Link href="/cookies" className="transition hover:text-emerald-600">
                            Cookie Policy
                        </Link>
                        <Link href="/privacy" className="transition hover:text-emerald-600">
                            Privacy Policy
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
