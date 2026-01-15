"use client";

type Props = {
    bookingDraft: any;
    setBookingDraft: (fn: any) => void;
    onBack: () => void;
    onContinue: () => void;
};

export default function AddressStep({
    bookingDraft,
    setBookingDraft,
    onBack,
    onContinue,
}: Props) {
    const canContinue = bookingDraft.address?.trim();

    return (
        <div className="space-y-8">
            <h2 className="text-2xl font-medium">
                Service Address
            </h2>

            {/* Address */}
            <div className="space-y-2">
                <label className="text-sm font-medium">
                    Full Address
                </label>
                <textarea
                    rows={3}
                    value={bookingDraft.address || ""}
                    onChange={(e) =>
                        setBookingDraft((d) => ({
                            ...d,
                            address: e.target.value,
                        }))
                    }
                    placeholder="House / Flat number, Street, City"
                    className="w-full rounded-lg border px-3 py-2"
                />
            </div>

            {/* Notes */}
            <div className="space-y-2">
                <label className="text-sm font-medium">
                    Special Instructions (optional)
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
                    placeholder="Gate code, parking info, call before arrival, etc."
                    className="w-full rounded-lg border px-3 py-2"
                />
            </div>

            {/* Footer */}
            <div className="flex justify-between pt-6">
                <button
                    onClick={onBack}
                    className="rounded-full border px-6 py-2 text-sm"
                >
                    ← Back
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
