"use client";

import { useEffect, useState } from "react";
import api from "@/lib/axios";

type Slot = {
    id: string;
    time: string;
    capacity: number;
    isActive: boolean;
};

export default function AdminSlotsPage() {
    const [date, setDate] = useState("");
    const [slots, setSlots] = useState<Slot[]>([]);
    const [time, setTime] = useState("");
    const [capacity, setCapacity] = useState(1);
    const [loading, setLoading] = useState(false);

    async function fetchSlots(selectedDate: string) {
        const res = await api.get("/slots", {
            params: { date: selectedDate },
        });
        setSlots(res.data);
    }

    async function createSlot(e: React.FormEvent) {
        e.preventDefault();
        if (!date || !time || !capacity) return;

        setLoading(true);
        await api.post("/admin/slots", {
            date,
            slots: [{ time, capacity }],
        });

        setTime("");
        setCapacity(1);
        await fetchSlots(date);
        setLoading(false);
    }

    async function toggleSlot(slot: Slot) {
        if (slot.isActive) {
            await api.patch(`/admin/slots/${slot.id}/block`);
        } else {
            await api.patch(`/admin/slots/${slot.id}/unblock`);
        }
        fetchSlots(date);
    }

    useEffect(() => {
        if (date) fetchSlots(date);
    }, [date]);

    return (
        <div className="space-y-6">
            <h2 className="text-xl font-semibold">Manage Slots</h2>

            {/* Date Picker */}
            <div className="rounded-lg border bg-white p-4">
                <label className="block text-sm font-medium">
                    Select Date
                </label>
                <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="mt-2 rounded border px-3 py-2"
                />
            </div>

            {/* Add Slot */}
            {date && (
                <form
                    onSubmit={createSlot}
                    className="flex flex-wrap items-end gap-4 rounded-lg border bg-white p-4"
                >
                    <div>
                        <label className="block text-xs text-gray-500">
                            Time
                        </label>
                        <input
                            type="time"
                            value={time}
                            onChange={(e) => setTime(e.target.value)}
                            className="mt-1 rounded border px-2 py-1"
                        />
                    </div>

                    <div>
                        <label className="block text-xs text-gray-500">
                            Capacity
                        </label>
                        <input
                            type="number"
                            min={1}
                            value={capacity}
                            onChange={(e) =>
                                setCapacity(Number(e.target.value))
                            }
                            className="mt-1 w-20 rounded border px-2 py-1"
                        />
                    </div>

                    <button
                        disabled={loading}
                        className="rounded bg-black px-4 py-2 text-sm text-white"
                    >
                        Add Slot
                    </button>
                </form>
            )}

            {/* Slots List */}
            {date && (
                <div className="overflow-x-auto rounded-lg border bg-white">
                    <table className="w-full border-collapse text-sm">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="border px-4 py-2">Time</th>
                                <th className="border px-4 py-2">
                                    Capacity
                                </th>
                                <th className="border px-4 py-2">Status</th>
                                <th className="border px-4 py-2">Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {slots.map((slot) => (
                                <tr key={slot.id}>
                                    <td className="border px-4 py-2">
                                        {slot.time}
                                    </td>
                                    <td className="border px-4 py-2">
                                        {slot.capacity}
                                    </td>
                                    <td className="border px-4 py-2">
                                        {slot.isActive ? (
                                            <span className="text-green-600">
                                                Active
                                            </span>
                                        ) : (
                                            <span className="text-red-500">
                                                Blocked
                                            </span>
                                        )}
                                    </td>
                                    <td className="border px-4 py-2">
                                        <button
                                            onClick={() => toggleSlot(slot)}
                                            className="text-xs underline"
                                        >
                                            {slot.isActive
                                                ? "Block"
                                                : "Unblock"}
                                        </button>
                                    </td>
                                </tr>
                            ))}

                            {!slots.length && (
                                <tr>
                                    <td
                                        colSpan={4}
                                        className="px-4 py-6 text-center text-gray-400"
                                    >
                                        No slots for this date
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
