import api from "@/app/lib/axios";

export type Operator = {
    id: string;
    name: string;
    isActive: boolean;
};

/* -------- GET OPERATORS -------- */

export async function getOperators(): Promise<Operator[]> {
    const res = await api.get("/admin/operators");
    return res.data;
}

/* -------- CREATE OPERATOR -------- */

export async function createOperator(data: {
    name: string;
}): Promise<Operator> {
    const res = await api.post("/admin/operators", data);
    return res.data;
}
