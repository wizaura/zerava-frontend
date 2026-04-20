"use client";

import { useEffect, useState } from "react";
import Field from "@/components/ui/FieldInput";
import { PostcodeSection } from "@/components/user/booking/ScheduleDetails/PostcodeSection";
import { userApi } from "@/lib/user/user.api";
import api from "@/lib/user/axios";
import { toast } from "react-hot-toast";
import { Settings } from "lucide-react";
import { useMemo } from "react";

export default function UserBookingDefaults() {
    const [edit, setEdit] = useState(false);
    const [form, setForm] = useState<any>({});
    const [initial, setInitial] = useState<any>({});

    const [postcode, setPostcode] = useState("");
    const [address, setAddress] = useState("");
    const [houseNumber, setHouseNumber] = useState("");
    const [regLoading, setRegLoading] = useState(false);
    const [services, setServices] = useState<any[]>([]);

    // 🔹 LOAD PROFILE
    useEffect(() => {
        userApi.getProfile().then((res) => {
            const data = res.data;

            setForm(data);
            setInitial(data);

            setAddress(data.address || "");
            setPostcode(data.postcode || "");
            setHouseNumber(data.houseNumber || "");
        });
    }, []);

    useEffect(() => {
        api.get("/services")
            .then((res) => setServices(res.data.services || []))
            .catch(() => { });
    }, []);

    // 🔍 VEHICLE LOOKUP
    const isLikelyReg = (reg: string) => reg.length >= 5;

    async function lookupVehicle(reg: string) {
        if (!isLikelyReg(reg)) return;

        try {
            setRegLoading(true);

            const res = await api.post("/vehicle/lookup", {
                registrationNumber: reg,
            });

            setForm((d: any) => ({
                ...d,
                make: res.data.make,
                model: res.data.model,
                colour: res.data.colour,
            }));
        } finally {
            setRegLoading(false);
        }
    }

    const selectedService = useMemo(() => {
        return services.find((s: any) => s.id === form.serviceId);
    }, [services, form.serviceId]);

    const vehicleCategories = useMemo(() => {
        if (!selectedService) return [];

        return selectedService.prices.map((p: any) => ({
            id: p.vehicleCategory.id,
            name: p.vehicleCategory.name,
        }));
    }, [selectedService]);

    const save = async () => {
        try {
            await userApi.updateProfile(form);
            toast.success("Defaults saved");
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
        <div className="max-w-3xl mx-auto rounded-2xl my-6 border bg-white p-8 space-y-6">

            {/* HEADER */}
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Booking Defaults</h2>

                {!edit ? (
                    <button
                        onClick={() => setEdit(true)}
                        className="flex items-center gap-2 rounded-full border px-5 py-2 text-sm"
                    >
                        <Settings size={16} />
                        Edit
                    </button>
                ) : (
                    <div className="flex gap-3">
                        <button onClick={cancel} className="rounded-full border px-5 py-2 text-sm">
                            Cancel
                        </button>
                        <button
                            onClick={save}
                            className="rounded-full bg-emerald-500 px-6 py-2 text-sm font-medium"
                        >
                            Save
                        </button>
                    </div>
                )}
            </div>

            {/* USER INFO */}
            <div className="grid md:grid-cols-2 gap-6">
                <Field
                    label="Full Name"
                    value={form.fullName}
                    disabled={!edit}
                    onChange={(v) => setForm({ ...form, fullName: v })}
                />

                <Field label="Email" value={form.email} disabled />

                <Field
                    label="Phone"
                    value={form.phone}
                    disabled={!edit}
                    onChange={(v) => setForm({ ...form, phone: v })}
                    className="md:col-span-2"
                />
            </div>

            <div className="space-y-4">
                <h3 className="font-medium">Default Service</h3>

                <div className="flex gap-3 flex-wrap">
                    {services.map((s: any) => {
                        const active = form.serviceId === s.id;

                        return (
                            <button
                                key={s.id}
                                disabled={!edit}
                                onClick={() =>
                                    edit &&
                                    setForm((d: any) => ({
                                        ...d,
                                        serviceId: s.id,
                                        vehicleCategoryId: "", // reset category
                                    }))
                                }
                                className={`px-5 py-2 rounded-full text-sm ${active ? "bg-black text-white" : "bg-gray-100"
                                    }`}
                            >
                                {s.name}
                            </button>
                        );
                    })}
                </div>
            </div>

            {form.serviceId && (
                <div className="space-y-4">
                    <h3 className="font-medium">Default Vehicle Size</h3>

                    <div className="flex gap-3 flex-wrap">
                        {vehicleCategories.map((c: any) => {
                            const active = form.vehicleCategoryId === c.id;

                            return (
                                <button
                                    key={c.id}
                                    disabled={!edit}
                                    onClick={() =>
                                        edit &&
                                        setForm((d: any) => ({
                                            ...d,
                                            vehicleCategoryId: c.id,
                                        }))
                                    }
                                    className={`px-5 py-2 rounded-full text-sm ${active ? "bg-black text-white" : "bg-gray-100"
                                        }`}
                                >
                                    {c.name}
                                </button>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* VEHICLE */}
            <div className="space-y-4">
                <Field
                    label="Default Registration Number"
                    value={form.registrationNumber}
                    disabled={!edit}
                    onChange={(v) => {
                        setForm({ ...form, registrationNumber: v });
                        lookupVehicle(v);
                    }}
                />

                {regLoading && <p className="text-sm text-gray-500">Fetching vehicle...</p>}

                <div className="grid md:grid-cols-3 gap-4">
                    <Field
                        label="Make"
                        value={form.make}
                        disabled={!edit}
                        onChange={(v) => setForm({ ...form, make: v })}
                    />

                    <Field
                        label="Model"
                        value={form.model}
                        disabled={!edit}
                        onChange={(v) => setForm({ ...form, model: v })}
                    />

                    <Field
                        label="Color"
                        value={form.colour}
                        disabled={!edit}
                        onChange={(v) => setForm({ ...form, colour: v })}
                    />
                </div>
            </div>

            {/* ADDRESS */}
            <PostcodeSection
                postcode={postcode}
                setPostcode={(val: string) => {
                    setPostcode(val);
                    setForm((d: any) => ({
                        ...d,
                        postcode: val,
                    }));
                }}
                address={address}
                setAddress={(val: string) => {
                    setAddress(val);
                    setForm((d: any) => ({ ...d, address: val }));
                }}
                houseNumber={houseNumber}
                setHouseNumber={setHouseNumber}
                bookingDraft={form}
                setBookingDraft={setForm}
                loading={false}
                error={null}
            />

            {/* PARKING */}
            <Field
                label="Default Parking Instructions"
                value={form.parkingInstructions}
                disabled={!edit}
                onChange={(v) =>
                    setForm((d: any) => ({
                        ...d,
                        parkingInstructions: v,
                    }))
                }
            />
        </div>
    );
}