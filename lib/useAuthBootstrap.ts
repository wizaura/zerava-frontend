import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
    setUser,
    clearAuth,
    setBootstrapped,
} from "@/store/slices/authSlice";
import { fetchMeGracefully } from "./fetchGrace";
import { usePathname } from "next/navigation";

export const useAuthBootstrap = () => {
    const dispatch = useDispatch();
    const pathname = usePathname();

    useEffect(() => {
        if (pathname.startsWith("/admin")) {
            dispatch(setBootstrapped());
            return;
        }

        const initAuth = async () => {
            try {
                const res = await fetchMeGracefully();
                dispatch(setUser(res.data.user));
            } catch {
                dispatch(setBootstrapped());
            }
        };

        initAuth();
    }, [dispatch, pathname]);
};
