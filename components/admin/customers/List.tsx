"use client";

import { AdminCustomer } from "@/app/lib/admin/customers.api";

export default function CustomerList({
    customers,
    loading,
}: {
    customers: AdminCustomer[];
    loading?: boolean;
}) {
    return (
        <div className="rounded-xl border bg-white">
            {/* HEADER */}
            <div className="border-b px-6 py-4">
                <h2 className="text-sm font-semibold text-gray-900">
                    Customer List
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
                            <th className="px-6 py-3 text-left">
                                Total Cleans
                            </th>
                            <th className="px-6 py-3 text-left">
                                Water Saved
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {loading && (
                            <tr>
                                <td
                                    colSpan={6}
                                    className="px-6 py-8 text-center text-gray-500"
                                >
                                    Loading customers…
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
                                        seedling
                                    </td>

                                    <td className="px-6 py-4">0</td>

                                    <td className="px-6 py-4">0L</td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
