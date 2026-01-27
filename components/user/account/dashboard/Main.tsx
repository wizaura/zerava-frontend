"use client";
import { useEffect, useState } from "react";
import { userApi } from "@/lib/user/user.api";

export default function UserDashboard() {
    const [profile, setProfile] = useState<any>(null);

    useEffect(() => {
        userApi.getProfile().then(res => setProfile(res.data));
    }, []);

    return (
        <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-2 bg-white p-6 rounded-xl border">
                <h2 className="text-xl font-semibold">Your Eco Level</h2>
                <p className="text-gray-500 text-sm">Keep cleaning to level up!</p>

                <div className="mt-6 grid grid-cols-3 gap-4 text-center">
                    <Stat label="Total Cleans" value="45" />
                    <Stat label="Water Saved" value="4333L" />
                    <Stat label="CO₂ Saved" value="54kg" />
                </div>
            </div>

            <div className="bg-gradient-to-br from-green-600 to-emerald-500 text-white p-6 rounded-xl">
                <h3 className="font-semibold">Trees Planted</h3>
                <p className="text-4xl mt-4">2 🌳</p>
            </div>
        </div>
    );
}

const Stat = ({ label, value }: any) => (
    <div className="bg-gray-50 p-4 rounded-lg">
        <p className="text-xl font-bold">{value}</p>
        <p className="text-xs text-gray-500">{label}</p>
    </div>
);
