"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-hot-toast";
import api from "@/app/lib/axios";
import { useDispatch } from "react-redux";
import { setUser } from "@/app/store/slices/authSlice";

export default function LoginPage() {
    const router = useRouter();
    const params = useSearchParams();
    const redirect = params.get("redirect") || "/";

    const dispatch = useDispatch();

    const [step, setStep] = useState<"email" | "otp">("email");
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState(Array(6).fill(""));
    const inputs = useRef<(HTMLInputElement | null)[]>([]);
    const [loading, setLoading] = useState(false);

    const handleSendOtp = async () => {
        if (!email.includes("@")) return toast.error("Enter valid email");
        try {
            setLoading(true);
            await api.post("/auth/request-otp", { email });
            toast.success("OTP sent to email");
            setStep("otp");
        } catch {
            toast.error("Failed to send OTP");
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyOtp = async () => {
        const code = otp.join("");
        if (code.length !== 6) return toast.error("Enter full OTP");

        try {
            setLoading(true);

            // 1. Verify OTP (sets cookies)
            await api.post("/auth/verify-otp", { email, otp: code });

            // 2. Fetch user using cookies
            const me = await api.get("/auth/me");

            dispatch(setUser(me.data.user));

            toast.success("Login successful");
            router.replace(redirect);
        } catch {
            toast.error("Invalid OTP");
        } finally {
            setLoading(false);
        }
    };


    const handleChange = (i: number, v: string) => {
        if (!/^\d?$/.test(v)) return;
        const copy = [...otp];
        copy[i] = v;
        setOtp(copy);
        if (v && i < 5) inputs.current[i + 1]?.focus();
    };

    const handleBackspace = (i: number) => {
        if (!otp[i] && i > 0) inputs.current[i - 1]?.focus();
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-8">
                <div className="text-center mb-6">
                    <img src="/logo.png" alt="zerava" className="h-12 mx-auto mb-3" />
                    <h2 className="text-2xl font-semibold">Login</h2>
                    <p className="text-gray-500 text-sm">Secure OTP Authentication</p>
                </div>

                {step === "email" ? (
                    <>
                        <input
                            className="w-full border rounded-lg p-3 mb-4"
                            placeholder="Enter email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <button
                            onClick={handleSendOtp}
                            disabled={loading}
                            className="w-full bg-black text-white py-3 rounded-lg"
                        >
                            {loading ? "Sending..." : "Send OTP"}
                        </button>
                    </>
                ) : (
                    <>
                        <div className="flex justify-between mb-4">
                            {otp.map((v, i) => (
                                <input
                                    key={i}
                                    ref={(el) => {
                                        inputs.current[i] = el;
                                    }}
                                    value={v}
                                    maxLength={1}
                                    onChange={(e) => handleChange(i, e.target.value)}
                                    onKeyDown={(e) => e.key === "Backspace" && handleBackspace(i)}
                                    className="w-12 h-12 border text-center text-xl rounded-lg"
                                />
                            ))}
                        </div>

                        <button
                            onClick={handleVerifyOtp}
                            disabled={loading}
                            className="w-full bg-black text-white py-3 rounded-lg"
                        >
                            {loading ? "Verifying..." : "Verify OTP"}
                        </button>

                        <button
                            onClick={() => setStep("email")}
                            className="w-full text-sm mt-3 text-gray-500"
                        >
                            Change email
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}
