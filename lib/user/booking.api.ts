import userApi from "./axios";

export type UserBooking = {
    id: string;
    referenceCode: string;
    status: "CONFIRMED" | "PENDING_PAYMENT" | "CANCELLED";
    price: number;
    createdAt: string;

    serviceSlot: {
        date: string;
        operator: {
            name: string;
        };
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
