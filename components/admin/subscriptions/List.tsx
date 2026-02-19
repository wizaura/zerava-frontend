"use client";

import { useState } from "react";
import { Search, MoreVertical } from "lucide-react";
import ConfirmModal from "@/components/ui/ConfirmModal";
import toast from "react-hot-toast";
import { SubscriptionStatus, updateAdminSubscription } from "@/lib/admin/subscription.api";

export type User = {
    fullName: string;
    email: string;
} 

export type AdminSubscription = {
    id: string;
    planName: string;
    serviceName: string;
    postcode: string;
    address: string;
    schedule: string;
    status: SubscriptionStatus;
    price: number;
    user: User;
};

const STATUS_STYLES: Record<string, string> = {
    active: "bg-emerald-100 text-emerald-700",
    trialing: "bg-emerald-100 text-emerald-700",

    past_due: "bg-yellow-100 text-yellow-700",
    unpaid: "bg-yellow-100 text-yellow-700",

    paused: "bg-gray-100 text-gray-700",

    canceled: "bg-red-100 text-red-700",

    incomplete: "bg-orange-100 text-orange-700",
    incomplete_expired: "bg-orange-100 text-orange-700",
};

export default function AdminSubscriptionsTable({
    subscriptions,
    loading,
    onRefresh,
}: {
    subscriptions: AdminSubscription[];
    loading?: boolean;
    onRefresh: () => void;
}) {
    const [search, setSearch] = useState("");
    const [activeMenu, setActiveMenu] = useState<string | null>(null);
    const [actionId, setActionId] = useState<string | null>(null);
    const [actionType, setActionType] =
        useState<"pause" | "cancel" | "activate" | null>(null);
    const [actionLoading, setActionLoading] = useState(false);

    const filtered = subscriptions.filter((s) =>
        `${s.user.fullName} ${s.user.email} ${s.planName}`
            .toLowerCase()
            .includes(search.toLowerCase())
    );

    function formatStatus(status: string) {
        return status.replace(/_/g, " ");
    }

    function canPause(status: string) {
        return status === "active" || status === "trialing";
    }

    function canActivate(status: string) {
        return status === "paused";
    }

    function canCancel(status: string) {
        return (
            status === "active" ||
            status === "trialing" ||
            status === "paused"
        );
    }

    async function handleAction() {
        if (!actionId || !actionType) return;

        try {
            setActionLoading(true);

            let newStatus: AdminSubscription["status"] | null = null;

            if (actionType === "pause") newStatus = "paused";
            if (actionType === "activate") newStatus = "active";
            if (actionType === "cancel") newStatus = "canceled";

            if (newStatus) {
                await updateAdminSubscription(actionId, {
                    status: newStatus,
                });
            }

            toast.success("Subscription updated");
            setActionId(null);
            setActionType(null);
            onRefresh();
        } catch (err) {
            toast.error("Action failed");
        } finally {
            setActionLoading(false);
        }
    }

    return (
        <>
            <div className="rounded-xl border bg-white">
                {/* HEADER */}
                <div className="flex items-center justify-between border-b p-4">
                    <div className="relative w-full max-w-md">
                        <Search
                            size={16}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                        />
                        <input
                            placeholder="Search subscriptions..."
                            className="w-full rounded-md border pl-9 pr-3 py-2 text-sm"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                </div>

                {/* TABLE */}
                {loading && (
                    <div className="p-6 text-sm text-gray-500">
                        Loading subscriptions…
                    </div>
                )}

                {!loading && (
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead className="border-b bg-gray-50 text-gray-500">
                                <tr>
                                    <th className="px-6 py-3 text-left">Plan</th>
                                    <th className="px-6 py-3 text-left">Service</th>
                                    <th className="px-6 py-3 text-left">Location</th>
                                    <th className="px-6 py-3 text-left">Schedule</th>
                                    <th className="px-6 py-3 text-left">Status</th>
                                    <th className="px-6 py-3 text-left">Price</th>
                                    <th className="px-6 py-3 text-right">Actions</th>
                                </tr>
                            </thead>

                            <tbody>
                                {filtered.map((s) => (
                                    <tr key={s.id} className="border-b">
                                        <td className="px-6 py-4 font-medium">
                                            {s.planName}
                                            <div className="text-xs text-gray-500">
                                                {s.user.fullName} {s.user.email}
                                            </div>
                                        </td>

                                        <td className="px-6 py-4">
                                            {s.serviceName}
                                        </td>

                                        <td className="px-6 py-4 text-xs text-gray-600">
                                            {s.postcode}
                                            <br />
                                            {s.address}
                                        </td>

                                        <td className="px-6 py-4">
                                            {s.schedule}
                                        </td>

                                        <td className="px-6 py-4">
                                            <span
                                                className={`rounded-full px-3 py-1 text-xs font-medium ${STATUS_STYLES[s.status]
                                                    }`}
                                            >
                                                {formatStatus(s.status)}
                                            </span>
                                        </td>

                                        <td className="px-6 py-4 font-medium">
                                            £{s.price.toFixed(2)}
                                        </td>

                                        <td className="relative px-6 py-4 text-right">
                                            <button
                                                onClick={() =>
                                                    setActiveMenu(
                                                        activeMenu === s.id
                                                            ? null
                                                            : s.id
                                                    )
                                                }
                                                className="rounded-md p-2 hover:bg-gray-100"
                                            >
                                                <MoreVertical size={16} />
                                            </button>

                                            {activeMenu === s.id && (
                                                <div className="absolute right-6 top-10 z-50 w-40 rounded-md border bg-white shadow-md">
                                                    {canPause(s.status) && (
                                                        <button
                                                            onClick={() => {
                                                                setActionId(
                                                                    s.id
                                                                );
                                                                setActionType(
                                                                    "pause"
                                                                );
                                                                setActiveMenu(
                                                                    null
                                                                );
                                                            }}
                                                            className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
                                                        >
                                                            Pause
                                                        </button>
                                                    )}

                                                    {canActivate(s.status) && (
                                                        <button
                                                            onClick={() => {
                                                                setActionId(
                                                                    s.id
                                                                );
                                                                setActionType(
                                                                    "activate"
                                                                );
                                                                setActiveMenu(
                                                                    null
                                                                );
                                                            }}
                                                            className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
                                                        >
                                                            Activate
                                                        </button>
                                                    )}

                                                    {canCancel(s.status) && (
                                                        <button
                                                            onClick={() => {
                                                                setActionId(
                                                                    s.id
                                                                );
                                                                setActionType(
                                                                    "cancel"
                                                                );
                                                                setActiveMenu(
                                                                    null
                                                                );
                                                            }}
                                                            className="block w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-100"
                                                        >
                                                            Cancel
                                                        </button>
                                                    )}
                                                </div>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            <ConfirmModal
                open={!!actionId}
                title="Confirm Action"
                description="Are you sure you want to proceed?"
                confirmText="Yes, Continue"
                loading={actionLoading}
                onCancel={() => {
                    setActionId(null);
                    setActionType(null);
                }}
                onConfirm={handleAction}
            />
        </>
    );
}
