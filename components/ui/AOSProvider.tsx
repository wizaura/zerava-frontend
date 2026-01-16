"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import AOS from "aos";
import "aos/dist/aos.css";

export default function AOSProvider() {
    const pathname = usePathname();

    useEffect(() => {
        AOS.init({
            once: true,
            duration: 900,
            easing: "ease-out-cubic",
            offset: 80,
        });
    }, []);

    useEffect(() => {
        AOS.refreshHard();
    }, [pathname]);

    return null;
}
