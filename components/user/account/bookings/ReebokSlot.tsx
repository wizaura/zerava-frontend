"use client";

import { Clock, Calendar } from "lucide-react";

/* ---------- Helpers ---------- */

function formatTime(time: string) {
  const [h, m] = time.split(":").map(Number);
  const d = new Date();
  d.setHours(h, m);

  return d.toLocaleTimeString("en-GB", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

function formatDate(dateStr?: string | null) {
  if (!dateStr) return null;

  const d = new Date(dateStr);

  return d.toLocaleDateString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });
}

/* ---------- Component ---------- */

export default function RebookSlots({
  slots,
  bookingDraft,
  selectSlot,
  loading,
}: any) {

  const selected = bookingDraft;

  return (
    <div className="rounded-2xl border bg-white p-6 space-y-6">

      {/* TITLE */}
      <p className="text-sm text-gray-600 font-medium">
        Choose time slot (1h)
      </p>

      {/* LOADING */}
      {loading && (
        <p className="text-sm text-gray-500">Loading slots...</p>
      )}

      {/* EMPTY */}
      {!loading && slots.length === 0 && (
        <div className="text-center text-sm text-gray-500 py-6">
          No slots available for this date
        </div>
      )}

      {/* GRID */}
      {!loading && slots.length > 0 && (
        <div className="grid grid-cols-2 gap-3">

          {slots.map((slot: any) => {
            const isSelected =
              selected?.timeFrom === slot.startTime &&
              selected?.timeTo === slot.endTime;

            return (
              <button
                key={slot.startTime}
                onClick={() => selectSlot(slot)}
                className={[
                  "flex items-center justify-center gap-2 px-3 py-2 rounded-xl border text-sm transition",
                  isSelected
                    ? "bg-[#0B2E28] text-white border-[#0B2E28]"
                    : "bg-white hover:border-black",
                ].join(" ")}
              >
                <Clock size={14} />
                {formatTime(slot.startTime)}
              </button>
            );
          })}

        </div>
      )}

      {/* 🔥 SELECTED SUMMARY (KEEP THIS) */}
      {bookingDraft.date && (
        <div className="rounded-2xl bg-black text-white p-4 space-y-2">

          <div className="flex items-center gap-2 text-sm">
            <Calendar size={14} />
            <span>{formatDate(bookingDraft.date)}</span>
          </div>

          {bookingDraft.timeFrom && bookingDraft.timeTo ? (
            <div className="flex items-center gap-2 text-sm">
              <Clock size={14} />
              <span>
                {formatTime(bookingDraft.timeFrom)} –{" "}
                {formatTime(bookingDraft.timeTo)}
              </span>
            </div>
          ) : (
            <p className="text-xs text-gray-300">
              Select a time slot
            </p>
          )}

        </div>
      )}
    </div>
  );
}