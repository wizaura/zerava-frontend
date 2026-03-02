"use client";

import { useRouter, useParams } from "next/navigation";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function CancelFlowPage() {
    const router = useRouter();
    const params = useParams();
    const bookingId = params.id as string;

    const [step, setStep] = useState<"redirect" | "confirm">("redirect");
    const [loading, setLoading] = useState(false);
    const [preview, setPreview] = useState<any>(null);

    /* ===============================
       STEP 1 — PREVIEW CANCELLATION
    =============================== */

    async function handleContinue() {
        try {
            setLoading(true);

            const res = await axios.post(
                `/api/bookings/${bookingId}/cancel-preview`
            );

            setPreview(res.data);
            setStep("confirm");

        } catch (err) {
            console.error(err);
            toast.error("Unable to process cancellation preview.");
        } finally {
            setLoading(false);
        }
    }

    /* ===============================
       STEP 2 — CONFIRM CANCELLATION
    =============================== */

    async function handleConfirmCancel() {
        try {
            setLoading(true);

            await axios.post(
                `/api/bookings/${bookingId}/cancel-confirm`
            );

            toast.success("Booking cancelled successfully.");
            router.push("/account/bookings");

        } catch (err) {
            console.error(err);
            toast.error("Cancellation failed.");
        } finally {
            setLoading(false);
        }
    }

    /* ===============================
       UI
    =============================== */

    return (
        <div className="max-w-xl mx-auto py-20 px-6">

            {/* STEP 1 — REDIRECT SCREEN */}
            {step === "redirect" && (
                <div className="text-center space-y-6">

                    <h1 className="text-2xl font-semibold">
                        Need to change time instead?
                    </h1>

                    <p className="text-gray-500">
                        Rescheduling keeps your service secured and may avoid adjustment fees.
                    </p>

                    <div className="space-y-3">
                        <button
                            onClick={() => router.push(`/account/bookings/${bookingId}/reschedule`)}
                            className="w-full bg-emerald-600 text-white py-3 rounded-full font-semibold hover:bg-emerald-700 transition"
                        >
                            Reschedule Instead
                        </button>

                        <button
                            onClick={handleContinue}
                            disabled={loading}
                            className="text-sm text-gray-500 underline"
                        >
                            {loading ? "Checking policy..." : "Continue cancellation"}
                        </button>
                    </div>
                </div>
            )}

            {/* STEP 2 — CONFIRMATION SCREEN */}
            {step === "confirm" && preview && (
                <div className="space-y-6">

                    <h1 className="text-2xl font-semibold">
                        Confirm cancellation
                    </h1>

                    {preview.type === "full" && (
                        <p className="text-gray-600">
                            You will receive a full refund of £{preview.refund}.
                        </p>
                    )}

                    {preview.type === "partial" && (
                        <>
                            <p className="text-gray-600">
                                This appointment falls within our late change window.
                                50% of the service fee will be retained.
                            </p>

                            <div className="bg-gray-50 rounded-xl p-6 space-y-2">
                                <p>Paid: £{preview.paid}</p>
                                <p>Refund: £{preview.refund}</p>
                                <p>Retained: £{preview.retained}</p>
                            </div>
                        </>
                    )}

                    {preview.type === "none" && (
                        <p className="text-gray-600">
                            This appointment has already begun. The service fee is non-refundable.
                        </p>
                    )}

                    <div className="space-y-3">
                        {preview.type !== "none" && (
                            <button
                                onClick={handleConfirmCancel}
                                disabled={loading}
                                className="w-full bg-red-600 text-white py-3 rounded-full font-semibold hover:bg-red-700 transition"
                            >
                                {loading ? "Processing..." : "Confirm Cancellation"}
                            </button>
                        )}

                        <button
                            onClick={() => setStep("redirect")}
                            className="text-sm text-gray-500 underline"
                        >
                            Go Back
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}