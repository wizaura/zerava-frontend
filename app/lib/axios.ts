import axios from "axios";
import { store } from "../store/index";
import { setCredentials, logout } from "../store/slices/authSlice";

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    withCredentials: true,
});

api.interceptors.request.use(config => {
    const token = store.getState().auth.accessToken;
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

api.interceptors.response.use(
    res => res,
    async error => {
        if (error.response?.status === 401) {
            try {
                const res = await api.post("/auth/refresh");
                console.log(res, 'res');
                store.dispatch(setCredentials({
                    accessToken: res.data.accessToken,
                }));
                error.config.headers.Authorization = `Bearer ${res.data.accessToken}`;
                return api(error.config);
            } catch {
                store.dispatch(logout());
            }
        }
        return Promise.reject(error);
    }
);

export default api;
