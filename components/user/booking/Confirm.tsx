"use client";

import { useState } from "react";
import api from "@/lib/user/axios";
import { BookingDraft } from "./Main";
import { Leaf } from "lucide-react";
import { useSelector } from "react-redux";

type Props = {
    bookingDraft: BookingDraft;
    setBookingDraft: React.Dispatch<React.SetStateAction<BookingDraft>>;
    onBack: () => void;
    onSuccess: () => void;
};

export default function FinalDetailsStep({
    bookingDraft,
    setBookingDraft,
    onBack,
    onSuccess,
}: Props) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { isAuthenticated } = useSelector((s: any) => s.auth);

    const addOnsTotal = bookingDraft.addOns.reduce(
        (sum, a) => sum + a.price,
        0,
    );

    const total =
        (bookingDraft.basePrice ?? 0) + addOnsTotal;

    function isValidUKReg(reg: string) {
        const cleaned = reg.toUpperCase().replace(/\s/g, "");

        const ukRegRegex = /^[A-Z]{2}[0-9]{2}[A-Z]{3}$/;

        return ukRegRegex.test(cleaned);
    }

    const hasValidReg =
        bookingDraft.registrationNumber
            ? isValidUKReg(bookingDraft.registrationNumber)
            : false;

    const canSubmit =
        isAuthenticated &&
        Boolean(bookingDraft.servicePriceId) &&
        Boolean(bookingDraft.timeFrom) &&
        Boolean(bookingDraft.timeTo) &&
        Boolean(bookingDraft.name?.trim()) &&
        Boolean(bookingDraft.email?.trim()) &&
        Boolean(bookingDraft.phone?.trim()) &&
        Boolean(bookingDraft.address?.trim()) &&
        Boolean(bookingDraft.postcode?.trim()) &&
        hasValidReg;

    async function submitBooking() {
        if (!canSubmit) return;

        setLoading(true);
        setError(null);

        try {
            const bookingRes = await api.post("/bookings", {
                servicePriceId: bookingDraft.servicePriceId,
                serviceSlotId: bookingDraft.serviceSlotId ?? null,
                templateId: bookingDraft.templateId ?? null,
                isTemplate: bookingDraft.isTemplate ?? false,
                operatorId: bookingDraft.operatorId,
                date: bookingDraft.date,
                timeFrom: bookingDraft.timeFrom,
                timeTo: bookingDraft.timeTo,
                address: bookingDraft.address,
                postcode: bookingDraft.postcode,
                make: bookingDraft.make,
                model: bookingDraft.model,
                registrationNumber: bookingDraft.registrationNumber,
                parkingInstructions: bookingDraft.parkingInstructions,
                notes: bookingDraft.notes,
                name: bookingDraft.name,
                email: bookingDraft.email,
                phone: bookingDraft.phone,
                addOnIds: bookingDraft.addOns.map(a => a.id),
            });

            const session = await api.post(
                "/payments/create-session",
                { bookingId: bookingRes.data.id },
            );

            window.location.href = session.data.url;
            onSuccess();
        } catch (err: any) {
            setError(
                err?.response?.data?.message ||
                "Failed to create booking",
            );
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="max-w-4xl mx-auto space-y-10">

            <h2 className="text-2xl font-medium text-gray-900">
                Final details
            </h2>

            {/* CONTACT + ADDRESS */}
            <div className="rounded-2xl border bg-white p-6 shadow-sm space-y-6">

                {/* Personal Info */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Input
                        label="Full name"
                        value={bookingDraft.name}
                        onChange={(v: string) =>
                            setBookingDraft(d => ({ ...d, name: v }))
                        }
                    />
                    <Input
                        label="Email"
                        type="email"
                        value={bookingDraft.email}
                        onChange={(v: string) =>
                            setBookingDraft(d => ({ ...d, email: v }))
                        }
                    />
                    <Input
                        label="Phone"
                        value={bookingDraft.phone}
                        onChange={(v: string) =>
                            setBookingDraft(d => ({ ...d, phone: v }))
                        }
                    />
                </div>

                {/* Vehicle Details */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Input
                        label="Make"
                        value={bookingDraft.make || ""}
                        onChange={(v: string) =>
                            setBookingDraft(d => ({ ...d, make: v }))
                        }
                    />
                    <Input
                        label="Model"
                        value={bookingDraft.model || ""}
                        onChange={(v: string) =>
                            setBookingDraft(d => ({ ...d, model: v }))
                        }
                    />
                    <div>
                        <Input
                            label="Registration number"
                            value={bookingDraft.registrationNumber || ""}
                            onChange={(v: string) =>
                                setBookingDraft(d => ({ ...d, registrationNumber: v }))
                            }
                        />
                        {bookingDraft.registrationNumber &&
                            !isValidUKReg(bookingDraft.registrationNumber) && (
                                <p className="text-sm text-red-500 mt-1">
                                    Please enter a valid UK registration (Eg: AB12 CDE)
                                </p>
                            )}
                    </div>
                </div>

                {/* Address */}
                <div className="space-y-2">
                    <label className="text-sm font-medium">
                        Full address
                    </label>
                    <input
                        value={bookingDraft.address || ""}
                        onChange={(e) =>
                            setBookingDraft(d => ({
                                ...d,
                                address: e.target.value,
                            }))
                        }
                        className="w-full rounded-xl border px-4 py-3 text-sm"
                        placeholder="House number, street, city"
                    />
                </div>

                {/* Parking Instructions */}
                <div className="space-y-2">
                    <label className="text-sm font-medium">
                        Parking / access instructions
                    </label>
                    <textarea
                        rows={3}
                        value={bookingDraft.parkingInstructions || ""}
                        onChange={(e) =>
                            setBookingDraft(d => ({
                                ...d,
                                parkingInstructions: e.target.value,
                            }))
                        }
                        className="w-full rounded-xl border px-4 py-3 text-sm"
                        placeholder="Gate code, driveway location, etc."
                    />
                </div>

            </div>

            {/* ECO BANNER */}
            <div className="flex items-center gap-3 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800">
                <Leaf size={16} />
                This clean saves <strong>150 litres of water</strong>
            </div>

            {/* SUMMARY */}
            <div className="rounded-2xl bg-black p-6 text-white space-y-4">
                <h3 className="text-lg font-medium">
                    Booking Summary
                </h3>

                <SummaryRow label="Service" value={bookingDraft.serviceName} />
                <SummaryRow label="Vehicle" value={bookingDraft.vehicleCategory} />
                <SummaryRow
                    label="Date & Time"
                    value={`${formatDate(bookingDraft.date)} · ${formatTimeRange(
                        bookingDraft.timeFrom,
                        bookingDraft.timeTo,
                    )}`}
                />

                <div className="border-t border-white/20 pt-4 space-y-2">
                    <SummaryRow
                        label="Base price"
                        value={`£${(bookingDraft.basePrice ?? 0) / 100}`}
                    />

                    {bookingDraft.addOns.map(a => (
                        <SummaryRow
                            key={a.id}
                            label={a.name}
                            value={`+£${a.price / 100}`}
                        />
                    ))}
                </div>

                <div className="border-t border-white/20 pt-4 flex justify-between text-xl font-semibold">
                    <span>Total</span>
                    <span>£{total / 100}</span>
                </div>
            </div>

            {error && (
                <p className="text-sm text-red-500">{error}</p>
            )}

            {/* FOOTER */}
            <div className="flex justify-between">
                <button
                    onClick={onBack}
                    className="rounded-full border px-6 py-2 text-sm"
                >
                    ← Back
                </button>

                <button
                    disabled={!canSubmit || loading}
                    onClick={submitBooking}
                    className={[
                        "rounded-full px-8 py-2 text-sm text-white",
                        canSubmit
                            ? "bg-black hover:bg-gray-800"
                            : "bg-gray-300 cursor-not-allowed",
                    ].join(" ")}
                >
                    {loading
                        ? "Processing…"
                        : !isAuthenticated
                            ? "Login & Continue"
                            : "Confirm & Pay"}
                </button>
            </div>
        </div>
    );
}
/* ---------- Helpers ---------- */

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
                onChange={e => onChange(e.target.value)}
                placeholder={placeholder}
                className="w-full rounded-xl border px-4 py-3 text-sm"
            />
        </div>
    );
}

function SummaryRow({
    label,
    value,
}: {
    label: string;
    value?: string | null;
}) {
    return (
        <div className="flex justify-between">
            <p className="text-gray-400">{label}</p>
            <p className="font-medium">
                {value || "—"}
            </p>
        </div>
    );
}

function formatDate(dateStr?: string | null) {
    if (!dateStr) return "—";
    return new Date(dateStr).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
    });
}

function formatTimeRange(
    from?: string | null,
    to?: string | null,
) {
    if (!from || !to) return "—";
    const f = new Date(`1970-01-01T${from}`);
    const t = new Date(`1970-01-01T${to}`);

    const fmt = (d: Date) =>
        d
            .toLocaleTimeString("en-GB", {
                hour: "numeric",
                minute: "2-digit",
                hour12: true,
            })
            .replace("am", "AM")
            .replace("pm", "PM");

    return `${fmt(f)} – ${fmt(t)}`;
}
