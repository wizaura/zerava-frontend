"use client";

import { useState } from "react";
import { Modal } from "../common/Modal";
import { Footer } from "../common/Footer";
import toast from "react-hot-toast";
import { getApiError } from "@/lib/utils";
import { createAddOn, updateAddOn } from "@/lib/admin/services.api";

const ICON_OPTIONS = [
    "droplet",
    "shield",
    "sparkles",
    "wind",
    "sun",
];

export default function AddOnModal({
    addOn,
    onClose,
    onSaved,
}: any) {
    const [form, setForm] = useState({
        name: addOn?.name || "",
        description: addOn?.description || "",
        highlightText: addOn?.highlightText || "",
        icon: addOn?.icon || "droplet",
        price: addOn?.price || 0,
        durationMin: addOn?.durationMin || 10,
        displayOrder: addOn?.displayOrder || 0,
    });

    const [loading, setLoading] = useState(false);

    const submit = async () => {
        if (!form.name.trim())
            return toast.error("Name required");

        if (form.price <= 0)
            return toast.error("Price must be greater than 0");

        if (form.durationMin < 5)
            return toast.error("Minimum duration 5 minutes");

        setLoading(true);

        try {
            const payload = {
                ...form,
                price: Number(form.price),
                durationMin: Number(form.durationMin),
            };

            if (addOn) {
                await updateAddOn(addOn.id, payload);
            } else {
                await createAddOn(payload);
            }

            toast.success(
                addOn ? "Add-on updated" : "Add-on created"
            );

            onSaved();
            onClose();
        } catch (err: any) {
            toast.error(getApiError(err));
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal onClose={onClose} title="Add-on">
            <div className="max-h-[70vh] pr-2 space-y-6">

                {/* 2x2 GRID */}
                <div className="grid grid-cols-2 gap-4">

                    <div>
                        <label className="text-sm font-medium">
                            Name
                        </label>
                        <input
                            className="mt-1 w-full rounded-md border px-3 py-2"
                            value={form.name}
                            onChange={(e) =>
                                setForm({ ...form, name: e.target.value })
                            }
                        />
                    </div>

                    <div>
                        <label className="text-sm font-medium">
                            Icon
                        </label>
                        <select
                            className="mt-1 w-full rounded-md border px-3 py-2"
                            value={form.icon}
                            onChange={(e) =>
                                setForm({ ...form, icon: e.target.value })
                            }
                        >
                            {ICON_OPTIONS.map((i) => (
                                <option key={i} value={i}>
                                    {i}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div>
                    <label className="text-sm font-medium">
                        Description
                    </label>
                    <textarea
                        className="mt-1 w-full rounded-md border px-3 py-2"
                        rows={3}
                        value={form.description}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                description: e.target.value,
                            })
                        }
                    />
                </div>

                <div>
                    <label className="text-sm font-medium">
                        Highlight Text
                    </label>
                    <input
                        className="mt-1 w-full rounded-md border px-3 py-2"
                        value={form.highlightText}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                highlightText: e.target.value,
                            })
                        }
                        placeholder="Adds extra protection and gloss"
                    />
                </div>

                {/* PRICE + DURATION */}
                <div className="grid grid-cols-2 gap-4">

                    <div>
                        <label className="text-sm font-medium">
                            Price (£)
                        </label>
                        <input
                            type="number"
                            className="mt-1 w-full rounded-md border px-3 py-2"
                            value={form.price / 100}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    price: Number(e.target.value) * 100,
                                })
                            }
                        />
                    </div>

                    <div>
                        <label className="text-sm font-medium">
                            Extra Time (min)
                        </label>
                        <input
                            type="number"
                            className="mt-1 w-full rounded-md border px-3 py-2"
                            value={form.durationMin}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    durationMin: Number(e.target.value),
                                })
                            }
                        />
                    </div>
                </div>

                <div>
                    <label className="text-sm font-medium">
                        Display Order
                    </label>
                    <input
                        type="number"
                        className="mt-1 w-full rounded-md border px-3 py-2"
                        value={form.displayOrder}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                displayOrder: Number(e.target.value),
                            })
                        }
                    />
                </div>
            </div>

            <Footer>
                <button
                    onClick={onClose}
                    className="rounded-full border px-4 py-2 text-sm"
                >
                    Cancel
                </button>
                <button
                    onClick={submit}
                    disabled={loading}
                    className="rounded-full bg-electric-teal px-5 py-2 text-sm font-medium text-black"
                >
                    {loading ? "Saving…" : "Save"}
                </button>
            </Footer>
        </Modal>
    );
}
