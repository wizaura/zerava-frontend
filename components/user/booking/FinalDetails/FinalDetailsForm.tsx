// components/booking/FinalDetailsForm.tsx
"use client";

import { userApi } from "@/lib/user/user.api";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

type Props = {
    bookingDraft: any;
    setBookingDraft: any;
    addressRef: React.RefObject<HTMLInputElement | null>;
    regLoading: boolean;
    isValidUKReg: (reg: string) => boolean;
    lookupVehicle: (reg: string) => void;
};

export default function FinalDetailsForm({
    bookingDraft,
    setBookingDraft,
    regLoading,
    isValidUKReg,
    lookupVehicle,
}: Props) {
    const [reg, setReg] = useState("");

    useEffect(() => {
        async function loadProfile() {
            try {
                const res = await userApi.getProfile();
                const user = res.data;

                setBookingDraft((prev: any) => ({
                    ...prev,
                    name: user.fullName || "",
                    email: user.email || "",
                    phone: user.phone || "",
                    registrationNumber: user.registrationNumber || "",
                }));

                // 🔥 IMPORTANT: also set local reg state
                if (user.registrationNumber) {
                    setReg(user.registrationNumber.toUpperCase());
                }

            } catch (err) {
                console.error("Failed to load profile", err);
            }
        }

        loadProfile();
    }, []);

    /* 🔹 2. TRIGGER LOOKUP WHEN REG CHANGES */
    useEffect(() => {
        if (!reg) return;

        const timer = setTimeout(() => {
            if (isValidUKReg(reg)) {
                lookupVehicle(reg);

                // 🔥 keep draft in sync
                setBookingDraft((prev: any) => ({
                    ...prev,
                    registrationNumber: reg,
                }));
            }
        }, 1500);

        return () => clearTimeout(timer);
    }, [reg]);

    /* 🔹 INPUT HANDLER */
    const handleRegChange = (value: string) => {
        const upper = value.toUpperCase();

        setReg(upper);

        setBookingDraft((prev: any) => ({
            ...prev,
            registrationNumber: upper,
        }));
    };

    return (
        <div className="rounded-2xl border bg-white p-6 shadow-sm space-y-6">

            {/* Personal Info */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Input
                    label="Full name"
                    value={bookingDraft.name}
                    onChange={(v: string) =>
                        setBookingDraft((d: any) => ({ ...d, name: v }))
                    }
                />
                <Input
                    label="Email"
                    type="email"
                    value={bookingDraft.email}
                    disabled
                    onChange={(v: string) =>
                        setBookingDraft((d: any) => ({ ...d, email: v }))
                    }
                />
                <Input
                    label="Phone"
                    value={bookingDraft.phone}
                    onChange={(v: string) =>
                        setBookingDraft((d: any) => ({ ...d, phone: v }))
                    }
                />
            </div>

            {/* Vehicle */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative">
                    <Input
                        label="Registration number"
                        value={reg}
                        onChange={(v: string) => {
                            const val = v.toUpperCase();
                            setReg(val);

                            setBookingDraft((d: any) => ({
                                ...d,
                                registrationNumber: val,
                            }));
                        }}
                    />

                    {regLoading && (
                        <Loader2
                            className="absolute right-3 top-9 animate-spin"
                            size={18}
                        />
                    )}
                </div>

                <Input
                    label="Make"
                    value={bookingDraft.make || ""}
                    onChange={(v: string) =>
                        setBookingDraft((d: any) => ({ ...d, make: v }))
                    }
                />

                <Input
                    label="Model"
                    value={bookingDraft.model || ""}
                    onChange={(v: string) =>
                        setBookingDraft((d: any) => ({ ...d, model: v }))
                    }
                />

                <Input
                    label="Colour"
                    value={bookingDraft.colour || ""}
                    onChange={(v: string) =>
                        setBookingDraft((d: any) => ({ ...d, colour: v }))
                    }
                />
            </div>

            {/* Parking */}
            <div className="space-y-2">
                <label className="text-sm font-medium">
                    Parking / access instructions
                </label>
                <textarea
                    rows={3}
                    value={bookingDraft.parkingInstructions || ""}
                    onChange={(e) =>
                        setBookingDraft((d: any) => ({
                            ...d,
                            parkingInstructions: e.target.value,
                        }))
                    }
                    className="w-full rounded-xl border px-4 py-3 text-sm"
                    placeholder="Gate code, driveway location, etc."
                />
            </div>
        </div>
    );
}

/* ================= INPUT ================= */
function Input({
    label,
    value,
    onChange,
    placeholder,
    type = "text",
    disabled = false,
}: any) {
    return (
        <div>
            <label className="mb-1 block text-xs font-medium text-gray-600">
                {label}
            </label>
            <input
                type={type}
                value={value || ""}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                disabled={disabled}
                className={`w-full rounded-xl border px-4 py-3 text-sm ${disabled
                        ? "bg-gray-100 text-gray-500 cursor-not-allowed"
                        : ""
                    }`}
            />
        </div>
    );
}