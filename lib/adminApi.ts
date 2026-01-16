const API_URL = process.env.NEXT_PUBLIC_API_URL;

function authHeaders() {
    return {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("admin_token")}`,
    };
}

/* -------- ZONES -------- */

export async function getZones() {
    const res = await fetch(`${API_URL}/admin/service-zones`, {
        headers: authHeaders(),
    });
    if (!res.ok) throw new Error("Failed to fetch zones");
    return res.json();
}

export async function createZone(data: {
    postcodePrefix: string;
    serviceDay: number;
    zoneCode: string;
}) {
    const res = await fetch(`${API_URL}/admin/service-zones`, {
        method: "POST",
        headers: authHeaders(),
        body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to create zone");
    return res.json();
}

export async function deleteZone(id: string) {
    const res = await fetch(`${API_URL}/admin/service-zones/${id}`, {
        method: "DELETE",
        headers: authHeaders(),
    });
    if (!res.ok) throw new Error("Failed to delete zone");
}
