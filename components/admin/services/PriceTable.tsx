import { useState } from "react";
import PriceModal from "./PriceModal";
import adminApi from "@/lib/admin/axios";
import toast from "react-hot-toast";
import { getApiError } from "@/lib/utils";
import { toggleServicePrice } from "@/lib/admin/services.api";

export default function PriceTable({
    service,
    vehicleCategories,
    reload,
}: any) {
    const [open, setOpen] = useState(false);
    const [editingPrice, setEditingPrice] = useState<any | null>(null);
    const [loadingId, setLoadingId] = useState<string | null>(null);

    async function handleToggle(id: string) {
        try {
            setLoadingId(id);

            await toggleServicePrice(id);

            reload();
        } catch (err: any) {
            toast.error(getApiError(err));
        } finally {
            setLoadingId(null);
        }
    }

    return (
        <div className="space-y-4">
            {/* 🔥 Header */}
            <div className="flex items-center justify-between">
                <p className="text-md font-semibold text-gray-700">
                    Pricing
                </p>

                <button
                    onClick={() => {
                        setEditingPrice(null);
                        setOpen(true);
                    }}
                    className="rounded-full bg-emerald-500 px-4 py-1.5 text-sm font-medium text-black hover:opacity-90"
                >
                    + Add Price
                </button>
            </div>

            {/* 🔥 Table */}
            <div className="overflow-hidden rounded-xl border">
                <table className="w-full text-sm">
                    <thead className="bg-gray-100 text-gray-600">
                        <tr>
                            <th className="px-4 py-3 text-left">
                                Vehicle
                            </th>
                            <th className="px-4 py-3 text-left">
                                Mode
                            </th>
                            <th className="px-4 py-3 text-right">
                                Price
                            </th>
                            <th className="px-4 py-3 text-right">
                                Actions
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {service.prices.map((p: any) => (
                            <tr
                                key={p.id}
                                className="border-t transition hover:bg-gray-50"
                            >
                                {/* Vehicle */}
                                <td className="px-4 py-3">
                                    {p.vehicleCategory.name}
                                </td>

                                {/* Mode */}
                                <td className="px-4 py-3">
                                    <span className="font-medium">
                                        {p.pricingMode === "ONE_OFF"
                                            ? "One-off"
                                            : "Subscription"}
                                    </span>

                                    {p.billingCycle && (
                                        <span className="ml-2 rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-600">
                                            {p.billingCycle}
                                        </span>
                                    )}
                                </td>

                                {/* Price */}
                                <td className="px-4 py-3 text-right font-semibold">
                                    £{(p.price / 100).toFixed(2)}
                                </td>

                                {/* Actions */}
                                <td className="px-4 py-3 text-right space-x-4 text-xs">
                                    <button
                                        onClick={() => {
                                            setEditingPrice(p);
                                            setOpen(true);
                                        }}
                                        className="text-electric-teal font-semibold hover:underline"
                                    >
                                        Edit
                                    </button>

                                    <button
                                        onClick={() => handleToggle(p.id)}
                                        disabled={loadingId === p.id}
                                        className={`${p.isActive ? "text-red-500" : "text-green-500"} hover:underline font-semibold disabled:opacity-50`}
                                    >
                                        {loadingId === p.id
                                            ? "Updating..."
                                            : p.isActive
                                                ? "Disable"
                                                : "Enable"}
                                    </button>
                                </td>
                            </tr>
                        ))}

                        {!service.prices.length && (
                            <tr>
                                <td
                                    colSpan={4}
                                    className="px-4 py-6 text-center text-gray-500"
                                >
                                    No pricing configured
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* 🔥 Modal */}
            {open && (
                <PriceModal
                    service={service}
                    price={editingPrice}
                    vehicleCategories={vehicleCategories}
                    onClose={() => setOpen(false)}
                    onSaved={reload}
                />
            )}
        </div>
    );
}
