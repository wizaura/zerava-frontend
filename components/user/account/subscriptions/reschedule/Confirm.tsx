"use client";

import api from "@/lib/user/axios";
import { ClockIcon, MapPinIcon, CalendarDaysIcon } from "@heroicons/react/24/outline";

export default function ConfirmSubscriptionRescheduleStep({
    draft,
    subscriptionId,
    onBack,
}: {
    draft: any;
    subscriptionId: string;
    onBack: () => void;
}) {
    async function submit() {
        await api.put(`/subscriptions/${subscriptionId}/reschedule`, {
            postcode: draft.postcode,
            weekday: draft.preferredDay,
            templateId: draft.templateId,
            timeFrom: draft.timeFrom,
            timeTo: draft.timeTo,
            address: draft.address,
        });

        window.location.href = `/account/subscriptions`;
    }

    function formatTime12h(time: string | null) {
        if (!time) return "";
        const [h, m] = time.split(":").map(Number);
        const date = new Date();
        date.setHours(h, m);

        return date
            .toLocaleTimeString("en-GB", {
                hour: "numeric",
                minute: "2-digit",
                hour12: true,
            })
            .replace("am", "AM")
            .replace("pm", "PM");
    }

    function formatWeekday(day: number | null) {
        if (!day) return "";
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

    return (
        <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-2xl font-medium text-gray-900">
                Review your new recurring schedule
            </h2>

            <div className="rounded-2xl border bg-white p-6 shadow-sm space-y-6">

                <SummaryRow
                    label="Service"
                    value={draft.serviceName ?? "-"}
                />

                <SummaryRow
                    label="Plan"
                    value={draft.plan ?? "-"}
                />

                <SummaryRow
                    label="Postcode"
                    value={draft.postcode}
                />

                <div className="space-y-1">
                    <p className="text-xs uppercase tracking-wide text-gray-500">
                        Recurring Day & Time
                    </p>

                    <div className="flex items-center gap-3 rounded-xl bg-gray-50 px-4 py-3 border">
                        <CalendarDaysIcon className="h-5 w-5 text-electric-teal" />
                        <span className="text-sm font-medium text-gray-800">
                            {formatWeekday(draft.preferredDay)} •{" "}
                            {formatTime12h(draft.timeFrom)} –{" "}
                            {formatTime12h(draft.timeTo)}
                        </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                        Applies to all future cleans.
                    </p>
                </div>

                <div className="space-y-1">
                    <p className="text-xs uppercase tracking-wide text-gray-500">
                        Service Address
                    </p>

                    <div className="flex items-center gap-3 rounded-xl bg-gray-50 px-4 py-3 border">
                        <MapPinIcon className="h-5 w-5 text-electric-teal" />
                        <span className="text-sm font-medium text-gray-800">
                            {draft.address}
                        </span>
                    </div>
                </div>

                {draft.basePrice && (
                    <SummaryRow
                        label="Price per Clean"
                        value={`£${(draft.basePrice / 100).toFixed(2)}`}
                    />
                )}
            </div>

            <div className="flex justify-between pt-4">
                <button
                    onClick={onBack}
                    className="rounded-full border px-6 py-2 text-sm hover:bg-gray-50"
                >
                    ← Back
                </button>

                <button
                    onClick={submit}
                    className="rounded-full bg-black px-8 py-2 text-sm text-white hover:bg-gray-800"
                >
                    Confirm Reschedule
                </button>
            </div>
        </div>
    );
}

function SummaryRow({
    label,
    value,
}: {
    label: string;
    value: string | number;
}) {
    return (
        <div className="flex justify-between text-sm border-b pb-3 last:border-none last:pb-0">
            <span className="text-gray-500">{label}</span>
            <span className="font-medium text-gray-900">{value}</span>
        </div>
    );
}
