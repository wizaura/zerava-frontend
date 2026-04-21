"use client";

import api from "@/lib/user/axios";
import { useState } from "react";
import {
    User,
    Mail,
    Phone,
    MapPin,
    Car,
    Calendar,
    Clock,
    CreditCard,
} from "lucide-react";

export default function ReviewStep({ bookingDraft, onBack }: any) {
    const [loading, setLoading] = useState(false);
    const [paymentLink, setPaymentLink] = useState<string | null>(null);

    async function createBooking() {
        try {
            setLoading(true);

            const res = await api.post("/admin/bookings/create", bookingDraft);

            setPaymentLink(res.data.paymentLink);

        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="space-y-4">

            <h2 className="text-xl font-semibold text-gray-900">
                Review & Confirm Booking
            </h2>

            {/* -------- CUSTOMER -------- */}
            <Section title="Customer">
                <Item icon={<User size={16} />} label="Name" value={bookingDraft.name} />
                <Item icon={<Mail size={16} />} label="Email" value={bookingDraft.email} />
                <Item icon={<Phone size={16} />} label="Phone" value={bookingDraft.phone} />
                <Item icon={<MapPin size={16} />} label="Address" value={bookingDraft.address} />
                <Item label="Postcode" value={bookingDraft.postcode} />
            </Section>

            {/* -------- VEHICLE -------- */}
            <Section title="Vehicle">
                <Item icon={<Car size={16} />} label="Registration" value={bookingDraft.registrationNumber} />
                <Item label="Make" value={bookingDraft.make} />
                <Item label="Model" value={bookingDraft.model} />
                <Item label="Colour" value={bookingDraft.colour} />
            </Section>

            {/* -------- SERVICE -------- */}
            <Section title="Service">
                <Item label="Service" value={bookingDraft.serviceName} />
                {bookingDraft.addOns?.length > 0 && (
                    <div className="text-sm">
                        <p className="text-gray-500 mb-1">Add-ons</p>
                        <ul className="list-disc ml-5">
                            {bookingDraft.addOns.map((a: any) => (
                                <li key={a.id}>{a.name}</li>
                            ))}
                        </ul>
                    </div>
                )}
            </Section>

            {/* -------- SCHEDULE -------- */}
            <Section title="Schedule">
                <Item icon={<Calendar size={16} />} label="Date" value={bookingDraft.date} />
                <Item
                    icon={<Clock size={16} />}
                    label="Time"
                    value={`${bookingDraft.timeFrom} - ${bookingDraft.timeTo}`}
                />
            </Section>

            {/* -------- ACCESS -------- */}
            {bookingDraft.parkingInstructions && (
                <Section title="Access">
                    <p className="text-sm text-gray-700">
                        {bookingDraft.parkingInstructions}
                    </p>
                </Section>
            )}

            {/* -------- ACTION -------- */}
            {!paymentLink ? (
                <button
                    onClick={createBooking}
                    disabled={loading}
                    className="w-full bg-[#0B2E28] text-white py-3 rounded-full flex items-center justify-center gap-2"
                >
                    <CreditCard size={16} />
                    {loading
                        ? "Creating Booking..."
                        : "Create Booking & Generate Payment Link"}
                </button>
            ) : (
                <div className="p-5 bg-green-50 border border-green-200 rounded-xl space-y-3">
                    <p className="text-sm font-medium text-green-700">
                        Booking created successfully 🎉
                    </p>

                    <a
                        href={paymentLink}
                        target="_blank"
                        className="block w-full text-center bg-[#0B2E28] text-white py-2 rounded-full"
                    >
                        Open Payment Link
                    </a>

                    <button
                        onClick={() => navigator.clipboard.writeText(paymentLink)}
                        className="text-sm text-gray-600 underline"
                    >
                        Copy link
                    </button>
                </div>
            )}

            {/* BACK */}
            <div className="flex justify-between pt-6">
                <button
                    onClick={onBack}
                    className="rounded-full border px-6 py-2 text-sm"
                >
                    ← Back
                </button>
            </div>

        </div>
    );
}

/* ---------- UI HELPERS ---------- */

function Section({ title, children }: any) {
    return (
        <div className="border border-gray-200 rounded-2xl p-5 space-y-3 bg-white">
            <h3 className="text-sm font-semibold text-gray-800">{title}</h3>
            {children}
        </div>
    );
}

function Item({ icon, label, value }: any) {
    if (!value) return null;

    return (
        <div className="flex items-center gap-2 text-sm text-gray-700">
            {icon && <span className="text-gray-400">{icon}</span>}
            <span className="text-gray-500">{label}:</span>
            <span className="font-medium">{value}</span>
        </div>
    );
}