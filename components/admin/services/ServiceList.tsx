import { useState } from "react";
import PriceTable from "./PriceTable";
import ServiceModal from "./ServiceModal";
import adminApi from "@/lib/admin/axios";
import toast from "react-hot-toast";
import { getApiError } from "@/lib/utils";
import { toggleService } from "@/lib/admin/services.api";

export default function ServiceList({
    services,
    vehicleCategories,
    reload,
}: any) {
    const [open, setOpen] = useState(false);
    const [editingService, setEditingService] = useState<any | null>(null);
    const [loadingId, setLoadingId] = useState<string | null>(null);

    async function handleToggle(id: string) {
        try {
            setLoadingId(id);

            await toggleService(id);

            reload();
        } catch (err: any) {
            toast.error(getApiError(err));
        } finally {
            setLoadingId(null);
        }
    }

    return (
        <section className="space-y-6">
            {/* 🔥 Section Header */}
            <div>
                <h2 className="text-xl font-semibold">Services</h2>
                <p className="text-sm text-gray-500">
                    Manage core services and pricing structures
                </p>
            </div>

            {/* 🔥 Service Cards */}
            <div className="space-y-5">
                {services.map((s: any) => (
                    <div
                        key={s.id}
                        className="rounded-2xl border bg-white p-6 shadow-sm transition hover:shadow-md"
                    >
                        {/* Header Row */}
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-lg font-semibold">
                                    {s.name}
                                </p>

                                <div className="mt-1 flex items-center gap-3 text-xs">
                                    {!s.isActive && (
                                        <span className="rounded-full bg-red-100 px-3 py-1 font-medium text-red-600">
                                            Disabled
                                        </span>
                                    )}
                                    <span
                                        className={`rounded-full px-3 py-1 font-medium ${s.isMaintenance
                                            ?? "bg-emerald-100 text-emerald-700"
                                            }`}
                                    >
                                        {s.isMaintenance ?? "Popular"}
                                    </span>

                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex items-center gap-4 text-sm">
                                <button
                                    onClick={() => {
                                        setEditingService(s);
                                        setOpen(true);
                                    }}
                                    className="text-electric-teal hover:underline"
                                >
                                    Edit
                                </button>

                                <button
                                    onClick={() => handleToggle(s.id)}
                                    disabled={loadingId === s.id}
                                    className={`${s.isActive
                                        ? "text-red-600"
                                        : "text-emerald-600"
                                        } hover:underline`}
                                >
                                    {loadingId === s.id
                                        ? "Updating..."
                                        : s.isActive
                                            ? "Disable"
                                            : "Enable"}
                                </button>
                            </div>
                        </div>

                        {/* Pricing Table */}
                        <div className="mt-6">
                            <PriceTable
                                service={s}
                                vehicleCategories={vehicleCategories}
                                reload={reload}
                            />
                        </div>
                    </div>
                ))}

                {!services.length && (
                    <div className="rounded-xl border bg-gray-50 p-6 text-center text-sm text-gray-500">
                        No services created yet
                    </div>
                )}
            </div>

            {/* 🔥 Modal */}
            {open && (
                <ServiceModal
                    service={editingService}
                    onClose={() => setOpen(false)}
                    onSaved={reload}
                />
            )}
        </section>
    );
}
