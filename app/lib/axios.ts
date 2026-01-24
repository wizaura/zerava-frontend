import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    withCredentials: true,
    timeout: 15000,
});

// ---- Refresh control ----
let isRefreshing = false;
let refreshQueue: Array<(error?: AxiosError) => void> = [];

// Resolve / reject all queued requests
const processQueue = (error?: AxiosError) => {
    refreshQueue.forEach(cb => cb(error));
    refreshQueue = [];
};

api.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
        const original = error.config as InternalAxiosRequestConfig & {
            _retry?: boolean;
        };

        // If no response (network error)
        if (!error.response) {
            return Promise.reject(error);
        }

        const status = error.response.status;
        const url = original.url || "";

        // 🚫 Do NOT try to refresh on auth endpoints
        if (url.includes("/auth/")) {
            return Promise.reject(error);
        }

        // Only handle 401 once per request
        if (status !== 401 || original._retry) {
            return Promise.reject(error);
        }

        original._retry = true;

        // If refresh already in progress → queue
        if (isRefreshing) {
            return new Promise((resolve, reject) => {
                refreshQueue.push((err) => {
                    if (err) return reject(err);
                    resolve(api(original));
                });
            });
        }

        isRefreshing = true;

        try {
            await api.post("/auth/refresh");
            processQueue();
            return api(original);
        } catch (refreshError: any) {
            processQueue(refreshError);
            return Promise.reject(refreshError);
        } finally {
            isRefreshing = false;
        }
    }
);

export default api;
