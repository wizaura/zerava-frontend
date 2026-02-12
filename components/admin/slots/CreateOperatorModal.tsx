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
import { getApiError } from "@/lib/utils";

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
    const [editingValue, setEditingValue] = useState("");
    const [loading, setLoading] = useState(false);
    const [rowLoadingId, setRowLoadingId] = useState<string | null>(null);
    const [deleteId, setDeleteId] = useState<string | null>(null);

    useEffect(() => {
        if (open) load();
    }, [open]);

    async function load() {
        try {
            const data = await getOperators();
            setOperators(data);
        } catch (err: any) {
            toast.error(getApiError(err));
        }
    }

    // ---------------- ADD ----------------
    async function handleAdd() {
        const clean = name.trim();

        if (!clean) {
            toast.error("Operator name required");
            return;
        }

        if (clean.length < 3) {
            toast.error("Minimum 3 characters required");
            return;
        }

        if (clean.length > 50) {
            toast.error("Maximum 50 characters allowed");
            return;
        }

        try {
            setLoading(true);
            await createOperator({ name: clean });
            toast.success("Operator added");
            setName("");
            await load();
            onChanged();
        } catch (err: any) {
            toast.error(getApiError(err));
        } finally {
            setLoading(false);
        }
    }

    // ---------------- UPDATE ----------------
    async function handleUpdate(id: string) {
        const clean = editingValue.trim();

        if (!clean) {
            toast.error("Operator name required");
            return;
        }

        if (clean.length < 3) {
            toast.error("Minimum 3 characters required");
            return;
        }

        if (clean.length > 50) {
            toast.error("Maximum 50 characters allowed");
            return;
        }

        try {
            setRowLoadingId(id);
            await updateOperator(id, { name: clean });
            toast.success("Operator updated");
            setEditingId(null);
            await load();
            onChanged();
        } catch (err: any) {
            toast.error(getApiError(err));
        } finally {
            setRowLoadingId(null);
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
                            {loading ? "Adding..." : "Add"}
                        </button>
                    </div>

                    {/* Operator list */}
                    <div className="space-y-2 max-h-64 overflow-auto">
                        {operators.map((op) => (
                            <div
                                key={op.id}
                                className="flex gap-2 items-center justify-between rounded-md border px-3 py-2 text-sm"
                            >
                                {editingId === op.id ? (
                                    <input
                                        value={editingValue}
                                        autoFocus
                                        onChange={(e) =>
                                            setEditingValue(e.target.value)
                                        }
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter") {
                                                handleUpdate(op.id);
                                            }
                                        }}
                                        className="flex-1 rounded-md border border-gray-300 px-2 py-1 text-sm 
           focus:outline-none 
           focus:ring-2 focus:ring-electric-teal 
           focus:border-electric-teal"

                                    />
                                ) : (
                                    <span>{op.name}</span>
                                )}

                                <div className="flex gap-3 items-center">
                                    {editingId === op.id ? (
                                        <button
                                            disabled={rowLoadingId === op.id}
                                            onClick={() =>
                                                handleUpdate(op.id)
                                            }
                                        >
                                            <Check size={16} />
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() => {
                                                setEditingId(op.id);
                                                setEditingValue(op.name);
                                            }}
                                        >
                                            <Pencil size={16} />
                                        </button>
                                    )}

                                    <button
                                        onClick={() => setDeleteId(op.id)}
                                        disabled={rowLoadingId === op.id}
                                        className="text-red-500 disabled:opacity-40"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {deleteId && (
                    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60">
                        <div className="w-full max-w-sm rounded-xl bg-white p-6 shadow-xl">
                            <h3 className="text-lg font-semibold text-gray-900">
                                Delete Operator
                            </h3>
                            <p className="mt-2 text-sm text-gray-600">
                                Are you sure you want to delete this operator?
                                This action cannot be undone.
                            </p>

                            <div className="mt-6 flex justify-end gap-3">
                                <button
                                    onClick={() => setDeleteId(null)}
                                    className="rounded-md border px-4 py-2 text-sm"
                                >
                                    Cancel
                                </button>

                                <button
                                    onClick={async () => {
                                        try {
                                            setRowLoadingId(deleteId);
                                            await deleteOperator(deleteId);
                                            toast.success("Operator deleted");
                                            setDeleteId(null);
                                            await load();
                                            onChanged();
                                        } catch (err: any) {
                                            toast.error(getApiError(err));
                                        } finally {
                                            setRowLoadingId(null);
                                        }
                                    }}
                                    className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white"
                                >
                                    {rowLoadingId === deleteId
                                        ? "Deleting..."
                                        : "Delete"}
                                </button>
                            </div>
                        </div>
                    </div>
                )}

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
