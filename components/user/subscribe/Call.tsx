"use client";

import { useEffect, useState } from "react";
import api from "@/lib/user/axios";
import SubscribeClient from "./Main";

export type SubscriptionPrice = {
    id: string;
    price: number; // in pence
    billingCycle: "FORTNIGHTLY" | "MONTHLY";
    stripePriceId: string;
    vehicleCategory: {
        id: string;
        name: string;
        description: string;
    };
};

export type SubscriptionService = {
    id: string;
    name: string;
    slug: string;
    description?: string | null;
    durationMin: number;
    prices: SubscriptionPrice[];
    icon: string;
    isPopular: boolean;
};

type PublicSubscriptionResponse = {
    services: SubscriptionService[];
};

export default function SubscribeCall() {
    const [data, setData] =
        useState<PublicSubscriptionResponse | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        api.get<PublicSubscriptionResponse>("/subscriptions")
            .then((res) => {
                setData(res.data);
            })
            .catch(() => {
                setError("Failed to load subscription options");
            });
    }, []);

    if (error) {
        return (
            <div className="p-6 text-red-600 text-sm">
                {error}
            </div>
        );
    }

    if (!data) return null;

    return (
        <SubscribeClient
            services={data.services}
        />
    );
}
