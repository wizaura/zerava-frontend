import { adminMe } from "./adminApi";

export async function isAdminAuthenticated() {
    try {
        await adminMe();
        return true;
    } catch {
        return false;
    }
}
