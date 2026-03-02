"use client";

import { useEffect, useState } from "react";

export default function ZeravaModal({
    title,
    initialData,
    fields,
    onSave,
    onClose,
}: any) {
    const [form, setForm] = useState<any>({});

    // Ensure form updates when editing different item
    useEffect(() => {
        setForm(initialData || {});
    }, [initialData]);

    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 px-4">
            <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl p-8">

                {/* Title */}
                <h2 className="text-2xl font-semibold mb-6 text-gray-800">
                    {title}
                </h2>

                {/* Fields */}
                <div className="space-y-5">
                    {fields.map((field: any) => (
                        <div key={field.name}>

                            <label className="block mb-2 text-sm font-medium text-gray-600">
                                {field.label}
                            </label>

                            {/* Textarea */}
                            {field.type === "textarea" && (
                                <textarea
                                    rows={4}
                                    value={form[field.name] || ""}
                                    onChange={(e) =>
                                        setForm({ ...form, [field.name]: e.target.value })
                                    }
                                    className="w-full px-3 py-2 rounded-lg border border-gray-300 
                             focus:outline-none focus:ring-2 focus:ring-emerald-500 
                             focus:border-emerald-500 transition"
                                />
                            )}

                            {/* Checkbox */}
                            {field.type === "checkbox" && (
                                <div className="flex items-center gap-3">
                                    <input
                                        type="checkbox"
                                        checked={form[field.name] ?? true}
                                        onChange={(e) =>
                                            setForm({
                                                ...form,
                                                [field.name]: e.target.checked,
                                            })
                                        }
                                        className="w-4 h-4 accent-emerald-600"
                                    />
                                    <span className="text-sm text-gray-600">
                                        Enable this
                                    </span>
                                </div>
                            )}

                            {/* Default Text Input */}
                            {field.type !== "textarea" &&
                                field.type !== "checkbox" && (
                                    <input
                                        type="text"
                                        value={form[field.name] || ""}
                                        onChange={(e) =>
                                            setForm({ ...form, [field.name]: e.target.value })
                                        }
                                        className="w-full px-3 py-2 rounded-lg border border-gray-300 
                               focus:outline-none focus:ring-2 focus:ring-emerald-500 
                               focus:border-emerald-500 transition"
                                    />
                                )}
                        </div>
                    ))}
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-4 mt-8">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100 transition"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={() => onSave(form)}
                        className="px-5 py-2 rounded-lg bg-emerald-600 text-white font-medium hover:bg-emerald-700 transition"
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
}