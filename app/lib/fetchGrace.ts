import api from "./axios";

export const fetchMeGracefully = async () => {
    try {
        return await api.get("/auth/me");
    } catch (err: any) {
        if (err.response?.status === 401) {
            // Try refresh once
            await api.post("/auth/refresh");
            return await api.get("/auth/me");
        }
        throw err;
    }
};
