"use client";

import { useEffect, useMemo, useState } from "react";
import { Ban } from "lucide-react";
import api from "@/lib/admin/axios";
import toast from "react-hot-toast";

const TIME_WINDOWS = [
    { label: "08:00 AM – 10:00 PM", from: "08:00", to: "10:00" },
    { label: "10:00 AM – 12:00 PM", from: "10:00", to: "12:00" },
    { label: "02:00 PM – 04:00 PM", from: "14:00", to: "16:00" },
    { label: "04:00 PM – 06:00 PM", from: "16:00", to: "18:00" },
];

type Zone = {
    id: string;
    postcodePrefix: string;
    serviceDay: number;
};

type AddBlockedSlotProps = {
    onSuccess: () => void;
    onCancel: () => void;
};

export default function AddBlockedSlot({
    onSuccess,
    onCancel,
}: AddBlockedSlotProps) {
    const [date, setDate] = useState("");
    const [timeWindow, setTimeWindow] = useState("");
    const [zonePrefix, setZonePrefix] = useState("");
    const [reason, setReason] = useState("");

    const [zones, setZones] = useState<Zone[]>([]);

    useEffect(() => {
        api.get("/admin/service-zones").then(res => setZones(res.data));
    }, []);

    function getServiceDay(date: string): number | null {
        if (!date) return null;
        const jsDay = new Date(date).getDay();
        return jsDay === 0 ? 7 : jsDay;
    }

    const selectedServiceDay = getServiceDay(date);

    const filteredZones = useMemo(() => {
        if (!selectedServiceDay) return [];
        return zones.filter(z => z.serviceDay === selectedServiceDay);
    }, [zones, selectedServiceDay]);

    useEffect(() => {
        setZonePrefix("");
    }, [date]);

    const handleCreate = async () => {
        if (!date || !timeWindow) {
            toast.error("Date and time window are required");
            return;
        }

        const selected = TIME_WINDOWS.find(w => w.label === timeWindow);

        await api.post("/admin/blocked-slots", {
            date,
            timeFrom: selected?.from,
            timeTo: selected?.to,
            zonePrefix: zonePrefix || undefined,
            reason: reason || undefined,
        });

        toast.success("Slot blocked successfully");
        onSuccess();
    };

    return (
        <div className="bg-white rounded-xl border p-6 space-y-4">
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="text-sm font-medium">Date</label>
                    <input
                        type="date"
                        value={date}
                        onChange={e => setDate(e.target.value)}
                        className="w-full border rounded-lg p-2"
                    />
                </div>

                <div>
                    <label className="text-sm font-medium">Time Window</label>
                    <select
                        value={timeWindow}
                        onChange={e => setTimeWindow(e.target.value)}
                        className="w-full border rounded-lg p-2"
                    >
                        <option value="">Select time…</option>
                        {TIME_WINDOWS.map(w => (
                            <option key={w.label}>{w.label}</option>
                        ))}
                    </select>
                </div>
            </div>

            <div>
                <label className="text-sm font-medium">Zone/Postcode (optional)</label>
                <select
                    value={zonePrefix}
                    onChange={e => setZonePrefix(e.target.value)}
                    className="w-full border rounded-lg p-2"
                    disabled={!date}
                >
                    <option value="">
                        {date ? "Select zone…" : "Select date first"}
                    </option>
                    {filteredZones.map(zone => (
                        <option key={zone.id} value={zone.postcodePrefix}>
                            {zone.postcodePrefix}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <label className="text-sm font-medium">Reason (optional)</label>
                <textarea
                    value={reason}
                    onChange={e => setReason(e.target.value)}
                    className="w-full border rounded-lg p-2"
                />
            </div>

            <div className="flex gap-3">
                <button
                    onClick={handleCreate}
                    className="flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-lg"
                >
                    <Ban size={16} /> Block Slot
                </button>
                <button
                    onClick={onCancel}
                    className="px-4 py-2 border rounded-lg"
                >
                    Cancel
                </button>
            </div>
        </div>
    );
}
