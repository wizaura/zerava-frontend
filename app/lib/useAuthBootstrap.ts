import { useEffect } from "react";
import { useDispatch } from "react-redux";
import api from "./axios";
import { setCredentials, logout } from "@/app/store/slices/authSlice";

export const useAuthBootstrap = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const initAuth = async () => {
            try {
                const res = await api.get("/auth/me");
                console.log(res,'jjjj')
                dispatch(setCredentials({ user: res.data.user }));
            } catch {
                dispatch(logout());
            }
        };
        initAuth();
    }, [dispatch]);
};
