import adminApi from "./axios";

export type Operator = {
    id: string;
    name: string;
};

export type Status = "ACTIVE" | "INACTIVE";

export type ServiceSlot = {
    id: string;

    date: string; // ISO string from backend
    timeFrom: string;
    timeTo: string;

    maxBookings: number;

    zonePrefix?: string | null;

    status: Status;

    operator: Operator;

    templateId?: string | null;

    template?: {
        id: string;
        serviceDay: number;
        timeFrom: string;
        timeTo: string;
        maxBookings: number;
        zonePrefix?: string | null;
    } | null;

    _count: {
        bookings: number;
    };
};

export async function getSlots(): Promise<ServiceSlot[]> {
    const res = await adminApi.get("/admin/service-slots");
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
    const res = await adminApi.post("/admin/service-slots", data);
    return res.data;
}

export async function updateSlot(
    id: string,
    data: {
        operatorId: string;
        date: string;
        timeFrom: string;
        timeTo: string;
        status: Status;
        maxBookings: number;
        zonePrefix?: string;
    },
) {
    const res = await adminApi.patch(
        `/admin/service-slots/${id}`,
        data,
    );
    return res.data;
}


export async function deleteSlot(id: string) {
    await adminApi.delete(`/admin/service-slots/${id}`);
}
