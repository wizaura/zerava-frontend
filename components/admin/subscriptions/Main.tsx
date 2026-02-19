"use client";

import { useEffect, useState } from "react";
import {
    getAdminSubscriptions,
    AdminSubscription,
} from "@/lib/admin/subscription.api";

import AdminSubscriptionsTable from "./List";

export default function AdminSubscriptions() {
    const [subscriptions, setSubscriptions] = useState<
        AdminSubscription[]
    >([]);
    const [loading, setLoading] = useState(false);

    console.log(subscriptions,'sub')

    async function load(search?: string) {
        setLoading(true);
        try {
            const data = await getAdminSubscriptions({
                search,
            });
            setSubscriptions(data);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        load();
    }, []);

    return (
        <AdminSubscriptionsTable
            subscriptions={subscriptions}
            loading={loading}
            onRefresh={() => load()}
        />
    );
}
