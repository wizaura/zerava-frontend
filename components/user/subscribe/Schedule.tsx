"use client";

import { Dispatch, SetStateAction, useState } from "react";
import { CheckCircle, Clock, MapPin } from "lucide-react";
import { SubscriptionDraft } from "./types";

type Props = {
    draft: SubscriptionDraft;
    setDraft: Dispatch<SetStateAction<SubscriptionDraft>>;
    onBack: () => void;
    onContinue: () => void;
};

const timeWindows = [
    { key: "AM_8_10", label: "8:00 AM – 10:00 AM" },
    { key: "AM_11_1", label: "11:00 AM – 1:00 PM" },
    { key: "PM_2_4", label: "2:00 PM – 4:00 PM" },
    { key: "PM_4_6", label: "4:00 PM – 6:00 PM" },
] as const;

export default function ScheduleStep({
    draft,
    setDraft,
    onBack,
    onContinue,
}: Props) {
    const [checking, setChecking] = useState(false);

    const checkPostcode = async () => {
        if (!draft.postcode) return;

        setChecking(true);

        // 🔜 Replace with real API later
        setTimeout(() => {
            setDraft(d => ({
                ...d,
                serviceable: true,
                subscriptionDay: "TUESDAY",
            }));
            setChecking(false);
        }, 800);
    };

    const canContinue =
        draft.serviceable &&
        draft.subscriptionDay &&
        draft.timeWindow &&
        draft.address;

    return (
        <div className="max-w-3xl mx-auto space-y-10">

            <h2 className="text-2xl font-medium text-gray-900">
                Schedule your subscription
            </h2>

            {/* POSTCODE */}
            <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                    Your postcode
                </label>

                <div className="relative">
                    <MapPin
                        size={18}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    />
                    <input
                        value={draft.postcode ?? ""}
                        onChange={(e) =>
                            setDraft(d => ({
                                ...d,
                                postcode: e.target.value.toUpperCase(),
                                serviceable: null,
                                subscriptionDay: null,
                                timeWindow: null,
                            }))
                        }
                        onBlur={checkPostcode}
                        placeholder="SO15"
                        className="w-full rounded-xl border border-gray-300 pl-10 pr-4 py-3 text-sm
            focus:border-electric-teal focus:ring-electric-teal"
                    />
                </div>
            </div>

            {/* SERVICEABLE MESSAGE */}
            {draft.serviceable && draft.subscriptionDay && (
                <div className="flex items-start gap-3 rounded-xl border border-electric-teal bg-electric-teal/10 p-4">
                    <CheckCircle className="text-electric-teal" />
                    <div>
                        <p className="font-medium text-gray-900">
                            Great! We serve your area
                        </p>
                        <p className="text-sm text-gray-600">
                            Your subscription day is{" "}
                            <span className="font-medium text-electric-teal">
                                {draft.subscriptionDay}
                            </span>
                        </p>
                    </div>
                </div>
            )}

            {/* TIME WINDOW */}
            {draft.serviceable && (
                <div>
                    <p className="mb-3 text-sm font-medium text-gray-700">
                        Choose your time window
                    </p>

                    <div className="grid grid-cols-2 gap-4">
                        {timeWindows.map(t => {
                            const selected = draft.timeWindow === t.key;

                            return (
                                <button
                                    key={t.key}
                                    onClick={() =>
                                        setDraft(d => ({
                                            ...d,
                                            timeWindow: t.key,
                                        }))
                                    }
                                    className={[
                                        "rounded-xl border px-4 py-4 text-sm transition",
                                        selected
                                            ? "border-electric-teal bg-electric-teal/15 text-electric-teal"
                                            : "border-gray-200 bg-white hover:border-gray-300",
                                    ].join(" ")}
                                >
                                    <Clock className="mx-auto mb-1" size={16} />
                                    {t.label}
                                </button>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* ADDRESS */}
            {draft.serviceable && (
                <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                        Service address
                    </label>
                    <textarea
                        rows={3}
                        value={draft.address ?? ""}
                        onChange={(e) =>
                            setDraft(d => ({
                                ...d,
                                address: e.target.value,
                            }))
                        }
                        placeholder="House / Flat number, street name"
                        className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm
            focus:border-electric-teal focus:ring-electric-teal"
                    />
                </div>
            )}

            {/* FOOTER */}
            <div className="flex justify-between pt-6">
                <button
                    onClick={onBack}
                    className="rounded-full border border-gray-300 bg-white px-6 py-2 text-sm
          text-gray-700 hover:bg-gray-50"
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
