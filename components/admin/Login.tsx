"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { adminRequestOtp, adminVerifyOtp } from "@/lib/admin/admin.api";

export default function AdminLoginPage() {
    const router = useRouter();

    const [step, setStep] = useState<1 | 2>(1);
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [timeLeft, setTimeLeft] = useState(0);
    const [canResend, setCanResend] = useState(false);
    const [loading, setLoading] = useState(false);

    /* ---------------- STEP 1: SEND OTP ---------------- */

    async function sendOtp(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);

        try {
            await adminRequestOtp(email);

            setStep(2);
            setTimeLeft(120);
            setCanResend(false);

        } catch (error: any) {
            console.error(error);
            // toast.error(error?.response?.data?.message || "Failed to send OTP");
        } finally {
            setLoading(false);
        }
    }

    /* ---------------- STEP 2: VERIFY OTP ---------------- */

    async function verifyOtp(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);

        try {
            await adminVerifyOtp(email, otp);

            router.push("/admin");

        } catch (error: any) {
            console.error(error);
            // toast.error("Invalid OTP");
        } finally {
            setLoading(false);
        }
    }

    async function resendOtp() {
        if (!canResend) return;

        setLoading(true);

        try {
            await adminRequestOtp(email);

            setTimeLeft(120);
            setCanResend(false);

        } catch (error: any) {
            console.error(error);
            // toast.error("Failed to resend OTP");
        } finally {
            setLoading(false);
        }
    }



    useEffect(() => {
        if (timeLeft <= 0) {
            setCanResend(true);
            return;
        }

        const timer = setTimeout(() => {
            setTimeLeft((prev) => prev - 1);
        }, 1000);

        return () => clearTimeout(timer);
    }, [timeLeft]);


    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-eco-black to-black px-4">
            <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl">

                {step === 1 && (
                    <form onSubmit={sendOtp} className="space-y-6">
                        <h1 className="text-2xl font-semibold text-gray-900">Admin Access</h1>
                        <p className="text-sm text-gray-500">
                            Enter your administrator email to receive a login code.
                        </p>

                        <input
                            type="email"
                            required
                            placeholder="admin@zerava.co"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:border-emerald-500 focus:outline-none"
                        />

                        <button
                            disabled={loading}
                            className="w-full rounded-full bg-eco-black py-3 text-sm font-semibold text-white hover:bg-gray-800 disabled:opacity-60"
                        >
                            {loading ? "Sending code..." : "Send OTP"}
                        </button>
                    </form>
                )}

                {step === 2 && (
                    <form onSubmit={verifyOtp} className="space-y-6">
                        <h1 className="text-2xl font-semibold text-gray-900">Verify Code</h1>
                        <p className="text-sm text-gray-500">
                            OTP sent to <strong>{email}</strong>
                        </p>

                        <input
                            type="text"
                            required
                            placeholder="6-digit code"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-center tracking-widest text-lg focus:border-emerald-500 focus:outline-none"
                        />

                        <button
                            disabled={loading}
                            className="w-full rounded-full bg-eco-black py-3 text-sm font-semibold text-white hover:bg-gray-800 disabled:opacity-60"
                        >
                            {loading ? "Verifying..." : "Login"}
                        </button>

                        <button
                            type="button"
                            onClick={() => setStep(1)}
                            className="w-full text-center text-sm text-gray-500 hover:underline"
                        >
                            Change email
                        </button>
                        <div className="text-center text-sm text-gray-500">
                            {canResend ? (
                                <button
                                    type="button"
                                    onClick={resendOtp}
                                    className="text-emerald-600 hover:underline"
                                >
                                    Resend OTP
                                </button>
                            ) : (
                                <span>
                                    Resend in {Math.floor(timeLeft / 60)}:
                                    {String(timeLeft % 60).padStart(2, "0")}
                                </span>
                            )}
                        </div>

                    </form>
                )}
            </div>
        </div>
    );
}
