import api from "./axios";

export const fetchMeGracefully = async () => {
    const user = await api.get("/user/me");
    console.log(user, 'user');
    return user;
};
