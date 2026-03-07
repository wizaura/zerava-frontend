// components/booking/FinalDetailsStep.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import api from "@/lib/user/axios";

import FinalDetailsForm from "./FinalDetailsForm";
import BookingSummary from "./BookingSummary";
import { openLoginModal } from "@/store/slices/authSlice";
import { useDispatch } from "react-redux";
import { getApiError } from "@/lib/utils";

type Props = {
    bookingDraft: any;
    setBookingDraft: any;
    onBack: () => void;
    onSuccess: () => void;
};

export default function FinalDetailsStep({
    bookingDraft,
    setBookingDraft,
    onBack,
    onSuccess,
}: Props) {
    const { isAuthenticated } = useSelector((s: any) => s.auth);

    const [loading, setLoading] = useState(false);
    const [regLoading, setRegLoading] = useState(false);
    const [pendingSubmit, setPendingSubmit] = useState(false);

    const addressRef = useRef<HTMLInputElement | null>(null);
    const dispatch = useDispatch();

    function isValidUKReg(reg: string) {
        const cleaned = reg.toUpperCase().replace(/\s/g, "");
        return /^[A-Z]{2}[0-9]{2}[A-Z]{3}$/.test(cleaned);
    }

    async function lookupVehicle(reg: string) {
        if (!isValidUKReg(reg)) return;

        try {
            setRegLoading(true);

            const res = await api.post("/vehicle/lookup", {
                registrationNumber: reg,
            });

            setBookingDraft((d: any) => ({
                ...d,
                make: res.data.make,
                model: res.data.model,
            }));
        } finally {
            setRegLoading(false);
        }
    }

    useEffect(() => {
        if (isAuthenticated && pendingSubmit) {
            setPendingSubmit(false);
            submitBooking();
        }
    }, [isAuthenticated]);

    async function submitBooking() {

        if (!bookingDraft.name?.trim())
            return toast.error("Please enter your name");

        if (!bookingDraft.email?.includes("@"))
            return toast.error("Enter valid email");

        if (!bookingDraft.phone?.trim())
            return toast.error("Enter phone number");

        if (!bookingDraft.address?.trim())
            return toast.error("Enter service address");

        if (!bookingDraft.postcode?.trim())
            return toast.error("Postcode missing");

        if (!isValidUKReg(bookingDraft.registrationNumber || ""))
            return toast.error("Enter valid registration number");

        if (!bookingDraft.make?.trim())
            return toast.error("Enter Vehicle Make");

        if (!bookingDraft.model?.trim())
            return toast.error("Enter Vehicle Model");


        // 🔥 2. If form valid but NOT logged in → open modal

        if (!isAuthenticated) {
            setPendingSubmit(true);
            dispatch(openLoginModal());
            return;
        }

        // 🔥 3. Now proceed booking

        try {
            setLoading(true);

            const bookingRes = await api.post("/bookings", bookingDraft);

            const session = await api.post("/payments/create-session", {
                bookingId: bookingRes.data.id,
            });

            window.location.href = session.data.url;
            onSuccess();

        } catch (err: any) {
            toast.error(getApiError(err));
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="max-w-4xl mx-auto space-y-10 overflow-hidden">
            <h2 className="text-2xl font-medium text-gray-900">
                Final details
            </h2>

            <FinalDetailsForm
                bookingDraft={bookingDraft}
                setBookingDraft={setBookingDraft}
                addressRef={addressRef}
                regLoading={regLoading}
                isValidUKReg={isValidUKReg}
                lookupVehicle={lookupVehicle}
            />

            <BookingSummary bookingDraft={bookingDraft} />

            <div className="flex justify-between">
                <button
                    onClick={onBack}
                    className="rounded-full border px-6 py-2 text-sm"
                >
                    ← Back
                </button>

                <button
                    disabled={loading}
                    onClick={submitBooking}
                    className="rounded-full px-8 py-2 text-sm text-white bg-black"
                >
                    {loading ? "Processing…" : "Confirm & Pay"}
                </button>
            </div>
        </div>
    );
}