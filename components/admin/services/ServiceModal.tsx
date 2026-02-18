"use client";

import { useState, useEffect } from "react";
import { Modal } from "../common/Modal";
import { Input } from "../common/Input";
import { Footer } from "../common/Footer";
import toast from "react-hot-toast";
import { getApiError } from "@/lib/utils";
import { upsertService } from "@/lib/admin/services.api";

const ICON_OPTIONS = [
    { label: "Sparkles", value: "sparkles" },
    { label: "Droplet", value: "droplet" },
    { label: "Shield", value: "shield" },
    { label: "Leaf", value: "leaf" },
];

type Props = {
    service?: any;
    onClose: () => void;
    onSaved: () => void;
};

export default function ServiceModal({
    service,
    onClose,
    onSaved,
}: Props) {
    const [form, setForm] = useState({
        name: service?.name || "",
        slug: service?.slug || "",
        description: service?.description || "",
        durationMin: service?.durationMin || 60,

        isPopular: service?.isPopular ?? false,
        badgeLabel: service?.badgeLabel || "",

        vehicleConditionNote: service?.vehicleConditionNote || "",
        highlightNote: service?.highlightNote || "",

        icon: service?.icon || "",
        displayOrder: service?.displayOrder || 0,
        waterSavedLitres: service?.waterSavedLitres || 0,
    });

    const [features, setFeatures] = useState<string[]>(
        service?.features?.map((f: any) => f.text) || [""]
    );

    const [loading, setLoading] = useState(false);

    /* 🔥 Auto-generate slug */
    useEffect(() => {
        if (!service && form.name) {
            const generated = form.name
                .toLowerCase()
                .replace(/[^a-z0-9\s-]/g, "")
                .replace(/\s+/g, "-");

            setForm((prev) => ({ ...prev, slug: generated }));
        }
    }, [form.name]);

    const submit = async () => {
        const cleanedFeatures = features
            .map((f) => f.trim())
            .filter((f) => f !== "");

        if (!form.name.trim()) {
            toast.error("Service name is required");
            return;
        }

        if (!form.slug.trim()) {
            toast.error("Slug is required");
            return;
        }

        if (form.slug.includes(" ")) {
            toast.error("Slug cannot contain spaces");
            return;
        }

        if (form.durationMin < 10) {
            toast.error("Minimum duration is 10 minutes");
            return;
        }

        if (form.waterSavedLitres < 0) {
            toast.error("Water saved cannot be negative");
            return;
        }

        if (form.displayOrder < 0) {
            toast.error("Display order cannot be negative");
            return;
        }

        if (cleanedFeatures.length === 0) {
            toast.error("At least one feature is required");
            return;
        }

        setLoading(true);

        try {
            await upsertService({
                id: service?.id,
                ...form,
                features: features
                    .filter((f) => f.trim() !== "")
                    .map((text, index) => ({
                        text,
                        order: index,
                    })),
            });

            toast.success(
                service ? "Service updated" : "Service created"
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
        <Modal
            onClose={onClose}
            title={service ? "Edit Service" : "Create Service"}
        >
            <div className="space-y-6">

                {/* ================= BASIC INFO ================= */}
                <div className="grid grid-cols-2 gap-4">
                    <Input
                        label="Service Name"
                        value={form.name}
                        onChange={(v) =>
                            setForm({ ...form, name: v })
                        }
                        placeholder="Zerava Care+"
                    />

                    <Input
                        label="Slug"
                        value={form.slug}
                        onChange={(v) =>
                            setForm({ ...form, slug: v })
                        }
                        placeholder="zerava-care-plus"
                    />
                </div>

                <Input
                    label="Description"
                    value={form.description}
                    onChange={(v) =>
                        setForm({ ...form, description: v })
                    }
                    placeholder="Exterior + interior maintenance"
                />

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Duration (minutes)
                        </label>
                        <input
                            type="number"
                            min={10}
                            value={form.durationMin}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    durationMin: Number(e.target.value),
                                })
                            }
                            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm
                                       focus:outline-none focus:ring-2 focus:ring-electric-teal"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Water Saved (Litres)
                        </label>
                        <input
                            type="number"
                            min={0}
                            value={form.waterSavedLitres}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    waterSavedLitres: Number(e.target.value),
                                })
                            }
                            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm
                                       focus:outline-none focus:ring-2 focus:ring-electric-teal"
                        />
                    </div>
                </div>

                {/* ================= MARKETING ================= */}
                <div className="border-t pt-6 space-y-4">
                    <h3 className="text-sm font-semibold text-gray-600 uppercase">
                        Marketing
                    </h3>

                    <div className="grid grid-cols-2 gap-4">
                        <label className="flex items-center gap-3 text-sm">
                            <input
                                type="checkbox"
                                checked={form.isPopular}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        isPopular: e.target.checked,
                                    })
                                }
                                className="accent-electric-teal"
                            />
                            Mark as Popular
                        </label>

                        <Input
                            label="Badge Label"
                            value={form.badgeLabel}
                            onChange={(v) =>
                                setForm({ ...form, badgeLabel: v })
                            }
                            placeholder="Most Popular"
                        />
                    </div>
                </div>

                {/* ================= SERVICE DETAILS ================= */}
                <div className="border-t pt-6 space-y-4">
                    <h3 className="text-sm font-semibold text-gray-600 uppercase">
                        Service Details
                    </h3>

                    <div className="grid grid-cols-2 gap-4">
                        <Input
                            label="Vehicle Condition Note"
                            value={form.vehicleConditionNote}
                            onChange={(v) =>
                                setForm({
                                    ...form,
                                    vehicleConditionNote: v,
                                })
                            }
                            placeholder="Light to moderate dirt (L1–L2)"
                        />

                        <Input
                            label="Highlight Note"
                            value={form.highlightNote}
                            onChange={(v) =>
                                setForm({
                                    ...form,
                                    highlightNote: v,
                                })
                            }
                            placeholder="Perfect for regular maintenance"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Icon
                            </label>

                            <select
                                value={form.icon}
                                onChange={(e) =>
                                    setForm({ ...form, icon: e.target.value })
                                }
                                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm
                   focus:outline-none focus:ring-2 focus:ring-electric-teal"
                            >
                                <option value="">Select icon</option>
                                {ICON_OPTIONS.map((icon) => (
                                    <option key={icon.value} value={icon.value}>
                                        {icon.label}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Display Order
                            </label>
                            <input
                                type="number"
                                min={0}
                                value={form.displayOrder}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        displayOrder: Number(e.target.value),
                                    })
                                }
                                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm
                                           focus:outline-none focus:ring-2 focus:ring-electric-teal"
                            />
                        </div>
                    </div>
                </div>

                {/* ================= FEATURES ================= */}
                <div className="border-t pt-6 space-y-4">
                    <div className="flex items-center justify-between">
                        <h3 className="text-sm font-semibold text-gray-600 uppercase">
                            Service Features
                        </h3>

                        <button
                            type="button"
                            onClick={() => setFeatures([...features, ""])}
                            className="text-sm text-electric-teal hover:underline"
                        >
                            + Add Feature
                        </button>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        {features.map((feature, index) => (
                            <div key={index} className="flex gap-2">
                                <input
                                    type="text"
                                    value={feature}
                                    onChange={(e) => {
                                        const updated = [...features];
                                        updated[index] = e.target.value;
                                        setFeatures(updated);
                                    }}
                                    placeholder="Waterless, paint-safe exterior clean"
                                    className="flex-1 rounded-md border border-gray-300 px-3 py-2 text-sm
                                               focus:outline-none focus:ring-2 focus:ring-electric-teal"
                                />

                                <button
                                    type="button"
                                    onClick={() =>
                                        setFeatures(
                                            features.filter((_, i) => i !== index)
                                        )
                                    }
                                    className="text-red-500 hover:text-red-700 text-sm"
                                >
                                    ✕
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <Footer>
                <button
                    onClick={onClose}
                    className="rounded-full border px-5 py-2 text-sm hover:bg-gray-200"
                >
                    Cancel
                </button>

                <button
                    onClick={submit}
                    disabled={loading}
                    className="rounded-full bg-emerald-500 hover:bg-emerald-600 px-6 py-2 text-sm font-medium text-black disabled:opacity-50"
                >
                    {loading ? "Saving..." : "Save Service"}
                </button>
            </Footer>
        </Modal>
    );
}
