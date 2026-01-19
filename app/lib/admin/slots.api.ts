import api from "@/app/lib/axios";

export type Operator = {
    id: string;
    name: string;
};

export type Status = "ACTIVE" | "INACTIVE";

export type ServiceSlot = {
    id: string;
    date: string;
    timeFrom: string;
    timeTo: string;
    maxBookings: number;
    zonePrefix?: string | null;
    status: Status;
    operator: Operator;
    _count: {
        bookings: number;
    };
};

export async function getSlots(): Promise<ServiceSlot[]> {
    const res = await api.get("/admin/service-slots");
    return res.data;
}

export async function createSlot(data: {
    operatorId: string;
    date: string;
    timeFrom: string;
    timeTo: string;
    status: Status;
    maxBookings: number;
    zonePrefix?: string;
}) {
    const res = await api.post("/admin/service-slots", data);
    return res.data;
}

export async function deleteSlot(id: string) {
    await api.delete(`/admin/service-slots/${id}`);
}
