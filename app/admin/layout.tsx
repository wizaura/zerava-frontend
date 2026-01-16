"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { isAdminAuthenticated } from "@/lib/adminAuth";
import { AdminUIProvider } from "@/context/AdminUIContext";
import LayoutInner from "@/components/admin/layout/Header";

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
        <AdminUIProvider>
            <LayoutInner>{children}</LayoutInner>
        </AdminUIProvider>
    )
}
