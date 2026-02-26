// components/booking/FinalDetailsForm.tsx
"use client";

import { Loader2 } from "lucide-react";

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
    addressRef,
    regLoading,
    isValidUKReg,
    lookupVehicle,
}: Props) {
    const hasValidReg = bookingDraft.registrationNumber
        ? isValidUKReg(bookingDraft.registrationNumber)
        : false;

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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="relative">
                    <Input
                        label="Registration number"
                        value={bookingDraft.registrationNumber || ""}
                        onChange={(v: string) => {
                            const val = v.toUpperCase();
                            setBookingDraft((d: any) => ({
                                ...d,
                                registrationNumber: val,
                            }));

                            if (isValidUKReg(val)) {
                                lookupVehicle(val);
                            }
                        }}
                    />

                    {regLoading && (
                        <Loader2
                            className="absolute right-3 top-9 animate-spin"
                            size={18}
                        />
                    )}

                    {bookingDraft.registrationNumber && !hasValidReg && (
                        <p className="text-sm text-red-500 mt-1">
                            Enter valid UK registration (AB12 CDE)
                        </p>
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
            </div>

            {/* Address */}
            <div className="space-y-2">
                <label className="text-sm font-medium">Full address</label>
                <input
                    ref={addressRef}
                    value={bookingDraft.address || ""}
                    onChange={(e) =>
                        setBookingDraft((d: any) => ({
                            ...d,
                            address: e.target.value,
                        }))
                    }
                    className="w-full rounded-xl border px-4 py-3 text-sm"
                    placeholder="Start typing your address..."
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
                className="w-full rounded-xl border px-4 py-3 text-sm"
            />
        </div>
    );
}