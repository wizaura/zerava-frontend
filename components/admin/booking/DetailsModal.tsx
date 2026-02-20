"use client";

import { Mail, User, Phone, MapPin, X } from "lucide-react";
import { useState } from "react";
import { AdminBooking } from "@/lib/admin/booking.api";
import TextArea from "@/components/ui/TextArea";
import { formatDate } from "@/lib/utils";
import ZeravaSelect from "@/components/ui/SelectOption";

type BookingUpdatePayload = {
    notes?: string;
    status?: AdminBooking["status"];
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
    const [status, setStatus] = useState(booking.status);

    function handleSave() {
        onSave({ notes, status });
    }

    function getAllowedStatuses(
        current: AdminBooking["status"]
    ): AdminBooking["status"][] {
        switch (current) {
            case "PENDING_PAYMENT":
                return ["PENDING_PAYMENT", "CONFIRMED", "CANCELLED"];
            case "CONFIRMED":
                return ["CONFIRMED", "COMPLETED", "CANCELLED"];
            case "COMPLETED":
                return ["COMPLETED"];
            case "CANCELLED":
                return ["CANCELLED"];
            default:
                return [current];
        }
    }

    function formatStatusLabel(status: string) {
        return status
            .toLowerCase()
            .replace(/_/g, " ")
            .replace(/\b\w/g, (l) => l.toUpperCase());
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
                        <Info label="Price" value={`£${booking.price.toFixed(2)}`} />
                    </div>

                    {/* VEHICLE DETAILS */}
                    <div className="space-y-3 rounded-lg bg-gray-50 p-4 text-sm">
                        <p className="font-medium text-gray-700">Vehicle Details</p>

                        <div className="grid grid-cols-2 gap-4">
                            <Info label="Make" value={booking.make} />
                            <Info label="Model" value={booking.model} />
                            <Info label="Registration" value={booking.registrationNumber} />
                            <Info label="Vehicle Size" value={booking.vehicleCategory.name} />
                        </div>
                    </div>

                    <div className="space-y-1">
                        <p className="text-gray-500 text-sm font-medium">
                            Status
                        </p>

                        <ZeravaSelect
                            value={status}
                            onChange={(val) =>
                                setStatus(val as AdminBooking["status"])
                            }
                            options={getAllowedStatuses(booking.status).map((s) => ({
                                label: formatStatusLabel(s),
                                value: s,
                            }))}
                            className="w-full"
                        />
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

                    {/* PARKING / ACCESS */}
                    {booking.parkingInstructions && (
                        <div className="space-y-1 text-sm">
                            <p className="text-gray-500">Parking / Access Instructions</p>
                            <p className="rounded-md bg-gray-50 p-3">
                                {booking.parkingInstructions}
                            </p>
                        </div>
                    )}

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
                        Save Booking
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
