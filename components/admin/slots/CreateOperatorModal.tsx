"use client";

import { X } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { createOperator } from "@/app/lib/admin/operators.api";

export default function CreateOperatorModal({
    open,
    onClose,
    onCreated,
}: {
    open: boolean;
    onClose: () => void;
    onCreated: (id: string) => void;
}) {
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);

    if (!open) return null;

    async function handleCreate() {
        if (!name.trim()) {
            toast.error("Operator name required");
            return;
        }

        try {
            setLoading(true);
            const op = await createOperator({ name });
            toast.success("Operator created");
            onCreated(op.id);
            setName("");
            onClose();
        } catch {
            toast.error("Failed to create operator");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="w-full max-w-md rounded-xl bg-white shadow-xl">
                <div className="flex items-center justify-between border-b px-6 py-4">
                    <h2 className="text-sm font-semibold">Add Operator</h2>
                    <button onClick={onClose}>
                        <X size={18} />
                    </button>
                </div>

                <div className="p-6 space-y-4">
                    <div>
                        <label className="mb-1 block text-xs font-medium text-gray-600">
                            Operator Name
                        </label>
                        <input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full rounded-md border px-3 py-2 text-sm"
                        />
                    </div>

                    <div className="flex gap-3">
                        <button
                            onClick={handleCreate}
                            disabled={loading}
                            className="rounded-md bg-green-500 px-4 py-2 text-sm font-medium text-black disabled:opacity-50"
                        >
                            Add Operator
                        </button>

                        <button
                            onClick={onClose}
                            className="rounded-md border px-4 py-2 text-sm"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
