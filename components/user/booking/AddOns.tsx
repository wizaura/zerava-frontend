import { Dispatch, SetStateAction } from "react";
import { BookingDraft, AddOns } from "./Main";

type Props = {
    addOns: AddOns[];
    bookingDraft: BookingDraft;
    setBookingDraft: Dispatch<SetStateAction<BookingDraft>>;
    onContinue: () => void;
    onBack: () => void;
};

export default function AddOnsStep({
    addOns,
    bookingDraft,
    setBookingDraft,
    onContinue,
    onBack,
}: Props) {

    const toggleAddOn = (addon: AddOns) => {
        setBookingDraft((d) => {
            const exists = d.addOns.some((a) => a.id === addon.id);

            const updatedAddOns = exists
                ? d.addOns.filter((a) => a.id !== addon.id)
                : [
                    ...d.addOns,
                    {
                        id: addon.id,
                        name: addon.name,
                        price: addon.price,
                        durationMin: addon.durationMin,
                    },
                ];

            const totalAddOnDuration = updatedAddOns.reduce(
                (sum, a) => sum + a.durationMin,
                0,
            );

            return {
                ...d,
                addOns: updatedAddOns,
                addOnDurationMin: totalAddOnDuration,

                // ⛔ slot is no longer valid if duration changes
                serviceSlotId: null,
                timeFrom: null,
                timeTo: null,
            };
        });
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <h2 className="text-2xl font-medium text-gray-900">
                Add-on treatments
            </h2>

            <p className="text-sm text-gray-500">
                Optional enhancements to elevate your clean.
            </p>

            <div className="grid sm:grid-cols-2 gap-4">
                {addOns.map((a) => {
                    const selected = bookingDraft.addOns.some(
                        (x) => x.id === a.id,
                    );

                    return (
                        <button
                            key={a.id}
                            onClick={() => toggleAddOn(a)}
                            className={[
                                "rounded-2xl border p-5 text-left transition",
                                "bg-white shadow-sm",
                                selected
                                    ? "border-electric-teal bg-electric-teal/10"
                                    : "border-gray-200 hover:shadow-md",
                            ].join(" ")}
                        >
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-medium text-gray-900">
                                        {a.name}
                                    </p>
                                    {a.description && (
                                        <p className="mt-1 text-sm text-gray-500">
                                            {a.description}
                                        </p>
                                    )}
                                </div>

                                <div className="text-right">
                                    <p className="font-medium text-gray-900">
                                        +£{a.price / 100}
                                    </p>
                                    <p className="text-xs text-gray-400">
                                        +{a.durationMin} min
                                    </p>
                                </div>
                            </div>
                        </button>
                    );
                })}
            </div>

            {/* FOOTER */}
            <div className="flex justify-between pt-6">
                <button
                    onClick={onBack}
                    className="rounded-full border border-gray-300 px-6 py-2 text-sm text-gray-700 hover:bg-gray-50"
                >
                    ← Previous
                </button>

                <button
                    onClick={onContinue}
                    className="rounded-full bg-black px-8 py-2 text-sm text-white hover:bg-gray-800"
                >
                    Continue →
                </button>
            </div>
        </div>
    );
}
