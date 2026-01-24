import api from "./axios";

export const fetchMeGracefully = async () => {
    return await api.get("/auth/me");
};
