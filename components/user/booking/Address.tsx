"use client";

import { Dispatch, SetStateAction } from "react";
import { BookingDraft } from "./Main";
import { Leaf } from "lucide-react";

type Props = {
    bookingDraft: BookingDraft;
    setBookingDraft: Dispatch<SetStateAction<BookingDraft>>;
    onBack: () => void;
    onContinue: () => void;
};

export default function AddressStep({
    bookingDraft,
    setBookingDraft,
    onBack,
    onContinue,
}: Props) {
    const canContinue = Boolean(bookingDraft.address?.trim());

    return (
        <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-2xl font-medium text-gray-900">
                Service address
            </h2>

            {/* Main Card */}
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm space-y-6">
                {/* Postcode (read-only) */}
                <div className="rounded-xl bg-gray-50 p-4">
                    <p className="text-xs font-medium text-gray-500">
                        Postcode
                    </p>
                    <p className="mt-1 text-sm font-semibold text-gray-900">
                        {bookingDraft.postcode || "—"}
                    </p>
                </div>

                {/* Address */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-800">
                        Full address
                    </label>
                    <input
                        value={bookingDraft.address || ""}
                        onChange={(e) =>
                            setBookingDraft((d) => ({
                                ...d,
                                address: e.target.value,
                            }))
                        }
                        placeholder="House number and street name"
                        className="
                            w-full rounded-xl border border-gray-300 px-4 py-3 text-sm
                            focus:border-electric-teal focus:outline-none
                        "
                    />
                </div>

                {/* Notes */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-800">
                        Special instructions (optional)
                    </label>
                    <textarea
                        rows={3}
                        value={bookingDraft.notes || ""}
                        onChange={(e) =>
                            setBookingDraft((d) => ({
                                ...d,
                                notes: e.target.value,
                            }))
                        }
                        placeholder="e.g. Car park bay number, gate code, car colour / reg..."
                        className="
                            w-full rounded-xl border border-gray-300 px-4 py-3 text-sm
                            focus:border-electric-teal focus:outline-none
                        "
                    />
                </div>
            </div>

            {/* Eco Banner */}
            <div className="flex items-center gap-3 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100">
                    <Leaf size={16} className="text-green-700" />
                </div>
                <p>
                    This clean will save{" "}
                    <span className="font-semibold">
                        150 litres of water
                    </span>{" "}
                    💧
                </p>
            </div>

            {/* Footer */}
            <div className="flex justify-between pt-4">
                <button
                    onClick={onBack}
                    className="rounded-full border border-gray-300 bg-white px-6 py-2 text-sm text-gray-700 hover:bg-gray-50"
                >
                    ← Previous
                </button>

                <button
                    disabled={!canContinue}
                    onClick={onContinue}
                    className={[
                        "rounded-full px-8 py-2 text-sm text-white transition",
                        canContinue
                            ? "bg-black hover:bg-gray-800"
                            : "bg-gray-300 cursor-not-allowed",
                    ].join(" ")}
                >
                    Continue →
                </button>
            </div>
        </div>
    );
}
