"use client";

import UserHeader from "@/components/user/account/layout/Header";
import Protected from "@/components/auth/Protected";
import { useAuthBootstrap } from "../lib/useAuthBootstrap";

export default function UserLayout({ children }: { children: React.ReactNode }) {
    // useAuthBootstrap();
    return (
        <Protected>
            <div className="min-h-screen bg-gray-50 text-gray-900 flex flex-col">
                <UserHeader />
                <div className="flex-1 overflow-y-auto">
                    <main className="max-w-7xl mx-auto p-6">{children}</main>
                </div>
            </div>
        </Protected>
    );
}

