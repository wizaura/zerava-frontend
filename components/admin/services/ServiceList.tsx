import { useState } from "react";
import PriceTable from "./PriceTable";
import ServiceModal from "./ServiceModal";
import adminApi from "@/lib/admin/axios";

export default function ServiceList({
    services,
    vehicleCategories,
    reload,
}: any) {
    const [open, setOpen] = useState(false);
    const [editingService, setEditingService] = useState<any | null>(null);

    return (
        <section className="space-y-4">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-medium">Services</h2>
                <button
                    onClick={() => {
                        setEditingService(null);
                        setOpen(true);
                    }}
                    className="rounded bg-black px-4 py-2 text-white"
                >
                    + Add Service
                </button>
            </div>

            {services.map((s: any) => (
                <div
                    key={s.id}
                    className="rounded-xl border bg-white p-4 space-y-4"
                >
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="font-medium">{s.name}</p>
                            <p className="text-xs text-gray-500">
                                {s.isMaintenance ? "Maintenance" : "Non-maintenance"}
                            </p>
                        </div>

                        <div className="flex gap-3">
                            {/* EDIT */}
                            <button
                                onClick={() => {
                                    setEditingService(s);
                                    setOpen(true);
                                }}
                                className="text-sm text-blue-600"
                            >
                                Edit
                            </button>

                            {/* TOGGLE */}
                            <button
                                onClick={() =>
                                    adminApi
                                        .patch(`/admin/service-pricing/service/${s.id}/toggle`)
                                        .then(reload)
                                }
                                className="text-sm text-red-600"
                            >
                                {s.isActive ? "Disable" : "Enable"}
                            </button>
                        </div>
                    </div>

                    <PriceTable
                        service={s}
                        vehicleCategories={vehicleCategories}
                        reload={reload}
                    />
                </div>
            ))}

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
