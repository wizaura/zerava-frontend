import axios from "axios";

const adminApi = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    withCredentials: true,
});

// Attach credentials & metadata
adminApi.interceptors.request.use(
    (config) => {
        config.headers["X-Admin-Client"] = "true";
        return config;
    },
    (error) => Promise.reject(error)
);

// Handle auth expiry
adminApi.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (
            error.response?.status === 401 &&
            !originalRequest._retry
        ) {
            originalRequest._retry = true;

            try {
                await adminApi.post("/admin/auth/refresh");

                return adminApi(originalRequest);
            } catch (refreshError) {
                console.warn("Admin refresh failed");
                window.location.href = "/admin/login";
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);


export default adminApi;
