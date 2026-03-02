"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import adminApi from "@/lib/admin/axios";
import { getApiError } from "@/lib/utils";

import {
    Droplet,
    Calendar,
    Wallet,
    Leaf,
    Info,
} from "lucide-react";

const ICON_OPTIONS = [
    { label: "Waterless Process", value: "droplet", icon: Droplet },
    { label: "Booking & Scheduling", value: "calendar", icon: Calendar },
    { label: "Pricing & Packages", value: "wallet", icon: Wallet },
    { label: "Eco & Sustainability", value: "leaf", icon: Leaf },
    { label: "Service Details", value: "info", icon: Info },
];

type Category = {
    id: string;
    name: string;
    icon: string;
    isActive: boolean;
};

export default function FaqCategoriesSection() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [newName, setNewName] = useState("");
    const [editingId, setEditingId] = useState<string | null>(null);
    const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
    const [selectedIcon, setSelectedIcon] = useState<string>("");

    useEffect(() => {
        fetchCategories();
    }, []);

    async function fetchCategories() {
        try {
            setLoading(true);
            const { data } = await adminApi.get(
                "/admin/settings/faq-categories"
            );
            setCategories(data);
        } catch (err: any) {
            toast.error(getApiError(err));
        } finally {
            setLoading(false);
        }
    }

    async function createCategory() {
        if (!newName.trim()) return;

        try {
            await adminApi.post(
                "/admin/settings/faq-categories",
                {
                    name: newName,
                    icon: selectedIcon,
                    isActive: true,
                }
            );
            toast.success("Category created");
            setNewName("");
            fetchCategories();
        } catch (err: any) {
            toast.error(getApiError(err));
        }
    }

    async function updateCategory(id: string, name: string, icon: string, isActive: boolean) {
        try {
            await adminApi.put(
                `/admin/settings/faq-categories/${id}`,
                {
                    name,
                    icon,
                    isActive,
                }
            );
            toast.success("Category updated");
            setEditingId(null);
            fetchCategories();
        } catch (err: any) {
            toast.error(getApiError(err));
        }
    }

    async function deleteCategory(id: string) {
        try {
            await adminApi.delete(
                `/admin/settings/faq-categories/${id}`
            );
            toast.success("Category deleted");
            setConfirmDeleteId(null);
            fetchCategories();
        } catch (err: any) {
            toast.error(getApiError(err));
        }
    }

    return (
        <section className="space-y-6">

            {/* Header */}
            <div>
                <h2 className="text-2xl font-semibold text-gray-800">
                    FAQ Categories
                </h2>
                <p className="text-sm text-gray-500">
                    Manage FAQ categories
                </p>
            </div>

            {/* Create */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 space-y-4">
                <div className="flex gap-4">
                    <input
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                        placeholder="New category name"
                        className="flex-1 px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500"
                    />
                </div>

                {/* ICON SELECT */}
                <div className="flex flex-wrap gap-3">
                    {ICON_OPTIONS.map((item) => {
                        const Icon = item.icon;
                        return (
                            <button
                                key={item.value}
                                type="button"
                                onClick={() => setSelectedIcon(item.value)}
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition
            ${selectedIcon === item.value
                                        ? "border-emerald-600 bg-emerald-50"
                                        : "border-gray-300 hover:border-emerald-400"
                                    }`}
                            >
                                <Icon size={16} />
                                <span className="text-sm">{item.label}</span>
                            </button>
                        );
                    })}
                </div>

                <div>
                    <button
                        onClick={createCategory}
                        className="px-5 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
                    >
                        Add
                    </button>
                </div>
            </div>

            {/* List */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 space-y-4">

                {loading && (
                    <p className="text-gray-400 text-sm">
                        Loading categories...
                    </p>
                )}

                {!loading && categories.length === 0 && (
                    <p className="text-gray-400 text-sm">
                        No categories created yet.
                    </p>
                )}

                {!loading &&
                    categories.map((cat) => (
                        <div
                            key={cat.id}
                            className="flex justify-between items-center border-b border-gray-200 pb-3 last:border-none"
                        >
                            <div className="flex items-center gap-4">
                                {editingId === cat.id ? (
                                    <input
                                        defaultValue={cat.name}
                                        onBlur={(e) =>
                                            updateCategory(
                                                cat.id,
                                                e.target.value,
                                                cat.icon,
                                                cat.isActive
                                            )
                                        }
                                        className="px-2 py-1 border border-gray-300 rounded"
                                        autoFocus
                                    />
                                ) : (
                                    <div className="flex items-center gap-3">
                                        {(() => {
                                            const Icon = ICON_OPTIONS.find(i => i.value === cat.icon)?.icon;
                                            return Icon ? <Icon size={18} className="text-emerald-600" /> : null;
                                        })()}
                                        <span className="font-medium text-gray-800">
                                            {cat.name}
                                        </span>
                                    </div>
                                )}

                                <span
                                    className={`px-3 py-1 text-xs rounded-full ${cat.isActive
                                        ? "bg-emerald-100 text-emerald-700"
                                        : "bg-gray-200 text-gray-600"
                                        }`}
                                >
                                    {cat.isActive ? "Active" : "Inactive"}
                                </span>
                            </div>

                            <div className="flex gap-5 text-sm">
                                <button
                                    onClick={() => setEditingId(cat.id)}
                                    className="text-emerald-600 hover:underline"
                                >
                                    Edit
                                </button>

                                <button
                                    onClick={() =>
                                        updateCategory(
                                            cat.id,
                                            cat.name,
                                            cat.icon,
                                            !cat.isActive
                                        )
                                    }
                                    className="text-gray-600 hover:underline"
                                >
                                    Toggle
                                </button>

                                <button
                                    onClick={() =>
                                        setConfirmDeleteId(cat.id)
                                    }
                                    className="text-red-500 hover:underline"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
            </div>

            {/* Confirm Delete */}
            {confirmDeleteId && (
                <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
                    <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md">
                        <h3 className="text-lg font-semibold text-gray-800 mb-3">
                            Confirm Delete
                        </h3>
                        <p className="text-sm text-gray-600 mb-6">
                            Deleting this category will remove all related FAQs.
                            Continue?
                        </p>

                        <div className="flex justify-end gap-4">
                            <button
                                onClick={() =>
                                    setConfirmDeleteId(null)
                                }
                                className="px-4 py-2 border border-gray-300 rounded-lg"
                            >
                                Cancel
                            </button>

                            <button
                                onClick={() =>
                                    deleteCategory(confirmDeleteId)
                                }
                                className="px-5 py-2 bg-red-600 text-white rounded-lg"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}