"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { isAdminAuthenticated } from "@/lib/adminAuth";

const tabs = [
    { label: "Overview", href: "/admin" },
    { label: "Bookings", href: "/admin/bookings" },
    { label: "Pricing", href: "/admin/pricing" },
    { label: "Zones", href: "/admin/zones" },
    { label: "Slots", href: "/admin/slots" },
    { label: "Subscriptions", href: "/admin/subscriptions" },
    { label: "Gallery", href: "/admin/gallery" },
    { label: "Customers", href: "/admin/customers" },
];

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        if (!isAdminAuthenticated()) {
            router.push("/admin/login");
        }
    }, [router]);

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Top Header */}
            <header className="fixed w-full bg-black text-white">
                <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
                    <div>
                        <h1 className="text-lg font-semibold">Admin Dashboard</h1>
                        <p className="text-xs text-gray-300">
                            Manage bookings, subscriptions, and customers
                        </p>
                    </div>

                    {/* Right actions */}
                    <div className="flex items-center gap-3">
                        <Link
                            href="/admin/zones"
                            className="rounded-full bg-green-500 px-4 py-2 text-xs font-medium text-black"
                        >
                            Manage Zones
                        </Link>

                        <button
                            onClick={() => {
                                localStorage.removeItem("admin_token");
                                router.push("/admin/login");
                            }}
                            className="rounded-full border border-gray-600 px-4 py-2 text-xs"
                        >
                            Logout
                        </button>
                    </div>
                </div>

                {/* Tabs */}
                <div className="border-t border-gray-800">
                    <div className="mx-auto max-w-7xl px-6">
                        <nav className="flex gap-2 py-3">
                            {tabs.map((tab) => {
                                const active =
                                    pathname === tab.href ||
                                    (tab.href !== "/admin" &&
                                        pathname.startsWith(tab.href));

                                return (
                                    <Link
                                        key={tab.href}
                                        href={tab.href}
                                        className={[
                                            "rounded-full px-4 py-1.5 text-xs font-medium transition",
                                            active
                                                ? "bg-green-500 text-black"
                                                : "text-gray-300 hover:bg-gray-800",
                                        ].join(" ")}
                                    >
                                        {tab.label}
                                    </Link>
                                );
                            })}
                        </nav>
                    </div>
                </div>
            </header>

            {/* Page Content */}
            <main className="mx-auto max-w-7xl px-6 py-6">
                {children}
            </main>
        </div>
    );
}
