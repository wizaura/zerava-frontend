"use client";

import { useEffect, useState } from "react";
import { userApi } from "@/lib/user/user.api";
import { toast } from "react-hot-toast";
import { Settings } from "lucide-react";
import Field from "@/components/ui/FieldInput";

type VehicleSize = "SMALL" | "MEDIUM" | "LARGE";

export default function UserSettings() {
    const [edit, setEdit] = useState(false);
    const [form, setForm] = useState<any>({});
    const [initial, setInitial] = useState<any>({});

    useEffect(() => {
        userApi.getProfile().then((res) => {
            setForm(res.data);
            setInitial(res.data);
        });
    }, []);

    const save = async () => {
        try {
            await userApi.updateProfile(form);
            toast.success("Profile updated");
            setInitial(form);
            setEdit(false);
        } catch {
            toast.error("Update failed");
        }
    };

    const cancel = () => {
        setForm(initial);
        setEdit(false);
    };

    return (
        <div className="max-w-3xl mt-6 mx-auto rounded-2xl border bg-white p-8">
            {/* Header */}
            <div className="mb-8 flex items-center justify-between">
                <h2 className="text-xl font-semibold">Profile Settings</h2>

                {!edit ? (
                    <button
                        onClick={() => setEdit(true)}
                        className="flex items-center gap-2 rounded-full border px-5 py-2 text-sm font-medium hover:bg-gray-50"
                    >
                        <Settings size={16} />
                        Edit
                    </button>
                ) : (
                    <div className="flex gap-3">
                        <button
                            onClick={cancel}
                            className="rounded-full border px-5 py-2 text-sm"
                        >
                            Cancel
                        </button>

                        <button
                            onClick={save}
                            className="rounded-full bg-emerald-500 px-6 py-2 text-sm font-medium text-black hover:bg-emerald-400"
                        >
                            Save
                        </button>
                    </div>
                )}
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <Field
                    label="Full Name"
                    value={form.fullName}
                    disabled={!edit}
                    onChange={(v) => setForm({ ...form, fullName: v })}
                />

                <Field
                    label="Email"
                    value={form.email}
                    disabled
                />

                <Field
                    label="Phone"
                    value={form.phone}
                    disabled={!edit}
                    onChange={(v) => setForm({ ...form, phone: v })}
                    className="md:col-span-2"
                />

                <Field
                    label="Default Address"
                    value={form.address}
                    disabled={!edit}
                    onChange={(v) => setForm({ ...form, address: v })}
                    className="md:col-span-2"
                />

                <Field
                    label="Default Postcode"
                    value={form.postcode}
                    disabled={!edit}
                    onChange={(v) => setForm({ ...form, postcode: v })}
                />

                {/* Vehicle size */}
                <div>
                    <label className="mb-3 block text-sm font-medium text-gray-700">
                        Default Vehicle Size
                    </label>

                    <div className="flex gap-3">
                        {(["SMALL", "MEDIUM", "LARGE"] as VehicleSize[]).map((size) => {
                            const active = form.vehicleSize === size;

                            return (
                                <button
                                    key={size}
                                    type="button"
                                    disabled={!edit}
                                    onClick={() =>
                                        edit && setForm({ ...form, vehicleSize: size })
                                    }
                                    className={[
                                        "min-w-[90px] rounded-full px-6 py-2.5 text-sm font-medium transition-all",
                                        active
                                            ? "bg-gray-900 text-white shadow-sm"
                                            : "bg-gray-100 text-gray-700 hover:bg-gray-200",
                                        !edit && "cursor-default",
                                    ].join(" ")}
                                >
                                    {size.charAt(0) + size.slice(1).toLowerCase()}
                                </button>
                            );
                        })}
                    </div>
                </div>

            </div>
        </div>
    );
}
