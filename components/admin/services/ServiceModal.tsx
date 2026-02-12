"use client";

import { useState, useEffect } from "react";
import api from "@/lib/admin/axios";
import { Modal } from "../common/Modal";
import { Input } from "../common/Input";
import { Footer } from "../common/Footer";
import toast from "react-hot-toast";
import { getApiError } from "@/lib/utils";
import { upsertService } from "@/lib/admin/services.api";

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
        isMaintenance: service?.isMaintenance ?? true,
    });

    const [loading, setLoading] = useState(false);

    // 🔥 Auto-generate slug if creating
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
        if (!form.name.trim()) {
            toast.error("Service name is required");
            return;
        }

        if (!form.slug.trim()) {
            toast.error("Slug is required");
            return;
        }

        if (form.durationMin < 10) {
            toast.error("Minimum duration is 10 minutes");
            return;
        }

        setLoading(true);

        try {
            await upsertService({
                id: service?.id,
                ...form,
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
            <div className="space-y-5">
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

                <Input
                    label="Description"
                    value={form.description}
                    onChange={(v) =>
                        setForm({ ...form, description: v })
                    }
                    placeholder="Exterior + interior maintenance"
                />

                {/* 🔥 Duration Field */}
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

                {/* Maintenance Toggle */}
                <label className="flex items-center gap-3 text-sm">
                    <input
                        type="checkbox"
                        checked={form.isMaintenance}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                isMaintenance: e.target.checked,
                            })
                        }
                        className="accent-emerald-500"
                    />
                    Maintenance Service
                </label>
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
