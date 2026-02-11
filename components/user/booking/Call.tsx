"use client";

import { useEffect, useState } from "react";
import api from "@/lib/user/axios";
import BookingClient from "./Main";

import type { Service, AddOns } from "./Main";

/* ---------- API RESPONSE TYPE ---------- */

type PublicServicesResponse = {
    services: Service[];
    addOns: AddOns[];
};

export default function BookingPage() {
    const [data, setData] = useState<PublicServicesResponse | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        api.get<PublicServicesResponse>("/services")
            .then((res) => {
                setData(res.data);
            })
            .catch(() => {
                setError("Failed to load services");
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
        <BookingClient
            services={data.services}
            addOns={data.addOns}
        />
    );
}
