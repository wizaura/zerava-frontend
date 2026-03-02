"use client";

import { useEffect, useState } from "react";
import { Sparkles, Copy, Check } from "lucide-react";
import api from "@/lib/user/axios";

type Promo = {
    name: string;
    percentage: number;
    code: string;
};

export default function PromoBanner() {
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
            } catch (err) {
                console.log("No active promo");
            }
        }

        fetchPromo();
    }, []);

    if (!promo || !visible) return null;

    const handleCopy = async () => {
        await navigator.clipboard.writeText(promo.code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="w-full bg-electric-teal text-eco-black text-sm">
            <div className="max-w-7xl mx-auto px-6 py-3 relative flex items-center justify-center">

                <div className="flex items-center gap-3 group">
                    <Sparkles size={16} className="opacity-80" />

                    <span className="text-center">
                        <strong>{promo.name}</strong> — Get{" "}
                        <strong>{promo.percentage}% OFF</strong> with code
                    </span>

                    <button
                        onClick={handleCopy}
                        className="relative flex items-center gap-2 bg-eco-black text-white px-3 py-1 rounded-md font-semibold transition hover:opacity-90"
                    >
                        {promo.code}

                        <span className="opacity-0 group-hover:opacity-100 transition">
                            {copied ? <Check size={14} /> : <Copy size={14} />}
                        </span>
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
    );
}