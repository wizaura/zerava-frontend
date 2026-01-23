import { useEffect } from "react";
import { useDispatch } from "react-redux";
import api from "./axios";
import {
    setUser,
    clearAuth,
    setBootstrapped,
} from "@/app/store/slices/authSlice";
import { fetchMeGracefully } from "./fetchGrace";

export const useAuthBootstrap = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const initAuth = async () => {
            try {
                const res = await fetchMeGracefully();
                dispatch(setUser(res.data.user));
            } catch {
                dispatch(setBootstrapped());
            }
        };

        initAuth();
    }, [dispatch]);
};
