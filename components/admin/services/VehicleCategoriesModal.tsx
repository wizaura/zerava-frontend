"use client";

import { useEffect, useState } from "react";
import api from "@/lib/admin/axios";
import toast from "react-hot-toast";
import { getApiError } from "@/lib/utils";
import { createVehicleCategory, updateVehicleCategory } from "@/lib/admin/services.api";

type Props = {
    category?: {
        id: string;
        name: string;
        slug: string;
        description?: string | null;
    };
    onClose: () => void;
    onSaved: () => void;
};

export default function VehicleCategoryModal({
    category,
    onClose,
    onSaved,
}: Props) {
    const [name, setName] = useState(category?.name ?? "");
    const [slug, setSlug] = useState(category?.slug ?? "");
    const [description, setDescription] =
        useState(category?.description ?? "");
    const [loading, setLoading] = useState(false);

    const isEdit = Boolean(category);

    /* 🔥 Auto slug generation (create only) */
    useEffect(() => {
        if (!isEdit) {
            setSlug(
                name
                    .toLowerCase()
                    .replace(/[^a-z0-9]+/g, "-")
                    .replace(/(^-|-$)/g, "")
            );
        }
    }, [name, isEdit]);

    const submit = async () => {
        if (!name.trim()) {
            toast.error("Category name is required");
            return;
        }

        if (!slug.trim()) {
            toast.error("Slug is required");
            return;
        }

        setLoading(true);

        try {
            if (isEdit) {
                await updateVehicleCategory(category!.id, {
                    name,
                    slug,
                    description,
                });
            } else {
                await createVehicleCategory({
                    name,
                    slug,
                    description,
                });
            }

            toast.success(
                isEdit
                    ? "Category updated"
                    : "Category created"
            );

            onSaved();
            onClose();
        } catch (err: any) {
            toast.error(getApiError(err));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">
                        {isEdit
                            ? "Edit Vehicle Category"
                            : "Add Vehicle Category"}
                    </h3>

                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-black"
                    >
                        ✕
                    </button>
                </div>

                {/* Name */}
                <div>
                    <label className="block mb-1 text-sm font-medium">
                        Category Name
                    </label>
                    <input
                        value={name}
                        onChange={(e) =>
                            setName(e.target.value)
                        }
                        placeholder="Standard"
                        className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm
                                   focus:outline-none focus:ring-2 focus:ring-electric-teal"
                    />
                </div>

                {/* Slug */}
                <div>
                    <label className="block mb-1 text-sm font-medium">
                        Slug
                    </label>
                    <input
                        value={slug}
                        onChange={(e) =>
                            setSlug(e.target.value)
                        }
                        placeholder="standard"
                        className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm
                                   focus:outline-none focus:ring-2 focus:ring-electric-teal"
                    />
                    <p className="mt-1 text-xs text-gray-500">
                        Used internally (URLs & keys)
                    </p>
                </div>

                {/* Description */}
                <div>
                    <label className="block mb-1 text-sm font-medium">
                        Description
                    </label>
                    <textarea
                        value={description}
                        onChange={(e) =>
                            setDescription(e.target.value)
                        }
                        placeholder="Eg: Hatchbacks, small saloons, compact cars"
                        rows={3}
                        className="w-full resize-none rounded-md border border-gray-300 px-3 py-2 text-sm
                                   focus:outline-none focus:ring-2 focus:ring-electric-teal"
                    />
                </div>

                {/* Footer */}
                <div className="flex justify-end gap-3 pt-2">
                    <button
                        onClick={onClose}
                        className="rounded-full hover:bg-gray-200 border px-5 py-2 text-sm"
                    >
                        Cancel
                    </button>

                    <button
                        disabled={loading}
                        onClick={submit}
                        className="rounded-full bg-emerald-500 hover:bg-emerald-600 px-6 py-2 text-sm font-medium text-black disabled:opacity-50"
                    >
                        {loading
                            ? "Saving..."
                            : isEdit
                                ? "Update Category"
                                : "Save Category"}
                    </button>
                </div>
            </div>
        </div>
    );
}
