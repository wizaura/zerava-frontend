import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
    setUser,
    clearAuth,
    setBootstrapped,
} from "@/store/slices/authSlice";
import { usePathname } from "next/navigation";
import api from "./user/axios";

export const useAuthBootstrap = () => {
    const dispatch = useDispatch();
    const pathname = usePathname();

    useEffect(() => {
        const initAuth = async () => {
            try {
                let res;

                try {
                    // Try admin first
                    res = await api.get("/admin/me");
                } catch {
                    // If admin fails, try user
                    res = await api.get("/user/me");
                }

                dispatch(setUser(res.data.user ?? res.data));
            } catch {
                dispatch(clearAuth());
            } finally {
                dispatch(setBootstrapped());
            }
        };

        initAuth();
    }, [dispatch, pathname]);
};
