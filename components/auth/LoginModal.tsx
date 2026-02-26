"use client";

import { useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import api from "@/lib/user/axios";
import Image from "next/image";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { closeLoginModal, setUser } from "@/store/slices/authSlice";

export default function LoginModal() {
    // 🔹 STATE
    const [step, setStep] = useState<"email" | "otp">("email");
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState(Array(6).fill(""));
    const [loading, setLoading] = useState(false);
    const [timeLeft, setTimeLeft] = useState(120);

    // 🔹 REDUX
    const dispatch = useDispatch();
    const { loginModalOpen } = useSelector((s: any) => s.auth);

    // 🔹 REFS (ALWAYS declare before conditional return)
    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const inputs = useRef<(HTMLInputElement | null)[]>([]);

    // 🔹 CLEANUP
    useEffect(() => {
        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, []);

    // 🔹 TIMER
    const startTimer = () => {
        setTimeLeft(120);

        if (timerRef.current) {
            clearInterval(timerRef.current);
        }

        timerRef.current = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    if (timerRef.current) clearInterval(timerRef.current);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
    };

    // 🔹 SEND OTP
    const handleSendOtp = async () => {
        if (!email.includes("@")) {
            toast.error("Enter valid email");
            return;
        }

        try {
            setLoading(true);
            await api.post("/auth/request-otp", { email });
            toast.success("OTP sent");
            setStep("otp");
            startTimer();
        } catch {
            toast.error("Failed to send OTP");
        } finally {
            setLoading(false);
        }
    };

    // 🔹 VERIFY OTP
    const handleVerifyOtp = async () => {
        const code = otp.join("");

        if (code.length !== 6) {
            toast.error("Enter full OTP");
            return;
        }

        try {
            setLoading(true);
            const res = await api.post("/auth/verify-otp", { email, otp: code });

            toast.success("Login successful");

            dispatch(setUser(res.data.user));
            dispatch(closeLoginModal());

            // reset modal state
            setStep("email");
            setOtp(Array(6).fill(""));
            setEmail("");

        } catch {
            toast.error("Invalid OTP");
        } finally {
            setLoading(false);
        }
    };

    // 🔹 RESEND
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

    const formatTime = () => {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    };

    // ✅ IMPORTANT: Conditional return AFTER all hooks
    if (!loginModalOpen) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
            onClick={() => dispatch(closeLoginModal())}
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-6 relative"
            >
                <button
                    onClick={() => dispatch(closeLoginModal())}
                    className="absolute top-4 right-4 text-gray-400 hover:text-black"
                >
                    ✕
                </button>

                <div className="text-center">
                    <Link href="/" className="flex items-center justify-start">
                        <Image
                            src="/wordmark_black.svg"
                            alt="Zerava Logo"
                            width={100}
                            height={32}
                            className="object-contain"
                            priority
                        />
                    </Link>

                    <h2 className="my-6 text-xl font-semibold text-eco-black">
                        Login to your account
                    </h2>
                </div>

                {step === "email" ? (
                    <>
                        <label className="text-sm font-medium text-gray-600">
                            Email Address
                        </label>

                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full mt-2 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#38D6C4]"
                        />

                        <button
                            onClick={handleSendOtp}
                            disabled={loading}
                            className="w-full mt-5 py-3 rounded-lg bg-black hover:bg-electric-teal text-white font-semibold"
                        >
                            {loading ? "Sending..." : "Send OTP"}
                        </button>

                        <p className="mt-4 text-xs text-gray-500 text-center"> By continuing, you agree to Zerava's Terms & Conditions and Privacy Policy. </p>
                    </>
                ) : (
                    <>
                        <label className="text-sm font-medium text-gray-600">
                            Enter OTP
                        </label>

                        <div className="flex justify-between mt-3 mb-4">
                            {otp.map((v, i) => (
                                <input
                                    key={i}
                                    ref={(el) => {
                                        inputs.current[i] = el;
                                    }}
                                    value={v}
                                    maxLength={1}
                                    onChange={(e) => {
                                        const val = e.target.value;
                                        if (!/^\d?$/.test(val)) return;

                                        const copy = [...otp];
                                        copy[i] = val;
                                        setOtp(copy);

                                        if (val && i < 5) {
                                            inputs.current[i + 1]?.focus();
                                        }
                                    }}
                                    className="w-12 h-12 text-center text-lg rounded-lg border border-gray-300"
                                />
                            ))}
                        </div>

                        <div className="text-center text-sm text-gray-500 mb-3">
                            {timeLeft > 0
                                ? `Resend OTP in ${formatTime()}`
                                : "Didn't receive OTP?"}
                        </div>

                        <div className="flex gap-3">
                            <button
                                onClick={handleResend}
                                disabled={timeLeft > 0}
                                className="w-full py-2 rounded-lg border"
                            >
                                Resend
                            </button>

                            <button
                                onClick={handleVerifyOtp}
                                disabled={loading}
                                className="w-full py-2 rounded-lg bg-black hover:bg-electric-teal text-white"
                            >
                                {loading ? "Verifying..." : "Verify"}
                            </button>
                        </div>

                        <button
                            onClick={() => {
                                setStep("email");
                                setOtp(Array(6).fill(""));
                            }}
                            className="w-full mt-4 text-sm text-electric-teal"
                        >
                            Change Email
                        </button>
                    </>
                )}

                <p className="mt-6 text-xs text-center text-gray-400">
                    Secure OTP authentication for your Zerava account
                </p>
            </div>
        </div>
    );
}