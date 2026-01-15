export function isAdminAuthenticated() {
    if (typeof window === "undefined") return false;
    return !!localStorage.getItem("admin_token");
}
