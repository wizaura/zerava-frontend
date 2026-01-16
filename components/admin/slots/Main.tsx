"use client";

import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import {
    createSlot,
    deleteSlot,
    getSlots,
    ServiceSlot,
    Status,
} from "@/lib/admin/slots.api";
import { getOperators, Operator } from "@/lib/admin/operators.api";
import AddSlotForm from "./AddSlotsForm";
import SlotsList from "./SlotsList";
import CreateOperatorModal from "./CreateOperatorModal";

export default function AdminSlotsPage() {
    const [slots, setSlots] = useState<ServiceSlot[]>([]);
    const [operators, setOperators] = useState<Operator[]>([]);
    const [showForm, setShowForm] = useState(false);
    const [showOperatorModal, setShowOperatorModal] = useState(false);

    const [operatorId, setOperatorId] = useState("");
    const [date, setDate] = useState("");
    const [timeFrom, setTimeFrom] = useState("09:00");
    const [timeTo, setTimeTo] = useState("17:00");
    const [maxBookings, setMaxBookings] = useState(4);
    const [zonePrefix, setZonePrefix] = useState("");
    const [status, setStatus] = useState<Status>("ACTIVE");

    useEffect(() => {
        refresh();
    }, []);

    async function refresh() {
        setSlots(await getSlots());
        setOperators(await getOperators());
    }

    async function handleAdd() {
        await createSlot({
            operatorId,
            date,
            timeFrom,
            timeTo,
            maxBookings,
            zonePrefix,
            status,
        });
        toast.success("Slot added");
        await refresh();
        setShowForm(false);
    }

    async function handleDelete(id: string) {
        await deleteSlot(id);
        setSlots((s) => s.filter((x) => x.id !== id));
    }

    const grouped = useMemo(() => {
        const m: Record<string, ServiceSlot[]> = {};
        slots.forEach((s) => {
            (m[s.operator.name] ??= []).push(s);
        });
        return m;
    }, [slots]);

    return (
        <>
            <CreateOperatorModal
                open={showOperatorModal}
                onClose={() => setShowOperatorModal(false)}
                onCreated={(id) => setOperatorId(id)}
            />

            <button
                onClick={() => setShowForm((v) => !v)}
                className="mb-6 rounded-full bg-green-500 px-4 py-2 text-sm font-medium"
            >
                {showForm ? "Close" : "Add Slot"}
            </button>

            {showForm && (
                <AddSlotForm
                    operators={operators}
                    operatorId={operatorId}
                    setOperatorId={setOperatorId}
                    date={date}
                    setDate={setDate}
                    timeFrom={timeFrom}
                    setTimeFrom={setTimeFrom}
                    timeTo={timeTo}
                    setTimeTo={setTimeTo}
                    maxBookings={maxBookings}
                    setMaxBookings={setMaxBookings}
                    zonePrefix={zonePrefix}
                    setZonePrefix={setZonePrefix}
                    status={status}
                    setStatus={setStatus}
                    onSubmit={handleAdd}
                    onAddOperator={() => setShowOperatorModal(true)}
                />
            )}

            <SlotsList grouped={grouped} onDelete={handleDelete} />
        </>
    );
}
