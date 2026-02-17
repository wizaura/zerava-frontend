"use client";

import { useEffect, useMemo, useState } from "react";
import { Operator } from "@/lib/admin/operators.api";
import { Zone } from "@/lib/admin/zones.api";
import toast from "react-hot-toast";

const DAYS = [
  { value: 1, label: "Monday" },
  { value: 2, label: "Tuesday" },
  { value: 3, label: "Wednesday" },
  { value: 4, label: "Thursday" },
  { value: 5, label: "Friday" },
  { value: 6, label: "Saturday" },
  { value: 7, label: "Sunday" },
];

export default function SlotTemplateForm({
  operators,
  zones,
  template,
  onSubmit,
  onCancel,
}: {
  operators: Operator[];
  zones: Zone[];
  template?: any;
  onSubmit: (data: any) => void;
  onCancel: () => void;
}) {
  const [form, setForm] = useState({
    operatorId: "",
    serviceDay: 1,
    timeFrom: "08:00",
    timeTo: "18:00",
    maxBookings: 4,
    zonePrefix: "",
  });

  // ✅ Prefill when editing
  useEffect(() => {
    if (!template) {
      // Reset when switching to "Add"
      setForm({
        operatorId: "",
        serviceDay: 1,
        timeFrom: "08:00",
        timeTo: "18:00",
        maxBookings: 4,
        zonePrefix: "",
      });
      return;
    }

    setForm({
      operatorId: template.operatorId,
      serviceDay: template.serviceDay,
      timeFrom: template.timeFrom,
      timeTo: template.timeTo,
      maxBookings: template.maxBookings,
      zonePrefix: template.zonePrefix || "",
    });
  }, [template]);

  function validate(): string | null {
    if (!form.operatorId) return "Please select an operator";

    if (form.timeFrom >= form.timeTo)
      return "Time From must be earlier than Time To";

    const from = new Date(`1970-01-01T${form.timeFrom}:00`);
    const to = new Date(`1970-01-01T${form.timeTo}:00`);
    const diff = (to.getTime() - from.getTime()) / 60000;

    if (diff < 30)
      return "Slot duration must be at least 30 minutes";

    if (form.maxBookings < 1)
      return "Max bookings must be at least 1";

    if (!form.zonePrefix)
      return "Please select a zone";


    if (
      form.zonePrefix &&
      !filteredZones.some((z) => z.postcodePrefix === form.zonePrefix)
    ) {
      return "Selected zone is not available for this day";
    }

    return null;
  }


  function update(key: string, value: any) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  // ✅ Filter zones by selected day
  const filteredZones = useMemo(() => {
    return zones.filter(
      (z) => z.serviceDay === form.serviceDay
    );
  }, [zones, form.serviceDay]);

  return (
    <div className="rounded-xl border bg-white p-6">
      <h3 className="mb-6 text-lg font-semibold">
        {template ? "Edit Weekly Slot Template" : "Add Weekly Slot Template"}
      </h3>

      <div className="grid grid-cols-2 gap-6">

        {/* Operator */}
        <div>
          <label className="text-sm font-medium block mb-1">
            Operator
          </label>
          <select
            value={form.operatorId}
            onChange={(e) => update("operatorId", e.target.value)}
            className="w-full border rounded-md px-3 py-2 text-sm"
          >
            <option value="">Select operator</option>
            {operators.map((o) => (
              <option key={o.id} value={o.id}>
                {o.name}
              </option>
            ))}
          </select>
        </div>

        {/* Service Day */}
        <div>
          <label className="text-sm font-medium block mb-1">
            Service Day
          </label>
          <select
            value={form.serviceDay}
            onChange={(e) =>
              update("serviceDay", Number(e.target.value))
            }
            className="w-full border rounded-md px-3 py-2 text-sm"
          >
            {DAYS.map((d) => (
              <option key={d.value} value={d.value}>
                {d.label}
              </option>
            ))}
          </select>
        </div>

        {/* Time From */}
        <div>
          <label className="text-sm font-medium block mb-1">
            Time From
          </label>
          <input
            type="time"
            value={form.timeFrom}
            onChange={(e) => update("timeFrom", e.target.value)}
            className="w-full border rounded-md px-3 py-2 text-sm"
          />
        </div>

        {/* Time To */}
        <div>
          <label className="text-sm font-medium block mb-1">
            Time To
          </label>
          <input
            type="time"
            value={form.timeTo}
            onChange={(e) => update("timeTo", e.target.value)}
            className="w-full border rounded-md px-3 py-2 text-sm"
          />
        </div>

        {/* Max Bookings */}
        <div>
          <label className="text-sm font-medium block mb-1">
            Max Bookings
          </label>
          <input
            type="number"
            min={1}
            value={form.maxBookings}
            onChange={(e) =>
              update("maxBookings", Number(e.target.value))
            }
            className="w-full border rounded-md px-3 py-2 text-sm"
          />
        </div>

        {/* Zone */}
        <div>
          <label className="text-sm font-medium block mb-1">
            Zone Prefix
          </label>

          <select
            value={form.zonePrefix}
            onChange={(e) => update("zonePrefix", e.target.value)}
            className="w-full border rounded-md px-3 py-2 text-sm"
          >
            <option value="">Select Zone</option>

            {filteredZones.map((z) => (
              <option key={z.id} value={z.postcodePrefix}>
                {z.postcodePrefix} ({z.zoneCode})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-6 flex gap-3">
        <button
          onClick={() => {
            const error = validate();
            if (error) {
              toast.error(error);
              return;
            }
            onSubmit(form);
          }}
          className="bg-emerald-500 px-6 py-2 rounded-md text-sm font-medium"
        >
          {template ? "Update Template" : "Save Template"}
        </button>

        <button
          onClick={onCancel}
          className="border px-6 py-2 rounded-md text-sm"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
