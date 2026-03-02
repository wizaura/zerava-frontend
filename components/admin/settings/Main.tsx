"use client";

import { useState } from "react";

import TermsSection from "@/components/admin/settings/TermsSection";
import OffersSection from "@/components/admin/settings/OffersSection";
import SubscriptionsSection from "@/components/admin/settings/SubscriptionSection";
import FaqsSection from "@/components/admin/settings/FaqsSection";

export default function SettingsPage() {
    const [activeSection, setActiveSection] = useState<
        "terms" | "offers" | "subscriptions" | "faqs"
    >("terms");

    return (
        <div className="space-y-10">

            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

                {/* Title */}
                <div>
                    <h2 className="text-2xl font-semibold">
                        Zerava Platform Settings
                    </h2>
                    <p className="text-sm text-gray-500">
                        Manage legal text, offers, subscriptions and FAQs
                    </p>
                </div>

                {/* Section Switch Buttons */}
                <div className="flex flex-wrap items-center gap-3">
                    <button
                        onClick={() => setActiveSection("terms")}
                        className={`rounded-full px-5 py-2 text-sm font-medium transition
              ${activeSection === "terms"
                                ? "bg-emerald-500 text-black"
                                : "border hover:bg-gray-200 text-gray-800"
                            }`}
                    >
                        Terms
                    </button>

                    <button
                        onClick={() => setActiveSection("offers")}
                        className={`rounded-full px-5 py-2 text-sm font-medium transition
              ${activeSection === "offers"
                                ? "bg-emerald-500 text-black"
                                : "border hover:bg-gray-200 text-gray-800"
                            }`}
                    >
                        Offers
                    </button>

                    <button
                        onClick={() => setActiveSection("subscriptions")}
                        className={`rounded-full px-5 py-2 text-sm font-medium transition
              ${activeSection === "subscriptions"
                                ? "bg-emerald-500 text-black"
                                : "border hover:bg-gray-200 text-gray-800"
                            }`}
                    >
                        Subscriptions
                    </button>

                    <button
                        onClick={() => setActiveSection("faqs")}
                        className={`rounded-full px-5 py-2 text-sm font-medium transition
              ${activeSection === "faqs"
                                ? "bg-emerald-500 text-black"
                                : "border hover:bg-gray-200 text-gray-800"
                            }`}
                    >
                        FAQs
                    </button>
                </div>
            </div>

            {/* Content Section */}
            <div className="rounded-2xl p-8 border border-white/10">

                {activeSection === "terms" && <TermsSection />}
                {activeSection === "offers" && <OffersSection />}
                {activeSection === "subscriptions" && <SubscriptionsSection />}
                {activeSection === "faqs" && <FaqsSection />}

            </div>
        </div>
    );
}