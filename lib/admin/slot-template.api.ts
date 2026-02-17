import adminApi from "./axios";

export type SlotTemplate = {
    id: string;
    operatorId: string;
    operator: {
        id: string;
        name: string;
    };
    serviceDay: number;
    timeFrom: string;
    timeTo: string;
    maxBookings: number;
    zonePrefix?: string | null;
    isActive: boolean;
};

export async function getTemplates(): Promise<SlotTemplate[]> {
    const res = await adminApi.get("/admin/slot-templates");
    return res.data;
}

export async function createTemplate(data: {
    operatorId: string;
    serviceDay: number;
    timeFrom: string;
    timeTo: string;
    maxBookings: number;
    zonePrefix?: string;
}) {
    const res = await adminApi.post("/admin/slot-templates", data);
    return res.data;
}

export async function updateTemplate(
    id: string,
    data: {
        operatorId: string;
        serviceDay: number;
        timeFrom: string;
        timeTo: string;
        maxBookings: number;
        zonePrefix?: string;
    }
) {
    const res = await adminApi.patch(`/admin/slot-templates/${id}`, data);
    return res.data;
}

export async function deleteTemplate(id: string) {
    await adminApi.delete(`/admin/slot-templates/${id}`);
}
