import Link from "next/link";
import { Leaf } from "lucide-react";

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
                            <span className="text-lg font-semibold text-text-primary">
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
                            <li>
                                <Link href="/services-and-pricing" className="hover:text-text-primary transition">
                                    Waterless Wash
                                </Link>
                            </li>
                            <li>
                                <Link href="/services-and-pricing#pricing" className="hover:text-text-primary transition">
                                    Pricing
                                </Link>
                            </li>
                            <li>
                                <Link href="/fleet" className="hover:text-text-primary transition">
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
                                <Link href="/about" className="hover:text-text-primary transition">
                                    About
                                </Link>
                            </li>
                            <li>
                                <Link href="/eco-method" className="hover:text-text-primary transition">
                                    Eco Method
                                </Link>
                            </li>
                            <li>
                                <Link href="/blog" className="hover:text-text-primary transition">
                                    Blog
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="hover:text-text-primary transition">
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Connect */}
                    <div>
                        <h4 className="mb-4 text-xs font-semibold uppercase tracking-wider text-text-muted">
                            Connect
                        </h4>
                        <ul className="space-y-3 text-sm text-text-secondary">
                            <li>
                                <a href="#" className="hover:text-text-primary transition">
                                    WhatsApp
                                </a>
                            </li>
                            <li>
                                <a href="mailto:hello@zerava.co" className="hover:text-text-primary transition">
                                    Email
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-text-primary transition">
                                    Instagram
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
                        <Link href="/terms" className="hover:text-text-primary transition">
                            Terms & Conditions
                        </Link>
                        <Link href="/cookies" className="hover:text-text-primary transition">
                            Cookie Policy
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
