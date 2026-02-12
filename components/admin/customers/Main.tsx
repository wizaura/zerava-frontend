"use client";

import { useEffect, useState } from "react";
import {
    getAdminCustomers,
    AdminCustomer,
} from "@/lib/admin/customers.api";
import CustomerList from "./List";

export default function AdminCustomersPage() {
    const [accounts, setAccounts] = useState<AdminCustomer[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getAdminCustomers()
            .then(setAccounts)
            .finally(() => setLoading(false));
    }, []);

    return (
        <div className="space-y-6">
            <CustomerList
                customers={accounts}
                loading={loading}
                onStatusChange={setAccounts}
            />
        </div>
    );
}
