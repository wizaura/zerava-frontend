"use client";

import { Operator, Status } from "@/app/lib/admin/slots.api";
import { Zone } from "@/app/lib/admin/zones.api";
import { useEffect, useMemo, useState } from "react";

export default function SlotForm({
    operators,
    slot,
    zones,
    onSubmit,
    onCancel,
}: {
    operators: Operator[];
    slot?: any;
    zones?: Zone[];
    onSubmit: (data: any) => void;
    onCancel: () => void;
}) {
    function toDateInputValue(date: string | Date | undefined) {
        if (!date) return "";
        return new Date(date).toISOString().split("T")[0];
    }

    const [form, setForm] = useState({
        operatorId: slot?.operator?.id || "",
        date: toDateInputValue(slot?.date),
        timeFrom: slot?.timeFrom || "09:00",
        timeTo: slot?.timeTo || "17:00",
        maxBookings: slot?.maxBookings || 4,
        zonePrefix: slot?.zonePrefix || "",
        status: slot?.status || "ACTIVE",
    });

    function update(key: string, value: any) {
        setForm((f) => ({ ...f, [key]: value }));
    }

    function getServiceDay(date: string): number | null {
        if (!date) return null;

        const jsDay = new Date(date).getDay();
        return jsDay === 0 ? 7 : jsDay;
    }

    const selectedServiceDay = getServiceDay(form.date);

    const filteredZones = useMemo(() => {
        if (!zones || !selectedServiceDay) return [];
        return zones.filter(
            (z) => z.serviceDay === selectedServiceDay
        );
    }, [zones, selectedServiceDay]);

    useEffect(() => {
        setForm((f) => ({ ...f, zonePrefix: "" }));
    }, [form.date]);

    return (
        <div className="rounded-xl border bg-white p-6">
            {/* Header */}
            <h3 className="mb-6 text-lg font-semibold">
                {slot ? "Edit Slot" : "Add Slot"}
            </h3>

            {/* Form Grid */}
            <div className="grid grid-cols-2 gap-x-6 gap-y-5">
                {/* Operator */}
                <div className="col-span-1">
                    <label className="mb-1 block text-sm font-medium">
                        Operator Name
                    </label>
                    <select
                        value={form.operatorId}
                        onChange={(e) => update("operatorId", e.target.value)}
                        className="w-full rounded-md border px-3 py-2 text-sm"
                    >
                        <option value="">Select operator</option>
                        {operators.map((o) => (
                            <option key={o.id} value={o.id}>
                                {o.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Date */}
                <div className="col-span-1">
                    <label className="mb-1 block text-sm font-medium">
                        Date
                    </label>
                    <input
                        type="date"
                        value={form.date}
                        onChange={(e) => update("date", e.target.value)}
                        className="w-full rounded-md border px-3 py-2 text-sm"
                    />
                </div>

                {/* Time + Max Bookings Row */}
                <div className="col-span-2 grid grid-cols-3 gap-6">
                    {/* Time From */}
                    <div>
                        <label className="mb-1 block text-sm font-medium">
                            Time From
                        </label>
                        <input
                            type="time"
                            value={form.timeFrom}
                            onChange={(e) => update("timeFrom", e.target.value)}
                            className="w-full rounded-md border px-3 py-2 text-sm"
                        />
                    </div>

                    {/* Time To */}
                    <div>
                        <label className="mb-1 block text-sm font-medium">
                            Time To
                        </label>
                        <input
                            type="time"
                            value={form.timeTo}
                            onChange={(e) => update("timeTo", e.target.value)}
                            className="w-full rounded-md border px-3 py-2 text-sm"
                        />
                    </div>

                    {/* Max Bookings */}
                    <div>
                        <label className="mb-1 block text-sm font-medium">
                            Max Bookings
                        </label>
                        <input
                            type="number"
                            min={1}
                            value={form.maxBookings}
                            onChange={(e) =>
                                update("maxBookings", Number(e.target.value))
                            }
                            className="w-full rounded-md border px-3 py-2 text-sm"
                        />
                    </div>
                </div>

                {/* Status */}
                <div className="col-span-1">
                    <label className="mb-1 block text-sm font-medium">
                        Status
                    </label>
                    <select
                        value={form.status}
                        onChange={(e) =>
                            update("status", e.target.value as Status)
                        }
                        className="w-full rounded-md border px-3 py-2 text-sm"
                    >
                        <option value="ACTIVE">Active</option>
                        <option value="INACTIVE">Inactive</option>
                    </select>
                </div>

                {/* Zone */}
                {/* Zone */}
                <div className="col-span-1">
                    <label className="mb-1 block text-sm font-medium">
                        Zone / Postcode
                    </label>

                    <select
                        disabled={!form.date}
                        value={form.zonePrefix}
                        onChange={(e) => update("zonePrefix", e.target.value)}
                        className="w-full rounded-md border px-3 py-2 text-sm disabled:bg-gray-100"
                    >
                        <option value="">
                            {!form.date
                                ? "Select date first"
                                : filteredZones.length === 0
                                    ? "No zones available"
                                    : "Select zone"}
                        </option>

                        {filteredZones.map((z) => (
                            <option key={z.id} value={z.postcodePrefix}>
                                {z.postcodePrefix} ({z.zoneCode})
                            </option>
                        ))}
                    </select>
                </div>

            </div>

            {/* Actions */}
            <div className="mt-6 flex gap-3">
                <button
                    onClick={() => onSubmit(form)}
                    className="rounded-md bg-emerald-500 px-6 py-2 text-sm font-medium text-black"
                >
                    {slot ? "Update Slot" : "Add Slot"}
                </button>

                <button
                    onClick={onCancel}
                    className="rounded-md border px-6 py-2 text-sm"
                >
                    Cancel
                </button>
            </div>
        </div>
    );
}
