"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X, User } from "lucide-react";
import { usePathname } from "next/navigation";

const navItems = [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: "Pricing", href: "/services#pricing" },
    { label: "Our Works", href: "#" },
    { label: "Fleet", href: "/fleet" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "#" },
];

export default function Navbar() {
    const [open, setOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const isActive = (href: string) => {
        if (href.includes("#")) {
            return pathname + "#pricing" === href;
        }
        return pathname === href;
    };

    return (
        <header
            className={`fixed top-0 z-50 w-full transition-all duration-300
        ${scrolled
                    ? "bg-white text-eco-black border-b border-black/10"
                    : "bg-transparent text-gray-300"
                }`}
        >
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-electric-teal/20">
                        <span className="font-bold text-electric-teal">Z</span>
                    </div>
                    <span className="font-semibold tracking-wide">Zerava</span>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden items-center gap-8 text-sm font-medium md:flex">
                    {navItems.map((item) => (
                        <Link
                            key={item.label}
                            href={item.href}
                            className={`transition ${isActive(item.href)
                                ? "text-electric-teal"
                                : "hover:text-electric-teal"
                                }`}
                        >
                            {item.label}
                        </Link>
                    ))}
                </nav>

                {/* Right Actions */}
                <div className="flex items-center gap-1 sm:gap-3">
                    {/* Book Now */}
                    <Link
                        href="/booking"
                        className="rounded-full bg-electric-teal px-5 py-2 text-sm font-semibold text-eco-black transition hover:brightness-110"
                    >
                        Book Now
                    </Link>

                    {/* Account */}
                    <Link
                        href="/account"
                        className={`flex items-center sm:gap-2 rounded-full px-4 py-2 text-sm font-medium transition
    ${scrolled
                                ? "text-eco-black hover:bg-black/5"
                                : "text-gray-300 hover:bg-white/10"
                            }`}
                    >
                        <User size={16} />

                        {/* Text hidden on small screens */}
                        <span className="hidden sm:inline">
                            Account
                        </span>
                    </Link>

                    {/* Mobile Menu Toggle */}
                    <button
                        onClick={() => setOpen(!open)}
                        className="md:hidden"
                        aria-label="Toggle Menu"
                    >
                        {open ? <X size={22} /> : <Menu size={22} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {open && (
                <div className="md:hidden bg-white border-t border-black/10">
                    <nav className="flex flex-col gap-4 px-6 py-6 text-sm font-medium text-eco-black">
                        {navItems.map((item) => (
                            <Link
                                key={item.label}
                                href={item.href}
                                onClick={() => setOpen(false)}
                                className={`transition ${isActive(item.href)
                                    ? "text-electric-teal"
                                    : "hover:text-electric-teal"
                                    }`}
                            >
                                {item.label}
                            </Link>
                        ))}
                    </nav>
                </div>
            )}
        </header>
    );
}
