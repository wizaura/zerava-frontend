"use client";

import { useState } from "react";
import api from "@/lib/admin/axios";
import { Modal } from "../common/Modal";
import { Input } from "../common/Input";
import { Footer } from "../common/Footer";

type Props = {
    service?: any; // optional for edit
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
        isMaintenance: service?.isMaintenance ?? true,
    });

    const [loading, setLoading] = useState(false);

    const submit = async () => {
        if (!form.name || !form.slug) return;

        setLoading(true);
        try {
            await api.post("/admin/service-pricing/service", {
                id: service?.id, // 👈 KEY LINE
                ...form,
            });
            onSaved();
            onClose();
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal onClose={onClose} title="Service">
            <Input
                label="Service name"
                value={form.name}
                onChange={(v) => setForm({ ...form, name: v })}
                placeholder="Zerava Care+"
            />

            <Input
                label="Slug"
                value={form.slug}
                onChange={(v) => setForm({ ...form, slug: v })}
                placeholder="zerava-care-plus"
            />

            <Input
                label="Description"
                value={form.description}
                onChange={(v) => setForm({ ...form, description: v })}
                placeholder="Exterior + interior maintenance"
            />

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
                />
                Maintenance service
            </label>

            <Footer>
                <button
                    onClick={onClose}
                    className="rounded px-4 py-2 text-sm border"
                >
                    Cancel
                </button>
                <button
                    onClick={submit}
                    disabled={loading}
                    className="rounded bg-black px-4 py-2 text-sm text-white"
                >
                    {loading ? "Saving…" : "Save"}
                </button>
            </Footer>
        </Modal>
    );
}
