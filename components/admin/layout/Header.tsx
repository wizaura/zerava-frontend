"use client";

import Link from "next/link";
import ZonesModal from "../zones/ZonesModal";
import { isAdminAuthenticated } from "@/lib/adminAuth";
import { useAdminUI } from "@/lib/AdminUIContext";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import {
    LayoutGrid,
    BarChart3,
    CalendarDays,
    ClipboardList,
    CreditCard,
    Image,
    Users,
    Ban,
    UserCog,
    Package,
} from "lucide-react";

const tabs = [
    { label: "Overview", href: "/admin", icon: LayoutGrid },
    { label: "Analytics", href: "/admin/analytics", icon: BarChart3 },
    { label: "Calendar", href: "/admin/calendar", icon: CalendarDays },
    { label: "Bookings", href: "/admin/bookings", icon: ClipboardList },
    { label: "Services", href: "/admin/services", icon: Package },
    { label: "Subscriptions", href: "/admin/subscriptions", icon: CreditCard },
    { label: "Gallery", href: "/admin/gallery", icon: Image },
    { label: "Customers", href: "/admin/customers", icon: Users },
    { label: "Block Slots", href: "/admin/block-slots", icon: Ban },
    { label: "Operator Slots", href: "/admin/slots", icon: UserCog },
];

export default function AdminHeader() {
    const router = useRouter();
    const pathname = usePathname();
    const { openZones } = useAdminUI();

    useEffect(() => {
        (async () => {
            const ok = await isAdminAuthenticated();
            if (!ok) router.push("/admin/login");
        })();
    }, [router]);

    return (
        <>
            <header className="w-full">
                {/* ===== MAIN HEADER ===== */}
                <div className="px-6 py-8 bg-eco-black text-white">
                    <div className="mx-auto max-w-7xl flex flex-col md:flex-row md:justify-between gap-6">
                        {/* Title Section */}
                        <div>
                            <h1 className="text-3xl font-light pb-2">
                                Admin Dashboard
                            </h1>
                            <p className="text-md text-gray-400">
                                Manage bookings, subscriptions, and customers
                            </p>
                        </div>

                        {/* Buttons BELOW text */}
                        <div className="flex flex-wrap items-center gap-3">
                            <button
                                onClick={openZones}
                                className="rounded-full bg-emerald-500 px-5 py-2 text-sm font-semibold text-black hover:brightness-110 transition"
                            >
                                Manage Zones
                            </button>

                            <button
                                onClick={() => {
                                    localStorage.removeItem("admin_token");
                                    router.push("/admin/login");
                                }}
                                className="rounded-full border border-gray-600 px-4 py-2 text-sm hover:bg-gray-800 transition"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </div>

                {/* ===== TAB BAR ===== */}
                <div className="px-4 py-2">
                    <div className="mx-auto max-w-7xl border border-gray-100 bg-white rounded-full  px-6 py-3 overflow-x-auto no-scrollbar">
                        <div className="flex items-center gap-2 whitespace-nowrap min-w-max">
                            {tabs.map((tab) => {
                                const active =
                                    tab.href === "/admin"
                                        ? pathname === "/admin"
                                        : pathname === tab.href ||
                                          pathname.startsWith(`${tab.href}/`);

                                const Icon = tab.icon;

                                return (
                                    <Link
                                        key={tab.href}
                                        href={tab.href}
                                        className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all
                                            ${
                                                active
                                                    ? "bg-emerald-500 text-black shadow-sm"
                                                    : "text-gray-600 hover:bg-gray-100"
                                            }`}
                                    >
                                        <Icon size={16} />
                                        {tab.label}
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </header>

            <ZonesModal />
        </>
    );
}
