import { Dispatch, SetStateAction, useState } from "react";
import { BookingDraft, Service, VehicleCategory, AddOns } from "./Main";
import {
    Sparkles,
    Shield,
    Droplet,
    Wind,
    Sun,
    Leaf,
} from "lucide-react";

const serviceIconMap: Record<string, any> = {
    "sparkles": Sparkles,
    "shield": Shield,
    "droplet": Droplet,
    "leaf": Leaf,
};

const addOnsIconMap: Record<string, any> = {
    "sparkles": Sparkles,
    "shield": Shield,
    "droplet": Droplet,
    "wind": Wind,
    "sun": Sun,
}



type Props = {
    services: Service[];
    addOns: AddOns[];
    bookingDraft: BookingDraft;
    setBookingDraft: Dispatch<SetStateAction<BookingDraft>>;
    onContinue: () => void;
};

export default function ServiceAndAddOnsStep({
    services,
    addOns,
    bookingDraft,
    setBookingDraft,
    onContinue,
}: Props) {

    const [selectedCategory, setSelectedCategory] =
        useState<VehicleCategory | null>(null);

    const canContinue = Boolean(bookingDraft.servicePriceId);

    /* ================= VEHICLE CATEGORIES ================= */

    const vehicleCategories: VehicleCategory[] = Array.from(
        new Map(
            services
                .flatMap((s) => s.prices.map((p) => p.vehicleCategory))
                .map((c) => [c.id, c]),
        ).values(),
    );

    /* ================= ADDON TOGGLE ================= */

    const toggleAddOn = (addon: AddOns) => {
        setBookingDraft((d) => {
            const exists = d.addOns.some((a) => a.id === addon.id);

            const updatedAddOns = exists
                ? d.addOns.filter((a) => a.id !== addon.id)
                : [
                    ...d.addOns,
                    {
                        id: addon.id,
                        name: addon.name,
                        price: addon.price,
                        durationMin: addon.durationMin,
                    },
                ];

            const totalAddOnDuration = updatedAddOns.reduce(
                (sum, a) => sum + a.durationMin,
                0,
            );

            return {
                ...d,
                addOns: updatedAddOns,
                addOnDurationMin: totalAddOnDuration,

                // Reset slot if duration changes
                serviceSlotId: null,
                templateId: null,
                timeFrom: null,
                timeTo: null,
            };
        });
    };

    return (
        <div className="space-y-12 max-w-4xl mx-auto">

            <h2 className="text-2xl font-medium text-gray-900">
                Choose your service
            </h2>

            {/* ================= VEHICLE SIZE ================= */}
            <div>
                <p className="mb-3 text-sm font-medium text-gray-600">
                    Vehicle Size
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {vehicleCategories.map((c) => {
                        const selected = selectedCategory?.id === c.id;

                        return (
                            <button
                                key={c.id}
                                onClick={() => {
                                    setSelectedCategory(c);
                                    setBookingDraft((d) => ({
                                        ...d,
                                        servicePriceId: null,
                                        vehicleCategory: c.name,
                                        basePrice: null,
                                        serviceName: null,
                                    }));
                                }}
                                className={[
                                    "rounded-lg px-5 py-4 text-center transition",
                                    "border bg-white shadow-sm",
                                    selected
                                        ? "border-black ring-1 ring-black"
                                        : "border-gray-200 hover:shadow-md",
                                ].join(" ")}
                            >
                                <p className="font-medium text-gray-900">
                                    {c.name}
                                </p>
                                <p className="mt-1 text-sm text-gray-500">
                                    {c.description}
                                </p>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* ================= SERVICES ================= */}
            {selectedCategory && (
                <div className="space-y-6">
                    {services.map((service) => {
                        const priceForCategory = service.prices.find(
                            (p) =>
                                p.vehicleCategory.id === selectedCategory.id,
                        );

                        if (!priceForCategory) return null;

                        const selected =
                            bookingDraft.servicePriceId ===
                            priceForCategory.id;

                        const Icon =
                            serviceIconMap[service.icon] ?? Sparkles;

                        return (
                            <button
                                key={service.id}
                                onClick={() =>
                                    setBookingDraft((d) => ({
                                        ...d,
                                        servicePriceId: priceForCategory.id,
                                        serviceName: service.name,
                                        basePrice: priceForCategory.price,
                                        serviceDurationMin: service.durationMin,
                                    }))
                                }
                                className={[
                                    "relative w-full rounded-xl p-6 text-left transition",
                                    "border shadow-sm",
                                    selected
                                        ? "border-electric-teal bg-electric-teal/10"
                                        : "border-gray-200 hover:shadow-md hover:border-electric-teal/80",
                                ].join(" ")}
                            >
                                {/* BADGE */}
                                {(service.isPopular || service.badgeLabel) && (
                                    <span
                                        className={[
                                            "absolute -top-3 right-4 px-3 py-1 text-xs font-medium rounded-full",
                                            service.isPopular
                                                ? "bg-emerald-500 text-white"
                                                : "bg-gray-900 text-white",
                                        ].join(" ")}
                                    >
                                        {service.badgeLabel ?? "Popular"}
                                    </span>
                                )}

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div
                                            className={[
                                                "rounded-lg p-3 transition",
                                                selected
                                                    ? "bg-electric-teal text-white"
                                                    : "bg-gray-100 text-gray-700",
                                            ].join(" ")}
                                        >
                                            <Icon className="h-6 w-6" />
                                        </div>

                                        <div>
                                            <p className="font-medium text-gray-900">
                                                {service.name}
                                            </p>

                                            <p className="text-xs text-gray-400">
                                                ⏱ Up to {service.durationMin} min
                                            </p>
                                        </div>
                                    </div>

                                    <p className="text-xl font-semibold">
                                        £{priceForCategory.price / 100}
                                    </p>
                                </div>
                            </button>
                        );
                    })}
                </div>
            )}

            {/* ================= ADD-ONS ================= */}
            {bookingDraft.servicePriceId && (
                <div className="space-y-6 pt-8 border-t">
                    <h3 className="text-xl font-medium text-gray-900">
                        Add-on treatments
                    </h3>

                    <div className="grid sm:grid-cols-2 gap-4">
                        {addOns.map((a) => {
                            const selected = bookingDraft.addOns.some(
                                (x) => x.id === a.id,
                            );

                            const Icon =
                                addOnsIconMap[a.icon as string] ?? Sparkles;

                            return (
                                <button
                                    key={a.id}
                                    onClick={() => toggleAddOn(a)}
                                    className={[
                                        "rounded-xl border p-5 text-left transition",
                                        selected
                                            ? "border-electric-teal bg-electric-teal/10"
                                            : "border-gray-200 hover:shadow-md",
                                    ].join(" ")}
                                >
                                    <div className="flex items-center justify-between">

                                        {/* LEFT SIDE */}
                                        <div className="flex items-center gap-4">

                                            {/* ICON */}
                                            <div
                                                className={[
                                                    "rounded-lg p-3 transition",
                                                    selected
                                                        ? "bg-electric-teal text-white"
                                                        : "bg-gray-100 text-gray-700",
                                                ].join(" ")}
                                            >
                                                <Icon className="h-5 w-5" />
                                            </div>

                                            {/* TEXT */}
                                            <div>
                                                <p className="font-medium text-gray-900">
                                                    {a.name}
                                                </p>
                                                <p className="text-xs text-gray-400">
                                                    +{a.durationMin} min
                                                </p>
                                            </div>
                                        </div>

                                        {/* PRICE */}
                                        <p className="font-semibold text-gray-900">
                                            +£{a.price / 100}
                                        </p>

                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* ================= CONTINUE ================= */}
            <div className="flex justify-end pt-6">
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
