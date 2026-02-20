"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import api from "@/lib/user/axios";
import {
    Sparkles,
    Droplets,
    Shield,
    Leaf,
    Clock,
    Check,
    Star
} from "lucide-react";

const iconMap: Record<string, any> = {
    sparkles: Sparkles,
    shield: Shield,
    droplets: Droplets,
    leaf: Leaf,
    clock: Clock
};

type Plan = {
    id: string;
    name: string;
    description: string;
    durationMin: number;
    features: string[];
    isPopular?: boolean;
    prices: Record<string, number>;
};

type PricingMatrix = {
    vehicleCategories: {
        slug: string;
        label: string;
        description?: string;
    }[];
    plans: {
        oneoff: Record<string, Plan>;
        subscription: Record<
            string,
            {
                monthly?: Plan;
                fortnightly?: Plan;
            }
        >;
    };
};

export default function PricingSection() {
    const [data, setData] = useState<PricingMatrix | null>(null);

    const [vehicleSize, setVehicleSize] = useState<
        "standard" | "large" | "xl"
    >("standard");

    const [planType, setPlanType] = useState<
        "oneoff" | "subscription"
    >("subscription");

    const [tier, setTier] = useState<
        "zerava-care" | "zerava-care-plus"
    >("zerava-care-plus");

    useEffect(() => {
        api.get("/services/matrix").then((res) => {
            setData(res.data);
        });
    }, []);

    console.log(data, 'data')
    if (!data) return null;

    // 🔥 Get selected plan
    const plansToRender = (() => {
        if (!data) return [];

        // ONE-OFF → show both services
        if (planType === "oneoff") {
            return Object.values(data.plans.oneoff || {});
        }

        // SUBSCRIPTION
        const tierData = data.plans.subscription?.[tier];

        if (!tierData) return [];

        // Zerava Care → only monthly
        if (tier === "zerava-care") {
            return tierData.monthly
                ? [{ ...tierData.monthly, billing: "monthly" }]
                : [];
        }

        // Zerava Care+ → monthly + fortnightly
        if (tier === "zerava-care-plus") {
            return Object.entries(tierData).map(([key, value]) => ({
                ...value,
                billing: key,
            }));
        }

        return [];
    })();

    return (
        <>
            {/* ================= VEHICLE SECTION (WHITE BG) ================= */}
            <section className="bg-white py-14 border-b">
                <div className="max-w-6xl mx-auto px-6 text-center">

                    <p className="text-sm text-gray-500 mb-4">
                        Select your vehicle size:
                    </p>

                    <div className="flex justify-center">
                        <div className="flex bg-gray-100 rounded-full p-1">
                            {data.vehicleCategories.map((cat) => (
                                <button
                                    key={cat.slug}
                                    onClick={() => setVehicleSize(cat.slug as any)}
                                    className={`px-6 py-2 text-sm font-medium rounded-full transition ${vehicleSize === cat.slug
                                        ? "bg-black text-white"
                                        : "text-gray-600"
                                        }`}
                                >
                                    {cat.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Description Below */}
                    <p className="mt-4 text-sm text-gray-500 text-center">
                        {
                            data.vehicleCategories.find(
                                (c) => c.slug === vehicleSize
                            )?.description
                        }
                    </p>

                </div>
            </section>

            {/* ================= PRICING SECTION (GREY BG) ================= */}
            <section className="bg-[#f6f6f6] py-24">
                <div className="max-w-6xl mx-auto px-6">

                    {/* ---------- PLAN SWITCH ---------- */}
                    <div className="flex justify-center mb-12">
                        <div className="flex flex-col sm:flex-row bg-black rounded-2xl sm:rounded-full p-2 shadow-lg w-full sm:w-auto gap-2 sm:gap-0">

                            {/* SUBSCRIPTION */}
                            <button
                                onClick={() => setPlanType("subscription")}
                                className={`flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 px-6 sm:px-8 py-3 sm:py-2 rounded-xl sm:rounded-full transition w-full sm:w-auto text-center ${planType === "subscription"
                                    ? "bg-electric-teal text-black font-semibold"
                                    : "text-white"
                                    }`}
                            >
                                <div className="flex items-center gap-2">
                                    <Sparkles
                                        className={`w-4 h-4 ${planType === "subscription"
                                            ? "text-black"
                                            : "text-white"
                                            }`}
                                    />
                                    <span>Subscriptions</span>
                                </div>

                                <span
                                    className={`text-xs font-semibold ${planType === "subscription"
                                        ? "text-black"
                                        : "text-electric-teal"
                                        }`}
                                >
                                    Save up to 20%
                                </span>
                            </button>

                            {/* ONE-OFF */}
                            <button
                                onClick={() => setPlanType("oneoff")}
                                className={`px-6 sm:px-8 py-3 sm:py-2 rounded-xl sm:rounded-full transition w-full sm:w-auto text-center ${planType === "oneoff"
                                    ? "bg-white text-black font-semibold"
                                    : "text-white"
                                    }`}
                            >
                                One-off Cleans
                            </button>
                        </div>
                    </div>

                    {/* ---------- TITLE ---------- */}
                    <div className="text-center mb-8">
                        <h2 className="text-4xl font-light text-gray-900">
                            {planType === "subscription"
                                ? "Subscribe & Save"
                                : "One-off Cleans"}
                        </h2>

                        <p className="mt-4 text-gray-600 text-md">
                            {planType === "subscription"
                                ? "Regular maintenance with exclusive monthly rates. Cancel anytime."
                                : "Book individual services as and when you need them."}
                        </p>
                    </div>

                    {/* ---------- TIER SWITCH ---------- */}
                    {planType === "subscription" && (
                        <div className="flex justify-center mb-16">
                            <div className="flex bg-gray-200 rounded-full p-1">
                                <button
                                    onClick={() => setTier("zerava-care-plus")}
                                    className={`px-6 py-2 text-sm font-semibold rounded-full transition ${tier === "zerava-care-plus"
                                        ? "bg-white shadow font-medium"
                                        : "text-gray-600"
                                        }`}
                                >
                                    Zerava Care+
                                </button>
                                <button
                                    onClick={() => setTier("zerava-care")}
                                    className={`px-6 py-2 text-sm font-semibold rounded-full transition ${tier === "zerava-care"
                                        ? "bg-white shadow font-medium"
                                        : "text-gray-600"
                                        }`}
                                >
                                    Zerava Care
                                </button>

                            </div>
                        </div>
                    )}

                    {/* ---------- CARD ---------- */}
                    <div className="grid gap-10 md:grid-cols-2 max-w-4xl mx-auto">
                        {plansToRender.map((plan, index) => {
                            const price = plan.prices?.[vehicleSize];

                            const showPopular =
                                planType === "oneoff"
                                    ? plan.isPopular
                                    : plan.billing === "monthly";

                            return (
                                <div
                                    key={index}
                                    className={`relative bg-white rounded-2xl border p-10 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${showPopular
                                        ? "border-electric-teal"
                                        : "border-gray-200"
                                        }`}
                                >

                                    {/* Popular Badge */}
                                    {showPopular && (
                                        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                                            <span className="flex items-center text-white gap-2 bg-electric-teal text-black text-xs px-4 py-1 rounded-full font-semibold shadow">
                                                <Star className="text-white h-4 w-4" />
                                                Most Popular
                                            </span>
                                        </div>
                                    )}

                                    {/* Header with Icon */}
                                    <div className="flex items-center gap-3">
                                        {plan.icon && iconMap[plan.icon] && (
                                            <div className="p-2 rounded-xl bg-gray-100">
                                                {React.createElement(iconMap[plan.icon], {
                                                    className: "h-5 w-5 text-gray-700",
                                                })}
                                            </div>
                                        )}

                                        <h3 className="text-xl font-semibold text-gray-900">
                                            {plan.name}
                                        </h3>
                                    </div>

                                    {plan.billing && (
                                        <p className="text-sm text-electric-teal mt-2 capitalize font-medium">
                                            {plan.billing}
                                        </p>
                                    )}

                                    <p className="mt-3 text-gray-600 text-sm leading-relaxed">
                                        {plan.description}
                                    </p>

                                    {/* Price */}
                                    <div className="mt-8">
                                        <p className="text-5xl font-semibold text-gray-900">
                                            £{price / 100}
                                            {planType === "subscription" && (
                                                <span className="text-base font-normal text-gray-500">
                                                    {" "}
                                                    /month
                                                </span>
                                            )}
                                        </p>

                                        {planType === "subscription" && (
                                            <p className="mt-2 text-sm text-gray-500">
                                                {plan.name === "fortnightly" ? 2 : 1} visit per month
                                            </p>
                                        )}
                                        {plan.durationMin && (
                                            <>
                                                <p className="text-xs italic mt-3 text-gray-500">Time up to: {plan.durationMin} min</p>
                                                <span className="text-xs italic mt-3 text-gray-500">{plan.vehicleConditionNote}</span>
                                            </>
                                        )}
                                    </div>

                                    {/* Divider */}
                                    <div className="my-4 h-px bg-gray-200" />

                                    {/* Features */}
                                    <ul className="space-y-3 text-sm text-gray-700">
                                        {plan.features?.map((feature: string, i: number) => (
                                            <li key={i} className="flex items-start gap-2">
                                                <Check className="h-4 w-4 text-electric-teal mt-0.5" />
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>

                                    {/* CTA */}
                                    <Link
                                        href={
                                            planType === "subscription"
                                                ? `/subscribe?serviceId=${plan.id}&billing=${plan.billing}`
                                                : `/booking?serviceId=${plan.id}`
                                        }
                                        className={`mt-10 inline-flex w-full justify-center rounded-full px-8 py-3 font-medium transition ${showPopular
                                            ? "bg-eco-black text-white hover:bg-electric-teal"
                                            : "bg-gray-900 text-white hover:bg-electric-teal/70"
                                            }`}
                                    >
                                        {planType === "subscription"
                                            ? "Subscribe Now"
                                            : "Book Now"}
                                    </Link>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>
        </>
    );
}