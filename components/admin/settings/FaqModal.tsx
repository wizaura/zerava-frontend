"use client";

import { useEffect, useState } from "react";

export default function FaqModal({
    categories,
    initialData,
    onClose,
    onSave,
}: any) {
    const [form, setForm] = useState<any>({
        categoryId: "",
        question: "",
        answer: "",
        isActive: true,
    });

    useEffect(() => {
        if (initialData) {
            setForm({
                categoryId: initialData.categoryId,
                question: initialData.question,
                answer: initialData.answer,
                isActive: initialData.isActive,
            });
        }
    }, [initialData]);

    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 px-4">
            <div className="bg-white w-full max-w-xl rounded-2xl shadow-2xl p-8">

                <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                    {initialData ? "Edit FAQ" : "Add FAQ"}
                </h2>

                <div className="space-y-5">

                    {/* Category */}
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-600">
                            Category
                        </label>
                        <select
                            value={form.categoryId}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    categoryId: e.target.value,
                                })
                            }
                            className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500"
                        >
                            <option value="">Select Category</option>
                            {categories.map((cat: any) => (
                                <option key={cat.id} value={cat.id}>
                                    {cat.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Question */}
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-600">
                            Question
                        </label>
                        <input
                            type="text"
                            value={form.question}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    question: e.target.value,
                                })
                            }
                            className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500"
                        />
                    </div>

                    {/* Answer */}
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-600">
                            Answer
                        </label>
                        <textarea
                            rows={4}
                            value={form.answer}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    answer: e.target.value,
                                })
                            }
                            className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500"
                        />
                    </div>

                    {/* Active */}
                    <div className="flex items-center gap-3">
                        <input
                            type="checkbox"
                            checked={form.isActive}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    isActive: e.target.checked,
                                })
                            }
                            className="accent-emerald-600"
                        />
                        <span className="text-sm text-gray-600">
                            Active
                        </span>
                    </div>
                </div>

                <div className="flex justify-end gap-4 mt-8">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 border border-gray-300 rounded-lg"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={() => onSave(form)}
                        className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
}