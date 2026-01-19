"use client";

import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Protected({ children }: { children: React.ReactNode }) {
    const { isAuthenticated, bootstrapped } = useSelector((s: any) => s.auth);
    const router = useRouter();

    useEffect(() => {
        if(!bootstrapped) return;

        if (!isAuthenticated) {
            router.replace("/login");
        }
    }, [bootstrapped, isAuthenticated, router]);

    if (!bootstrapped) return null;

    return <>{children}</>;
}
