"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import api from "@/lib/user/axios";
import { clearAuth } from "@/store/slices/authSlice";

const tabs = [
    { label: "Dashboard", href: "/account" },
    { label: "Bookings", href: "/account/bookings" },
    { label: "Referrals", href: "/account/referrals" },
    { label: "Eco Certificate", href: "/account/certificate" },
    { label: "Settings", href: "/account/settings" },
];

export default function UserHeader() {
    const pathname = usePathname();
    const router = useRouter();
    const dispatch = useDispatch();

    const user = useSelector((state: any) => state.auth.user);

    const handleLogout = async () => {
        try {
            // Fire-and-forget: backend clears cookies
            await api.post("/auth/logout");
        } catch {
            // ignore network errors
        } finally {
            // Frontend state is source of truth for UX
            dispatch(clearAuth());
            router.replace("/login");
        }
    };

    return (
        <div className="w-full">
            {/* Top Bar */}
            <div className="bg-black text-white pt-16">
                <div className="max-w-7xl mx-auto px-6 py-12 flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center text-black font-semibold">
                            {user?.fullName?.charAt(0)?.toUpperCase() || "U"}
                        </div>

                        <div>
                            <p className="font-medium text-2xl">
                                {user?.fullName || "User"}
                            </p>
                            <p className="text-md text-gray-400">
                                {user?.email || ""}
                            </p>
                        </div>
                    </div>

                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 text-sm bg-gray-300 px-4 py-1 rounded-full font-medium
                                   hover:bg-black hover:border hover:border-red-600
                                   text-black hover:text-red-500 transition"
                    >
                        <LogOut size={16} />
                        Logout
                    </button>
                </div>
            </div>

            {/* Tabs */}
            <div className="sticky top-16 z-40">
                <div className="max-w-4xl mx-auto px-6 py-3 flex justify-center">
                    <div className="flex items-center gap-2 rounded-full border border-gray-200 bg-gray-50 p-1 shadow-sm">
                        {tabs.map(t => {
                            const active = pathname === t.href;

                            return (
                                <Link
                                    key={t.href}
                                    href={t.href}
                                    className={`px-5 py-2 rounded-full text-sm font-medium transition-all
                                        ${active
                                            ? "bg-white text-emerald-600 shadow"
                                            : "text-gray-500 hover:text-gray-800"
                                        }`}
                                >
                                    {t.label}
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}
