// app/lib/admin/customer.api.ts
import adminApi from "./axios";

export type AdminCustomer = {
    id: string;
    name: string;
    email: string;
    role: "admin" | "user";
};

export async function getAdminCustomers(): Promise<AdminCustomer[]> {
    const res = await adminApi.get("/user/customers");
    return res.data;
}
