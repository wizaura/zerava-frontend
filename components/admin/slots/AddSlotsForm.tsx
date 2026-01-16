"use client";

import { Plus } from "lucide-react";
import { Operator, Status } from "@/lib/admin/slots.api";

export default function AddSlotForm({
    operators,
    operatorId,
    setOperatorId,
    date,
    setDate,
    timeFrom,
    setTimeFrom,
    timeTo,
    setTimeTo,
    maxBookings,
    setMaxBookings,
    zonePrefix,
    setZonePrefix,
    status,
    setStatus,
    onSubmit,
    loading,
    onAddOperator,
}: any) {
    return (
        <div className="rounded-xl border bg-white p-6">
            <h2 className="mb-6 text-sm font-semibold">Add New Slot</h2>

            <div className="grid grid-cols-2 gap-4">
                {/* Operator */}
                <div>
                    <div className="flex justify-between mb-1">
                        <label className="text-xs font-medium text-gray-600">
                            Operator
                        </label>
                        <button
                            type="button"
                            onClick={onAddOperator}
                            className="text-xs text-green-600 hover:underline"
                        >
                            + Add operator
                        </button>
                    </div>

                    <select
                        value={operatorId}
                        onChange={(e) => setOperatorId(e.target.value)}
                        className="w-full rounded-md border px-3 py-2 text-sm"
                    >
                        <option value="">Select operator</option>
                        {operators.map((op: Operator) => (
                            <option key={op.id} value={op.id}>
                                {op.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Date */}
                <div>
                    <label className="mb-1 block text-xs font-medium text-gray-600">
                        Date
                    </label>
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full rounded-md border px-3 py-2 text-sm"
                    />
                </div>

                <div>
                    <label className="mb-1 block text-xs font-medium text-gray-600">
                        Time From
                    </label>
                    <input
                        type="time"
                        value={timeFrom}
                        onChange={(e) => setTimeFrom(e.target.value)}
                        className="w-full rounded-md border px-3 py-2 text-sm"
                    />
                </div>

                <div>
                    <label className="mb-1 block text-xs font-medium text-gray-600">
                        Time To
                    </label>
                    <input
                        type="time"
                        value={timeTo}
                        onChange={(e) => setTimeTo(e.target.value)}
                        className="w-full rounded-md border px-3 py-2 text-sm"
                    />
                </div>

                <div>
                    <label className="mb-1 block text-xs font-medium text-gray-600">
                        Max Bookings
                    </label>
                    <input
                        type="number"
                        min={1}
                        value={maxBookings}
                        onChange={(e) => setMaxBookings(+e.target.value)}
                        className="w-full rounded-md border px-3 py-2 text-sm"
                    />
                </div>

                <div>
                    <label className="mb-1 block text-xs font-medium text-gray-600">
                        Status
                    </label>
                    <select
                        value={status}
                        onChange={(e) =>
                            setStatus(e.target.value as Status)
                        }
                        className="w-full rounded-md border px-3 py-2 text-sm"
                    >
                        <option value="ACTIVE">Active</option>
                        <option value="INACTIVE">Inactive</option>
                    </select>
                </div>

                <div className="col-span-2">
                    <label className="mb-1 block text-xs font-medium text-gray-600">
                        Zone / Postcode (optional)
                    </label>
                    <input
                        value={zonePrefix}
                        onChange={(e) => setZonePrefix(e.target.value)}
                        className="w-full rounded-md border px-3 py-2 text-sm"
                    />
                </div>
            </div>

            <div className="mt-6">
                <button
                    onClick={onSubmit}
                    disabled={loading}
                    className="rounded-md bg-green-500 px-5 py-2 text-sm font-medium text-black disabled:opacity-50"
                >
                    Add Slot
                </button>
            </div>
        </div>
    );
}
