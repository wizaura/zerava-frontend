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
                const endpoint = pathname.startsWith("/admin")
                    ? "/admin/me"
                    : "/user/me";

                const res = await api.get(endpoint);

                dispatch(setUser(res.data.user));
            } catch {
                dispatch(clearAuth());
            } finally {
                dispatch(setBootstrapped());
            }
        };

        initAuth();
    }, [dispatch, pathname]);
};
