"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-hot-toast";
import api from "@/lib/user/axios";

export default function ZeravaLoginPage() {
    const router = useRouter();
    const params = useSearchParams();
    const redirect = params.get("redirect") || "/";

    const [step, setStep] = useState<"email" | "otp">("email");
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState(Array(6).fill(""));
    const [loading, setLoading] = useState(false);

    const [timeLeft, setTimeLeft] = useState(120);
    const timerRef = useRef<NodeJS.Timeout | null>(null);
    const inputs = useRef<(HTMLInputElement | null)[]>([]);

    // 🔥 Start 2 min timer
    const startTimer = () => {
        setTimeLeft(120);
        if (timerRef.current) clearInterval(timerRef.current);

        timerRef.current = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(timerRef.current!);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
    };

    useEffect(() => {
        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, []);

    const handleSendOtp = async () => {
        if (!email.includes("@")) return toast.error("Enter valid email");

        try {
            setLoading(true);
            await api.post("/auth/request-otp", { email });

            toast.success("OTP sent to email");
            setStep("otp");
            startTimer();
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
            await api.post("/auth/verify-otp", { email, otp: code });

            toast.success("Login successful");
            router.replace(redirect);
        } catch {
            toast.error("Invalid OTP");
        } finally {
            setLoading(false);
        }
    };

    const handleResend = async () => {
        if (timeLeft > 0) return;

        try {
            await api.post("/auth/request-otp", { email });
            toast.success("OTP resent");
            startTimer();
        } catch {
            toast.error("Failed to resend OTP");
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

    const formatTime = () => {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    };

    return (
        <div className="min-h-screen md:mt-8 m-2 flex items-center justify-center bg-eco-black">
            <div className="w-full max-w-md m-auto bg-black rounded-2xl shadow-2xl p-4 md:p-10 text-white border border-[#38D6C4]/20">

                {/* LOGO SPACE */}
                <div className="mb-8">

                    {/* Top Row */}
                    <div className="flex items-center justify-between">

                        {/* Logo (Left Side) */}
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 bg-[#38D6C4]/20 rounded-full flex items-center justify-center">
                                <span className="text-[#38D6C4] font-bold text-lg">Z</span>
                            </div>
                            <span className="text-lg font-semibold tracking-wide">
                                Zerava
                            </span>
                        </div>

                        {/* Login Title (Right Side) */}
                        <h2 className="text-2xl font-semibold tracking-wide">
                            Login
                        </h2>
                    </div>

                    {/* Divider Line */}
                    <div className="mt-4 h-px bg-gradient-to-r from-transparent via-[#38D6C4]/40 to-transparent"></div>
                </div>

                {step === "email" ? (
                    <>
                        <label className="text-sm font-semibold italic mb-1">Email Address</label>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-3 rounded-lg bg-eco-black border border-[#38D6C4]/30 focus:outline-none focus:ring-2 focus:ring-[#38D6C4]"
                        />

                        <button
                            onClick={handleSendOtp}
                            disabled={loading}
                            className="w-full mt-6 py-3 rounded-lg bg-white hover:bg-electric-teal text-black font-semibold hover:opacity-90 transition"
                        >
                            {loading ? "Sending..." : "Send OTP"}
                        </button>
                    </>
                ) : (
                    <>
                        <div className="flex flex-col justify-between mb-4">
                            <label className="text-sm font-semibold italic mb-1">Enter the OTP input here</label>
                            <div className="flex justify-between">
                                {otp.map((v, i) => (
                                    <input
                                        key={i}
                                        ref={(el) => {
                                            inputs.current[i] = el;
                                        }}
                                        value={v}
                                        maxLength={1}
                                        onChange={(e) => handleChange(i, e.target.value)}
                                        onKeyDown={(e) =>
                                            e.key === "Backspace" && handleBackspace(i)
                                        }
                                        className="w-12 h-12 text-center text-xl rounded-lg bg-eco-black border border-[#38D6C4]/40 focus:outline-none focus:ring-2 focus:ring-[#38D6C4]"
                                    />
                                ))}
                            </div>
                        </div>

                        {/* TIMER */}
                        <div className="text-center text-sm text-[#A8F3D6] mb-3">
                            {timeLeft > 0
                                ? `Resend OTP in ${formatTime()}`
                                : "Didn't receive OTP?"}
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3">
                            {/* RESEND BUTTON */}
                            <button
                                onClick={handleResend}
                                disabled={timeLeft > 0}
                                className="w-full py-2 rounded-lg border border-white hover:border-electric-teal text-white hover:text-electric-teal disabled:opacity-40"
                            >
                                Resend OTP
                            </button>

                            <button
                                onClick={handleVerifyOtp}
                                disabled={loading}
                                className="w-full py-2 rounded-lg bg-white hover:bg-electric-teal text-black font-semibold hover:opacity-90 transition"
                            >
                                {loading ? "Verifying..." : "Verify OTP"}
                            </button>
                        </div>

                        <button
                            onClick={() => {
                                setStep("email");
                                setOtp(Array(6).fill(""));
                            }}
                            className="w-full mt-4 text-sm text-[#A8F3D6] hover:text-electric-teal hover:underline"
                        >
                            Change Email
                        </button>
                    </>
                )}
                <p className="mt-3 text-sm text-[#A8F3D6] text-center">
                    Secure OTP authentication for your Zerava account
                </p>
            </div>
        </div>
    );
}