"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { SubscriptionStatus } from "@/lib/admin/subscription.api";

export type AdminSubscription = {
    id: string;
    planName: string;
    serviceName: string;
    postcode: string;
    address: string;
    schedule: string;
    status: SubscriptionStatus;
    price: number;
    name: string;
    email: string;
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

    const filtered = subscriptions.filter((s) =>
        `${s.name} ${s.email} ${s.planName}`
            .toLowerCase()
            .includes(search.toLowerCase())
    );

    function formatStatus(status: string) {
        return status.replace(/_/g, " ");
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
                                    <th className="px-6 py-3 text-left">User</th>
                                    <th className="px-6 py-3 text-left">Service</th>
                                    <th className="px-6 py-3 text-left">Location</th>
                                    <th className="px-6 py-3 text-left">Schedule</th>
                                    <th className="px-6 py-3 text-left">Status</th>
                                    <th className="px-6 py-3 text-left">Price</th>
                                </tr>
                            </thead>

                            <tbody>
                                {filtered.map((s) => (
                                    <tr key={s.id} className="border-b">
                                        <td className="px-6 py-4 font-medium">
                                            {s.planName}
                                        </td>

                                        <td className="px-6 py-4 font-medium">
                                            {s.name}
                                            <div className="text-xs text-gray-500">
                                                {s.email}
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

                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </>
    );
}
