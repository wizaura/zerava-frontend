"use client";

import { Loader2 } from "lucide-react";

export default function ProcessingStep() {
    return (
        <div className="flex min-h-[60vh] flex-col items-center justify-center text-center space-y-6">
            <div className="flex items-center justify-center rounded-full bg-electric-teal/10 p-6">
                <Loader2 className="h-10 w-10 animate-spin text-electric-teal" />
            </div>

            <div>
                <h2 className="text-xl font-medium text-gray-900">
                    Processing your booking
                </h2>
                <p className="mt-2 text-sm text-gray-500">
                    Please don’t refresh or close this page.
                </p>
            </div>
        </div>
    );
}
