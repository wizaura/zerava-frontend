"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogOut } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/app/store/slices/authSlice";

const tabs = [
    { label: "Dashboard", href: "/account" },
    { label: "Bookings", href: "/account/bookings" },
    { label: "Referrals", href: "/account/referrals" },
    { label: "Eco Certificate", href: "/account/certificate" },
    { label: "Settings", href: "/account/settings" },
];

export default function UserHeader() {
    const pathname = usePathname();
    const dispatch = useDispatch();
    const user = useSelector((state: any) => state.auth.user);

    return (
        <div className="w-full">
            {/* Top Bar */}
            <div className="bg-black text-white">
                <div className="max-w-7xl mx-auto px-6 py-12 flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center text-black font-semibold">
                            {user?.fullName?.[0] || "U"}
                        </div>
                        <div>
                            <p className="font-medium text-2xl">{user?.fullName || "User"}</p>
                            <p className="text-md text-gray-400">{user?.email}</p>
                        </div>
                    </div>

                    <button
                        onClick={() => dispatch(logout())}
                        className="flex items-center gap-2 text-sm bg-gray-300 px-4 py-1 rounded-full font-medium hover:bg-eco-black hover:border text-red-400 hover:text-red-500"
                    >
                        <LogOut size={16} /> Logout
                    </button>
                </div>
            </div>

            {/* Tabs */}
            <div className="bg-white border-b">
                <div className="max-w-7xl mx-auto px-6 py-3 flex space-x-6">
                    {tabs.map(t => (
                        <Link
                            key={t.href}
                            href={t.href}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition ${pathname === t.href
                                    ? "bg-emerald-50 text-emerald-600"
                                    : "text-gray-500 hover:text-gray-800"
                                }`}
                        >
                            {t.label}
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
