"use client";

import { useEffect, useState } from "react";
import api from "@/lib/user/axios";
import BookingClient from "./Main";

export default function BookingPage() {
    const [prices, setPrices] = useState(null);

    useEffect(() => {
        api.get("/services/prices").then(res => {
            setPrices(res.data);
        });
    }, []);

    if (!prices) return null;

    return <BookingClient prices={prices} />;
}
