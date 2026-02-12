import adminApi from "./axios";

export type AdminCustomer = {
    id: string;
    name: string;
    email: string;
    role: "admin" | "customer";
    ecoLevel: string;
    totalCleans: number;
    waterSaved: number;
    isBlocked: boolean;
    createdAt: string;
};

/* ---------- FETCH ALL ACCOUNTS ---------- */

export async function getAdminCustomers(): Promise<AdminCustomer[]> {
    const [usersRes, adminsRes] = await Promise.all([
        adminApi.get("/user/customers"),
        adminApi.get("/admin/list"),
    ]);

    const users = usersRes.data;
    const admins = adminsRes.data;

    return [...users, ...admins ];
}


/* ---------- BLOCK USER ---------- */

export async function blockUser(id: string) {
    return adminApi.patch(`/admin/users/${id}/block`);
}

/* ---------- UNBLOCK USER ---------- */

export async function unblockUser(id: string) {
    return adminApi.patch(`/admin/users/${id}/unblock`);
}
