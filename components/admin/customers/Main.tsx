"use client";

import { useEffect, useState } from "react";
import {
    getAdminCustomers,
    AdminCustomer,
} from "@/lib/admin/customers.api";
import CustomerList from "./List";

export default function AdminCustomersPage() {
    const [customers, setCustomers] = useState<AdminCustomer[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getAdminCustomers()
            .then(setCustomers)
            .finally(() => setLoading(false));
    }, []);

    return (
        <div className="space-y-6">
            <CustomerList customers={customers} loading={loading} />
        </div>
    );
}
