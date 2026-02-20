"use client";

import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import api from "@/lib/admin/axios";
import AddBlockedSlot from "./AddBlockedSlot";
import BlockedSlotsList from "./BlockedSlotsList";

export default function BlockedSlots() {
    const [blockedSlots, setBlockedSlots] = useState<any[]>([]);
    const [showForm, setShowForm] = useState(false);

    const fetchBlockedSlots = async () => {
        const res = await api.get("/admin/blocked-slots");
        setBlockedSlots(res.data);
    };

    useEffect(() => {
        fetchBlockedSlots();
    }, []);

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-2 sm:items-center justify-between">
                <div>
                    <h1 className="text-2xl font-semibold">Block Time Slots</h1>
                    <p className="text-sm text-muted-foreground">
                        Prevent bookings during specific times
                    </p>
                </div>

                <button
                    onClick={() => {
                        console.log("clicked");
                        setShowForm(v => !v);
                    }}
                    className="flex text-center items-center text-sm gap-2 bg-emerald-600 text-white px-4 py-2 rounded-full"
                >
                    <Plus size={16} /> Block Slot
                </button>
            </div>

            {showForm && (
                <AddBlockedSlot
                    onSuccess={() => {
                        setShowForm(false);
                        fetchBlockedSlots();
                    }}
                    onCancel={() => setShowForm(false)}
                />
            )}

            <BlockedSlotsList
                slots={blockedSlots}
                onRefresh={fetchBlockedSlots}
            />
        </div>
    );
}
