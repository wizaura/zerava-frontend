import api from "@/app/lib/axios";

export type Zone = {
    id: string;
    postcodePrefix: string;
    serviceDay: number;
    zoneCode: string;
};

export async function getZones(): Promise<Zone[]> {
    const res = await api.get("/admin/service-zones");
    return res.data;
}

export async function createZone(data: {
    postcodePrefix: string;
    serviceDay: number;
    zoneCode: string;
}) {
    const res = await api.post("/admin/service-zones", data);
    return res.data;
}

export async function deleteZone(id: string) {
    await api.delete(`/admin/service-zones/${id}`);
}
