"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const navItems = [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services-and-pricing" },
    { label: "Pricing", href: "services-and-pricing#pricing" },
    { label: "Our Works", href: "#" },
    { label: "Fleet", href: "/fleet" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "#" },
];

export default function Navbar() {
    const [open, setOpen] = useState(false);

    return (
        <header className="fixed top-0 z-50 w-full bg-eco-black/70 backdrop-blur-md">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">

                {/* Logo */}
                <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-electric-teal/20">
                        <span className="font-bold text-electric-teal">Z</span>
                    </div>
                    <span className="font-semibold tracking-wide text-text-primary">
                        Zerava
                    </span>
                </div>

                {/* Desktop Nav */}
                <nav className="hidden items-center gap-8 text-sm font-medium text-text-secondary md:flex">
                    {navItems.map((item) => (
                        <Link
                            key={item.label}
                            href={item.href}
                            className="transition hover:text-text-primary"
                        >
                            {item.label}
                        </Link>
                    ))}
                </nav>

                {/* Right Actions (Desktop) */}
                <div className="hidden items-center gap-4 md:flex">
                    <Link
                        href="#"
                        className="text-sm text-text-secondary transition hover:text-text-primary"
                    >
                        Account
                    </Link>

                    <Link
                        href="/booking"
                        className="rounded-md bg-electric-teal px-4 py-2 text-sm font-semibold text-eco-black transition hover:brightness-110"
                    >
                        Book Now
                    </Link>
                </div>

                {/* Mobile Menu Button */}
                <button
                    onClick={() => setOpen(!open)}
                    className="md:hidden text-text-primary"
                    aria-label="Toggle Menu"
                >
                    {open ? <X size={22} /> : <Menu size={22} />}
                </button>
            </div>

            {/* Mobile Menu */}
            {open && (
                <div className="md:hidden border-t border-white/10 bg-eco-black/95 backdrop-blur-md">
                    <nav className="flex flex-col gap-4 px-6 py-6 text-sm font-medium text-text-secondary">
                        {navItems.map((item) => (
                            <Link
                                key={item.label}
                                href={item.href}
                                onClick={() => setOpen(false)}
                                className="transition hover:text-text-primary"
                            >
                                {item.label}
                            </Link>
                        ))}

                        <div className="mt-4 flex flex-col gap-3 border-t border-white/10 pt-4">
                            <Link
                                href="#"
                                onClick={() => setOpen(false)}
                                className="text-text-secondary transition hover:text-text-primary"
                            >
                                Account
                            </Link>

                            <Link
                                href="#"
                                onClick={() => setOpen(false)}
                                className="rounded-md bg-electric-teal px-4 py-2 text-center text-sm font-semibold text-eco-black transition hover:brightness-110"
                            >
                                Book Now
                            </Link>
                        </div>
                    </nav>
                </div>
            )}
        </header>
    );
}
