"use client";

import {
    Ban,
    Trash2,
    Calendar as CalendarIcon,
    Clock,
} from "lucide-react";
import api from "@/lib/admin/axios";
import toast from "react-hot-toast";

export default function BlockedSlotsList({
    slots,
    onRefresh,
}: {
    slots: any[];
    onRefresh: () => void;
}) {
    const handleDelete = async (id: string) => {
        await api.delete(`/admin/blocked-slots/${id}`);
        toast.success("Slot unblocked");
        onRefresh();
    };

    return (
        <div className="bg-white rounded-xl border">
            <div className="p-4 border-b font-medium">
                Blocked Slots ({slots.length})
            </div>

            {slots.length === 0 && (
                <p className="p-4 text-sm text-muted-foreground">
                    No blocked slots
                </p>
            )}

            {slots.map((slot) => (
                <div
                    key={slot.id}
                    className="flex items-center justify-between p-4 border-t"
                >
                    {/* Left content */}
                    <div className="flex items-start gap-4">
                        {/* Icon */}
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-100 text-red-600">
                            <Ban size={18} />
                        </div>

                        {/* Details */}
                        <div className="space-y-1">
                            <div className="flex items-center gap-4 text-sm font-medium">
                                <span className="flex items-center gap-1">
                                    <CalendarIcon size={14} />
                                    {new Date(slot.date).toDateString()}
                                </span>

                                <span className="flex items-center gap-1 text-muted-foreground">
                                    <Clock size={14} />
                                    {slot.timeFrom} – {slot.timeTo}
                                </span>
                            </div>

                            <div className="text-sm text-muted-foreground">
                                {slot.zonePrefix && (
                                    <span>Zone: {slot.zonePrefix}</span>
                                )}
                            </div>

                            {slot.reason && (
                                <div className="text-sm text-muted-foreground">
                                    {slot.reason}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Delete */}
                    <button
                        onClick={() => handleDelete(slot.id)}
                        className="text-red-500 hover:text-red-700"
                    >
                        <Trash2 size={16} />
                    </button>
                </div>
            ))}
        </div>
    );
}
