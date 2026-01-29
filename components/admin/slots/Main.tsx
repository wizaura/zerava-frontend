"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import toast from "react-hot-toast";
import {
    createSlot,
    deleteSlot,
    getSlots,
    ServiceSlot,
    Status,
    updateSlot,
} from "@/lib/admin/slots.api";
import { getOperators, Operator } from "@/lib/admin/operators.api";
import SlotForm from "./AddSlotsForm";
import SlotsList from "./SlotsList";
import { getZones, Zone } from "@/lib/admin/zones.api";
import OperatorManagerModal from "./CreateOperatorModal";

export default function AdminSlotsPage() {
    const [slots, setSlots] = useState<ServiceSlot[]>([]);
    const [operators, setOperators] = useState<Operator[]>([]);
    const [zones, setZones] = useState<Zone[]>([]);
    const [editingSlot, setEditingSlot] = useState<ServiceSlot | null>(null);
    const [showForm, setShowForm] = useState(false);
    const [showOperatorModal, setShowOperatorModal] = useState(false);
    const formRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        refresh();
    }, []);

    useEffect(() => {
        if (showForm) {
            formRef.current?.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        }
    }, [showForm]);


    async function refresh() {
        setSlots(await getSlots());
        setOperators(await getOperators());
        setZones(await getZones());
    }

    async function handleSave(data: any) {
        if (editingSlot) {
            // EDIT
            await updateSlot(editingSlot.id, data);
            toast.success("Slot updated");
        } else {
            // CREATE
            await createSlot(data);
            toast.success("Slot added");
        }

        setEditingSlot(null);
        setShowForm(false);
        await refresh();
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
        <div className="space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-semibold">Operator Availability</h2>
                    <p className="text-sm text-gray-500">
                        Manage operator schedules and time slots
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    <button
                        onClick={() => setShowOperatorModal(true)}
                        className="rounded-full border px-5 py-2 text-sm font-medium"
                    >
                        + Manage Operators
                    </button>

                    <button
                        onClick={() => {
                            setEditingSlot(null);
                            setShowForm(true);
                        }}
                        className="rounded-full bg-emerald-500 px-5 py-2 text-sm font-medium text-black"
                    >
                        + Add Slot
                    </button>
                </div>
            </div>

            {/* Form */}
            {showForm && (
                <div ref={formRef}>
                    <SlotForm
                        key={editingSlot?.id || "new"}
                        operators={operators}
                        slot={editingSlot}
                        zones={zones}
                        onCancel={() => {
                            setEditingSlot(null);
                            setShowForm(false);
                        }}
                        onSubmit={handleSave}
                    />
                </div>
            )}

            <OperatorManagerModal
                open={showOperatorModal}
                onClose={() => setShowOperatorModal(false)}
                onChanged={refresh}
            />

            {/* List */}
            <SlotsList
                grouped={grouped}
                onEdit={(slot) => {
                    setEditingSlot(slot);
                    setShowForm(true);
                }}
                onDelete={handleDelete}
            />
        </div>
    );
}
