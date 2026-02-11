import { useState } from "react";
import AddOnModal from "./AddOnModal";
import api from "@/lib/admin/axios";

export default function AddOnsSection({ addOns, reload }: any) {
    const [open, setOpen] = useState(false);

    return (
        <section className="space-y-4">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-medium">Add-ons</h2>
                <button
                    onClick={() => setOpen(true)}
                    className="rounded bg-black px-4 py-2 text-white"
                >
                    + Add Add-on
                </button>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
                {addOns.map((a: any) => (
                    <div
                        key={a.id}
                        className="rounded-xl border p-4 bg-white"
                    >
                        <p className="font-medium">{a.name}</p>
                        <p className="text-sm text-gray-500">
                            £{a.price / 100} · {a.durationMin} min
                        </p>

                        <button
                            onClick={() =>
                                api.patch(`/admin/service-pricing/add-ons/${a.id}/toggle`)
                                    .then(reload)
                            }
                            className="mt-2 text-xs text-red-600"
                        >
                            {a.isActive ? "Disable" : "Enable"}
                        </button>
                    </div>
                ))}
            </div>

            {open && (
                <AddOnModal
                    onClose={() => setOpen(false)}
                    onSaved={reload}
                />
            )}
        </section>
    );
}
