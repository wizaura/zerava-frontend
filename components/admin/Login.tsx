"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { adminRequestOtp, adminVerifyOtp } from "@/app/lib/adminApi";

export default function AdminLoginPage() {
    const router = useRouter();

    const [step, setStep] = useState<1 | 2>(1);
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [loading, setLoading] = useState(false);

    /* ---------------- STEP 1: SEND OTP ---------------- */

    async function sendOtp(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);

        const res = await adminRequestOtp(email);

        setLoading(false);

        setStep(2);
    }

    /* ---------------- STEP 2: VERIFY OTP ---------------- */

    async function verifyOtp(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);

        const res = await adminVerifyOtp(email, otp);

        setLoading(false);

        router.push("/admin");
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-eco-black">
            <div className="w-full max-w-sm rounded-lg p-6 shadow">
                {step === 1 && (
                    <form onSubmit={sendOtp} className="space-y-4">
                        <h1 className="text-2xl font-semibold">Admin Login</h1>
                        <p className="text-sm text-gray-500">
                            Enter your admin email to receive an OTP
                        </p>

                        <input
                            type="email"
                            required
                            placeholder="admin@zerava.co"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full rounded bg-gray-900 border p-2"
                        />

                        <button
                            disabled={loading}
                            className="w-full rounded bg-black py-2 text-white disabled:opacity-60"
                        >
                            {loading ? "Sending..." : "Send OTP"}
                        </button>
                    </form>
                )}

                {step === 2 && (
                    <form onSubmit={verifyOtp} className="space-y-4">
                        <h1 className="text-2xl font-semibold">Verify OTP</h1>
                        <p className="text-sm text-gray-500">
                            OTP sent to <strong>{email}</strong>
                        </p>

                        <input
                            type="text"
                            required
                            placeholder="Enter 6-digit OTP"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            className="w-full rounded border p-2 tracking-widest"
                        />

                        <button
                            disabled={loading}
                            className="w-full rounded bg-black py-2 text-white disabled:opacity-60"
                        >
                            {loading ? "Verifying..." : "Verify & Login"}
                        </button>

                        <button
                            type="button"
                            onClick={() => setStep(1)}
                            className="w-full text-sm text-gray-500 underline"
                        >
                            Change email
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
}
