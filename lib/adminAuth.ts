import { adminMe } from "./admin/admin.api";

export async function isAdminAuthenticated() {
    try {
        await adminMe();
        return true;
    } catch {
        return false;
    }
}
