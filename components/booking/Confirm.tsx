"use client";

import { useState } from "react";
import api from "@/lib/axios";

type Props = {
    bookingDraft: any;
    setBookingDraft: (fn: any) => void;
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
        bookingDraft.name &&
        bookingDraft.email &&
        bookingDraft.phone;

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
        <div className="space-y-8">
            <h2 className="text-2xl font-medium">
                Confirm your booking
            </h2>

            {/* Customer Details */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <input
                    placeholder="Full Name"
                    value={bookingDraft.name || ""}
                    onChange={(e) =>
                        setBookingDraft((d) => ({
                            ...d,
                            name: e.target.value,
                        }))
                    }
                    className="rounded-lg border px-3 py-2"
                />

                <input
                    placeholder="Email"
                    type="email"
                    value={bookingDraft.email || ""}
                    onChange={(e) =>
                        setBookingDraft((d) => ({
                            ...d,
                            email: e.target.value,
                        }))
                    }
                    className="rounded-lg border px-3 py-2"
                />

                <input
                    placeholder="Phone"
                    value={bookingDraft.phone || ""}
                    onChange={(e) =>
                        setBookingDraft((d) => ({
                            ...d,
                            phone: e.target.value,
                        }))
                    }
                    className="rounded-lg border px-3 py-2"
                />
            </div>

            {/* Summary */}
            <div className="rounded-lg border bg-eco-black p-4 text-sm space-y-2">
                <p>
                    <strong>Service:</strong>{" "}
                    {bookingDraft.serviceType}
                </p>
                <p>
                    <strong>Vehicle:</strong>{" "}
                    {bookingDraft.vehicleSize}
                </p>
                <p>
                    <strong>Price:</strong> £
                    {bookingDraft.price / 100}
                </p>
                <p>
                    <strong>Date & Time:</strong>{" "}
                    {bookingDraft.date}
                </p>
                <p>
                    <strong>Postcode:</strong>{" "}
                    {bookingDraft.postcode}
                </p>
            </div>

            {error && (
                <p className="text-sm text-red-600">{error}</p>
            )}

            {/* Footer */}
            <div className="flex justify-between pt-6">
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
                    {loading ? "Booking..." : "Confirm Booking"}
                </button>
            </div>
        </div>
    );
}
