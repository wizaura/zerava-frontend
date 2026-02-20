"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { CheckCircle, Clock, MapPin, Loader2 } from "lucide-react";
import { SubscriptionDraft } from "./types";
import api from "@/lib/user/axios";

const UK_POSTCODE_REGEX_OUTWARD = /^[A-Z]{1,2}\d{2}$/i;
const UK_POSTCODE_REGEX_FULL = /^[A-Z]{1,2}\d{2}\s?\d[A-Z]{2}$/i;

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

export default function ScheduleStep({
    draft,
    setDraft,
    onBack,
    onContinue,
}: Props) {
    const [checking, setChecking] = useState(false);
    const [postcode, setPostcode] = useState(draft.postcode || "");
    const [availableTemplates, setAvailableTemplates] = useState<TemplateSlot[]>([]);
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

    /* =========================================================
       AUTO POSTCODE CHECK (LIKE BOOKING)
    ========================================================== */

    const outwardCode = postcode
        .toUpperCase()
        .trim()
        .split(" ")[0];

    useEffect(() => {

        if (!UK_POSTCODE_REGEX_OUTWARD.test(outwardCode)) return;

        const timeout = setTimeout(() => {
            checkPostcode(outwardCode);
        }, 500);

        return () => clearTimeout(timeout);
    }, [outwardCode]);

    const matchesFirstStage =
        outwardCode && UK_POSTCODE_REGEX_OUTWARD.test(outwardCode);

    const matchesFullPostcode =
        draft.postcode && UK_POSTCODE_REGEX_FULL.test(draft.postcode.trim());

    const showPostcodeError =
        matchesFirstStage && !matchesFullPostcode;

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

            // Reset previous selection
            setSelectedIndex(null);

            setDraft((d) => ({
                ...d,
                serviceable: true,
                preferredDay: data.subscriptionDay,
                templateId: null,
                timeFrom: null,
                timeTo: null,
            }));

            setAvailableTemplates(data.slots || []);
        } catch (err) {
            console.error(err);
        } finally {
            setChecking(false);
        }
    };

    useEffect(() => {
        const full = postcode.trim().toUpperCase();

        if (!UK_POSTCODE_REGEX_FULL.test(full)) return;

        setDraft((d) => ({
            ...d,
            postcode: full,
        }));
    }, [postcode]);

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

    /* =========================================================
       TEMPLATE SELECTION
    ========================================================== */

    const handleSelectTemplate = (template: TemplateSlot, index: number) => {

        console.log(template, 'temp')
        if (selectedIndex === index) {
            // Deselect
            setSelectedIndex(null);
            setDraft((d) => ({
                ...d,
                templateId: null,
                timeFrom: null,
                timeTo: null,
            }));
            return;
        }

        // Select
        setSelectedIndex(index);

        setDraft((d) => ({
            ...d,
            templateId: template.templateId,
            timeFrom: template.startTime,
            timeTo: template.endTime,
        }));
    };

    /* =========================================================
       CONTINUE VALIDATION
    ========================================================== */

    const canContinue =
        matchesFullPostcode &&
        draft.serviceable &&
        !!draft.templateId &&
        !!draft.timeFrom &&
        !!draft.timeTo;

    /* =========================================================
       UI
    ========================================================== */

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
                        value={postcode}
                        onChange={(e) =>
                            setPostcode(e.target.value.toUpperCase())
                        }
                        placeholder="SO15 4ER"
                        className="w-full rounded-xl border border-gray-300 pl-10 pr-4 py-3 text-sm
                        focus:border-electric-teal focus:ring-electric-teal"
                    />
                </div>
                {showPostcodeError && (
                    <p className="mt-2 text-sm text-red-500">
                        Please enter full postcode to continue (Eg: SO16 4ER)
                    </p>
                )}
            </div>

            {/* LOADER */}
            {/* LOADER */}
            {checking && (
                <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Loader2 className="animate-spin" size={16} />
                    Checking availability…
                </div>
            )}

            {/* NOT SERVICEABLE */}
            {draft.serviceable === false && !checking && (
                <div className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-100">
                        <MapPin size={16} className="text-red-600" />
                    </div>

                    <div>
                        <p className="font-medium text-red-700">
                            Sorry, we don't serve this area yet
                        </p>
                        <p className="text-sm text-red-600">
                            Try a different postcode or contact support.
                        </p>
                    </div>
                </div>
            )}

            {/* SERVICEABLE */}
            {draft.serviceable && draft.preferredDay !== null && (
                <div className="flex items-start gap-3 rounded-xl border border-electric-teal bg-electric-teal/10 p-4">
                    <CheckCircle className="text-electric-teal" />
                    <div>
                        <p className="font-medium text-gray-900">
                            Great! We serve your area
                        </p>
                        <p className="text-sm text-gray-600">
                            Your recurring service day{" "}
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
                        Choose your recurring time window
                    </p>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {availableTemplates.map((template, index) => {
                            const selected = selectedIndex === index;

                            return (
                                <button
                                    type="button"
                                    key={`${template.templateId}_${template.startTime}_${template.endTime}_${index}`}
                                    onClick={() =>
                                        handleSelectTemplate(template, index)
                                    }
                                    className={[
                                        "rounded-2xl border px-5 py-5 transition text-left",
                                        selected
                                            ? "border-electric-teal bg-electric-teal/10"
                                            : "border-gray-200 bg-white hover:border-gray-300",
                                    ].join(" ")}
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

            {/* FOOTER */}
            <div className="flex justify-between pt-6">
                <button
                    type="button"
                    onClick={onBack}
                    className="rounded-full border border-gray-300 bg-white px-6 py-2 text-sm text-gray-700 hover:bg-gray-50"
                >
                    ← Back
                </button>

                <button
                    type="button"
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

/* =========================================================
   HELPERS
========================================================= */

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
