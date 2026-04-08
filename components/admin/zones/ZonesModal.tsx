"use client";

import { LucideDelete, Pencil, X } from "lucide-react";
import { useAdminUI } from "@/lib/AdminUIContext";
import { useEffect, useState } from "react";
import {
    createZone,
    deleteZone,
    getZones,
    updateZone,
} from "@/lib/admin/zones.api";
import { getApiError } from "@/lib/utils";
import toast from "react-hot-toast";

const DAYS = [
    { label: "Monday", value: 1 },
    { label: "Tuesday", value: 2 },
    { label: "Wednesday", value: 3 },
    { label: "Thursday", value: 4 },
    { label: "Friday", value: 5 },
    { label: "Saturday", value: 6 },
    { label: "Sunday", value: 7 },
];

type Zone = {
    id: string;
    postcodePrefix: string;
    serviceDay: number;
    zoneCode: string;
};

export default function ZonesModal() {
    const { isZonesOpen, closeZones } = useAdminUI();

    const [zones, setZones] = useState<Zone[]>([]);
    const [postcode, setPostcode] = useState("");
    const [day, setDay] = useState(1);
    const [zoneCode, setZoneCode] = useState("");
    const [loading, setLoading] = useState(false);

    // ✅ Edit state
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editData, setEditData] = useState<Partial<Zone>>({});

    useEffect(() => {
        if (isZonesOpen) {
            loadZones();
        }
    }, [isZonesOpen]);

    async function loadZones() {
        const data = await getZones();
        setZones(data);
    }

    async function handleAdd() {
        const cleanPrefix = postcode.trim().toUpperCase();
        const cleanZone = zoneCode.trim().toUpperCase();

        if (!cleanPrefix) return alert("Postcode prefix required");
        if (cleanPrefix.length < 2)
            return alert("Minimum 2 characters required");
        if (!/^[A-Z0-9]+$/.test(cleanPrefix))
            return alert("Only letters and numbers allowed");
        if (!cleanZone) return alert("Zone code required");

        setLoading(true);

        try {
            await createZone({
                postcodePrefix: cleanPrefix,
                serviceDay: day,
                zoneCode: cleanZone,
            });

            setPostcode("");
            setZoneCode("");
            await loadZones();
        } catch (err: any) {
            toast.error(getApiError(err));
        } finally {
            setLoading(false);
        }
    }

    // ✅ Delete with confirm
    async function handleDelete(id: string) {
        const confirmed = window.confirm(
            "Are you sure you want to delete this zone?"
        );
        if (!confirmed) return;

        try {
            await deleteZone(id);
            setZones((prev) => prev.filter((z) => z.id !== id));
        } catch (err: any) {
            toast.error(getApiError(err));
        }
    }

    // ✅ Edit handlers
    function startEdit(zone: Zone) {
        setEditingId(zone.id);
        setEditData(zone);
    }

    function cancelEdit() {
        setEditingId(null);
        setEditData({});
    }

    async function saveEdit() {
        if (!editingId) return;

        try {
            await updateZone(editingId, {
                postcodePrefix: editData.postcodePrefix?.toUpperCase(),
                serviceDay: editData.serviceDay,
                zoneCode: editData.zoneCode?.toUpperCase(),
            });

            await loadZones();
            cancelEdit();
            toast.success("Zone updated successfully.")
        } catch (err: any) {
            toast.error(getApiError(err));
        }
    }

    if (!isZonesOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="w-full max-w-4xl max-h-[85vh] rounded-xl bg-white shadow-xl flex flex-col">
                
                {/* Header */}
                <div className="flex items-center justify-between border-b px-6 py-4">
                    <h2 className="text-lg font-semibold text-gray-800">
                        Service Zone Manager
                    </h2>
                    <button onClick={closeZones}>
                        <X size={18} />
                    </button>
                </div>

                {/* Body */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                    
                    {/* Add Zone */}
                    <div className="rounded-lg text-gray-800 bg-electric-teal/20 p-4">
                        <h3 className="mb-4 text-sm font-semibold">
                            Add New Zone
                        </h3>

                        <div className="grid grid-cols-4 gap-4">
                            <input
                                value={postcode}
                                onChange={(e) => setPostcode(e.target.value)}
                                placeholder="Postcode Prefix"
                                className="rounded-md border px-3 py-2 text-sm"
                            />

                            <select
                                value={day}
                                onChange={(e) =>
                                    setDay(Number(e.target.value))
                                }
                                className="rounded-md border px-3 py-2 text-sm"
                            >
                                {DAYS.map((d) => (
                                    <option key={d.value} value={d.value}>
                                        {d.label}
                                    </option>
                                ))}
                            </select>

                            <input
                                value={zoneCode}
                                onChange={(e) => setZoneCode(e.target.value)}
                                placeholder="Zone Code"
                                className="rounded-md border px-3 py-2 text-sm"
                            />

                            <button
                                onClick={handleAdd}
                                disabled={loading}
                                className="rounded-md bg-green-500 px-4 py-2 text-sm font-medium text-black disabled:opacity-50"
                            >
                                + Add
                            </button>
                        </div>
                    </div>

                    {/* Table */}
                    <div className="rounded-lg text-gray-800 border">
                        <div className="border-b px-4 py-3 text-sm font-semibold">
                            Configured Zones
                        </div>

                        <table className="w-full text-sm">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-4 py-2 text-left">Postcode</th>
                                    <th className="px-4 py-2 text-left">Service Day</th>
                                    <th className="px-4 py-2 text-left">Zone</th>
                                    <th className="px-4 py-2 text-left">Actions</th>
                                </tr>
                            </thead>

                            <tbody>
                                {zones.map((z) => {
                                    const isEditing = editingId === z.id;

                                    return (
                                        <tr key={z.id} className="border-t">
                                            
                                            {/* Postcode */}
                                            <td className="px-4 py-2">
                                                {isEditing ? (
                                                    <input
                                                        value={editData.postcodePrefix || ""}
                                                        onChange={(e) =>
                                                            setEditData((prev) => ({
                                                                ...prev,
                                                                postcodePrefix: e.target.value,
                                                            }))
                                                        }
                                                        className="border px-2 py-1 rounded"
                                                    />
                                                ) : (
                                                    z.postcodePrefix
                                                )}
                                            </td>

                                            {/* Day */}
                                            <td className="px-4 py-2">
                                                {isEditing ? (
                                                    <select
                                                        value={editData.serviceDay}
                                                        onChange={(e) =>
                                                            setEditData((prev) => ({
                                                                ...prev,
                                                                serviceDay: Number(e.target.value),
                                                            }))
                                                        }
                                                        className="border px-2 py-1 rounded"
                                                    >
                                                        {DAYS.map((d) => (
                                                            <option key={d.value} value={d.value}>
                                                                {d.label}
                                                            </option>
                                                        ))}
                                                    </select>
                                                ) : (
                                                    DAYS.find((d) => d.value === z.serviceDay)?.label
                                                )}
                                            </td>

                                            {/* Zone */}
                                            <td className="px-4 py-2">
                                                {isEditing ? (
                                                    <input
                                                        value={editData.zoneCode || ""}
                                                        onChange={(e) =>
                                                            setEditData((prev) => ({
                                                                ...prev,
                                                                zoneCode: e.target.value,
                                                            }))
                                                        }
                                                        className="border px-2 py-1 rounded"
                                                    />
                                                ) : (
                                                    <span className="rounded bg-gray-200 px-2 py-0.5 font-medium">
                                                        Zone {z.zoneCode}
                                                    </span>
                                                )}
                                            </td>

                                            {/* Actions */}
                                            <td className="px-4 py-2 flex gap-3">
                                                {isEditing ? (
                                                    <>
                                                        <button
                                                            onClick={saveEdit}
                                                            className="text-green-600 text-sm"
                                                        >
                                                            Save
                                                        </button>
                                                        <button
                                                            onClick={cancelEdit}
                                                            className="text-gray-500 text-sm"
                                                        >
                                                            Cancel
                                                        </button>
                                                    </>
                                                ) : (
                                                    <>
                                                        <button
                                                            onClick={() => startEdit(z)}
                                                            className="text-blue-500"
                                                        >
                                                            <Pencil size={16} />
                                                        </button>

                                                        <button
                                                            onClick={() => handleDelete(z.id)}
                                                            className="text-red-500"
                                                        >
                                                            <LucideDelete size={16} />
                                                        </button>
                                                    </>
                                                )}
                                            </td>
                                        </tr>
                                    );
                                })}

                                {!zones.length && (
                                    <tr>
                                        <td
                                            colSpan={4}
                                            className="px-4 py-6 text-center text-gray-500"
                                        >
                                            No zones configured
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}