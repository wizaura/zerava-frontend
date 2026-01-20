import adminApi from "./axios";

export type BookingStatus = "CONFIRMED" | "CANCELLED" | "PENDING_PAYMENT";

export type AdminBooking = {
    id: string;
    referenceCode: string;
    name: string;
    email: string;
    serviceType: string;
    price: number;
    status: BookingStatus;
    createdAt: string;
    serviceSlot: {
        date: string;
    };
};

export async function getAdminBookings(params?: {
    search?: string;
    status?: BookingStatus;
}) {
    const res = await adminApi.get("/bookings/admin", { params });
    return res.data as AdminBooking[];
}
