"use client";

import Link from "next/link";
import { CheckCircle } from "lucide-react";
import { useSearchParams } from "next/navigation";

export default function BookingSuccessPage() {
    const params = useSearchParams();
    const ref = params.get("ref");

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
            <div className="max-w-md w-full rounded-2xl bg-white p-8 text-center shadow">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-green-100">
                    <CheckCircle className="text-green-600" size={28} />
                </div>

                <h1 className="text-2xl font-semibold text-gray-900">
                    Booking Confirmed 🎉
                </h1>

                <p className="mt-2 text-sm text-gray-600">
                    Your payment was successful and your booking is confirmed.
                </p>

                {ref && (
                    <p className="mt-4 rounded-lg bg-gray-100 py-2 text-sm">
                        Reference: <strong>{ref}</strong>
                    </p>
                )}

                <div className="mt-6 space-y-3">
                    <Link
                        href="/account/bookings"
                        className="block rounded-full bg-black px-6 py-3 text-sm font-medium text-white hover:bg-gray-800"
                    >
                        View My Bookings
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
