// components/booking/BookingSummary.tsx
"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

type Props = {
    bookingDraft: any;
};

export default function BookingSummary({ bookingDraft }: Props) {
    const [openSection, setOpenSection] = useState<string | null>("service");

    const toggle = (section: string) => {
        setOpenSection((prev) => (prev === section ? null : section));
    };

    const addOnsTotal = bookingDraft.addOns?.reduce(
        (sum: number, a: any) => sum + a.price,
        0
    ) ?? 0;

    const total = (bookingDraft.basePrice ?? 0) + addOnsTotal;

    return (
        <div className="rounded-2xl bg-black p-6 text-white space-y-4">
            <h3 className="text-lg font-medium">Booking Summary</h3>

            {/* SERVICE */}
            <AccordionSection
                title="Service Details"
                isOpen={openSection === "service"}
                onClick={() => toggle("service")}
            >
                <SummaryRow label="Service" value={bookingDraft.serviceName} />
                <SummaryRow label="Vehicle category" value={bookingDraft.vehicleCategory} />
                <SummaryRow
                    label="Date & Time"
                    value={`${formatDate(bookingDraft.date)} · ${formatTimeRange(
                        bookingDraft.timeFrom,
                        bookingDraft.timeTo
                    )}`}
                />
            </AccordionSection>

            {/* CONTACT */}
            <AccordionSection
                title="Contact Details"
                isOpen={openSection === "contact"}
                onClick={() => toggle("contact")}
            >
                <SummaryRow label="Name" value={bookingDraft.name} />
                <SummaryRow label="Email" value={bookingDraft.email} />
                <SummaryRow label="Phone" value={bookingDraft.phone} />
            </AccordionSection>

            {/* VEHICLE */}
            <AccordionSection
                title="Vehicle Details"
                isOpen={openSection === "vehicle"}
                onClick={() => toggle("vehicle")}
            >
                <SummaryRow label="Registration" value={bookingDraft.registrationNumber} />
                <SummaryRow label="Make" value={bookingDraft.make} />
                <SummaryRow label="Model" value={bookingDraft.model} />
            </AccordionSection>

            {/* ADDRESS */}
            <AccordionSection
                title="Service Address"
                isOpen={openSection === "address"}
                onClick={() => toggle("address")}
            >
                <SummaryRow label="Address" value={bookingDraft.address} />
                <SummaryRow label="Postcode" value={bookingDraft.postcode} />
                {bookingDraft.parkingInstructions && (
                    <SummaryRow
                        label="Parking"
                        value={bookingDraft.parkingInstructions}
                    />
                )}
            </AccordionSection>

            {/* PRICING */}
            <AccordionSection
                title="Pricing"
                isOpen={openSection === "price"}
                onClick={() => toggle("price")}
            >
                <SummaryRow
                    label="Base price"
                    value={`£${((bookingDraft.basePrice ?? 0) / 100).toFixed(2)}`}
                />

                {bookingDraft.addOns?.map((a: any) => (
                    <SummaryRow
                        key={a.id}
                        label={a.name}
                        value={`+£${(a.price / 100).toFixed(2)}`}
                    />
                ))}
            </AccordionSection>

            {/* TOTAL (Always Visible) */}
            <div className="border-t border-white/20 pt-4 flex justify-between text-xl font-semibold">
                <span>Total</span>
                <span>£{(total / 100).toFixed(2)}</span>
            </div>
        </div>
    );
}

/* ================= ACCORDION ================= */

function AccordionSection({
    title,
    isOpen,
    onClick,
    children,
}: any) {
    return (
        <div className="border border-white/10 rounded-xl">
            <button
                onClick={onClick}
                className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium hover:bg-white/5 transition"
            >
                <span>{title}</span>
                <ChevronDown
                    size={16}
                    className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
                />
            </button>

            {isOpen && (
                <div className="px-4 pb-4 space-y-2 text-sm text-gray-300">
                    {children}
                </div>
            )}
        </div>
    );
}

/* ================= SUMMARY ROW ================= */

function SummaryRow({
    label,
    value,
}: {
    label: string;
    value?: string | null;
}) {
    return (
        <div className="flex justify-between gap-4">
            <p className="text-gray-400">{label}</p>
            <p className="font-medium text-right">{value || "—"}</p>
        </div>
    );
}

/* ================= HELPERS ================= */

function formatDate(dateStr?: string | null) {
    if (!dateStr) return "—";

    return new Date(dateStr).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
    });
}

function formatTimeRange(from?: string | null, to?: string | null) {
    if (!from || !to) return "—";

    const f = new Date(`1970-01-01T${from}`);
    const t = new Date(`1970-01-01T${to}`);

    const fmt = (d: Date) =>
        d
            .toLocaleTimeString("en-GB", {
                hour: "numeric",
                minute: "2-digit",
                hour12: true,
            })
            .replace("am", "AM")
            .replace("pm", "PM");

    return `${fmt(f)} – ${fmt(t)}`;
}