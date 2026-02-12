"use client";

import { useState } from "react";
import api from "@/lib/admin/axios";
import VehicleCategoryModal from "./VehicleCategoriesModal";
import toast from "react-hot-toast";
import { getApiError } from "@/lib/utils";
import { toggleVehicleCategory } from "@/lib/admin/services.api";

export default function VehicleCategoriesSection({
    vehicleCategories,
    reload,
}: any) {
    const [open, setOpen] = useState(false);
    const [editingCategory, setEditingCategory] =
        useState<any | null>(null);
    const [loadingId, setLoadingId] =
        useState<string | null>(null);

    async function handleToggle(id: string) {
        try {
            setLoadingId(id);

            await toggleVehicleCategory(id);

            reload();
        } catch (err: any) {
            toast.error(getApiError(err));
        } finally {
            setLoadingId(null);
        }
    }

    return (
        <section className="space-y-6">
            {/* 🔥 Header */}
            <div>
                <h2 className="text-xl font-semibold">
                    Vehicle Categories
                </h2>
                <p className="text-sm text-gray-500">
                    Define vehicle groups used for pricing
                </p>
            </div>

            {/* 🔥 Cards */}
            <div className="grid gap-5 sm:grid-cols-3">
                {vehicleCategories?.map((c: any) => (
                    <div
                        key={c.id}
                        className="rounded-2xl border bg-white p-5 shadow-sm transition hover:shadow-md"
                    >
                        {/* Name */}
                        <div>
                            <p className="text-base font-semibold">
                                {c.name}
                            </p>
                            <p className="mt-1 text-xs text-gray-500">
                                /{c.slug}
                            </p>
                        </div>

                        {/* Status */}
                        <div className="mt-2">
                            {!c.isActive && (
                                <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-red-600">
                                    Disabled
                                </span>
                            )}
                        </div>

                        {/* Actions */}
                        <div className="mt-4 flex items-center gap-4 text-sm">
                            <button
                                onClick={() => {
                                    setEditingCategory(c);
                                    setOpen(true);
                                }}
                                className="text-electric-teal hover:underline"
                            >
                                Edit
                            </button>

                            <button
                                onClick={() =>
                                    handleToggle(c.id)
                                }
                                disabled={loadingId === c.id}
                                className={`${c.isActive
                                        ? "text-red-600"
                                        : "text-emerald-600"
                                    } hover:underline disabled:opacity-50`}
                            >
                                {loadingId === c.id
                                    ? "Updating..."
                                    : c.isActive
                                        ? "Disable"
                                        : "Enable"}
                            </button>
                        </div>
                    </div>
                ))}

                {!vehicleCategories?.length && (
                    <div className="col-span-full rounded-xl border bg-gray-50 p-6 text-center text-sm text-gray-500">
                        No vehicle categories created yet
                    </div>
                )}
            </div>

            {/* 🔥 Modal */}
            {open && (
                <VehicleCategoryModal
                    category={editingCategory}
                    onClose={() => setOpen(false)}
                    onSaved={reload}
                />
            )}
        </section>
    );
}
