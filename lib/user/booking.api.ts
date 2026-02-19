import userApi from "./axios";

export type UserBooking = {
    id: string;
    referenceCode: string | null;

    status: "CONFIRMED" | "PENDING_PAYMENT" | "CANCELLED" | "COMPLETED";

    price: number;          // already converted to £ in backend
    createdAt: string;

    date: string;           // YYYY-MM-DD
    timeFrom: string;       // "10:00"
    timeTo: string;         // "10:50"
    subscriptionId: string;

    address: string;
    postcode: string;
    rescheduleCount: number;

    service: {
        name: string;
    };

    operator: {
        name: string;
    };
};


export async function getUserBookings(): Promise<UserBooking[]> {
    const res = await userApi.get("/bookings/me");
    return res.data;
}

export async function createBooking(data: any) {
    const res = await userApi.post("/bookings", data);
    return res.data;
}
