import { useState } from "react";
import PriceModal from "./PriceModal";
import adminApi from "@/lib/admin/axios";

export default function PriceTable({
    service,
    vehicleCategories,
    reload,
}: any) {
    const [open, setOpen] = useState(false);
    const [editingPrice, setEditingPrice] = useState<any | null>(null);

    return (
        <div className="space-y-3">
            <div className="flex justify-between items-center">
                <p className="text-sm font-medium">Pricing</p>
                <button
                    onClick={() => {
                        setEditingPrice(null);
                        setOpen(true);
                    }}
                    className="text-sm underline"
                >
                    Add price
                </button>
            </div>

            <div className="overflow-hidden rounded-lg border">
                <table className="w-full text-sm">
                    <thead className="bg-gray-50 text-gray-600">
                        <tr>
                            <th className="px-3 py-2 text-left">
                                Vehicle
                            </th>
                            <th className="px-3 py-2 text-left">
                                Mode
                            </th>
                            <th className="px-3 py-2 text-right">
                                Price
                            </th>
                            <th className="px-3 py-2 text-right" />
                        </tr>
                    </thead>

                    <tbody>
                        {service.prices.map((p: any) => (
                            <tr
                                key={p.id}
                                className="border-t hover:bg-gray-50"
                            >
                                <td className="px-3 py-2">
                                    {p.vehicleCategory.name}
                                </td>

                                <td className="px-3 py-2">
                                    {p.pricingMode}
                                    {p.billingCycle && (
                                        <span className="text-xs text-gray-500">
                                            {" "}
                                            ({p.billingCycle})
                                        </span>
                                    )}
                                </td>

                                <td className="px-3 py-2 text-right font-medium">
                                    £{(p.price / 100).toFixed(2)}
                                </td>

                                <td className="px-3 py-2 text-right space-x-3">
                                    {/* EDIT */}
                                    <button
                                        onClick={() => {
                                            setEditingPrice(p);
                                            setOpen(true);
                                        }}
                                        className="text-xs text-blue-600"
                                    >
                                        Edit
                                    </button>

                                    {/* DISABLE */}
                                    <button
                                        onClick={() =>
                                            adminApi
                                                .patch(
                                                    `/admin/service-pricing/price/${p.id}/deactivate`,
                                                )
                                                .then(reload)
                                        }
                                        className="text-xs text-red-600"
                                    >
                                        Disable
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {open && (
                <PriceModal
                    service={service}
                    price={editingPrice} // 👈 key line
                    vehicleCategories={vehicleCategories}
                    onClose={() => setOpen(false)}
                    onSaved={reload}
                />
            )}
        </div>
    );
}
