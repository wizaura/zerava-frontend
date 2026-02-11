"use client";

import { useEffect, useState } from "react";
import api from "@/lib/admin/axios";

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
    const [description, setDescription] = useState(
        category?.description ?? "",
    );
    const [loading, setLoading] = useState(false);

    /* ---------- AUTO SLUG ---------- */
    useEffect(() => {
        if (!category) {
            setSlug(
                name
                    .toLowerCase()
                    .replace(/[^a-z0-9]+/g, "-")
                    .replace(/(^-|-$)/g, ""),
            );
        }
    }, [name, category]);

    const submit = async () => {
        if (!name.trim()) return;

        setLoading(true);
        try {
            if (category) {
                await api.patch(
                    `/admin/service-pricing/categories/${category.id}`,
                    {
                        name,
                        slug,
                        description,
                    },
                );
            } else {
                await api.post("/admin/service-pricing/categories", {
                    name,
                    slug,
                    description,
                });
            }

            onSaved();
            onClose();
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="w-full max-w-md rounded-2xl bg-white p-6 space-y-5">
                <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium">
                        {category
                            ? "Edit Vehicle Category"
                            : "Add Vehicle Category"}
                    </h3>
                    <button onClick={onClose}>✕</button>
                </div>

                {/* Name */}
                <div>
                    <label className="block mb-1 text-xs font-medium text-gray-600">
                        Category name
                    </label>
                    <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Standard"
                        className="w-full rounded-xl border px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black/10"
                    />
                </div>

                {/* Slug */}
                <div>
                    <label className="block mb-1 text-xs font-medium text-gray-600">
                        Slug
                    </label>
                    <input
                        value={slug}
                        onChange={(e) => setSlug(e.target.value)}
                        placeholder="standard"
                        className="w-full rounded-xl border px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black/10"
                    />
                    <p className="mt-1 text-xs text-gray-400">
                        Used internally (URLs & keys)
                    </p>
                </div>

                {/* Description */}
                <div>
                    <label className="block mb-1 text-xs font-medium text-gray-600">
                        Description
                    </label>
                    <textarea
                        value={description}
                        onChange={(e) =>
                            setDescription(e.target.value)
                        }
                        placeholder="Eg: Hatchbacks, small saloons, compact cars"
                        rows={3}
                        className="w-full resize-none rounded-xl border px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black/10"
                    />
                </div>

                {/* Footer */}
                <div className="flex justify-end gap-3 pt-4">
                    <button
                        onClick={onClose}
                        className="rounded-full border px-5 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                        Cancel
                    </button>

                    <button
                        disabled={loading}
                        onClick={submit}
                        className="rounded-full bg-black px-6 py-2 text-sm text-white hover:bg-gray-800 disabled:opacity-60"
                    >
                        {loading ? "Saving…" : "Save"}
                    </button>
                </div>
            </div>
        </div>
    );
}
