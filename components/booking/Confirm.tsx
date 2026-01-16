"use client";

import { useState } from "react";
import api from "@/lib/axios";
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
        Boolean(bookingDraft.name?.trim()) &&
        Boolean(bookingDraft.email?.trim()) &&
        Boolean(bookingDraft.phone?.trim());

    async function submitBooking() {
        if (!canSubmit) return;

        setLoading(true);
        setError(null);

        try {
            await api.post("/bookings", {
                timeSlotId: bookingDraft.timeSlotId,
                serviceType: bookingDraft.serviceType,
                vehicleSize: bookingDraft.vehicleSize,
                price: bookingDraft.price,

                name: bookingDraft.name,
                email: bookingDraft.email,
                phone: bookingDraft.phone,

                address: bookingDraft.address,
                postcode: bookingDraft.postcode,
                notes: bookingDraft.notes,
            });

            onSuccess();
        } catch (err: any) {
            setError(
                err?.response?.data?.message ||
                "Failed to create booking"
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
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label className="mb-1 block text-xs font-medium text-gray-600">
                            Full name
                        </label>
                        <input
                            value={bookingDraft.name || ""}
                            onChange={(e) =>
                                setBookingDraft((d) => ({
                                    ...d,
                                    name: e.target.value,
                                }))
                            }
                            placeholder="John Smith"
                            className="w-full rounded-xl border px-4 py-3 text-sm focus:border-electric-teal focus:outline-none"
                        />
                    </div>

                    <div>
                        <label className="mb-1 block text-xs font-medium text-gray-600">
                            Email
                        </label>
                        <input
                            type="email"
                            value={bookingDraft.email || ""}
                            onChange={(e) =>
                                setBookingDraft((d) => ({
                                    ...d,
                                    email: e.target.value,
                                }))
                            }
                            placeholder="john@email.com"
                            className="w-full rounded-xl border px-4 py-3 text-sm focus:border-electric-teal focus:outline-none"
                        />
                    </div>

                    <div>
                        <label className="mb-1 block text-xs font-medium text-gray-600">
                            Phone
                        </label>
                        <input
                            value={bookingDraft.phone || ""}
                            onChange={(e) =>
                                setBookingDraft((d) => ({
                                    ...d,
                                    phone: e.target.value,
                                }))
                            }
                            placeholder="07xxx xxxxxx"
                            className="w-full rounded-xl border px-4 py-3 text-sm focus:border-electric-teal focus:outline-none"
                        />
                    </div>
                </div>
            </div>

            {/* Booking Summary */}
            <div className="rounded-2xl bg-gradient-to-br from-[#0A0A0A] to-[#111] p-6 text-white shadow-lg space-y-4">
                <h3 className="text-lg font-medium">
                    Booking Summary
                </h3>

                <div className="space-y-3 text-sm">
                    <SummaryRow
                        label="Service"
                        value={bookingDraft.serviceType}
                    />
                    <SummaryRow
                        label="Vehicle"
                        value={bookingDraft.vehicleSize}
                    />
                    <SummaryRow
                        label="Date & Time"
                        value={`${formatDate(bookingDraft.date)} · ${formatTimeRange(
                            bookingDraft.timeFrom,
                            bookingDraft.timeTo
                        )}`}
                    />
                    <SummaryRow
                        label="Location"
                        value={bookingDraft.postcode}
                    />
                </div>

                <div className="mt-4 border-t border-white/20 pt-4 flex items-center justify-between">
                    <p className="text-sm text-gray-300">
                        Total
                    </p>
                    <p className="text-xl font-semibold">
                        £{(bookingDraft.price ?? 0) / 100}
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
                    className="rounded-full border border-gray-300 bg-white px-6 py-2 text-sm text-gray-700 hover:bg-gray-50"
                >
                    ← Back
                </button>

                <button
                    disabled={!canSubmit || loading}
                    onClick={submitBooking}
                    className={[
                        "rounded-full px-8 py-2 text-sm text-white transition",
                        canSubmit
                            ? "bg-black hover:bg-gray-800"
                            : "bg-gray-300 cursor-not-allowed",
                    ].join(" ")}
                >
                    {loading ? "Booking…" : "Confirm Booking"}
                </button>
            </div>
        </div>
    );
}

/* ---------------- Helper ---------------- */

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
    to?: string | null
) {
    if (!from || !to) return "—";

    const format = (t: string) =>
        new Date(`1970-01-01T${t}`).toLocaleTimeString("en-GB", {
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
        });

    return `${format(from)} – ${format(to)}`;
}


function SummaryRow({
    label,
    value,
}: {
    label: string;
    value?: string | null;
}) {
    return (
        <div className="flex items-center justify-between">
            <p className="text-gray-400">{label}</p>
            <p className="font-medium text-white">
                {value || "—"}
            </p>
        </div>
    );
}
