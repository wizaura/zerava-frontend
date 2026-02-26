"use client";

import { useState } from "react";
import api from "@/lib/user/axios";
import toast from "react-hot-toast";
import { ClockIcon, MapPinIcon } from "@heroicons/react/24/outline";

export default function ConfirmRescheduleStep({
    draft,
    onBack,
}: {
    draft: any;
    onBack: () => void;
}) {

    const [loading, setLoading] = useState(false);

    async function submit() {
        try {
            setLoading(true);

            /* ===========================
               1️⃣ CHECK RULES
            =========================== */

            const check = await api.post(
                `/bookings/${draft.bookingId}/reschedule-check`,
                {
                    serviceSlotId: draft.serviceSlotId,
                    templateId: draft.templateId,
                    isTemplate: draft.isTemplate,
                    postcode: draft.postcode,
                    date: draft.date,
                    timeFrom: draft.timeFrom,
                    timeTo: draft.timeTo,
                    address: draft.address,
                }
            );

            if (!check.data.allowed) {
                toast.error(check.data.reason);
                return;
            }

            /* ===========================
               2️⃣ FREE RESCHEDULE (>24h)
            =========================== */

            if (!check.data.requiresPayment) {

                await api.post(
                    `/bookings/${draft.bookingId}/confirm-reschedule`,
                    {
                        serviceSlotId: draft.serviceSlotId,
                        templateId: draft.templateId,
                        isTemplate: draft.isTemplate,
                        postcode: draft.postcode,
                        date: draft.date,
                        timeFrom: draft.timeFrom,
                        timeTo: draft.timeTo,
                        address: draft.address,
                    }
                );

                toast.success("Rescheduled successfully");

                window.location.href = "/account/bookings";
                return;
            }

            /* ===========================
               3️⃣ £5 ROUTE ADJUSTMENT FEE
            =========================== */

            const session = await api.post(
                "/payments/create-reschedule-session",
                {
                    bookingId: draft.bookingId,

                    serviceSlotId: draft.serviceSlotId,
                    templateId: draft.templateId,
                    isTemplate: draft.isTemplate,
                    postcode: draft.postcode,
                    date: draft.date,
                    timeFrom: draft.timeFrom,
                    timeTo: draft.timeTo,
                    address: draft.address,
                }
            );

            window.location.href = session.data.url;

        } catch (err: any) {
            toast.error(
                err?.response?.data?.message ||
                "Something went wrong"
            );
        } finally {
            setLoading(false);
        }
    }

    /* ===========================
       FORMAT HELPERS
    =========================== */

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

    function formatDate(dateStr: string | null) {
        if (!dateStr) return "";
        return new Date(dateStr).toLocaleDateString("en-GB", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric",
        });
    }

    /* ===========================
       UI
    =========================== */

    return (
        <div className="max-w-3xl mx-auto space-y-8">

            <h2 className="text-2xl font-medium text-gray-900">
                Review your new schedule
            </h2>

            {/* 🔥 RESCHEDULING POLICY */}
            <div className="rounded-xl bg-gray-50 border p-5 text-sm space-y-2">
                <p className="font-medium text-gray-900">
                    Rescheduling Policy
                </p>
                <ul className="space-y-1 text-gray-600 list-disc list-inside">
                    <li>Free change up to 24 hours before your visit</li>
                    <li>24–12 hours: £5 route adjustment fee</li>
                    <li>Within 12 hours: Not allowed (50% retained)</li>
                </ul>
            </div>

            <div className="rounded-2xl border bg-white p-6 shadow-sm space-y-6">

                <SummaryRow
                    label="Service"
                    value={draft.service}
                />

                <SummaryRow
                    label="Vehicle"
                    value={draft.vehicleCategory}
                />

                <SummaryRow
                    label="Postcode"
                    value={draft.postcode}
                />

                <div className="space-y-1">
                    <p className="text-xs uppercase tracking-wide text-gray-500">
                        New Date & Time
                    </p>

                    <div className="flex items-center gap-3 rounded-xl bg-gray-50 px-4 py-3 border">
                        <ClockIcon className="h-5 w-5 text-electric-teal" />
                        <span className="text-sm font-medium text-gray-800">
                            {formatDate(draft.date)} •{" "}
                            {formatTime12h(draft.timeFrom)} –{" "}
                            {formatTime12h(draft.timeTo)}
                        </span>
                    </div>
                </div>

                <div className="space-y-1">
                    <p className="text-xs uppercase tracking-wide text-gray-500">
                        Address
                    </p>

                    <div className="flex items-center gap-3 rounded-xl bg-gray-50 px-4 py-3 border">
                        <MapPinIcon className="h-5 w-5 text-electric-teal" />
                        <span className="text-sm font-medium text-gray-800">
                            {draft.address}
                        </span>
                    </div>
                </div>

                <SummaryRow
                    label="Total Price"
                    value={`£${(draft.price / 100).toFixed(2)}`}
                />

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
                    disabled={loading}
                    className="rounded-full bg-black px-8 py-2 text-sm text-white hover:bg-gray-800 disabled:opacity-50"
                >
                    {loading ? "Processing..." : "Confirm Reschedule"}
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