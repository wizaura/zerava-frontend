import axios from "axios";

const adminApi = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    withCredentials: true,
});

// Optional refresh later, but usually not needed
adminApi.interceptors.response.use(
    res => res,
    async error => {
        if (error.response?.status === 401) {
            window.location.href = "/admin/login";
        }
        return Promise.reject(error);
    }
);

export default adminApi;
