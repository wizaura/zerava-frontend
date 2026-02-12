"use client";

import { useState } from "react";
import api from "@/lib/admin/axios";
import { Modal } from "../common/Modal";
import { Input } from "../common/Input";
import { Footer } from "../common/Footer";
import toast from "react-hot-toast";
import { getApiError } from "@/lib/utils";
import { createAddOn, updateAddOn } from "@/lib/admin/services.api";

type Props = {
    addOn?: any;
    onClose: () => void;
    onSaved: () => void;
};

export default function AddOnModal({
    addOn,
    onClose,
    onSaved,
}: Props) {
    const [form, setForm] = useState({
        name: addOn?.name || "",
        description: addOn?.description || "",
        price: addOn?.price || "",
        durationMin: addOn?.durationMin || "",
    });

    const [loading, setLoading] = useState(false);

    const submit = async () => {
        if (!form.name || !form.price || !form.durationMin) {
            toast.error("Please fill all fields");
            return;
        }

        setLoading(true);

        try {
            if (addOn) {
                await updateAddOn(addOn.id, {
                    ...form,
                    price: Number(form.price),
                    durationMin: Number(form.durationMin),
                });
            } else {
                await createAddOn({
                    ...form,
                    price: Number(form.price),
                    durationMin: Number(form.durationMin),
                });
            }

            toast.success(addOn ? "Add-on updated" : "Add-on created");

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
            <Input
                label="Name"
                value={form.name}
                onChange={(v) => setForm({ ...form, name: v })}
                placeholder="Wax Protection"
            />

            <Input
                label="Description"
                value={form.description}
                onChange={(v) => setForm({ ...form, description: v })}
                placeholder="Premium wax finish"
            />

            <Input
                label="Price (£)"
                type="number"
                value={form.price ? form.price / 100 : ""}
                onChange={(v) =>
                    setForm({
                        ...form,
                        price: Number(v) * 100,
                    })
                }
            />

            <Input
                label="Duration (minutes)"
                type="number"
                value={form.durationMin}
                onChange={(v) =>
                    setForm({
                        ...form,
                        durationMin: Number(v),
                    })
                }
            />

            <Footer>
                <button
                    onClick={onClose}
                    className="rounded-full px-4 py-2 text-sm border hover:bg-gray-200"
                >
                    Cancel
                </button>
                <button
                    onClick={submit}
                    disabled={loading}
                    className="rounded-full bg-emerald-500 hover:bg-emerald-600 px-4 py-2 text-sm text-white"
                >
                    {loading ? "Saving…" : "Save"}
                </button>
            </Footer>
        </Modal>
    );
}
