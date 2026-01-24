"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";

import UserHeader from "@/components/user/account/layout/Header";
import Protected from "@/components/auth/Protected";
import api from "@/app/lib/axios";
import { setUser, clearAuth } from "@/app/store/slices/authSlice";

export default function UserLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const dispatch = useDispatch();
    const router = useRouter();

    const user = useSelector((state: any) => state.auth.user);

    // 🔹 Fetch full user profile once
    useEffect(() => {
        if (!user) {
            api.get("/user/me")
                .then(res => {
                    dispatch(setUser(res.data));
                })
                .catch(err => {
                    if (err.response?.status === 401) {
                        dispatch(clearAuth());
                        router.replace("/login");
                    }
                });
        }
    }, [user, dispatch, router]);

    return (
        <Protected>
            <div className="min-h-screen bg-gray-50 text-gray-900 flex flex-col">
                <UserHeader />
                <div className="flex-1 overflow-y-auto">
                    <main className="max-w-7xl mx-auto p-6">
                        {children}
                    </main>
                </div>
            </div>
        </Protected>
    );
}
