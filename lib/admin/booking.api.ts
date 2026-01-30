import adminApi from "./axios";

export type BookingStatus = "CONFIRMED" | "CANCELLED" | "PENDING_PAYMENT" | "COMPLETED";

export type AdminBooking = {
    id: string;
    referenceCode: string;
    name: string;
    email: string;
    phone: string;
    serviceType: string;
    vehicleSize: string;
    price: number;
    postcode: string;
    timeFrom: string;
    timeTo: string;
    status: BookingStatus;
    createdAt: string;
    address: string;
    notes: string;
    serviceSlot: {
        date: string;
        operator: {
            name: string;
        }
    };
};

export async function getAdminBookings(params?: {
    search?: string;
    status?: BookingStatus;
}) {
    const res = await adminApi.get("/admin/bookings", { params });
    return res.data as AdminBooking[];
}
