import { Dispatch, SetStateAction, useState } from "react";
import { BookingDraft, Service, VehicleCategory } from "./Main";
import { Sparkles, Shield, Wrench } from "lucide-react";

type Props = {
    services: Service[];
    bookingDraft: BookingDraft;
    setBookingDraft: Dispatch<SetStateAction<BookingDraft>>;
    onContinue: () => void;
};

export default function ServiceStep({
    services,
    bookingDraft,
    setBookingDraft,
    onContinue,
}: Props) {
    const [selectedCategory, setSelectedCategory] =
        useState<VehicleCategory | null>(null);

    const canContinue = Boolean(bookingDraft.servicePriceId);

    const vehicleCategories: VehicleCategory[] = Array.from(
        new Map(
            services
                .flatMap((s) => s.prices.map((p) => p.vehicleCategory))
                .map((c) => [c.id, c]),
        ).values(),
    );

    const serviceIcons = [Sparkles, Shield, Wrench];

    return (
        <div className="space-y-10 max-w-3xl mx-auto">
            <h2 className="text-2xl font-medium text-gray-900">
                Choose your service
            </h2>

            {/* VEHICLE CATEGORY */}
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
                                <p className="mt-1 text-sm font-light text-gray-500">{c.description}</p>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* SERVICES */}
            {selectedCategory && (
                <div className="space-y-4">
                    {services.map((service, index) => {
                        const priceForCategory = service.prices.find(
                            (p) => p.vehicleCategory.id === selectedCategory.id,
                        );

                        if (!priceForCategory) return null;

                        const isPopular = service.isMaintenance;

                        const selected =
                            bookingDraft.servicePriceId === priceForCategory.id;

                        const Icon = serviceIcons[index % serviceIcons.length];

                        return (
                            <button
                                key={service.id}
                                onClick={() =>
                                    setBookingDraft((d) => ({
                                        ...d,
                                        servicePriceId: priceForCategory.id,
                                        serviceName: service.name,
                                        vehicleCategory: selectedCategory.name,
                                        basePrice: priceForCategory.price,
                                        serviceDurationMin: service.durationMin,
                                    }))
                                }
                                className={[
                                    "relative w-full rounded-xl p-6 text-left transition",
                                    "border shadow-sm",
                                    selected
                                        ? "border-electric-teal bg-electric-teal/10"
                                        : "border-gray-200 hover:shadow-md hover:border-electric-teal/90",
                                ].join(" ")}
                            >
                                {/* Popular badge */}
                                {isPopular && (
                                    <span className="absolute right-4 -top-3 rounded-full bg-emerald-500 px-3 py-1 text-xs font-medium text-white">
                                        Popular
                                    </span>
                                )}

                                <div className="flex items-center justify-between gap-6">
                                    <div className="flex items-start gap-4">
                                        {/* Icon */}
                                        <div className="m-auto rounded-lg bg-gray-100 p-3">
                                            <Icon className="h-7 w-7 text-gray-700" />
                                        </div>

                                        <div>
                                            <p className="font-medium text-gray-900">
                                                {service.name}
                                            </p>

                                            {service.description && (
                                                <p className="mt-1 text-sm text-gray-500">
                                                    {service.description}
                                                </p>
                                            )}

                                            <p className="mt-2 text-xs text-gray-400">
                                                ⏱ Up to {service.durationMin} min
                                            </p>
                                        </div>
                                    </div>

                                    <p className="text-xl font-semibold text-gray-900">
                                        £{priceForCategory.price / 100}
                                    </p>
                                </div>
                            </button>
                        );
                    })}

                </div>
            )}

            {/* FOOTER */}
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
