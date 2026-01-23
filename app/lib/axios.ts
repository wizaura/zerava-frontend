import axios from "axios";
import { store } from "../store";
import { setCredentials, logout } from "../store/slices/authSlice";

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    withCredentials: true,
});

/* ---------- REQUEST ---------- */
api.interceptors.request.use((config) => {
    const token = store.getState().auth.accessToken;
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

/* ---------- RESPONSE ---------- */
api.interceptors.response.use(
    (res) => res,
    async (error) => {
        const originalRequest = error.config;

        // 🔒 HARD STOP conditions
        if (
            error.response?.status !== 401 ||
            originalRequest._retry ||
            originalRequest.url?.includes("/auth/refresh")
        ) {
            return Promise.reject(error);
        }

        originalRequest._retry = true;

        try {
            const res = await api.post("/auth/refresh");

            store.dispatch(
                setCredentials({
                    accessToken: res.data.accessToken,
                })
            );

            originalRequest.headers.Authorization = `Bearer ${res.data.accessToken}`;
            return api(originalRequest);
        } catch (err) {
            store.dispatch(logout());
            return Promise.reject(err);
        }
    }
);

export default api;
