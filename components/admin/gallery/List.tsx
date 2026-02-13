"use client";

import { useState } from "react";
import { Image, Trash2 } from "lucide-react";
import ConfirmModal from "@/components/ui/ConfirmModal";

type GalleryItem = {
    id: string;
    title: string;
    afterImage: string;
};

export default function GalleryList({
    items,
    onDelete,
}: {
    items: GalleryItem[];
    onDelete: (id: string) => Promise<void> | void;
}) {
    const [deleteId, setDeleteId] = useState<string | null>(null);
    const [loadingId, setLoadingId] = useState<string | null>(null);

    if (items.length === 0) {
        return (
            <div className="flex flex-col items-center bg-white border border-gray-200 rounded-xl justify-center gap-3 py-20 text-gray-400">
                <Image className="h-14 w-14" />
                <p>No gallery items yet</p>
            </div>
        );
    }

    return (
        <>
            <div className="grid grid-cols-3 gap-6">
                {items.map((item) => (
                    <div
                        key={item.id}
                        className="relative rounded-xl border p-3 bg-white group"
                    >
                        {/* DELETE BUTTON */}
                        <button
                            onClick={() => setDeleteId(item.id)}
                            className="absolute top-4 right-4 hidden group-hover:flex items-center justify-center rounded-full bg-white p-2 shadow hover:bg-red-50 transition"
                        >
                            <Trash2 size={16} className="text-red-500" />
                        </button>

                        <img
                            src={`${process.env.NEXT_PUBLIC_API_URL}/uploads/gallery/${item.afterImage}`}
                            className="h-48 w-full object-cover rounded-lg"
                        />

                        <p className="mt-2 font-medium">{item.title}</p>
                    </div>
                ))}
            </div>

            {/* CONFIRM MODAL */}
            <ConfirmModal
                open={!!deleteId}
                title="Delete Gallery Item"
                description="Are you sure you want to delete this gallery item? This action cannot be undone."
                confirmText="Delete"
                cancelText="Cancel"
                variant="danger"
                loading={loadingId === deleteId}
                icon={<Trash2 className="h-6 w-6 text-red-600" />}
                onCancel={() => setDeleteId(null)}
                onConfirm={async () => {
                    if (!deleteId) return;

                    try {
                        setLoadingId(deleteId);
                        await onDelete(deleteId);
                        setDeleteId(null);
                    } finally {
                        setLoadingId(null);
                    }
                }}
            />
        </>
    );
}
