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
    (res) => res,
    async (error) => {
        if (error.response?.status === 401) {
            console.warn("Admin session expired");
            window.location.href = "/admin/login";
        }
        return Promise.reject(error);
    }
);

export default adminApi;
