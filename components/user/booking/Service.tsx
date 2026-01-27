import { Dispatch, SetStateAction } from "react";
import { BookingDraft } from "./Main";
import { AirVentIcon, ShieldCheck, Sparkles, Wind } from "lucide-react";

type ServicePrice = {
    vehicleSize: string;
    serviceType: string;
    price: number;
};

type Props = {
    prices: ServicePrice[];
    bookingDraft: BookingDraft;
    setBookingDraft: Dispatch<SetStateAction<BookingDraft>>;
    onContinue: () => void;
};

const vehicleSizes = [
    { key: "SMALL", label: "Small", hint: "Polo, Fiesta, Corsa" },
    { key: "MEDIUM", label: "Medium", hint: "Golf, 3 Series, A4" },
    { key: "LARGE", label: "Large", hint: "Q7, X5, Discovery" },
];

const services = [
    {
        key: "EXTERIOR",
        title: "Exterior Clean",
        desc: "Full exterior wash, wheels & windows",
        duration: "40 min",
        icon: Sparkles,
    },
    {
        key: "INTERIOR",
        title: "Interior Refresh",
        desc: "Vacuum, dashboard, seats & freshening",
        duration: "50 min",
        icon: Wind,
    },
    {
        key: "FULL_VALET",
        title: "Full Valet",
        desc: "Complete inside & out treatment",
        duration: "90 min",
        icon: ShieldCheck,
        popular: true,
    },
];

export default function ServiceStep({
    prices,
    bookingDraft,
    setBookingDraft,
    onContinue,
}: Props) {
    const { vehicleSize, serviceType } = bookingDraft;

    const getPrice = (serviceKey: string) => {
        if (!prices?.length) return null;

        return prices.find(
            p =>
                p.vehicleSize === vehicleSize &&
                p.serviceType === serviceKey
        )?.price ?? null;
    };


    const canContinue = Boolean(
        bookingDraft.vehicleSize &&
        bookingDraft.serviceType &&
        bookingDraft.price !== null
    );


    return (
        <div className="space-y-10 max-w-3xl mx-auto">
            <h2 className="text-2xl font-medium text-gray-900">
                Choose your service
            </h2>

            {!prices?.length && (
                <div className="rounded-xl border border-yellow-300 bg-yellow-50 p-4 text-sm text-yellow-800">
                    Pricing is temporarily unavailable. Please try again in a moment.
                </div>
            )}


            {/* Vehicle Size */}
            <div>
                <p className="mb-3 text-sm font-medium text-gray-700">
                    Vehicle Size
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {vehicleSizes.map((v) => {
                        const selected = vehicleSize === v.key;

                        return (
                            <button
                                key={v.key}
                                onClick={() =>
                                    setBookingDraft((d) => ({
                                        ...d,
                                        vehicleSize: v.key,
                                        serviceType: null,
                                        price: null,
                                    }))
                                }
                                className={[
                                    "rounded-xl p-5 text-left transition bg-white",
                                    "border border-2 shadow-sm hover:shadow-md",
                                    selected
                                        ? "border-black"
                                        : "border-gray-200",
                                ].join(" ")}
                            >
                                <p className="font-medium text-gray-900">
                                    {v.label}
                                </p>
                                <p className="text-sm text-gray-500">
                                    {v.hint}
                                </p>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Service Type */}
            {vehicleSize && (
                <div className="space-y-4">
                    {services.map((s) => {
                        const Icon = s.icon;
                        const price = getPrice(s.key);
                        if (price === null) return null;

                        const selected = serviceType === s.key;

                        return (
                            <button
                                key={s.key}
                                onClick={() =>
                                    setBookingDraft((d) => ({
                                        ...d,
                                        serviceType: s.key,
                                        price,
                                    }))
                                }
                                className={[
                                    "relative w-full rounded-2xl p-6 text-left transition",
                                    "bg-white border shadow-sm hover:shadow-md",
                                    selected
                                        ? "border-electric-teal bg-electric-teal/15"
                                        : "border-gray-200",
                                ].join(" ")}
                            >
                                {s.popular && (
                                    <span className="absolute right-5 -top-3 rounded-full bg-electric-teal px-3 py-1 text-xs font-medium text-white">
                                        Popular
                                    </span>
                                )}

                                <div className="flex items-start justify-between gap-6">
                                    <div className="flex gap-4">
                                        <div
                                            className={[
                                                "flex h-10 w-10 items-center justify-center rounded-xl",
                                                selected
                                                    ? "bg-electric-teal text-white"
                                                    : "bg-slate-100 text-gray-600",
                                            ].join(" ")}
                                        >
                                            <Icon />
                                        </div>

                                        <div>
                                            <p className="font-medium text-gray-900">
                                                {s.title}
                                            </p>
                                            <p className="text-sm text-gray-500">
                                                {s.desc}
                                            </p>
                                            <p className="mt-1 text-xs text-gray-400">
                                                ⏱ {s.duration}
                                            </p>
                                        </div>
                                    </div>

                                    <p className="text-lg font-medium text-gray-900">
                                        £{price / 100}
                                    </p>
                                </div>
                            </button>
                        );
                    })}
                </div>
            )}

            {/* Footer */}
            <div className="flex justify-between pt-6">
                <button className="rounded-full border border-gray-300 bg-white px-6 py-2 text-sm text-gray-700 hover:bg-gray-50">
                    ← Cancel
                </button>

                <button
                    disabled={!canContinue}
                    onClick={onContinue}
                    className={[
                        "rounded-full px-8 py-2 text-sm text-white transition",
                        canContinue
                            ? "bg-black hover:bg-gray-800"
                            : "bg-gray-300 cursor-not-allowed",
                    ].join(" ")}
                >
                    Continue →
                </button>
            </div>
        </div>
    );
}

