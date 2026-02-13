"use client";

import { Mail, User, Phone, MapPin, X } from "lucide-react";
import { useState } from "react";
import { AdminBooking } from "@/lib/admin/booking.api";
import TextArea from "@/components/ui/TextArea";
import { formatDate } from "@/lib/utils";

type BookingUpdatePayload = {
    notes?: string;
};

export default function BookingDetailsModal({
    booking,
    onClose,
    onSave,
}: {
    booking: AdminBooking;
    onClose: () => void;
    onSave: (updated: BookingUpdatePayload) => void;
}) {
    const [notes, setNotes] = useState(booking.notes ?? "");

    function handleSave() {
        onSave({ notes });
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="relative flex w-full max-w-xl flex-col rounded-xl bg-white max-h-[90vh]">

                {/* HEADER */}
                <div className="flex items-center justify-between border-b px-6 py-4">
                    <h2 className="text-lg font-semibold">Booking Details</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-red-500"
                    >
                        <X size={18} />
                    </button>
                </div>

                {/* SCROLLABLE CONTENT */}
                <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6">

                    {/* SUMMARY */}
                    <div className="grid grid-cols-2 gap-4 rounded-lg bg-gray-50 p-4 text-sm">
                        <Info label="Reference" value={booking.referenceCode} />
                        <Info label="Service" value={booking.service.name} />
                        <Info label="Vehicle Size" value={booking.vehicleCategory.name} />
                        <Info label="Date" value={formatDate(booking.serviceSlot?.date)} />
                        <Info
                            label="Time"
                            value={`${booking.timeFrom} – ${booking.timeTo}`}
                        />
                        <Info label="Status" value={booking.status} />
                        <Info label="Price" value={`£${booking.price.toFixed(2)}`} />
                    </div>

                    {/* CUSTOMER */}
                    <div className="space-y-3 text-sm">
                        <Detail icon={<User size={14} />} value={booking.name} />
                        <Detail icon={<Mail size={14} />} value={booking.email} />
                        <Detail icon={<Phone size={14} />} value={booking.phone} />
                        <Detail
                            icon={<MapPin size={14} />}
                            value={`${booking.postcode}, ${booking.address}`}
                        />
                    </div>

                    {/* NOTES (Editable) */}
                    <TextArea
                        label="Internal Notes"
                        placeholder="Internal notes…"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                    />
                </div>

                {/* ACTIONS */}
                <div className="flex justify-end gap-3 border-t px-6 py-4">
                    <button
                        onClick={onClose}
                        className="rounded-full hover:bg-gray-200 border px-5 py-2"
                    >
                        Close
                    </button>
                    <button
                        onClick={handleSave}
                        className="rounded-full bg-emerald-500 hover:bg-emerald-600 px-6 py-2 text-white"
                    >
                        Save Notes
                    </button>
                </div>
            </div>
        </div>
    );
}

/* ---------- UI HELPERS ---------- */

function Info({ label, value }: { label: string; value?: string }) {
    return (
        <div>
            <p className="text-gray-500">{label}</p>
            <p className="font-medium">{value ?? "-"}</p>
        </div>
    );
}

function Detail({
    icon,
    value,
}: {
    icon: React.ReactNode;
    value: string;
}) {
    return (
        <p className="flex items-center gap-2 text-md">
            {icon}
            {value}
        </p>
    );
}
