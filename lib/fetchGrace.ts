import api from "./user/axios";

export const fetchMeGracefully = async () => {
    const user = await api.get("/user/me");
    return user;
};
