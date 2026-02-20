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
    { label: "Subscriptions", href: "/account/subscriptions" },
    { label: "Referrals", href: "/account/referrals" },
    { label: "Eco Certificate", href: "/account/eco-certificate" },
    { label: "Settings", href: "/account/settings" },
];

export default function UserHeader() {
    const pathname = usePathname();
    const router = useRouter();
    const dispatch = useDispatch();

    const user = useSelector((state: any) => state.auth.user);

    const handleLogout = async () => {
        try {
            await api.post("/auth/logout");
        } catch {

        } finally {
            dispatch(clearAuth());
            router.replace("/login");
        }
    };

    return (
        <div className="w-full">
            {/* Top Bar */}
            <div className="bg-black text-white pt-16">
                <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-6">

                    {/* USER INFO */}
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center text-black font-semibold text-lg">
                            {user?.fullName?.charAt(0)?.toUpperCase() || "U"}
                        </div>

                        <div>
                            <p className="font-medium text-xl sm:text-2xl">
                                {user?.fullName || "User"}
                            </p>
                            <p className="text-sm sm:text-md text-gray-400">
                                {user?.email || ""}
                            </p>
                        </div>
                    </div>

                    {/* LOGOUT BUTTON */}
                    <button
                        onClick={handleLogout}
                        className="w-full sm:w-auto flex items-center justify-center gap-2 text-sm 
                       bg-gray-300 px-5 py-2 rounded-full font-medium
                       text-black transition border  border-gray-300
                       hover:bg-black hover:border-red-600
                       hover:text-red-500"
                    >
                        <LogOut size={16} />
                        Logout
                    </button>
                </div>
            </div>

            {/* Tabs */}
            {/* Tabs */}
            <div className="sticky top-16 z-40 bg-white">
                <div className="max-w-3xl mx-auto px-6 py-3 overflow-x-auto no-scrollbar">
                    <div className="flex items-center gap-2 whitespace-nowrap min-w-max rounded-full border border-gray-200 bg-gray-50 p-1 shadow-sm">
                        {tabs.map((t) => {
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
