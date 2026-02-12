"use client";

import { AdminCustomer } from "@/lib/admin/customers.api";
import { blockUser, unblockUser } from "@/lib/admin/customers.api";

export default function CustomerList({
    customers,
    loading,
    onStatusChange,
}: {
    customers: AdminCustomer[];
    loading?: boolean;
    onStatusChange: (data: AdminCustomer[]) => void;
}) {
    async function toggleBlock(user: AdminCustomer) {
        if (user.role === "admin") return; // safety

        if (user.isBlocked) {
            await unblockUser(user.id);
        } else {
            await blockUser(user.id);
        }

        // Update local state instantly
        const updated = customers.map((c) =>
            c.id === user.id
                ? { ...c, isBlocked: !c.isBlocked }
                : c
        );

        onStatusChange(updated);
    }

    return (
        <div className="rounded-xl border bg-white">
            {/* HEADER */}
            <div className="border-b px-6 py-4">
                <h2 className="text-sm font-semibold text-gray-900">
                    Accounts List
                </h2>
            </div>

            {/* TABLE */}
            <div className="overflow-x-auto">
                <table className="w-full text-sm">
                    <thead className="border-b bg-gray-50 text-gray-500">
                        <tr>
                            <th className="px-6 py-3 text-left">Name</th>
                            <th className="px-6 py-3 text-left">Email</th>
                            <th className="px-6 py-3 text-left">Role</th>
                            <th className="px-6 py-3 text-left">Eco Level</th>
                            <th className="px-6 py-3 text-left">Total Cleans</th>
                            <th className="px-6 py-3 text-left">Water Saved</th>
                            <th className="px-6 py-3 text-left">Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {loading && (
                            <tr>
                                <td
                                    colSpan={7}
                                    className="px-6 py-8 text-center text-gray-500"
                                >
                                    Loading accounts…
                                </td>
                            </tr>
                        )}

                        {!loading &&
                            customers.map((c) => (
                                <tr
                                    key={c.id}
                                    className="border-b last:border-b-0"
                                >
                                    <td className="px-6 py-4 font-medium">
                                        {c.name}
                                    </td>

                                    <td className="px-6 py-4 text-gray-600">
                                        {c.email}
                                    </td>

                                    <td className="px-6 py-4">
                                        <span
                                            className={`rounded-full px-3 py-1 text-xs font-medium
                                            ${
                                                c.role === "admin"
                                                    ? "bg-purple-100 text-purple-700"
                                                    : "bg-gray-100 text-gray-700"
                                            }`}
                                        >
                                            {c.role}
                                        </span>
                                    </td>

                                    <td className="px-6 py-4 capitalize">
                                        {c.ecoLevel}
                                    </td>

                                    <td className="px-6 py-4">
                                        {c.totalCleans}
                                    </td>

                                    <td className="px-6 py-4">
                                        {c.waterSaved}L
                                    </td>

                                    <td className="px-6 py-4">
                                        {c.role === "admin" ? (
                                            <span className="text-gray-400 text-xs">
                                                —
                                            </span>
                                        ) : (
                                            <button
                                                onClick={() =>
                                                    toggleBlock(c)
                                                }
                                                className={`rounded-md px-3 py-1 text-xs font-medium transition
                                                ${
                                                    c.isBlocked
                                                        ? "bg-green-100 text-green-700 hover:bg-green-200"
                                                        : "bg-red-100 text-red-700 hover:bg-red-200"
                                                }`}
                                            >
                                                {c.isBlocked
                                                    ? "Unblock"
                                                    : "Block"}
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
