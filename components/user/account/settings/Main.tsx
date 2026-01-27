"use client";
import { useEffect, useState } from "react";
import { userApi } from "@/lib/user/user.api";
import { toast } from "react-hot-toast";

export default function UserSettings() {
    const [edit, setEdit] = useState(false);
    const [form, setForm] = useState<any>({});

    useEffect(() => {
        userApi.getProfile().then(res => setForm(res.data));
    }, []);

    const save = async () => {
        try {
            await userApi.updateProfile(form);
            toast.success("Profile updated");
            setEdit(false);
        } catch {
            toast.error("Update failed");
        }
    };

    return (
        <div className="max-w-3xl bg-white p-6 rounded-xl border">
            <div className="flex justify-between mb-6">
                <h2 className="text-lg font-semibold">Profile Settings</h2>
                <button onClick={() => edit ? save() : setEdit(true)} className="btn-primary">
                    {edit ? "Save" : "Edit"}
                </button>
            </div>

            <Field label="Full Name" value={form.fullName} disabled={!edit} onChange={v => setForm({ ...form, fullName: v })} />
            <Field label="Email" value={form.email} disabled />
            <Field label="Phone" value={form.phone} disabled={!edit} onChange={v => setForm({ ...form, phone: v })} />
            <Field label="Address" value={form.address} disabled={!edit} onChange={v => setForm({ ...form, address: v })} />
            <Field label="Postcode" value={form.postcode} disabled={!edit} onChange={v => setForm({ ...form, postcode: v })} />
        </div>
    );
}

const Field = ({ label, value, disabled, onChange }: any) => (
    <div className="mb-4">
        <label className="text-sm text-gray-500">{label}</label>
        <input
            value={value || ""}
            disabled={disabled}
            onChange={(e) => onChange?.(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 mt-1 disabled:bg-gray-100"
        />
    </div>
);
