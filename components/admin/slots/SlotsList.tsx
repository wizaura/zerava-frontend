import {
    Pencil,
    Trash2,
    Calendar,
    Clock,
    MapPin,
    User,
} from "lucide-react";
import { ServiceSlot } from "@/app/lib/admin/slots.api";

function formatDate(date: string) {
    return new Date(date).toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "2-digit",
        year: "numeric",
    });
}

export default function SlotsList({
    grouped,
    onEdit,
    onDelete,
}: {
    grouped: Record<string, ServiceSlot[]>;
    onEdit: (slot: ServiceSlot) => void;
    onDelete: (id: string) => void;
}) {
    return (
        <div className="space-y-6">
            {Object.entries(grouped).map(([operator, list]) => (
                <div
                    key={operator}
                    className="overflow-hidden rounded-xl border bg-white"
                >
                    {/* Operator Header */}
                    <div className="flex items-center gap-3 border-b px-6 py-4">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                            <User size={18} />
                        </div>

                        <div>
                            <p className="font-medium">{operator}</p>
                            <p className="text-xs text-gray-500">
                                {list.length} slot(s)
                            </p>
                        </div>
                    </div>

                    {/* Slot Rows */}
                    {list.map((slot) => (
                        <div
                            key={slot.id}
                            className="flex items-center justify-between px-6 py-4 border-b last:border-b-0 text-sm"
                        >
                            {/* Left content */}
                            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-gray-700">
                                {/* Date */}
                                <div className="flex items-center gap-2 font-medium">
                                    <Calendar size={14} />
                                    {formatDate(slot.date)}
                                </div>

                                {/* Time */}
                                <div className="flex items-center gap-2 text-gray-500">
                                    <Clock size={14} />
                                    {slot.timeFrom} – {slot.timeTo}
                                </div>

                                {/* Zone */}
                                <div className="flex items-center gap-2 text-gray-500">
                                    <MapPin size={14} />
                                    {slot.zonePrefix || "All zones"}
                                </div>

                                {/* Max bookings */}
                                <div className="text-gray-500">
                                    Max: {slot.maxBookings} bookings
                                </div>

                                {/* Status */}
                                <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700">
                                    {slot.status.toLowerCase()}
                                </span>
                            </div>

                            {/* Actions */}
                            <div className="flex items-center gap-4">
                                <button
                                    onClick={() => onEdit(slot)}
                                    className="text-gray-600 hover:text-black"
                                >
                                    <Pencil size={16} />
                                </button>

                                <button
                                    onClick={() => onDelete(slot.id)}
                                    className="text-red-500 hover:text-red-600"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
}
