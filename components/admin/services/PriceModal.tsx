"use client";

import adminApi from "@/lib/admin/axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { getApiError } from "@/lib/utils";
import { upsertServicePrice } from "@/lib/admin/services.api";

const PRICING_MODES = [
    { key: "ONE_OFF", label: "One-off" },
    { key: "SUBSCRIPTION", label: "Subscription" },
];

const BILLING_CYCLES = [
    { key: "MONTHLY", label: "Monthly" },
    { key: "FORTNIGHTLY", label: "Bi-Weekly" },
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
        billingCycle: price?.billingCycle ?? "MONTHLY",
        stripePriceId: price?.stripePriceId ?? null,
        price: price ? String(price.price / 100) : "",
    });

    const [loading, setLoading] = useState(false);

    const isEdit = Boolean(price?.id);

    const canSubmit =
        Boolean(form.vehicleCategoryId) &&
        Boolean(form.pricingMode) &&
        Number(form.price) > 0 &&
        (form.pricingMode === "ONE_OFF" ||
            (form.pricingMode === "SUBSCRIPTION" &&
                Boolean(form.billingCycle) &&
                Boolean(form.stripePriceId)));


    const submit = async () => {
        if (!canSubmit) {
            toast.error("Please fill all required fields");
            return;
        }

        if (Number(form.price) <= 0) {
            toast.error("Price must be greater than 0");
            return;
        }

        setLoading(true);

        try {
            await upsertServicePrice({
                id: price?.id,
                serviceId: service.id,
                vehicleCategoryId: form.vehicleCategoryId,
                pricingMode: form.pricingMode,
                ...(form.pricingMode === "SUBSCRIPTION" && {
                    billingCycle: form.billingCycle || "MONTHLY",
                    stripePriceId: form.stripePriceId,
                }),
                price: Math.round(Number(form.price) * 100),
            });

            toast.success(
                isEdit ? "Price updated" : "Price created"
            );

            onSaved();
            onClose();
        } catch (err: any) {
            toast.error(getApiError(err));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">
                        {isEdit ? "Edit Price" : "Add Price"}
                    </h3>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-red-500"
                    >
                        ✕
                    </button>
                </div>

                {/* Vehicle Category */}
                <div>
                    <label className="block text-sm font-medium mb-1">
                        Vehicle Category
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
                        className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm
                                   focus:outline-none focus:ring-2 focus:ring-electric-teal
                                   disabled:bg-gray-100"
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
                    <label className="block text-sm font-medium mb-1">
                        Pricing Mode
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
                        className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm
                                   focus:outline-none focus:ring-2 focus:ring-electric-teal
                                   disabled:bg-gray-100"
                    >
                        {PRICING_MODES.map((m) => (
                            <option key={m.key} value={m.key}>
                                {m.label}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Billing Cycle */}
                {form.pricingMode === "SUBSCRIPTION" && (
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Billing Cycle
                        </label>
                        <select
                            value={form.billingCycle}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    billingCycle: e.target.value,
                                })
                            }
                            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm
                                       focus:outline-none focus:ring-2 focus:ring-electric-teal"
                        >
                            {BILLING_CYCLES.map((c) => (
                                <option key={c.key} value={c.key}>
                                    {c.label}
                                </option>
                            ))}
                        </select>
                    </div>
                )}

                {form.pricingMode === "SUBSCRIPTION" && (
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Stripe Price ID
                        </label>
                        <input
                            type="text"
                            value={form.stripePriceId}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    stripePriceId: e.target.value.trim(),
                                })
                            }
                            placeholder="price_1Nxxxxxxx"
                            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm
                       focus:outline-none focus:ring-2 focus:ring-electric-teal"
                        />
                        <p className="text-xs text-gray-500 mt-1">
                            Create this recurring price in Stripe Dashboard.
                        </p>
                    </div>
                )}

                {/* Price */}
                <div>
                    <label className="block text-sm font-medium mb-1">
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
                        placeholder="33.00"
                        className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm
                                   focus:outline-none focus:ring-2 focus:ring-electric-teal"
                    />
                </div>

                {/* Footer */}
                <div className="flex justify-end gap-3 pt-2">
                    <button
                        onClick={onClose}
                        className="rounded-full hover:bg-gray-200 border px-5 py-2 text-sm"
                    >
                        Cancel
                    </button>

                    <button
                        disabled={!canSubmit || loading}
                        onClick={submit}
                        className={[
                            "rounded-full px-6 py-2 text-sm font-medium text-black",
                            canSubmit
                                ? "bg-emerald-500 hover:bg-emerald-600"
                                : "bg-gray-300 cursor-not-allowed",
                        ].join(" ")}
                    >
                        {loading
                            ? "Saving..."
                            : isEdit
                                ? "Update Price"
                                : "Save Price"}
                    </button>
                </div>
            </div>
        </div>
    );
}
