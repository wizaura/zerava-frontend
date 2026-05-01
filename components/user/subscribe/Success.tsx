"use client";

import Link from "next/link";
import { CheckCircle } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function SubscriptionSuccessPage() {
    const params = useSearchParams();

    const sessionId = params.get("session_id");
    const amount = params.get("amount"); // optional if you pass

    /* Optional: Facebook Pixel */
    useEffect(() => {
        if ((window as any).fbq && amount) {
            (window as any).fbq("track", "Subscribe", {
                value: Number(amount) / 100,
                currency: "GBP",
            });
        }
    }, [amount]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
            <div className="max-w-md w-full rounded-2xl bg-white p-8 text-center shadow">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-green-100">
                    <CheckCircle className="text-green-600" size={28} />
                </div>

                <h1 className="text-2xl font-semibold text-gray-900">
                    Subscription Activated 🎉
                </h1>

                <p className="mt-2 text-sm text-gray-600">
                    Your subscription has been successfully created.
                </p>

                {sessionId && (
                    <p className="mt-4 rounded-lg bg-gray-100 py-2 text-sm">
                        Session: <strong>{sessionId.substring(0,8)}...</strong>
                    </p>
                )}

                <div className="mt-6 space-y-3">
                    <Link
                        href="/account/subscriptions"
                        className="block rounded-full bg-black px-6 py-3 text-sm font-medium text-white hover:bg-gray-800"
                    >
                        View My Subscriptions
                    </Link>

                    <Link
                        href="/"
                        className="block text-sm text-gray-500 hover:underline"
                    >
                        Go to Home
                    </Link>
                </div>
            </div>
        </div>
    );
}