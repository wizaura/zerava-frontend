"use client";

import { useEffect, useState } from "react";
import api from "@/lib/admin/axios";
import ServiceList from "./ServiceList";
import AddOnsSection from "./AddOnsSection";
import VehicleCategoriesSection from "./VehicleCategoriesSection";

export default function ServicePricingPage() {
    const [data, setData] = useState<any>(null);

    const load = async () => {
        const res = await api.get("/admin/service-pricing");
        setData(res.data);
    };

    useEffect(() => {
        load();
    }, []);

    if (!data) return <p>Loading…</p>;

    return (
        <div className="space-y-10 p-6">
            <h1 className="text-2xl font-semibold">Service & Pricing</h1>

            <VehicleCategoriesSection
                vehicleCategories={data.vehicleCategories}
                reload={load}
            />
            <ServiceList
                services={data.services}
                vehicleCategories={data.vehicleCategories}
                reload={load}
            />

            <AddOnsSection
                addOns={data.addOns}
                reload={load}
            />
        </div>
    );
}
