"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import adminApi from "@/lib/admin/axios";
import { getApiError } from "@/lib/utils";

type Plan = {
    id: string;
    key: string;
    title: string;
    subtitle?: string;
    isActive: boolean;
    points: { id?: string; text: string; order: number }[];
};

export default function SubscriptionsSection() {
    const [plans, setPlans] = useState<Plan[]>([]);
    const [loading, setLoading] = useState(true);
    const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

    useEffect(() => {
        fetchPlans();
    }, []);

    async function fetchPlans() {
        try {
            setLoading(true);
            const { data } = await adminApi.get(
                "/admin/settings/subscriptions"
            );
            setPlans(data);
        } catch (err: any) {
            toast.error(getApiError(err));
        } finally {
            setLoading(false);
        }
    }

    async function createPlan() {
        try {
            const payload = {
                key: `plan-${Date.now()}`,
                title: "New Plan",
                subtitle: "",
                isActive: true,
                points: [],
            };

            await adminApi.post(
                "/admin/settings/subscriptions",
                payload
            );

            toast.success("Plan created");
            fetchPlans();
        } catch (err: any) {
            toast.error(getApiError(err));
        }
    }

    async function updatePlan(plan: Plan) {
        try {
            await adminApi.put(
                `/admin/settings/subscriptions/${plan.id}`,
                {
                    key: plan.key,
                    title: plan.title,
                    subtitle: plan.subtitle,
                    isActive: plan.isActive,
                    points: plan.points.map((p) => p.text),
                }
            );

            toast.success("Plan updated");
            fetchPlans();
        } catch (err: any) {
            toast.error(getApiError(err));
        }
    }

    async function deletePlan(id: string) {
        try {
            await adminApi.delete(
                `/admin/settings/subscriptions/${id}`
            );
            toast.success("Plan deleted");
            setConfirmDeleteId(null);
            fetchPlans();
        } catch (err: any) {
            toast.error(getApiError(err));
        }
    }

    function updateLocalPlan(id: string, updates: Partial<Plan>) {
        setPlans((prev) =>
            prev.map((p) =>
                p.id === id ? { ...p, ...updates } : p
            )
        );
    }

    function updatePoint(
        planId: string,
        index: number,
        value: string
    ) {
        setPlans((prev) =>
            prev.map((p) =>
                p.id === planId
                    ? {
                        ...p,
                        points: p.points.map((pt, i) =>
                            i === index ? { ...pt, text: value } : pt
                        ),
                    }
                    : p
            )
        );
    }

    function addPoint(planId: string) {
        setPlans((prev) =>
            prev.map((p) =>
                p.id === planId
                    ? {
                        ...p,
                        points: [
                            ...p.points,
                            { text: "", order: p.points.length + 1 },
                        ],
                    }
                    : p
            )
        );
    }

    function removePoint(planId: string, index: number) {
        setPlans((prev) =>
            prev.map((p) =>
                p.id === planId
                    ? {
                        ...p,
                        points: p.points.filter((_, i) => i !== index),
                    }
                    : p
            )
        );
    }

    return (
        <section className="space-y-6">

            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-semibold text-gray-800">
                        Subscription Plans
                    </h2>
                    <p className="text-sm text-gray-500">
                        Manage Zerava Care subscription plans
                    </p>
                </div>

                <button
                    onClick={createPlan}
                    className="rounded-full bg-emerald-600 px-5 py-2 text-sm font-medium text-white hover:bg-emerald-700 transition"
                >
                    + Add Plan
                </button>
            </div>

            {/* Plans */}
            <div className="space-y-6">

                {loading && (
                    <div className="bg-white rounded-2xl border border-gray-200 p-6 text-sm text-gray-500">
                        Loading plans...
                    </div>
                )}

                {!loading && plans.length === 0 && (
                    <div className="bg-white rounded-2xl border border-gray-200 p-6 text-sm text-gray-500">
                        No subscription plans created yet.
                    </div>
                )}

                {!loading &&
                    plans.map((plan) => (
                        <div
                            key={plan.id}
                            className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 space-y-5"
                        >
                            {/* Top Section */}
                            <div className="flex flex-col md:flex-row gap-4">

                                <input
                                    value={plan.title}
                                    onChange={(e) =>
                                        updateLocalPlan(plan.id, {
                                            title: e.target.value,
                                        })
                                    }
                                    className="flex-1 px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500"
                                />

                                <label className="flex items-center gap-2 text-sm text-gray-600">
                                    <input
                                        type="checkbox"
                                        checked={plan.isActive}
                                        onChange={(e) =>
                                            updateLocalPlan(plan.id, {
                                                isActive: e.target.checked,
                                            })
                                        }
                                        className="accent-emerald-600"
                                    />
                                    Active
                                </label>
                            </div>

                            {/* Points */}
                            <div className="space-y-3">
                                {plan.points.map((point, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center gap-3"
                                    >
                                        <span className="text-sm text-gray-500 w-6">
                                            {index + 1}.
                                        </span>

                                        <input
                                            value={point.text}
                                            onChange={(e) =>
                                                updatePoint(
                                                    plan.id,
                                                    index,
                                                    e.target.value
                                                )
                                            }
                                            className="flex-1 px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500"
                                        />

                                        <button
                                            onClick={() =>
                                                removePoint(plan.id, index)
                                            }
                                            className="text-red-500 text-sm"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                ))}

                                <button
                                    onClick={() => addPoint(plan.id)}
                                    className="text-emerald-600 text-sm hover:underline"
                                >
                                    + Add Point
                                </button>
                            </div>

                            {/* Actions */}
                            <div className="flex justify-between pt-4 border-t border-gray-200">
                                <button
                                    onClick={() =>
                                        setConfirmDeleteId(plan.id)
                                    }
                                    className="text-red-500 text-sm hover:underline"
                                >
                                    Delete Plan
                                </button>

                                <button
                                    onClick={() => updatePlan(plan)}
                                    className="px-5 py-2 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700"
                                >
                                    Save Changes
                                </button>
                            </div>
                        </div>
                    ))}
            </div>

            {/* Confirm Delete */}
            {confirmDeleteId && (
                <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
                    <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md">
                        <h3 className="text-lg font-semibold text-gray-800 mb-3">
                            Confirm Delete
                        </h3>
                        <p className="text-sm text-gray-600 mb-6">
                            Are you sure you want to delete this plan?
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
                                    deletePlan(confirmDeleteId)
                                }
                                className="px-5 py-2 bg-red-600 text-white rounded-lg"
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