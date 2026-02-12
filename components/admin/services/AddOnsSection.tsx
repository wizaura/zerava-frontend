import adminApi from "@/lib/admin/axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { getApiError } from "@/lib/utils";
import AddOnModal from "./AddOnModal";
import { toggleAddOn } from "@/lib/admin/services.api";

export default function AddOnsSection({ addOns, reload }: any) {
    const [loadingId, setLoadingId] = useState<string | null>(null);
    const [open, setOpen] = useState(false);
    const [editingAddOn, setEditingAddOn] = useState<any | null>(null);

    async function handleToggle(id: string) {
        try {
            setLoadingId(id);

            await toggleAddOn(id);

            toast.success("Add-on updated");
            reload();
        } catch (err: any) {
            toast.error(getApiError(err));
        } finally {
            setLoadingId(null);
        }
    }

    return (
        <section className="space-y-6">
            {/* Header */}
            <div>
                <h2 className="text-xl font-semibold">
                    Add-ons
                </h2>
                <p className="text-sm text-gray-500">
                    Manage optional service add-ons
                </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
                {addOns.map((a: any) => (
                    <div
                        key={a.id}
                        className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
                    >
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="font-medium">
                                    {a.name}
                                </p>
                                <p className="text-sm text-gray-500">
                                    £{(a.price / 100).toFixed(2)} · {a.durationMin} min
                                </p>
                            </div>

                            <span
                                className={`text-xs px-2 py-1 rounded-full ${a.isActive
                                    ? "bg-emerald-100 text-emerald-700"
                                    : "bg-gray-200 text-gray-600"
                                    }`}
                            >
                                {a.isActive ? "Active" : "Inactive"}
                            </span>
                        </div>

                        {/* Actions */}
                        <div className="mt-4 flex gap-4 text-sm">
                            {/* Edit */}
                            <button
                                onClick={() => {
                                    setEditingAddOn(a);
                                    setOpen(true);
                                }}
                                className="text-green-600 hover:underline"
                            >
                                Edit
                            </button>

                            {/* Toggle */}
                            <button
                                onClick={() => handleToggle(a.id)}
                                disabled={loadingId === a.id}
                                className="text-red-600 hover:underline disabled:opacity-50"
                            >
                                {loadingId === a.id
                                    ? "Updating..."
                                    : a.isActive
                                        ? "Disable"
                                        : "Enable"}
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal */}
            {open && (
                <AddOnModal
                    addOn={editingAddOn}
                    onClose={() => {
                        setOpen(false);
                        setEditingAddOn(null);
                    }}
                    onSaved={reload}
                />
            )}
        </section>
    );
}
