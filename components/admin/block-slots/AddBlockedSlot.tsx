"use client";

import { useEffect, useMemo, useState } from "react";
import { Ban } from "lucide-react";
import api from "@/lib/admin/axios";
import toast from "react-hot-toast";
import { getApiError } from "@/lib/utils";

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
    const [timeFrom, setTimeFrom] = useState("08:00");
    const [timeTo, setTimeTo] = useState("10:00");
    const [zonePrefix, setZonePrefix] = useState("");
    const [reason, setReason] = useState("");

    const [zones, setZones] = useState<Zone[]>([]);
    const [loading, setLoading] = useState(false);

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

    const minDate = new Date().toISOString().split("T")[0];

    const handleCreate = async () => {
        if (!date) {
            toast.error("Date is required");
            return;
        }

        if (!timeFrom || !timeTo) {
            toast.error("Both time fields are required");
            return;
        }

        if (timeFrom >= timeTo) {
            toast.error("Time From must be earlier than Time To");
            return;
        }

        // Minimum duration 15 mins (optional rule)
        const from = new Date(`1970-01-01T${timeFrom}:00`);
        const to = new Date(`1970-01-01T${timeTo}:00`);
        const diffMin = (to.getTime() - from.getTime()) / 60000;

        if (diffMin < 15) {
            toast.error("Minimum block duration is 15 minutes");
            return;
        }

        if (reason && reason.length > 200) {
            toast.error("Reason must be under 200 characters");
            return;
        }

        try {
            setLoading(true);

            await api.post("/admin/blocked-slots", {
                date,
                timeFrom,
                timeTo,
                zonePrefix: zonePrefix || undefined,
                reason: reason?.trim() || undefined,
            });

            toast.success("Slot blocked successfully");
            onSuccess();
        } catch (err: any) {
            toast.error(getApiError(err));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white rounded-xl border p-6 space-y-6">
            {/* Date + Time Row */}
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="text-sm font-medium">Date</label>
                    <input
                        type="date"
                        min={minDate}
                        value={date}
                        onChange={e => setDate(e.target.value)}
                        className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-500"
                    />
                </div>

                <div>
                    <label className="text-sm font-medium">
                        Zone/Postcode
                    </label>
                    <select
                        value={zonePrefix}
                        onChange={e => setZonePrefix(e.target.value)}
                        disabled={!date}
                        className="w-full border rounded-lg px-3 py-2 text-sm disabled:bg-gray-100 focus:ring-2 focus:ring-emerald-500"
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

            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="text-sm font-medium">Time From</label>
                    <input
                        type="time"
                        value={timeFrom}
                        onChange={e => setTimeFrom(e.target.value)}
                        className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-500"
                    />
                </div>

                <div>
                    <label className="text-sm font-medium">Time To</label>
                    <input
                        type="time"
                        value={timeTo}
                        onChange={e => setTimeTo(e.target.value)}
                        className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-500"
                    />
                </div>
            </div>

            {/* Reason */}
            <div>
                <label className="text-sm font-medium">
                    Reason (optional)
                </label>
                <textarea
                    value={reason}
                    onChange={e => setReason(e.target.value)}
                    rows={3}
                    className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-500 resize-none"
                />
            </div>

            {/* Actions */}
            <div className="flex gap-3">
                <button
                    onClick={handleCreate}
                    disabled={loading}
                    className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-5 py-2 rounded-lg disabled:opacity-50"
                >
                    <Ban size={16} />
                    {loading ? "Blocking..." : "Block Slot"}
                </button>

                <button
                    onClick={onCancel}
                    className="px-5 py-2 border rounded-lg hover:bg-gray-100"
                >
                    Cancel
                </button>
            </div>
        </div>
    );
}
