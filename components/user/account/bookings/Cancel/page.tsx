"use client";

import Link from "next/link";
import { XCircle } from "lucide-react";
import { useSearchParams } from "next/navigation";

export default function BookingCancelPage() {
    const params = useSearchParams();
    const ref = params.get("ref");

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
            <div className="max-w-md w-full rounded-2xl bg-white p-8 text-center shadow">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-100">
                    <XCircle className="text-red-600" size={28} />
                </div>

                <h1 className="text-2xl font-semibold text-gray-900">
                    Payment Cancelled
                </h1>

                <p className="mt-2 text-sm text-gray-600">
                    Your payment was not completed. No money was charged.
                </p>

                {ref && (
                    <p className="mt-4 rounded-lg bg-gray-100 py-2 text-sm">
                        Reference: <strong>{ref}</strong>
                    </p>
                )}

                <div className="mt-6 space-y-3">
                    <Link
                        href={`/booking?ref=${ref ?? ""}`}
                        className="block rounded-full bg-black px-6 py-3 text-sm font-medium text-white hover:bg-gray-800"
                    >
                        Try Again
                    </Link>

                    <Link
                        href="/contact"
                        className="block text-sm text-gray-500 hover:underline"
                    >
                        Contact Support
                    </Link>
                </div>
            </div>
        </div>
    );
}
