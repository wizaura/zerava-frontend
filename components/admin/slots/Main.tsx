"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import SlotTemplateForm from "./TemplateForm";
import TemplatesList from "./TemplatesList";
import OperatorManagerModal from "./CreateOperatorModal";

import { getOperators, Operator } from "@/lib/admin/operators.api";
import { getZones, Zone } from "@/lib/admin/zones.api";

import {
    getTemplates,
    createTemplate,
    updateTemplate,
    deleteTemplate,
    SlotTemplate,
} from "@/lib/admin/slot-template.api";

import { getApiError } from "@/lib/utils";

export default function SlotTemplatePage() {
    const [templates, setTemplates] = useState<SlotTemplate[]>([]);
    const [operators, setOperators] = useState<Operator[]>([]);
    const [zones, setZones] = useState<Zone[]>([]);
    const [showForm, setShowForm] = useState(false);
    const [editingTemplate, setEditingTemplate] = useState<SlotTemplate | null>(null);
    const [showOperatorModal, setShowOperatorModal] = useState(false);

    useEffect(() => {
        refresh();
    }, []);

    async function refresh() {
        try {
            const [t, o, z] = await Promise.all([
                getTemplates(),
                getOperators(),
                getZones(),
            ]);

            setTemplates(t);
            setOperators(o);
            setZones(z);
        } catch (err: any) {
            toast.error(getApiError(err));
        }
    }

    async function handleSave(data: any) {
        try {
            if (editingTemplate) {
                await updateTemplate(editingTemplate.id, data);
                toast.success("Template updated");
            } else {
                await createTemplate(data);
                toast.success("Template created");
            }

            setEditingTemplate(null);
            setShowForm(false);
            await refresh();
        } catch (err: any) {
            toast.error(getApiError(err));
        }
    }

    async function handleDelete(id: string) {
        await deleteTemplate(id);
        toast.success("Template deleted");
        await refresh();
    }

    return (
        <div className="space-y-8">

            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-semibold">
                        Weekly Slot Templates
                    </h2>
                    <p className="text-sm text-gray-500">
                        Define recurring weekly availability
                    </p>
                </div>

                <div className="flex gap-3">
                    <button
                        onClick={() => setShowOperatorModal(true)}
                        className="rounded-full border px-5 py-2 text-sm font-medium hover:bg-gray-200"
                    >
                        + Manage Operators
                    </button>

                    <button
                        onClick={() => {
                            setEditingTemplate(null);
                            setShowForm(true);
                        }}
                        className="rounded-full bg-emerald-500 px-5 py-2 text-sm font-medium text-black"
                    >
                        + Add Template
                    </button>
                </div>
            </div>

            {/* Form */}
            {showForm && (
                <SlotTemplateForm
                    operators={operators}
                    zones={zones}
                    template={editingTemplate}
                    onSubmit={handleSave}
                    onCancel={() => {
                        setEditingTemplate(null);
                        setShowForm(false);
                    }}
                />
            )}

            {/* List */}
            <TemplatesList
                templates={templates}
                onEdit={(template) => {
                    setEditingTemplate(template);
                    setShowForm(true);
                }}
                onDelete={handleDelete}
            />

            <OperatorManagerModal
                open={showOperatorModal}
                onClose={() => setShowOperatorModal(false)}
                onChanged={refresh}
            />
        </div>
    );
}
