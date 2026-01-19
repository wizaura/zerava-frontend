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
                    </form>
                )}
            </div>
        </div>
    );
}
