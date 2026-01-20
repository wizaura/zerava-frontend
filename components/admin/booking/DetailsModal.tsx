import { Mail, User, X } from "lucide-react";
import { Booking } from "./List";

export default function BookingDetailsModal({
    booking,
    onClose,
}: {
    booking: Booking;
    onClose: () => void;
}) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="relative w-full max-w-lg rounded-xl bg-white p-6">
                <button
                    onClick={onClose}
                    className="absolute right-4 top-4 text-gray-400 hover:text-black"
                >
                    <X size={18} />
                </button>

                <h2 className="mb-6 text-lg font-semibold">
                    Booking Details
                </h2>

                <div className="mb-4 grid grid-cols-2 gap-4 rounded-lg bg-gray-50 p-4 text-sm">
                    <div>
                        <p className="text-gray-500">Reference</p>
                        <p className="font-medium">{booking.reference}</p>
                    </div>
                    <div>
                        <p className="text-gray-500">Service</p>
                        <p className="font-medium">{booking.service}</p>
                    </div>
                    <div>
                        <p className="text-gray-500">Date</p>
                        <p className="font-medium">{booking.date}</p>
                    </div>
                    <div>
                        <p className="text-gray-500">Price</p>
                        <p className="font-medium">{booking.price}</p>
                    </div>
                </div>

                <div className="space-y-3 text-sm">
                    <p className="flex items-center gap-2">
                        <User size={14} /> {booking.customerName}
                    </p>
                    <p className="flex items-center gap-2">
                        <Mail size={14} /> {booking.customerEmail}
                    </p>
                </div>
            </div>
        </div>
    );
}
