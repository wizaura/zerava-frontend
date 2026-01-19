import adminApi from "./admin/axios";

/* ---------- AUTH ---------- */

export const adminRequestOtp = (email: string) =>
    adminApi.post("/admin/auth/request-otp", { email });

export const adminVerifyOtp = (email: string, otp: string) =>
    adminApi.post("/admin/auth/verify-otp", { email, otp });

export const adminMe = () =>
    adminApi.get("/admin/auth/me");
