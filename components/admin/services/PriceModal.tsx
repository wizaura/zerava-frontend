"use client";

import adminApi from "@/lib/admin/axios";
import { useState } from "react";

const PRICING_MODES = [
    { key: "ONE_OFF", label: "One-off" },
    { key: "SUBSCRIPTION", label: "Subscription" },
];

const BILLING_CYCLES = [
    { key: "MONTHLY", label: "Monthly" },
];

export default function PriceModal({
    service,
    price,
    vehicleCategories,
    onClose,
    onSaved,
}: any) {
    const [form, setForm] = useState({
        vehicleCategoryId: price?.vehicleCategoryId ?? "",
        pricingMode: price?.pricingMode ?? "ONE_OFF",
        billingCycle: price?.billingCycle ?? "",
        price: price ? String(price.price / 100) : "",
    });

    const isEdit = Boolean(price?.id);

    const canSubmit =
        Boolean(form.vehicleCategoryId) &&
        Boolean(form.pricingMode) &&
        Boolean(form.price);

    const submit = async () => {
        if (!canSubmit) return;

        await adminApi.post("/admin/service-pricing/price", {
            id: price?.id, // 👈 enables edit
            serviceId: service.id,
            vehicleCategoryId: form.vehicleCategoryId,
            pricingMode: form.pricingMode,
            ...(form.pricingMode === "SUBSCRIPTION" && {
                billingCycle: form.billingCycle || "MONTHLY",
            }),
            price: Math.round(Number(form.price) * 100),
        });

        onSaved();
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
            <div className="bg-white rounded-xl p-6 space-y-4 w-full max-w-md">
                <div className="flex justify-between items-center">
                    <h3 className="font-medium">
                        {isEdit ? "Edit Price" : "Add Price"}
                    </h3>
                    <button onClick={onClose}>✕</button>
                </div>

                {/* Vehicle Category */}
                <div>
                    <label className="text-xs font-medium text-gray-600">
                        Vehicle category
                    </label>
                    <select
                        value={form.vehicleCategoryId}
                        disabled={isEdit}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                vehicleCategoryId: e.target.value,
                            })
                        }
                        className="mt-1 w-full rounded border px-3 py-2 text-sm disabled:bg-gray-100"
                    >
                        <option value="">Select category</option>
                        {vehicleCategories.map((v: any) => (
                            <option key={v.id} value={v.id}>
                                {v.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Pricing Mode */}
                <div>
                    <label className="text-xs font-medium text-gray-600">
                        Pricing mode
                    </label>
                    <select
                        value={form.pricingMode}
                        disabled={isEdit}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                pricingMode: e.target.value,
                            })
                        }
                        className="mt-1 w-full rounded border px-3 py-2 text-sm disabled:bg-gray-100"
                    >
                        {PRICING_MODES.map((m) => (
                            <option key={m.key} value={m.key}>
                                {m.label}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Billing cycle */}
                {form.pricingMode === "SUBSCRIPTION" && (
                    <div>
                        <label className="text-xs font-medium text-gray-600">
                            Billing cycle
                        </label>
                        <select
                            value={form.billingCycle}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    billingCycle: e.target.value,
                                })
                            }
                            className="mt-1 w-full rounded border px-3 py-2 text-sm"
                        >
                            {BILLING_CYCLES.map((c) => (
                                <option key={c.key} value={c.key}>
                                    {c.label}
                                </option>
                            ))}
                        </select>
                    </div>
                )}

                {/* Price */}
                <div>
                    <label className="text-xs font-medium text-gray-600">
                        Price (£)
                    </label>
                    <input
                        type="number"
                        min="0"
                        step="0.01"
                        value={form.price}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                price: e.target.value,
                            })
                        }
                        className="mt-1 w-full rounded border px-3 py-2 text-sm"
                        placeholder="33.00"
                    />
                </div>

                {/* Footer */}
                <div className="flex justify-end gap-3 pt-4">
                    <button
                        onClick={onClose}
                        className="rounded border px-4 py-2 text-sm"
                    >
                        Cancel
                    </button>
                    <button
                        disabled={!canSubmit}
                        onClick={submit}
                        className={[
                            "rounded px-4 py-2 text-sm text-white",
                            canSubmit
                                ? "bg-black"
                                : "bg-gray-300 cursor-not-allowed",
                        ].join(" ")}
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
}
