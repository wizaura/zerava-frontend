import { Trash2 } from "lucide-react";
import { ServiceSlot } from "@/app/lib/admin/slots.api";

export default function SlotsList({
    grouped,
    onDelete,
}: {
    grouped: Record<string, ServiceSlot[]>;
    onDelete: (id: string) => void;
}) {
    return (
        <div className="space-y-6">
            {Object.entries(grouped).map(([operator, list]) => (
                <div key={operator} className="rounded-xl border bg-white">
                    <div className="border-b px-6 py-4">
                        <p className="font-medium">{operator}</p>
                        <p className="text-xs text-gray-500">
                            {list.length} slot(s)
                        </p>
                    </div>

                    {list.map((slot) => (
                        <div
                            key={slot.id}
                            className="flex justify-between border-t px-6 py-4 text-sm"
                        >
                            <div>
                                <p>
                                    {new Date(slot.date).toDateString()}
                                </p>
                                <p className="text-gray-500">
                                    {slot.timeFrom} – {slot.timeTo} ·{" "}
                                    {slot.zonePrefix || "All zones"}
                                </p>
                            </div>

                            <button
                                onClick={() => onDelete(slot.id)}
                                className="text-red-500"
                            >
                                <Trash2 size={16} />
                            </button>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
}
