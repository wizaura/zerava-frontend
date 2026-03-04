"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X, User } from "lucide-react";
import { usePathname } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { useRef } from "react";
import Image from "next/image";
import { openLoginModal } from "@/store/slices/authSlice";
import PromoBanner from "./PromoBanner";

const mainNavItems = [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: "Fleet", href: "/fleet" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
];

const moreNavItems = [
    { label: "Pricing", href: "/services#pricing" },
    { label: "Our Works", href: "/gallery" },
    { label: "Eco Method", href: "/eco-method" },
    { label: "FAQs", href: "/FAQs" },
];

// Mobile keeps full list
const mobileNavItems = [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: "Fleet", href: "/fleet" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Pricing", href: "/services#pricing" },
    { label: "Our Works", href: "/gallery" },
    { label: "Eco Method", href: "/eco-method" },
    { label: "FAQs", href: "/FAQs" },
];

export default function Navbar() {
    const [open, setOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { isAuthenticated } = useSelector((s: any) => s.auth);
    const [openDropdown, setOpenDropdown] = useState(false);
    const pathname = usePathname();
    const dropdownTimeout = useRef<NodeJS.Timeout | null>(null);
    const dispatch = useDispatch();

    const isHome = pathname === "/";

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const isActive = (href: string) => {
        if (href.includes("#")) {
            return pathname === href.split("#")[0];
        }
        return pathname === href;
    };

    useEffect(() => {
        if (open) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
    }, [open]);

    return (
        <div className="mb-8">
            <div className="fixed top-0 left-0 w-full z-50">
                <PromoBanner />
            </div>
            <header
                className={`fixed top-14 z-50 w-full transition-all duration-300
    ${isHome
                        ? scrolled
                            ? "bg-white text-eco-black border-b border-black/10"
                            : "bg-transparent text-gray-300"
                        : "bg-white text-eco-black border-b border-black/10"
                    }`}
            >
                <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">

                    {/* Logo */}
                    <Link href="/" className="flex items-center">
                        <div className="relative h-8 w-[120px] sm:h-9 sm:w-[100px]">
                            <Image
                                src={
                                    isHome
                                        ? scrolled
                                            ? "/wordmark_black.svg"
                                            : "/wordmark_white.png"
                                        : "/wordmark_black.svg"
                                }
                                alt="Zerava Logo"
                                fill
                                sizes="(max-width: 640px) 120px, 140px"
                                className="object-contain transition duration-300"
                                priority
                            />
                        </div>
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden items-center gap-8 text-sm font-medium md:flex">

                        {mainNavItems.map((item) => (
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

                        {/* More Dropdown */}
                        <div
                            className="relative"
                            onMouseEnter={() => {
                                if (dropdownTimeout.current) {
                                    clearTimeout(dropdownTimeout.current);
                                }
                                setOpenDropdown(true);
                            }}
                            onMouseLeave={() => {
                                dropdownTimeout.current = setTimeout(() => {
                                    setOpenDropdown(false);
                                }, 500);
                            }}
                        >
                            <button className="flex items-center gap-1 transition hover:text-electric-teal">
                                More
                                <span className="text-xs">▾</span>
                            </button>

                            {openDropdown && (
                                <div className="absolute left-0 mt-2 w-48 rounded-xl bg-white shadow-lg border border-black/10 z-50">
                                    <div className="py-2">
                                        {moreNavItems.map((item) => (
                                            <Link
                                                key={item.label}
                                                href={item.href}
                                                className="block px-4 py-2 text-sm text-eco-black hover:bg-gray-100 transition"
                                            >
                                                {item.label}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
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
                        {isAuthenticated ? (
                            <Link
                                href="/account"
                                className={`flex items-center sm:gap-2 rounded-full px-4 py-2 text-sm font-medium transition
            ${isHome
                                        ? scrolled
                                            ? "text-eco-black hover:bg-black/5"
                                            : "text-gray-300 hover:bg-white/10"
                                        : "text-eco-black hover:bg-black/5"
                                    }`}
                            >
                                <User size={16} />
                                <span className="hidden sm:inline">Account</span>
                            </Link>
                        ) : (
                            <button
                                onClick={() => dispatch(openLoginModal())}
                                className={`flex items-center sm:gap-2 rounded-full px-4 py-2 text-sm font-medium transition
            ${isHome
                                        ? scrolled
                                            ? "text-eco-black hover:bg-black/5"
                                            : "text-gray-300 hover:bg-white/10"
                                        : "text-eco-black hover:bg-black/5"
                                    }`}
                            >
                                <User size={16} />
                                <span className="hidden sm:inline">Login</span>
                            </button>
                        )}


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
                    <div className="fixed inset-0 z-50 bg-white flex flex-col">
                        {/* Top Bar */}
                        <div className="flex items-center justify-between h-16 px-6 border-b border-black/10">
                            <Link href="/" onClick={() => setOpen(false)}>
                                <Image
                                    src="/wordmark_black.svg"
                                    alt="Zerava Logo"
                                    width={100}
                                    height={32}
                                    className="object-contain"
                                />
                            </Link>

                            <button onClick={() => setOpen(false)}>
                                <X size={22} />
                            </button>
                        </div>

                        {/* Full Screen Nav */}
                        <nav className="flex flex-col gap-6 px-6 py-10 text-lg font-medium text-eco-black">
                            {mobileNavItems.map((item) => (
                                <Link
                                    key={item.label}
                                    href={item.href}
                                    onClick={() => setOpen(false)}
                                    className="transition hover:text-electric-teal"
                                >
                                    {item.label}
                                </Link>
                            ))}
                        </nav>
                    </div>
                )}
            </header>
        </div>
    );
}