"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export default function Protected({
    children,
    requiredRole,
}: {
    children: React.ReactNode;
    requiredRole?: "ADMIN" | "USER";
}) {
    const { isAuthenticated, bootstrapped, role } = useSelector((s: any) => s.auth);
    const router = useRouter();

    useEffect(() => {
        if (!bootstrapped) return;

        // Not logged in
        if (!isAuthenticated) {
            router.replace("/");
            return;
        }

        // Wait until role is available
        if (!role) return;

        // Role mismatch
        if (requiredRole && role !== requiredRole) {
            router.replace("/");
        }
    }, [bootstrapped, isAuthenticated, role, requiredRole, router]);

    // Don't render until auth state is ready
    if (!bootstrapped) return null;

    return <>{children}</>;
}