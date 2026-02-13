"use client";

import { useEffect, useState } from "react";
import api from "@/lib/admin/axios";
import ServiceList from "./ServiceList";
import AddOnsSection from "./AddOnsSection";
import VehicleCategoriesSection from "./VehicleCategoriesSection";
import VehicleCategoryModal from "./VehicleCategoriesModal";
import ServiceModal from "./ServiceModal";
import AddOnModal from "./AddOnModal";
import { getServicePricingOverview } from "@/lib/admin/services.api";

export default function ServicePricingPage() {
    const [data, setData] = useState<any>(null);
    const [openAddOn, setOpenAddOn] = useState(false);
    const [openService, setOpenService] = useState(false);
    const [openCategory, setOpenCategory] = useState(false);


    const load = async () => {
        const data = await getServicePricingOverview();
        setData(data);
    };

    useEffect(() => {
        load();
    }, []);

    if (!data) {
        return (
            <div className="p-6">
                <p className="text-sm text-gray-500">Loading...</p>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            {/* 🔥 Header Section */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-semibold">
                        Service & Pricing
                    </h2>
                    <p className="text-sm text-gray-500">
                        Manage vehicle categories, services, and add-ons
                    </p>
                </div>

                <div className="flex flex-col md:flex-row items-center gap-3">
                    <button
                        onClick={() => setOpenCategory(true)}
                        className="rounded-full hover:bg-gray-200 border px-5 py-2 text-sm font-medium"
                    >
                        + Add Category
                    </button>

                    <button
                        onClick={() => setOpenService(true)}
                        className="rounded-full bg-emerald-500 hover:bg-emerald-600 border px-5 py-2 text-sm font-medium"
                    >
                        + Add Service
                    </button>

                    <button
                        onClick={() => setOpenAddOn(true)}
                        className="rounded-full bg-emerald-500 hover:bg-emerald-600 px-5 py-2 text-sm font-medium text-black"
                    >
                        + Add Add-on
                    </button>
                </div>
            </div>

            {/* 🔥 Sections */}
            <div id="vehicle-section">
                <VehicleCategoriesSection
                    vehicleCategories={data.vehicleCategories}
                    reload={load}
                />
            </div>

            <div id="service-section">
                <ServiceList
                    services={data.services}
                    vehicleCategories={data.vehicleCategories}
                    reload={load}
                />
            </div>

            <div id="addon-section">
                <AddOnsSection
                    addOns={data.addOns}
                    reload={load}
                />
            </div>

            {openAddOn && (
                <AddOnModal
                    onClose={() => setOpenAddOn(false)}
                    onSaved={() => {
                        setOpenAddOn(false);
                        load();
                    }}
                />
            )}

            {openService && (
                <ServiceModal
                    onClose={() => setOpenService(false)}
                    onSaved={() => {
                        setOpenService(false);
                        load();
                    }}
                />
            )}

            {openCategory && (
                <VehicleCategoryModal
                    onClose={() => setOpenCategory(false)}
                    onSaved={() => {
                        setOpenCategory(false);
                        load();
                    }}
                />
            )}

        </div>
    );
}
