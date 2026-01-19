"use client";

import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Protected({ children }: { children: React.ReactNode }) {
    const { isAuthenticated, bootstrapped } = useSelector((s: any) => s.auth);
    const router = useRouter();

    useEffect(() => {
        if (bootstrapped && !isAuthenticated) {
            router.replace("/login");
        }
    }, [bootstrapped, isAuthenticated]);

    if (!bootstrapped) return null;

    return <>{children}</>;
}
