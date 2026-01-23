import { useEffect } from "react";
import { useDispatch } from "react-redux";
import api from "./axios";
import {
    setUser,
    clearAuth,
    setBootstrapped,
} from "@/app/store/slices/authSlice";

export const useAuthBootstrap = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const initAuth = async () => {
            try {
                const res = await api.get("/auth/me");
                dispatch(setUser(res.data.user));
            } catch {
                // not logged in is OK
                dispatch(setBootstrapped());
            }
        };

        initAuth();
    }, [dispatch]);
};
