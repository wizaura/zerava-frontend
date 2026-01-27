import axios from "@/lib/user/axios";

export const userApi = {
    getProfile: () => axios.get("/user/me"),
    updateProfile: (data: any) => axios.patch("/user/me", data),
};
