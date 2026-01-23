"use client";

import { Mail, User, Phone, MapPin, X } from "lucide-react";
import { useState } from "react";
import { AdminBooking, BookingStatus } from "@/app/lib/admin/booking.api";
import TextInput from "@/components/ui/TextInput";
import TextArea from "@/components/ui/TextArea";

type BookingUpdatePayload = {
    status: BookingStatus;
    date: string;
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
    function toDateInputValue(date: string | Date | undefined) {
        if (!date) return "";
        return new Date(date).toISOString().split("T")[0];
    }

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const minDate = tomorrow.toISOString().split("T")[0];

    const [status, setStatus] = useState<BookingStatus>(booking.status);
    const [date, setDate] = useState(toDateInputValue(booking.serviceSlot.date));
    const [notes, setNotes] = useState(booking.notes ?? "");

    function handleSave() {
        onSave({ status, date, notes });
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="relative flex w-full max-w-xl flex-col rounded-xl bg-white max-h-[90vh]">

                {/* HEADER (fixed) */}
                <div className="flex items-center justify-between border-b px-6 py-4">
                    <h2 className="text-lg font-semibold">Booking Details</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-black"
                    >
                        <X size={18} />
                    </button>
                </div>

                {/* SCROLLABLE CONTENT */}
                <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6">
                    <div className="space-y-6 px-6 py-5">
                        {/* SUMMARY */}
                        <div className="grid grid-cols-2 gap-4 rounded-lg bg-gray-50 p-4 text-sm">
                            <Info label="Reference" value={booking.referenceCode} />
                            <Info label="Created" value={booking.createdAt} />
                            <Info label="Service" value={booking.serviceType} />
                            <Info label="Vehicle Size" value={booking.vehicleSize} />
                        </div>

                        {/* CUSTOMER */}
                        <div className="space-y-3 text-sm">
                            <Detail icon={<User size={14} />} value={booking.name} />
                            <Detail icon={<Mail size={14} />} value={booking.email} />
                            <Detail icon={<Phone size={14} />} value={booking.phone} />
                            <Detail icon={<MapPin size={14} />} value={booking.address} />
                        </div>

                        {/* FORM */}
                        <div className="space-y-5">
                            {/* STATUS */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">
                                    Status
                                </label>
                                <select
                                    value={status}
                                    onChange={(e) =>
                                        setStatus(e.target.value as BookingStatus)
                                    }
                                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                                >
                                    <option value="CONFIRMED">Confirmed</option>
                                    <option value="PENDING">Pending</option>
                                    <option value="COMPLETED">Completed</option>
                                    <option value="CANCELLED">Cancelled</option>
                                </select>
                            </div>

                            {/* DATE */}
                            <TextInput
                                label="Date"
                                min={minDate}
                                type="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                            />

                            {/* TIME (READ ONLY) */}
                            <TextInput
                                label="Time"
                                value={`${booking.timeFrom} – ${booking.timeTo}`}
                                onChange={() => { }}
                                type="text"
                            />

                            {/* NOTES */}
                            <TextArea
                                label="Notes"
                                placeholder="Internal notes…"
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* ACTIONS */}
                    <div className="flex justify-end gap-3 border-t px-6 py-4">
                        <button
                            onClick={onClose}
                            className="rounded-lg border px-5 py-2"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSave}
                            className="rounded-lg bg-black px-6 py-2 text-white"
                        >
                            Save Changes
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

/* ---------- SMALL UI HELPERS ---------- */

function Info({ label, value }: { label: string; value: string }) {
    return (
        <div>
            <p className="text-gray-500">{label}</p>
            <p className="font-medium">{value}</p>
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
        <p className="flex items-center gap-2 text-sm">
            {icon}
            {value}
        </p>
    );
}
