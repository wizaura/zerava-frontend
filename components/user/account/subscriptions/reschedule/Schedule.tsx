"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { CheckCircle, Clock, MapPin, Loader2 } from "lucide-react";
import { SubscriptionDraft } from "./types";
import api from "@/lib/user/axios";

type Props = {
    draft: SubscriptionDraft;
    setDraft: Dispatch<SetStateAction<SubscriptionDraft>>;
    onBack: () => void;
    onContinue: () => void;
};

type TemplateSlot = {
    templateId: string;
    startTime: string;
    endTime: string;
};

export default function RescheduleScheduleStep({
    draft,
    setDraft,
    onBack,
    onContinue,
}: Props) {
    const [checking, setChecking] = useState(false);
    const [availableTemplates, setAvailableTemplates] = useState<TemplateSlot[]>([]);
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const [initialLoad, setInitialLoad] = useState(true);

    /* =========================================
       POSTCODE CHECK
    ========================================= */

    useEffect(() => {
        const postcode = draft.postcode?.trim().toUpperCase();

        console.log(draft,'draft')
        if (!postcode || postcode.length < 4 || !draft.durationMin) return;

        const timeout = setTimeout(() => {
            checkPostcode(postcode);
        }, 500);

        return () => clearTimeout(timeout);
    }, [draft.postcode]);

    const checkPostcode = async (postcode: string) => {
        try {
            setChecking(true);

            const res = await api.post("/availability/subscription-check", {
                postcode,
                serviceDuration: draft.durationMin,
                plan: draft.plan,
            });

            const data = res.data;

            if (!data.serviceable) {
                resetSchedule(false);
                setAvailableTemplates([]);
                setSelectedIndex(null);
                return;
            }

            setAvailableTemplates(data.slots || []);

            setDraft((d) => ({
                ...d,
                serviceable: true,
                preferredDay: data.subscriptionDay,
            }));

            // Only clear template if postcode actually changed
            if (!initialLoad) {
                setSelectedIndex(null);
                setDraft((d) => ({
                    ...d,
                    templateId: null,
                    timeFrom: null,
                    timeTo: null,
                }));
            }

            setInitialLoad(false);
        } catch (err) {
            console.error(err);
        } finally {
            setChecking(false);
        }
    };

    const resetSchedule = (serviceable: boolean) => {
        setDraft((d) => ({
            ...d,
            serviceable,
            preferredDay: null,
            templateId: null,
            timeFrom: null,
            timeTo: null,
        }));
    };

    /* =========================================
       AUTO SELECT EXISTING TEMPLATE
    ========================================= */

    useEffect(() => {
        if (!draft.templateId || availableTemplates.length === 0) return;

        const index = availableTemplates.findIndex(
            (t) => t.templateId === draft.templateId
        );

        if (index !== -1) {
            setSelectedIndex(index);
        }
    }, [availableTemplates]);

    /* =========================================
       TEMPLATE SELECTION
    ========================================= */

    const handleSelectTemplate = (template: TemplateSlot, index: number) => {
        if (selectedIndex === index) {
            setSelectedIndex(null);
            setDraft((d) => ({
                ...d,
                templateId: null,
                timeFrom: null,
                timeTo: null,
            }));
            return;
        }

        setSelectedIndex(index);

        setDraft((d) => ({
            ...d,
            templateId: template.templateId,
            timeFrom: template.startTime,
            timeTo: template.endTime,
        }));
    };

    /* =========================================
       VALIDATION
    ========================================= */

    const canContinue =
        draft.serviceable &&
        !!draft.templateId &&
        !!draft.timeFrom &&
        !!draft.timeTo &&
        !!draft.address;

    /* =========================================
       UI
    ========================================= */

    return (
        <div className="max-w-3xl mx-auto space-y-10">
            <h2 className="text-2xl font-medium text-gray-900">
                Reschedule your subscription
            </h2>

            {/* NOTICE */}
            <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 text-sm text-gray-600">
                Changes will apply to future cleans only.
            </div>

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
                            setDraft((d) => ({
                                ...d,
                                postcode: e.target.value.toUpperCase(),
                            }))
                        }
                        className="w-full rounded-xl border border-gray-300 pl-10 pr-4 py-3 text-sm"
                    />
                </div>
            </div>

            {/* LOADER */}
            {checking && (
                <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Loader2 className="animate-spin" size={16} />
                    Checking availability...
                </div>
            )}

            {/* SERVICEABLE */}
            {draft.serviceable && draft.preferredDay !== null && (
                <div className="flex items-start gap-3 rounded-xl border border-electric-teal bg-electric-teal/10 p-4">
                    <CheckCircle className="text-electric-teal" />
                    <div>
                        <p className="font-medium text-gray-900">
                            We serve your area
                        </p>
                        <p className="text-sm text-gray-600">
                            Recurring day:{" "}
                            <span className="font-medium text-electric-teal">
                                {formatWeekday(draft.preferredDay as number)}
                            </span>
                        </p>
                    </div>
                </div>
            )}

            {/* TEMPLATE GRID */}
            {draft.serviceable && availableTemplates.length > 0 && (
                <div>
                    <p className="mb-4 text-sm font-medium text-gray-700">
                        Choose new time window
                    </p>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {availableTemplates.map((template, index) => {
                            const selected = selectedIndex === index;

                            return (
                                <button
                                    key={`${template.templateId}_${index}`}
                                    type="button"
                                    onClick={() =>
                                        handleSelectTemplate(template, index)
                                    }
                                    className={`rounded-2xl border px-5 py-5 transition text-left ${selected
                                            ? "border-electric-teal bg-electric-teal/10"
                                            : "border-gray-200 bg-white hover:border-gray-300"
                                        }`}
                                >
                                    <div className="flex items-center gap-2 mb-2">
                                        <Clock size={16} />
                                        <span className="font-medium">
                                            {formatTime(template.startTime)} –{" "}
                                            {formatTime(template.endTime)}
                                        </span>
                                    </div>

                                    {selected && (
                                        <p className="text-xs text-electric-teal">
                                            Selected
                                        </p>
                                    )}
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
                            setDraft((d) => ({
                                ...d,
                                address: e.target.value,
                            }))
                        }
                        className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm"
                    />
                </div>
            )}

            {/* FOOTER */}
            <div className="flex justify-between pt-6">
                <button
                    type="button"
                    onClick={onBack}
                    className="rounded-full border border-gray-300 bg-white px-6 py-2 text-sm text-gray-700"
                >
                    ← Back
                </button>

                <button
                    type="button"
                    disabled={!canContinue}
                    onClick={onContinue}
                    className={`rounded-full px-8 py-2 text-sm text-white ${canContinue
                            ? "bg-black hover:bg-gray-800"
                            : "bg-gray-300 cursor-not-allowed"
                        }`}
                >
                    Continue →
                </button>
            </div>
        </div>
    );
}

/* HELPERS */

function formatWeekday(day: number) {
    const days = [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
    ];
    return days[day - 1] ?? "";
}

function formatTime(time: string) {
    const d = new Date(`1970-01-01T${time}`);
    return d
        .toLocaleTimeString("en-GB", {
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
        })
        .replace("am", "AM")
        .replace("pm", "PM");
}
