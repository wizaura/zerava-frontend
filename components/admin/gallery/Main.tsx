"use client";

import { useEffect, useState } from "react";
import GalleryList from "./List";
import GalleryAdd from "./Add";
import { getGallery, GalleryItem, deleteGalleryItem } from "@/lib/admin/gallery.api";
import { Upload } from "lucide-react";
import toast from "react-hot-toast";

export default function GalleryMain() {
    const [items, setItems] = useState<GalleryItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [mode, setMode] = useState<"list" | "add">("list");

    useEffect(() => {
        getGallery()
            .then(setItems)
            .finally(() => setLoading(false));
    }, []);

    async function handleDelete(id: string) {

        try {
            await deleteGalleryItem(id);

            // Optimistic update
            setItems((prev) => prev.filter((item) => item.id !== id));

            toast.success("Gallery item deleted");
        } catch (err) {
            toast.error("Failed to delete item");
        }
    }

    if (loading) {
        return <div className="py-20 text-center">Loading...</div>;
    }

    return (
        <div className="space-y-6">
            {/* HEADER */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-semibold">Gallery Manager</h2>
                    <p className="text-sm text-gray-500">
                        Upload before/after photos
                    </p>
                </div>

                {mode === "list" && (
                    <button
                        onClick={() => setMode("add")}
                        className="flex items-center gap-2 rounded-full bg-emerald-500 px-4 py-2 text-white hover:bg-emerald-600"
                    >
                        <Upload size={18} />
                        Add Photos
                    </button>
                )}
            </div>

            {/* CONTENT */}
            {mode === "list" && (
                <GalleryList items={items} onDelete={handleDelete} />
            )}

            {mode === "add" && (
                <GalleryAdd
                    onSuccess={(newItem) => {
                        setItems((prev) => [newItem, ...prev]);
                        setMode("list");
                    }}
                    onCancel={() => setMode("list")}
                />
            )}
        </div>
    );
}
