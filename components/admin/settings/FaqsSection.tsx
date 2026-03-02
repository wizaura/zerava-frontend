"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import adminApi from "@/lib/admin/axios";
import { getApiError } from "@/lib/utils";
import FaqModal from "./FaqModal";
import FaqCategoriesSection from "./FaqCategoriesSection";

type Category = {
    id: string;
    name: string;
};

type Faq = {
    id: string;
    categoryId: string;
    category: Category;
    question: string;
    answer: string;
    isActive: boolean;
};

export default function FaqsSection() {
    const [faqs, setFaqs] = useState<Faq[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const [categoryOpen, setCategoryOpen] = useState(false);
    const [selected, setSelected] = useState<Faq | null>(null);
    const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

    useEffect(() => {
        fetchData();
    }, []);

    async function fetchData() {
        try {
            setLoading(true);

            const [faqRes, catRes] = await Promise.all([
                adminApi.get("/admin/settings/faqs"),
                adminApi.get("/admin/settings/faq-categories"),
            ]);

            setFaqs(faqRes.data);
            setCategories(catRes.data);
        } catch (err: any) {
            toast.error(getApiError(err));
        } finally {
            setLoading(false);
        }
    }

    async function saveFaq(data: any) {
        try {
            if (selected) {
                await adminApi.put(
                    `/admin/settings/faqs/${selected.id}`,
                    data
                );
                toast.success("FAQ updated");
            } else {
                await adminApi.post(
                    "/admin/settings/faqs",
                    data
                );
                toast.success("FAQ created");
            }

            setOpen(false);
            setSelected(null);
            fetchData();
        } catch (err: any) {
            toast.error(getApiError(err));
        }
    }

    async function deleteFaq(id: string) {
        try {
            await adminApi.delete(
                `/admin/settings/faqs/${id}`
            );
            toast.success("FAQ deleted");
            setConfirmDeleteId(null);
            fetchData();
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
                        FAQs
                    </h2>
                    <p className="text-sm text-gray-500">
                        Manage frequently asked questions
                    </p>
                </div>

                <div className="flex gap-2">
                    <button
                        onClick={() => {
                            setSelected(null);
                            setOpen(true);
                        }}
                        className="rounded-full bg-emerald-600 px-5 py-2 text-sm font-medium text-white hover:bg-emerald-700 transition"
                    >
                        + Add FAQ
                    </button>

                    <button
                        onClick={() => {
                            setSelected(null);
                            setCategoryOpen(true);
                        }}
                        className="rounded-full bg-emerald-600 px-5 py-2 text-sm font-medium text-white hover:bg-emerald-700 transition"
                    >
                        + Add FAQ Category
                    </button>
                </div>
            </div>

            {/* Card */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">

                {loading && (
                    <p className="text-gray-400 text-sm">
                        Loading FAQs...
                    </p>
                )}

                {!loading && faqs.length === 0 && (
                    <p className="text-gray-400 text-sm">
                        No FAQs created yet.
                    </p>
                )}

                {!loading &&
                    faqs.map((faq) => (
                        <div
                            key={faq.id}
                            className="border-b border-gray-200 py-4 last:border-none flex justify-between items-start"
                        >
                            <div className="space-y-1">
                                <p className="text-sm text-emerald-600 font-medium">
                                    {faq.category?.name}
                                </p>

                                <p className="font-semibold text-gray-800">
                                    {faq.question}
                                </p>

                                <p className="text-sm text-gray-600">
                                    {faq.answer}
                                </p>

                                <span
                                    className={`inline-block mt-1 px-3 py-1 text-xs rounded-full ${faq.isActive
                                        ? "bg-emerald-100 text-emerald-700"
                                        : "bg-gray-200 text-gray-600"
                                        }`}
                                >
                                    {faq.isActive ? "Active" : "Inactive"}
                                </span>
                            </div>

                            <div className="flex gap-5 text-sm">
                                <button
                                    onClick={() => {
                                        setSelected(faq);
                                        setOpen(true);
                                    }}
                                    className="text-emerald-600 hover:underline"
                                >
                                    Edit
                                </button>

                                <button
                                    onClick={() =>
                                        setConfirmDeleteId(faq.id)
                                    }
                                    className="text-red-500 hover:underline"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
            </div>

            {/* Modal */}
            {open && (
                <FaqModal
                    categories={categories}
                    initialData={selected}
                    onClose={() => {
                        setOpen(false);
                        setSelected(null);
                    }}
                    onSave={saveFaq}
                />
            )}

            {/* Confirm Delete */}
            {confirmDeleteId && (
                <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
                    <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md">
                        <h3 className="text-lg font-semibold text-gray-800 mb-3">
                            Confirm Delete
                        </h3>
                        <p className="text-sm text-gray-600 mb-6">
                            Are you sure you want to delete this FAQ?
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
                                    deleteFaq(confirmDeleteId)
                                }
                                className="px-5 py-2 bg-red-600 text-white rounded-lg"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {categoryOpen && (
                <FaqCategoriesSection />
            )}
        </section>
    );
}