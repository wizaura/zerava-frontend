"use client";

import { useEffect, useRef, useState } from "react";
import api from "@/lib/user/axios";
import { BookingDraft } from "./Main";
import { ChevronDown, Leaf, Loader2 } from "lucide-react";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

declare global {
    interface Window {
        google: any;
    }
}

type Props = {
    bookingDraft: BookingDraft;
    setBookingDraft: React.Dispatch<React.SetStateAction<BookingDraft>>;
    onBack: () => void;
    onSuccess: () => void;
};

export default function FinalDetailsStep({
    bookingDraft,
    setBookingDraft,
    onBack,
    onSuccess,
}: Props) {

    const { isAuthenticated } = useSelector((s: any) => s.auth);

    const [loading, setLoading] = useState(false);
    const [regLoading, setRegLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const addressRef = useRef<HTMLInputElement | null>(null);

    const [openSection, setOpenSection] = useState<string | null>("service");

    const toggle = (section: string) => {
        setOpenSection(prev => (prev === section ? null : section));
    };

    /* ================= GOOGLE AUTOCOMPLETE ================= */

    useEffect(() => {
        if (!window.google || !addressRef.current) return;

        const autocomplete = new window.google.maps.places.Autocomplete(
            addressRef.current,
            {
                types: ["address"],
                componentRestrictions: { country: "gb" },
            }
        );

        autocomplete.addListener("place_changed", () => {
            const place = autocomplete.getPlace();
            if (!place.formatted_address) return;

            const postcodeComp = place.address_components?.find((c: any) =>
                c.types.includes("postal_code")
            );

            setBookingDraft((d) => ({
                ...d,
                address: place.formatted_address,
                postcode: postcodeComp?.long_name ?? d.postcode,
            }));
        });

    }, []);

    /* ================= VEHICLE LOOKUP ================= */

    function isValidUKReg(reg: string) {
        const cleaned = reg.toUpperCase().replace(/\s/g, "");
        return /^[A-Z]{2}[0-9]{2}[A-Z]{3}$/.test(cleaned);
    }

    async function lookupVehicle(reg: string) {
        if (!isValidUKReg(reg)) return;

        try {
            setRegLoading(true);

            const res = await api.post("/vehicle/lookup", {
                registrationNumber: reg,
            });

            setBookingDraft((d) => ({
                ...d,
                make: res.data.make,
                model: res.data.model,
            }));

        } catch {
            // silent fail
        } finally {
            setRegLoading(false);
        }
    }

    const hasValidReg =
        bookingDraft.registrationNumber
            ? isValidUKReg(bookingDraft.registrationNumber)
            : false;

    const addOnsTotal = bookingDraft.addOns.reduce(
        (sum, a) => sum + a.price,
        0,
    );

    const total =
        (bookingDraft.basePrice ?? 0) + addOnsTotal;

    const canSubmit =
        isAuthenticated &&
        Boolean(bookingDraft.servicePriceId) &&
        Boolean(bookingDraft.timeFrom) &&
        Boolean(bookingDraft.timeTo) &&
        Boolean(bookingDraft.name?.trim()) &&
        Boolean(bookingDraft.email?.trim()) &&
        Boolean(bookingDraft.phone?.trim()) &&
        Boolean(bookingDraft.address?.trim()) &&
        Boolean(bookingDraft.postcode?.trim()) &&
        hasValidReg;

    /* ================= SUBMIT ================= */

    async function submitBooking() {
        if (loading) return;

        // 🔥 BASIC VALIDATION

        if (!isAuthenticated) {
            toast.error("Please login to continue");
            return;
        }

        if (!bookingDraft) {
            toast.error("Booking data missing");
            return;
        }

        if (!bookingDraft.date) {
            toast.error("Please select a date");
            return;
        }

        if (!bookingDraft.serviceSlotId) {
            toast.error("Please select a time slot");
            return;
        }

        if (!bookingDraft.vehicleCategory) {
            toast.error("Please select vehicle type");
            return;
        }

        if (!bookingDraft.address) {
            toast.error("Please select service address");
            return;
        }

        if (!bookingDraft.basePrice || bookingDraft.basePrice <= 0) {
            toast.error("Invalid pricing configuration");
            return;
        }

        if (!Array.isArray(bookingDraft.addOns)) {
            toast.error("Invalid add-on selection");
            return;
        }

        const invalidAddon = bookingDraft.addOns.find(a => !a.id);
        if (invalidAddon) {
            toast.error("One of the selected add-ons is invalid");
            return;
        }

        if (!canSubmit) {
            toast.error("Please complete all required fields");
            return;
        }

        try {
            setLoading(true);
            setError(null);

            // 🔥 Create booking
            const bookingRes = await api.post("/bookings", {
                ...bookingDraft,
                addOnIds: bookingDraft.addOns.map(a => a.id),
            });

            if (!bookingRes?.data?.id) {
                toast.error("Booking creation failed");
                return;
            }

            // 🔥 Create payment session
            const session = await api.post("/payments/create-session", {
                bookingId: bookingRes.data.id,
            });

            if (!session?.data?.url) {
                toast.error("Failed to initiate payment");
                return;
            }

            toast.success("Redirecting to secure payment...");
            window.location.href = session.data.url;

            onSuccess();

        } catch (err: any) {
            const message =
                err?.response?.data?.message ||
                "Something went wrong. Please try again.";

            toast.error(message);
            setError(message);
        } finally {
            setLoading(false);
        }
    }

    /* ================= UI ================= */

    return (
        <div className="max-w-4xl mx-auto space-y-10">

            <h2 className="text-2xl font-medium text-gray-900">
                Final details
            </h2>

            {/* CONTACT + VEHICLE + ADDRESS */}
            <div className="rounded-2xl border bg-white p-6 shadow-sm space-y-6">

                {/* Personal Info */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Input
                        label="Full name"
                        value={bookingDraft.name}
                        onChange={(v: string) =>
                            setBookingDraft(d => ({ ...d, name: v }))
                        }
                    />
                    <Input
                        label="Email"
                        type="email"
                        value={bookingDraft.email}
                        onChange={(v: string) =>
                            setBookingDraft(d => ({ ...d, email: v }))
                        }
                    />
                    <Input
                        label="Phone"
                        value={bookingDraft.phone}
                        onChange={(v: string) =>
                            setBookingDraft(d => ({ ...d, phone: v }))
                        }
                    />
                </div>

                {/* Vehicle */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="relative">
                        <Input
                            label="Registration number"
                            value={bookingDraft.registrationNumber || ""}
                            onChange={(v: string) => {
                                const val = v.toUpperCase();
                                setBookingDraft(d => ({
                                    ...d,
                                    registrationNumber: val,
                                }));

                                if (isValidUKReg(val)) {
                                    lookupVehicle(val);
                                }
                            }}
                        />
                        {regLoading && (
                            <Loader2 className="absolute right-3 top-9 animate-spin" size={18} />
                        )}
                        {bookingDraft.registrationNumber &&
                            !hasValidReg && (
                                <p className="text-sm text-red-500 mt-1">
                                    Enter valid UK registration (AB12 CDE)
                                </p>
                            )}
                    </div>

                    <Input
                        label="Make"
                        value={bookingDraft.make || ""}
                        onChange={(v: string) =>
                            setBookingDraft(d => ({ ...d, make: v }))
                        }
                    />

                    <Input
                        label="Model"
                        value={bookingDraft.model || ""}
                        onChange={(v: string) =>
                            setBookingDraft(d => ({ ...d, model: v }))
                        }
                    />
                </div>

                {/* Address */}
                <div className="space-y-2">
                    <label className="text-sm font-medium">
                        Full address
                    </label>
                    <input
                        ref={addressRef}
                        value={bookingDraft.address || ""}
                        onChange={(e) =>
                            setBookingDraft(d => ({
                                ...d,
                                address: e.target.value,
                            }))
                        }
                        className="w-full rounded-xl border px-4 py-3 text-sm"
                        placeholder="Start typing your address..."
                    />
                </div>

                {/* Parking Instructions */}
                <div className="space-y-2">
                    <label className="text-sm font-medium">
                        Parking / access instructions
                    </label>
                    <textarea
                        rows={3}
                        value={bookingDraft.parkingInstructions || ""}
                        onChange={(e) =>
                            setBookingDraft(d => ({
                                ...d,
                                parkingInstructions: e.target.value,
                            }))
                        }
                        className="w-full rounded-xl border px-4 py-3 text-sm"
                        placeholder="Gate code, driveway location, etc."
                    />
                </div>

            </div>

            {/* ECO BANNER */}
            <div className="flex items-center gap-3 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800">
                <Leaf size={16} />
                This clean saves <strong>150 litres of water</strong>
            </div>

            {/* SUMMARY */}
            <div className="rounded-2xl bg-black p-6 text-white space-y-4">
                <h3 className="text-lg font-medium">
                    Booking Summary
                </h3>

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
                            bookingDraft.timeTo,
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

                {/* PRICE */}
                <AccordionSection
                    title="Pricing"
                    isOpen={openSection === "price"}
                    onClick={() => toggle("price")}
                >
                    <SummaryRow
                        label="Base price"
                        value={`£${(bookingDraft.basePrice ?? 0) / 100}`}
                    />

                    {bookingDraft.addOns.map((a: any) => (
                        <SummaryRow
                            key={a.id}
                            label={a.name}
                            value={`+£${a.price / 100}`}
                        />
                    ))}
                </AccordionSection>

                {/* TOTAL (Always Visible) */}
                <div className="border-t border-white/20 pt-4 flex justify-between text-xl font-semibold">
                    <span>Total</span>
                    <span>£{total / 100}</span>
                </div>
            </div>

            {error && (
                <p className="text-sm text-red-500">{error}</p>
            )}

            {/* FOOTER */}
            <div className="flex justify-between">
                <button
                    onClick={onBack}
                    className="rounded-full border px-6 py-2 text-sm"
                >
                    ← Back
                </button>

                <button
                    disabled={!canSubmit || loading}
                    onClick={submitBooking}
                    className="rounded-full px-8 py-2 text-sm text-white bg-black hover:bg-gray-800"
                >
                    {loading
                        ? "Processing…"
                        : !isAuthenticated
                            ? "Login & Continue"
                            : "Confirm & Pay"}
                </button>
            </div>

        </div>
    );
}

/* ================= HELPERS ================= */

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
                    className={`transition-transform ${isOpen ? "rotate-180" : ""
                        }`}
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

function Input({
    label,
    value,
    onChange,
    placeholder,
    type = "text",
}: any) {
    return (
        <div>
            <label className="mb-1 block text-xs font-medium text-gray-600">
                {label}
            </label>
            <input
                type={type}
                value={value || ""}
                onChange={e => onChange(e.target.value)}
                placeholder={placeholder}
                className="w-full rounded-xl border px-4 py-3 text-sm"
            />
        </div>
    );
}

function SummaryRow({
    label,
    value,
}: {
    label: string;
    value?: string | null;
}) {
    return (
        <div className="flex justify-between">
            <p className="text-gray-400">{label}</p>
            <p className="font-medium">{value || "—"}</p>
        </div>
    );
}

function formatDate(dateStr?: string | null) {
    if (!dateStr) return "—";
    return new Date(dateStr).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
    });
}

function formatTimeRange(
    from?: string | null,
    to?: string | null,
) {
    if (!from || !to) return "—";

    const f = new Date(`1970-01-01T${from}`);
    const t = new Date(`1970-01-01T${to}`);

    const fmt = (d: Date) =>
        d.toLocaleTimeString("en-GB", {
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
        })
            .replace("am", "AM")
            .replace("pm", "PM");

    return `${fmt(f)} – ${fmt(t)}`;
}