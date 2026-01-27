"use client";

import { X, Pencil, Trash2, Check } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
    getOperators,
    createOperator,
    updateOperator,
    deleteOperator,
    Operator,
} from "@/lib/admin/operators.api";

export default function OperatorManagerModal({
    open,
    onClose,
    onChanged,
}: {
    open: boolean;
    onClose: () => void;
    onChanged: () => void;
}) {
    const [operators, setOperators] = useState<Operator[]>([]);
    const [name, setName] = useState("");
    const [editingId, setEditingId] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (open) load();
    }, [open]);

    async function load() {
        setOperators(await getOperators());
    }

    async function handleAdd() {
        if (!name.trim()) {
            toast.error("Operator name required");
            return;
        }

        try {
            setLoading(true);
            await createOperator({ name });
            toast.success("Operator added");
            setName("");
            await load();
            onChanged();
        } catch {
            toast.error("Failed to add operator");
        } finally {
            setLoading(false);
        }
    }

    async function handleUpdate(id: string, newName: string) {
        if (!newName.trim()) return;

        try {
            await updateOperator(id, { name: newName });
            toast.success("Operator updated");
            setEditingId(null);
            await load();
            onChanged();
        } catch {
            toast.error("Failed to update operator");
        }
    }

    async function handleDelete(id: string) {
        if (!confirm("Delete this operator?")) return;

        try {
            await deleteOperator(id);
            toast.success("Operator deleted");
            await load();
            onChanged();
        } catch {
            toast.error("Cannot delete operator with slots");
        }
    }

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="w-full max-w-lg rounded-xl bg-white shadow-xl">
                {/* Header */}
                <div className="flex items-center justify-between border-b px-6 py-4">
                    <h2 className="text-sm font-semibold">
                        Manage Operators
                    </h2>
                    <button onClick={onClose}>
                        <X size={18} />
                    </button>
                </div>

                {/* Body */}
                <div className="p-6 space-y-5">
                    {/* Add operator */}
                    <div className="flex gap-3">
                        <input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="New operator name"
                            className="flex-1 rounded-md border px-3 py-2 text-sm"
                        />
                        <button
                            onClick={handleAdd}
                            disabled={loading}
                            className="rounded-md bg-emerald-500 px-4 py-2 text-sm font-medium text-black disabled:opacity-50"
                        >
                            Add
                        </button>
                    </div>

                    {/* Operator list */}
                    <div className="space-y-2 max-h-64 overflow-auto">
                        {operators.map((op) => (
                            <div
                                key={op.id}
                                className="flex items-center justify-between rounded-md border px-3 py-2 text-sm"
                            >
                                {editingId === op.id ? (
                                    <input
                                        defaultValue={op.name}
                                        autoFocus
                                        onBlur={(e) =>
                                            handleUpdate(
                                                op.id,
                                                e.target.value
                                            )
                                        }
                                        className="flex-1 rounded-md border px-2 py-1 text-sm"
                                    />
                                ) : (
                                    <span>{op.name}</span>
                                )}

                                <div className="flex gap-3">
                                    {editingId === op.id ? (
                                        <Check size={16} />
                                    ) : (
                                        <button
                                            onClick={() =>
                                                setEditingId(op.id)
                                            }
                                        >
                                            <Pencil size={16} />
                                        </button>
                                    )}

                                    <button
                                        onClick={() =>
                                            handleDelete(op.id)
                                        }
                                        className="text-red-500"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Footer */}
                <div className="border-t px-6 py-3 flex justify-end">
                    <button
                        onClick={onClose}
                        className="rounded-md border px-4 py-2 text-sm"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}
