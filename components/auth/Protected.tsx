"use client"

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

    console.log(role,'roler');

    useEffect(() => {
        if (!bootstrapped) return;

        if (!isAuthenticated) {
            router.replace("/");
            return;
        }

        if (requiredRole && role !== requiredRole) {
            router.replace("/");
        }
    }, [bootstrapped, isAuthenticated, role, requiredRole, router]);

    if (!bootstrapped) return null;

    return <>{children}</>;
}