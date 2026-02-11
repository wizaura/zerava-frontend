"use client";

import { useState } from "react";
import api from "@/lib/admin/axios";
import VehicleCategoryModal from "./VehicleCategoriesModal";

export default function VehicleCategoriesSection({
    vehicleCategories,
    reload,
}: any) {
    const [open, setOpen] = useState(false);
    const [editingCategory, setEditingCategory] = useState<any | null>(null);

    return (
        <section className="space-y-4">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-medium">
                    Vehicle Categories
                </h2>

                <button
                    onClick={() => {
                        setEditingCategory(null);
                        setOpen(true);
                    }}
                    className="rounded bg-black px-4 py-2 text-white"
                >
                    + Add Category
                </button>
            </div>

            <div className="grid sm:grid-cols-3 gap-4">
                {vehicleCategories?.map((c: any) => (
                    <div
                        key={c.id}
                        className="rounded-xl border p-4 bg-white space-y-2"
                    >
                        <div>
                            <p className="font-medium">{c.name}</p>
                            <p className="text-xs text-gray-500">
                                /{c.slug}
                            </p>
                        </div>

                        <div className="flex gap-3">
                            {/* EDIT */}
                            <button
                                onClick={() => {
                                    setEditingCategory(c);
                                    setOpen(true);
                                }}
                                className="text-xs text-blue-600"
                            >
                                Edit
                            </button>

                            {/* TOGGLE */}
                            <button
                                onClick={() =>
                                    api
                                        .patch(
                                            `/admin/service-pricing/categories/${c.id}/toggle`,
                                        )
                                        .then(reload)
                                }
                                className="text-xs text-red-600"
                            >
                                {c.isActive ? "Disable" : "Enable"}
                            </button>
                        </div>
                    </div>
                ))}
            </div>

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
