import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";

const adminApi = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    withCredentials: true,
});

let isRefreshing = false;
let refreshQueue: Array<(error?: AxiosError) => void> = [];

const processQueue = (error?: AxiosError) => {
    refreshQueue.forEach(cb => cb(error));
    refreshQueue = [];
};

// Add header
adminApi.interceptors.request.use((config) => {
    config.headers["X-Admin-Client"] = "true";
    return config;
});

adminApi.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
        const original = error.config as InternalAxiosRequestConfig & {
            _retry?: boolean;
        };

        if (!error.response) return Promise.reject(error);

        const status = error.response.status;
        const url = original.url || "";

        // Don't refresh on admin auth endpoints
        if (url.includes("/admin/auth/")) {
            return Promise.reject(error);
        }

        if (status !== 401 || original._retry) {
            return Promise.reject(error);
        }

        original._retry = true;

        if (isRefreshing) {
            return new Promise((resolve, reject) => {
                refreshQueue.push((err) => {
                    if (err) return reject(err);
                    resolve(adminApi(original));
                });
            });
        }

        isRefreshing = true;

        try {
            await adminApi.post("/admin/auth/refresh");
            processQueue();
            return adminApi(original);
        } catch (refreshError: any) {
            processQueue(refreshError);
            window.location.href = "/admin/login";
            return Promise.reject(refreshError);
        } finally {
            isRefreshing = false;
        }
    }
);

export default adminApi;