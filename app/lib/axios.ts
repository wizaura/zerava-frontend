import axios from "axios";

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    withCredentials: true,
    timeout: 15000,
});

let isRefreshing = false;
let queue: (() => void)[] = [];

api.interceptors.response.use(
    (res) => res,
    async (error) => {
        const original = error.config;

        // No response or already retried
        if (!error.response || original._retry) {
            return Promise.reject(error);
        }

        if (error.response.status === 401) {
            original._retry = true;

            if (isRefreshing) {
                await new Promise<void>((resolve) => queue.push(resolve));
                return api(original);
            }

            isRefreshing = true;

            try {
                await api.post("/auth/refresh");
                queue.forEach((cb) => cb());
                queue = [];
                return api(original);
            } catch (e) {
                queue = [];
                return Promise.reject(e);
            } finally {
                isRefreshing = false;
            }
        }

        return Promise.reject(error);
    }
);

export default api;
