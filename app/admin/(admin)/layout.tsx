"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { isAdminAuthenticated } from "@/app/lib/adminAuth";
import { AdminUIProvider } from "@/app/context/AdminUIContext";
import Protected from "@/components/auth/Protected";
import AdminHeader from "@/components/admin/layout/Header";

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
    return (
        // <Protected>
        <AdminUIProvider>
            <div className="min-h-screen bg-gray-50 text-gray-900 flex flex-col pt-16">
                <AdminHeader />
                <div className="flex-1 overflow-y-auto">
                    <main className="max-w-7xl mx-auto p-6">{children}</main>
                </div>
            </div>
        </AdminUIProvider>
        // </Protected>
    )
}
