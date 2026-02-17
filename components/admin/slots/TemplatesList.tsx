"use client";

import { useState } from "react";
import {
    Pencil,
    Trash2,
    User,
    Clock,
    MapPin,
    AlertTriangle,
} from "lucide-react";
import { SlotTemplate } from "@/lib/admin/slot-template.api";
import ConfirmModal from "@/components/ui/ConfirmModal";

const DAY_LABELS: Record<number, string> = {
    1: "Monday",
    2: "Tuesday",
    3: "Wednesday",
    4: "Thursday",
    5: "Friday",
    6: "Saturday",
    7: "Sunday",
};

export default function TemplatesList({
    templates,
    onEdit,
    onDelete,
}: {
    templates: SlotTemplate[];
    onEdit: (template: SlotTemplate) => void;
    onDelete: (id: string) => Promise<void>;
}) {
    const [deleteId, setDeleteId] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const grouped = templates.reduce<Record<string, SlotTemplate[]>>(
        (acc, template) => {
            const name = template.operator?.name || "Unknown";
            (acc[name] ??= []).push(template);
            return acc;
        },
        {}
    );

    async function handleConfirmDelete() {
        if (!deleteId) return;

        try {
            setLoading(true);
            await onDelete(deleteId);
            setDeleteId(null);
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
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
                                    {list.length} template(s)
                                </p>
                            </div>
                        </div>

                        {list.map((template) => (
                            <div
                                key={template.id}
                                className="flex items-center justify-between px-6 py-4 border-b last:border-b-0 text-sm"
                            >
                                <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-gray-700">
                                    <div className="font-medium">
                                        {DAY_LABELS[template.serviceDay]}
                                    </div>

                                    <div className="flex items-center gap-2 text-gray-500">
                                        <Clock size={14} />
                                        {template.timeFrom} – {template.timeTo}
                                    </div>

                                    <div className="flex items-center gap-2 text-gray-500">
                                        <MapPin size={14} />
                                        {template.zonePrefix || "All zones"}
                                    </div>

                                    <div className="text-gray-500">
                                        Max: {template.maxBookings}
                                    </div>
                                </div>

                                <div className="flex items-center gap-4">
                                    <button
                                        onClick={() => onEdit(template)}
                                        className="text-gray-600 hover:text-black"
                                    >
                                        <Pencil size={16} />
                                    </button>

                                    <button
                                        onClick={() => setDeleteId(template.id)}
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

            {/* Confirm Modal */}
            <ConfirmModal
                open={!!deleteId}
                title="Delete Template"
                description="Are you sure you want to delete this template? This action cannot be undone."
                confirmText="Delete"
                loading={loading}
                variant="danger"
                icon={<AlertTriangle className="text-red-600" />}
                onCancel={() => setDeleteId(null)}
                onConfirm={handleConfirmDelete}
            />
        </>
    );
}
