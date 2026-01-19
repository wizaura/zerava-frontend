"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { isAdminAuthenticated } from "@/app/lib/adminAuth";
import { AdminUIProvider } from "@/app/context/AdminUIContext";
import LayoutInner from "@/components/admin/layout/Header";
import Protected from "@/components/auth/Protected";

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
                <LayoutInner>{children}</LayoutInner>
            </AdminUIProvider>
        // </Protected>
    )
}
