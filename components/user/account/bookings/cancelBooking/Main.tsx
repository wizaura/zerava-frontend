"use client";

import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "@/lib/user/axios";
import { AlertTriangle, CalendarClock, ArrowLeft } from "lucide-react";

type CancelPreview = {
    type: "full" | "partial" | "none";
    paid: number;
    refund: number;
    retained: number;
};

export default function CancelFlowPage() {
    const router = useRouter();
    const { bookingId } = useParams<{ bookingId: string }>();

    const [step, setStep] = useState<"redirect" | "confirm">("redirect");
    const [alreadyRescheduled, setAlreadyRescheduled] = useState(false);
    const [loading, setLoading] = useState(false);
    const [preview, setPreview] = useState<CancelPreview | null>(null);

    async function handleContinue() {
        try {
            setLoading(true);

            const res = await api.patch(
                `/bookings/${bookingId}/cancel`,
                {},
                { params: { preview: true } }
            );

            setPreview(res.data);
            setStep("confirm");

        } catch (err) {
            console.error(err);
            toast.error("Unable to calculate cancellation policy.");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        async function loadBooking() {
            try {
                const res = await api.get(`/bookings/${bookingId}`);
                setAlreadyRescheduled(res.data.rescheduleCount > 0);
            } catch (err) {
                console.error(err);
            }
        }

        if (bookingId) loadBooking();
    }, [bookingId]);

    async function handleConfirmCancel() {
        try {
            setLoading(true);

            await api.patch(`/bookings/${bookingId}/cancel`);

            toast.success("Booking cancelled successfully");
            router.push("/account/bookings");

        } catch (err) {
            console.error(err);
            toast.error("Cancellation failed");
        } finally {
            setLoading(false);
        }
    }

    function formatPrice(amount: number) {
        return new Intl.NumberFormat("en-GB", {
            style: "currency",
            currency: "GBP",
        }).format(amount / 100);
    }

    return (
        <div className="min-h-screen bg-gray-50 py-16 px-4">

            <div className="max-w-xl mx-auto">

                <button
                    onClick={() => router.back()}
                    className="flex items-center gap-2 text-sm text-gray-500 mb-6 hover:text-black"
                >
                    <ArrowLeft size={16} />
                    Back
                </button>

                <div className="bg-white rounded-3xl shadow-lg p-8">

                    {/* STEP 1 */}
                    {step === "redirect" && (
                        <div className="text-center space-y-6">

                            <div className="flex justify-center">
                                <div className="h-14 w-14 rounded-full bg-emerald-100 flex items-center justify-center">
                                    <CalendarClock className="text-emerald-600" size={24} />
                                </div>
                            </div>

                            <h1 className="text-2xl font-semibold">
                                Need to change time instead?
                            </h1>

                            <p className="text-gray-500">
                                Rescheduling keeps your service secured and may avoid adjustment fees.
                            </p>

                            <div className="space-y-3 pt-4">

                                <button
                                    disabled={alreadyRescheduled}
                                    onClick={() =>
                                        router.push(`/account/bookings/${bookingId}/reschedule`)
                                    }
                                    className={`w-full py-3 rounded-full font-semibold transition
        ${alreadyRescheduled
                                            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                                            : "bg-emerald-600 text-white hover:bg-emerald-700"
                                        }`}
                                >
                                    {alreadyRescheduled ? "Already Rescheduled" : "Reschedule Instead"}
                                </button>

                                <button
                                    onClick={handleContinue}
                                    disabled={loading}
                                    className="text-sm text-gray-500 underline"
                                >
                                    {loading
                                        ? "Checking cancellation policy..."
                                        : "Continue cancellation"}
                                </button>

                            </div>
                        </div>
                    )}

                    {/* STEP 2 */}
                    {step === "confirm" && preview && (
                        <div className="space-y-6">

                            <h1 className="text-2xl font-semibold text-center">
                                Confirm cancellation
                            </h1>

                            {/* FULL REFUND */}
                            {preview.type === "full" && (
                                <div className="bg-green-50 border border-green-200 rounded-xl p-5 text-green-800 text-center">
                                    You will receive a full refund of
                                    <div className="text-xl font-semibold mt-1">
                                        {formatPrice(preview.refund)}
                                    </div>
                                </div>
                            )}

                            {/* PARTIAL REFUND */}
                            {preview.type === "partial" && (
                                <>
                                    <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl p-4 text-amber-700">
                                        <AlertTriangle size={18} className="mt-0.5" />
                                        <p className="text-sm">
                                            This appointment falls within our late change window.
                                            50% of the service fee will be retained.
                                        </p>
                                    </div>

                                    <div className="bg-gray-50 rounded-xl p-6 space-y-3">

                                        <div className="flex justify-between">
                                            <span className="text-gray-500">Paid</span>
                                            <span className="font-medium">
                                                {formatPrice(preview.paid)}
                                            </span>
                                        </div>

                                        <div className="flex justify-between text-green-600">
                                            <span>Refund</span>
                                            <span className="font-semibold">
                                                {formatPrice(preview.refund)}
                                            </span>
                                        </div>

                                        <div className="flex justify-between text-red-500">
                                            <span>Retained</span>
                                            <span className="font-medium">
                                                {formatPrice(preview.retained)}
                                            </span>
                                        </div>

                                    </div>
                                </>
                            )}

                            {/* NO REFUND */}
                            {preview.type === "none" && (
                                <div className="bg-red-50 border border-red-200 rounded-xl p-5 text-red-700 text-center">
                                    This appointment has already begun.
                                    <br />
                                    The service fee is non-refundable.
                                </div>
                            )}

                            <div className="space-y-3 pt-4">

                                {preview.type !== "none" && (
                                    <button
                                        onClick={handleConfirmCancel}
                                        disabled={loading}
                                        className="w-full bg-red-600 text-white py-3 rounded-full font-semibold hover:bg-red-700 transition"
                                    >
                                        {loading
                                            ? "Processing cancellation..."
                                            : "Confirm Cancellation"}
                                    </button>
                                )}

                                <button
                                    onClick={() => setStep("redirect")}
                                    className="text-sm text-gray-500 underline w-full text-center"
                                >
                                    Go Back
                                </button>

                            </div>

                        </div>
                    )}

                </div>
            </div>
        </div>
    );
}