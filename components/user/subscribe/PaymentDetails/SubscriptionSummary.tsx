"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

type Props = {
    draft: any;
};

export default function SubscriptionSummary({ draft }: Props) {
    const [open, setOpen] = useState("service");

    const toggle = (s: string) =>
        setOpen(prev => (prev === s ? "" : s));

    return (
        <div className="rounded-2xl bg-black p-6 text-white space-y-4">
            <h3 className="text-lg font-medium">
                Subscription Summary
            </h3>

            <Accordion
                title="Service Details"
                open={open === "service"}
                onClick={() => toggle("service")}
            >
                <Row label="Plan" value={draft.plan} />
                <Row label="Service" value={draft.serviceName} />
                <Row label="Vehicle" value={draft.vehicleCategory} />
                <Row
                    label="Schedule"
                    value={`${formatWeekday(draft.preferredDay)} · ${formatTimeRange(
                        draft.timeFrom,
                        draft.timeTo
                    )}`}
                />
            </Accordion>

            <Accordion
                title="Address"
                open={open === "address"}
                onClick={() => toggle("address")}
            >
                <Row label="Address" value={draft.address} />
                <Row label="Postcode" value={draft.postcode} />
            </Accordion>

            <div className="border-t border-white/20 pt-4 flex justify-between text-xl font-semibold">
                <span>Recurring</span>
                <span>
                    £{((draft.basePrice ?? 0) / 100).toFixed(2)} / {draft.plan?.toLowerCase()}
                </span>
            </div>
        </div>
    );
}

function Accordion({ title, open, onClick, children }: any) {
    return (
        <div className="border border-white/10 rounded-xl">
            <button
                onClick={onClick}
                className="w-full flex justify-between px-4 py-3 text-sm font-medium"
            >
                <span>{title}</span>
                <ChevronDown
                    size={16}
                    className={`transition-transform ${open ? "rotate-180" : ""}`}
                />
            </button>

            {open && (
                <div className="px-4 pb-4 space-y-2 text-sm text-gray-300">
                    {children}
                </div>
            )}
        </div>
    );
}

function Row({ label, value }: any) {
    return (
        <div className="flex justify-between">
            <p className="text-gray-400">{label}</p>
            <p className="font-medium">{value || "—"}</p>
        </div>
    );
}

function formatTimeRange(from?: string, to?: string) {
    if (!from || !to) return "—";
    const f = new Date(`1970-01-01T${from}`);
    const t = new Date(`1970-01-01T${to}`);

    const fmt = (d: Date) =>
        d.toLocaleTimeString("en-GB", {
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
        }).replace("am", "AM").replace("pm", "PM");

    return `${fmt(f)} – ${fmt(t)}`;
}

function formatWeekday(day?: number) {
    if (day === undefined || day === null) return "—";
    return [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ][day] ?? "—";
}