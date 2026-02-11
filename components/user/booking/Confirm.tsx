"use client";

import { useState } from "react";
import api from "@/lib/user/axios";
import { BookingDraft } from "./Main";

type Props = {
    bookingDraft: BookingDraft;
    setBookingDraft: React.Dispatch<React.SetStateAction<BookingDraft>>;
    onBack: () => void;
    onSuccess: () => void;
};

export default function ConfirmStep({
    bookingDraft,
    setBookingDraft,
    onBack,
    onSuccess,
}: Props) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const canSubmit =
        Boolean(bookingDraft.servicePriceId) &&
        Boolean(bookingDraft.serviceSlotId) &&
        Boolean(bookingDraft.timeFrom) &&
        Boolean(bookingDraft.timeTo) &&
        Boolean(bookingDraft.name?.trim()) &&
        Boolean(bookingDraft.email?.trim()) &&
        Boolean(bookingDraft.phone?.trim()) &&
        Boolean(bookingDraft.address?.trim()) &&
        Boolean(bookingDraft.postcode?.trim());

    const addOnsTotal = bookingDraft.addOns.reduce(
        (sum, a) => sum + a.price,
        0,
    );

    const total =
        (bookingDraft.basePrice ?? 0) + addOnsTotal;

    async function submitBooking() {
        if (!canSubmit) return;

        setLoading(true);
        setError(null);

        try {
            const bookingRes = await api.post("/bookings", {
                servicePriceId: bookingDraft.servicePriceId,
                serviceSlotId: bookingDraft.serviceSlotId,
                timeFrom: bookingDraft.timeFrom,
                timeTo: bookingDraft.timeTo,

                address: bookingDraft.address,
                postcode: bookingDraft.postcode,
                notes: bookingDraft.notes,

                name: bookingDraft.name,
                email: bookingDraft.email,
                phone: bookingDraft.phone,

                addOnIds: bookingDraft.addOns.map(a => a.id),
            });

            const session = await api.post(
                "/payments/create-session",
                {
                    bookingId: bookingRes.data.id,
                },
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
        <div className="max-w-3xl mx-auto space-y-10">
            <h2 className="text-2xl font-medium text-gray-900">
                Confirm your booking
            </h2>

            {/* Contact Details */}
            <div className="rounded-2xl border bg-white p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Input
                        label="Full name"
                        value={bookingDraft.name}
                        onChange={(v) =>
                            setBookingDraft(d => ({
                                ...d,
                                name: v,
                            }))
                        }
                        placeholder="John Smith"
                    />
                    <Input
                        label="Email"
                        type="email"
                        value={bookingDraft.email}
                        onChange={(v) =>
                            setBookingDraft(d => ({
                                ...d,
                                email: v,
                            }))
                        }
                        placeholder="john@email.com"
                    />
                    <Input
                        label="Phone"
                        value={bookingDraft.phone}
                        onChange={(v) =>
                            setBookingDraft(d => ({
                                ...d,
                                phone: v,
                            }))
                        }
                        placeholder="07xxx xxxxxx"
                    />
                </div>
            </div>

            {/* Booking Summary */}
            <div className="rounded-2xl bg-gradient-to-br from-[#0A0A0A] to-[#111] p-6 text-white space-y-4">
                <h3 className="text-lg font-medium">
                    Booking Summary
                </h3>

                <div className="space-y-3 text-sm">
                    <SummaryRow
                        label="Service"
                        value={bookingDraft.serviceName}
                    />
                    <SummaryRow
                        label="Vehicle"
                        value={bookingDraft.vehicleCategory}
                    />
                    <SummaryRow
                        label="Date & Time"
                        value={`${formatDate(
                            bookingDraft.date,
                        )} · ${formatTimeRange(
                            bookingDraft.timeFrom,
                            bookingDraft.timeTo,
                        )}`}
                    />
                    <SummaryRow
                        label="Location"
                        value={bookingDraft.postcode}
                    />
                </div>
                <SummaryRow
                    label="Price"
                    value={`£${bookingDraft.basePrice as number / 100}`}
                />

                {bookingDraft.addOns.length > 0 && (
                    <div className="mt-4 space-y-2 border-t border-white/20 pt-4">
                        {bookingDraft.addOns.map(a => (
                            <SummaryRow
                                key={a.id}
                                label={a.name}
                                value={`+£${a.price / 100}`}
                            />
                        ))}
                    </div>
                )}

                <div className="mt-4 border-t border-white/20 pt-4 flex justify-between">
                    <p className="text-gray-300">Total</p>
                    <p className="text-xl font-semibold">
                        £{total / 100}
                    </p>
                </div>
            </div>

            {error && (
                <p className="text-sm text-red-500">{error}</p>
            )}

            {/* Footer */}
            <div className="flex justify-between pt-4">
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
                        ? "Booking…"
                        : "Confirm Booking"}
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
