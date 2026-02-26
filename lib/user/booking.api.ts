import userApi from "./axios";

export type UserBooking = {
    id: string;
    referenceCode: string | null;

    status: "CONFIRMED" | "PENDING_PAYMENT" | "CANCELLED" | "COMPLETED";

    price: number;
    originalPrice: number | null;
    discountAmount: number;

    createdAt: string;

    date: string;
    timeFrom: string;
    timeTo: string;

    subscriptionId: string | null;

    address: string;
    postcode: string;
    rescheduleCount: number;

    make: string | null;
    model: string | null;
    registrationNumber: string | null;

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
