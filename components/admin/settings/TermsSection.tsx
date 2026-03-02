"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import ZeravaModal from "./ZeravaModal";
import adminApi from "@/lib/admin/axios";
import { getApiError } from "@/lib/utils";

type Term = {
    id: string;
    heading: string;
    description: string;
    isActive: boolean;
};

export default function TermsSection() {
    const [terms, setTerms] = useState<Term[]>([]);
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState<Term | null>(null);
    const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

    useEffect(() => {
        fetchTerms();
    }, []);

    async function fetchTerms() {
        try {
            setLoading(true);
            const { data } = await adminApi.get("/admin/settings/terms");
            setTerms(data);
        } catch (err: any) {
            toast.error(getApiError(err));
        } finally {
            setLoading(false);
        }
    }

    async function saveTerm(formData: any) {
        try {
            if (selected) {
                await adminApi.put(
                    `/admin/settings/terms/${selected.id}`,
                    formData
                );
                toast.success("Term updated");
            } else {
                await adminApi.post("/admin/settings/terms", formData);
                toast.success("Term created");
            }

            setOpen(false);
            setSelected(null);
            fetchTerms();
        } catch (err: any) {
            toast.error(getApiError(err));
        }
    }

    async function deleteTerm(id: string) {
        try {
            await adminApi.delete(`/admin/settings/terms/${id}`);
            toast.success("Term deleted");
            setConfirmDeleteId(null);
            fetchTerms();
        } catch (err: any) {
            toast.error(getApiError(err));
        }
    }

    return (
        <section className="space-y-6">

            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-semibold text-gray-800">
                        Terms & Conditions
                    </h2>
                    <p className="text-sm text-gray-500">
                        Manage legal content shown to users
                    </p>
                </div>

                <button
                    onClick={() => {
                        setSelected(null);
                        setOpen(true);
                    }}
                    className="rounded-full bg-emerald-600 px-5 py-2 text-sm font-medium text-white hover:bg-emerald-700 transition"
                >
                    + Add Term
                </button>
            </div>

            {/* Content Card */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">

                {loading && (
                    <p className="text-gray-400 text-sm">
                        Loading terms...
                    </p>
                )}

                {!loading && terms.length === 0 && (
                    <p className="text-gray-400 text-sm">
                        No terms added yet.
                    </p>
                )}

                {!loading &&
                    terms.map((term, index) => (
                        <div
                            key={term.id}
                            className="flex justify-between items-start border-b border-gray-200 py-4 last:border-none"
                        >
                            <div className="space-y-1">
                                <p className="font-semibold text-gray-800">
                                    {index + 1}. {term.heading}
                                </p>

                                <p className="text-sm text-gray-600">
                                    {term.description}
                                </p>

                                <span
                                    className={`inline-block mt-1 px-3 py-1 text-xs rounded-full ${term.isActive
                                            ? "bg-emerald-100 text-emerald-700"
                                            : "bg-gray-200 text-gray-600"
                                        }`}
                                >
                                    {term.isActive ? "Active" : "Inactive"}
                                </span>
                            </div>

                            <div className="flex gap-5 text-sm">
                                <button
                                    onClick={() => {
                                        setSelected(term);
                                        setOpen(true);
                                    }}
                                    className="text-emerald-600 hover:underline"
                                >
                                    Edit
                                </button>

                                <button
                                    onClick={() => setConfirmDeleteId(term.id)}
                                    className="text-red-500 hover:underline"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
            </div>

            {/* Create / Edit Modal */}
            {open && (
                <ZeravaModal
                    title={selected ? "Edit Term" : "Add Term"}
                    initialData={selected}
                    onSave={saveTerm}
                    onClose={() => {
                        setOpen(false);
                        setSelected(null);
                    }}
                    fields={[
                        { name: "heading", label: "Heading", type: "text" },
                        { name: "description", label: "Description", type: "textarea" },
                        { name: "isActive", label: "Active", type: "checkbox" },
                    ]}
                />
            )}

            {/* Confirm Delete Modal */}
            {confirmDeleteId && (
                <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
                    <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md">
                        <h3 className="text-lg font-semibold text-gray-800 mb-3">
                            Confirm Delete
                        </h3>
                        <p className="text-sm text-gray-600 mb-6">
                            Are you sure you want to delete this term? This action cannot be undone.
                        </p>

                        <div className="flex justify-end gap-4">
                            <button
                                onClick={() => setConfirmDeleteId(null)}
                                className="px-4 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100"
                            >
                                Cancel
                            </button>

                            <button
                                onClick={() => deleteTerm(confirmDeleteId)}
                                className="px-5 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
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