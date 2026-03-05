"use client";

import { useEffect, useState } from "react";
import { Sparkles, Copy, Check } from "lucide-react";
import api from "@/lib/user/axios";

type Promo = {
    name: string;
    percentage: number;
    code: string;
};

type PromoBannerProps = {
    onVisibilityChange?: (visible: boolean) => void;
};

export default function PromoBanner({ onVisibilityChange }: PromoBannerProps) {
    const [promo, setPromo] = useState<Promo | null>(null);
    const [visible, setVisible] = useState(true);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        async function fetchPromo() {
            try {
                const res = await api.get("/promo/public");
                if (res.data) {
                    setPromo(res.data);
                }
            } catch {
                console.log("No active promo");
            }
        }

        fetchPromo();
    }, []);

    // ✅ Notify Navbar AFTER render
    useEffect(() => {
        const isVisible = !!promo && visible;
        onVisibilityChange?.(isVisible);
    }, [promo, visible, onVisibilityChange]);

    if (!promo || !visible) return null;

    const handleCopy = async () => {
        await navigator.clipboard.writeText(promo.code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="w-full relative">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/30 via-green-400/30 to-teal-400/30 blur-2xl"></div>

            <div className="relative backdrop-blur-md bg-white/20 text-eco-black text-sm">
                <div className="max-w-7xl mx-auto px-6 py-3 relative flex items-center justify-center">

                    <div className="flex items-center gap-3 group">
                        <Sparkles size={16} className="text-white" />

                        <span className="text-center font-medium text-white">
                            <strong>{promo.name}</strong> — Get{" "}
                            <strong className="text-emerald-300">
                                {promo.percentage}% OFF
                            </strong>{" "}
                            with code
                        </span>

                        <button
                            onClick={handleCopy}
                            className="flex items-center gap-2 rounded-lg
                            bg-gradient-to-r from-emerald-500 to-green-500
                            text-white px-3 py-1.5 font-semibold
                            shadow-md transition-all
                            hover:scale-105 hover:shadow-lg"
                        >
                            {promo.code}
                            {copied ? <Check size={14} /> : <Copy size={14} />}
                        </button>
                    </div>

                    <button
                        onClick={() => setVisible(false)}
                        className="absolute right-6 text-eco-black/70 hover:text-eco-black"
                    >
                        ✕
                    </button>
                </div>
            </div>
        </div>
    );
}