import adminApi from "./axios";

/* ---------- STATUS TYPE ---------- */

export type BookingStatus =
    | "CONFIRMED"
    | "CANCELLED"
    | "PENDING_PAYMENT"
    | "COMPLETED";

/* ---------- BOOKING TYPE (MATCHES BACKEND) ---------- */

export type AdminBooking = {
    id: string;
    referenceCode: string;
    name: string;
    email: string;
    phone: string;
    timeFrom: string;
    timeTo: string;
    subscriptionId: string;
    postcode: string;
    make: string;
    model: string;
    registrationNumber: string;
    parkingInstructions: string;
    address: string;
    price: number;
    status: BookingStatus;
    createdAt: string;
    notes: string | null;

    service: {
        name: string;
    };

    vehicleCategory: {
        name: string;
    };

    serviceSlot: {
        date: string;
        operator: {
            name: string;
        };
    };
};

/* ---------- FETCH BOOKINGS ---------- */

export async function getAdminBookings(params?: {
    search?: string;
    status?: BookingStatus;
}) {
    const res = await adminApi.get("/admin/bookings", { params });
    return res.data as AdminBooking[];
}

/* ---------- ACTION APIS ---------- */

export async function confirmAdminBooking(id: string) {
    return adminApi.post(`/admin/bookings/${id}/confirm`);
}

export async function cancelAdminBooking(id: string) {
    return adminApi.post(`/admin/bookings/${id}/cancel`);
}

export async function completeAdminBooking(id: string) {
    return adminApi.post(`/admin/bookings/${id}/complete`);
}

export type AdminBookingUpdatePayload = {
    notes?: string;
    status?: "PENDING_PAYMENT" | "CONFIRMED" | "COMPLETED" | "CANCELLED";
};

export async function updateAdminBooking(
    id: string,
    payload: AdminBookingUpdatePayload
) {
    return adminApi.patch(`/admin/bookings/${id}`, payload);
}


