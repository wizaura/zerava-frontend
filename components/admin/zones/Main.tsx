"use client";

import { useEffect, useState } from "react";
import api from "@/lib/axios";

const WEEKDAYS = [
    { label: "Sunday", value: 0 },
    { label: "Monday", value: 1 },
    { label: "Tuesday", value: 2 },
    { label: "Wednesday", value: 3 },
    { label: "Thursday", value: 4 },
    { label: "Friday", value: 5 },
    { label: "Saturday", value: 6 },
];

type Zone = {
    id: string;
    postcode: string;
    weekday: number;
    isActive: boolean;
};

export default function AdminZonesPage() {
    const [zones, setZones] = useState<Zone[]>([]);
    const [postcode, setPostcode] = useState("");
    const [weekday, setWeekday] = useState<number | null>(null);
    const [loading, setLoading] = useState(false);

    async function fetchZones() {
        const res = await api.get("/admin/service-areas");
        setZones(res.data);
    }

    useEffect(() => {
        fetchZones();
    }, []);

    async function addZone(e: React.FormEvent) {
        e.preventDefault();
        if (!postcode || weekday === null) return;

        setLoading(true);
        await api.post("/admin/service-areas", {
            postcode: postcode.toUpperCase(),
            weekday,
        });
        setPostcode("");
        setWeekday(null);
        await fetchZones();
        setLoading(false);
    }

    async function deleteZone(id: string) {
        if (!confirm("Delete this zone?")) return;

        await api.delete(`/admin/service-areas/${id}`);
        fetchZones();
    }

    return (
        <div className="space-y-6">
            <h2 className="text-xl font-semibold">Service Zones</h2>

            {/* Add Zone */}
            <form
                onSubmit={addZone}
                className="flex flex-wrap items-end gap-4 rounded-lg border bg-white p-4"
            >
                <div>
                    <label className="block text-xs text-gray-500">
                        Postcode
                    </label>
                    <input
                        value={postcode}
                        onChange={(e) => setPostcode(e.target.value)}
                        placeholder="SO16"
                        className="mt-1 w-32 rounded border px-2 py-1 uppercase"
                    />
                </div>

                <div>
                    <label className="block text-xs text-gray-500">
                        Weekday
                    </label>
                    <select
                        value={weekday ?? ""}
                        onChange={(e) => setWeekday(Number(e.target.value))}
                        className="mt-1 rounded border px-2 py-1"
                    >
                        <option value="">Select</option>
                        {WEEKDAYS.map((d) => (
                            <option key={d.value} value={d.value}>
                                {d.label}
                            </option>
                        ))}
                    </select>
                </div>

                <button
                    disabled={loading}
                    className="rounded bg-black px-4 py-2 text-sm text-white"
                >
                    Add Zone
                </button>
            </form>

            {/* Zones List */}
            <div className="overflow-x-auto rounded-lg border bg-white">
                <table className="w-full border-collapse text-sm">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="border px-4 py-2">Postcode</th>
                            <th className="border px-4 py-2">Weekday</th>
                            <th className="border px-4 py-2">Status</th>
                            <th className="border px-4 py-2">Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {zones.map((z) => (
                            <tr key={z.id}>
                                <td className="border px-4 py-2">
                                    {z.postcode}
                                </td>
                                <td className="border px-4 py-2">
                                    {
                                        WEEKDAYS.find(
                                            (d) => d.value === z.weekday
                                        )?.label
                                    }
                                </td>
                                <td className="border px-4 py-2">
                                    {z.isActive ? (
                                        <span className="text-green-600">
                                            Active
                                        </span>
                                    ) : (
                                        <span className="text-gray-400">
                                            Inactive
                                        </span>
                                    )}
                                </td>
                                <td className="border px-4 py-2">
                                    <button
                                        onClick={() => deleteZone(z.id)}
                                        className="text-xs text-red-600 underline"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}

                        {!zones.length && (
                            <tr>
                                <td
                                    colSpan={4}
                                    className="px-4 py-6 text-center text-gray-400"
                                >
                                    No zones added yet
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
