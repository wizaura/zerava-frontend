import adminApi from "./axios";

export type Operator = {
    id: string;
    name: string;
    isActive: boolean;
};

/* -------- GET OPERATORS -------- */

export async function getOperators(): Promise<Operator[]> {
    const res = await adminApi.get("/admin/operators");
    return res.data;
}

/* -------- CREATE OPERATOR -------- */

export async function createOperator(data: {
    name: string;
}): Promise<Operator> {
    const res = await adminApi.post("/admin/operators", data);
    return res.data;
}

/* -------- UPDATE -------- */
export async function updateOperator(
    id: string,
    data: { name: string }
): Promise<Operator> {
    const res = await adminApi.patch(`/admin/operators/${id}`, data);
    return res.data;
}

/* -------- DELETE -------- */
export async function deleteOperator(id: string): Promise<void> {
    await adminApi.delete(`/admin/operators/${id}`);
}