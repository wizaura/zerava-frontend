"use client";

import { useEffect, useState } from "react";
import api from "@/app/lib/axios";

const VEHICLE_SIZES = ["SMALL", "MEDIUM", "LARGE"];
const SERVICE_TYPES = ["EXTERIOR", "INTERIOR", "VALET"];

type PriceRow = {
    vehicleSize: string;
    serviceType: string;
    price: number;
    isActive: boolean;
};

export default function AdminPricingPage() {
    const [prices, setPrices] = useState<PriceRow[]>([]);
    const [loading, setLoading] = useState(false);

    async function fetchPrices() {
        const res = await api.get("/services/prices");
        setPrices(res.data);
    }

    useEffect(() => {
        fetchPrices();
    }, []);

    function getPrice(vehicleSize: string, serviceType: string) {
        return prices.find(
            (p) =>
                p.vehicleSize === vehicleSize &&
                p.serviceType === serviceType
        );
    }

    async function savePrice(
        vehicleSize: string,
        serviceType: string,
        price: number
    ) {
        setLoading(true);
        await api.post("/admin/service-prices", {
            vehicleSize,
            serviceType,
            price,
        });
        await fetchPrices();
        setLoading(false);
    }

    async function deactivatePrice(
        vehicleSize: string,
        serviceType: string
    ) {
        setLoading(true);
        await api.patch("/admin/service-prices/deactivate", null, {
            params: { vehicleSize, serviceType },
        });
        await fetchPrices();
        setLoading(false);
    }

    return (
        <div>
            <h2 className="text-xl font-semibold my-12">
                Service Pricing
            </h2>

            <div className="overflow-x-auto rounded-lg border bg-eco-black">
                <table className="w-full border-collapse">
                    <thead className="bg-eco-black text-sm">
                        <tr>
                            <th className="border px-4 py-2">Vehicle Size</th>
                            <th className="border px-4 py-2">Service</th>
                            <th className="border px-4 py-2">Price (£)</th>
                            <th className="border px-4 py-2">Status</th>
                            <th className="border px-4 py-2">Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {VEHICLE_SIZES.map((vs) =>
                            SERVICE_TYPES.map((st) => {
                                const row = getPrice(vs, st);

                                return (
                                    <tr key={`${vs}-${st}`} className="text-sm">
                                        <td className="border px-4 py-2">
                                            {vs}
                                        </td>
                                        <td className="border px-4 py-2">
                                            {st}
                                        </td>
                                        <td className="border px-4 py-2">
                                            <input
                                                type="number"
                                                defaultValue={row?.price ? row.price / 100 : ""}
                                                placeholder="—"
                                                className="w-24 rounded border px-2 py-1"
                                                onBlur={(e) => {
                                                    const value = Number(e.target.value);
                                                    if (!value) return;
                                                    savePrice(vs, st, value * 100);
                                                }}
                                            />
                                        </td>
                                        <td className="border px-4 py-2">
                                            {row?.isActive ? (
                                                <span className="text-green-600">
                                                    Active
                                                </span>
                                            ) : (
                                                <span className="text-gray-400">
                                                    Inactive
                                                </span>
                                            )}
                                        </td>
                                        <td className="border px-4 py-2">
                                            {row?.isActive && (
                                                <button
                                                    disabled={loading}
                                                    onClick={() =>
                                                        deactivatePrice(vs, st)
                                                    }
                                                    className="text-xs text-red-600 underline"
                                                >
                                                    Deactivate
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                );
                            })
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
