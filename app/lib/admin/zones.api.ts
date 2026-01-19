import adminApi from "./axios";

export type Zone = {
    id: string;
    postcodePrefix: string;
    serviceDay: number;
    zoneCode: string;
};

export async function getZones(): Promise<Zone[]> {
    const res = await adminApi.get("/admin/service-zones");
    return res.data;
}

export async function createZone(data: {
    postcodePrefix: string;
    serviceDay: number;
    zoneCode: string;
}) {
    const res = await adminApi.post("/admin/service-zones", data);
    return res.data;
}

export async function deleteZone(id: string) {
    await adminApi.delete(`/admin/service-zones/${id}`);
}
