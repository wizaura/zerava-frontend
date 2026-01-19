import adminApi from "./admin/axios";

/* ---------- AUTH ---------- */

export const adminRequestOtp = (email: string) =>
    adminApi.post("/admin/auth/request-otp", { email });

export const adminVerifyOtp = (email: string, otp: string) =>
    adminApi.post("/admin/auth/verify-otp", { email, otp });

export const adminMe = () =>
    adminApi.get("/admin/auth/me");

/* ---------- ZONES ---------- */

export const getZones = () =>
    adminApi.get("/admin/service-zones");

export const createZone = (data: {
    postcodePrefix: string;
    serviceDay: number;
    zoneCode: string;
}) =>
    adminApi.post("/admin/service-zones", data);

export const deleteZone = (id: string) =>
    adminApi.delete(`/admin/service-zones/${id}`);

/* ---------- OPERATORS ---------- */

export const getOperators = () =>
    adminApi.get("/admin/operators");

export const createOperator = (data: { name: string }) =>
    adminApi.post("/admin/operators", data);

export const toggleOperator = (id: string) =>
    adminApi.patch(`/admin/operators/${id}/toggle`);

/* ---------- SLOTS ---------- */

export const getSlots = () =>
    adminApi.get("/admin/service-slots");

export const createSlot = (data: {
    operatorId: string;
    date: string;
    timeFrom: string;
    timeTo: string;
    maxBookings: number;
    zonePrefix?: string;
}) =>
    adminApi.post("/admin/service-slots", data);

export const deleteSlot = (id: string) =>
    adminApi.delete(`/admin/service-slots/${id}`);

/* ---------- BOOKINGS ---------- */

export const getBookings = () =>
    adminApi.get("/admin/bookings");

export const getBookingByRef = (ref: string) =>
    adminApi.get(`/admin/bookings/ref/${ref}`);
