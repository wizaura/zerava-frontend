"use client";

import { AdminUIProvider } from "@/lib/AdminUIContext";
import AdminHeader from "@/components/admin/layout/Header";
import Protected from "@/components/auth/Protected";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <Protected requiredRole="ADMIN">
        <AdminUIProvider>
            <div className="min-h-screen bg-gray-50 text-gray-900 flex flex-col">
                <AdminHeader />
                <div className="flex-1 overflow-y-auto">
                    <main className="max-w-7xl mx-auto p-6">{children}</main>
                </div>
            </div>
        </AdminUIProvider>
        </Protected>
    )
}
