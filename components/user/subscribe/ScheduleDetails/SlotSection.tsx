import { ClockIcon } from "@heroicons/react/20/solid";
import { Clock, Calendar } from "lucide-react";

/* ---------- Helpers ---------- */

function formatTime12h(time: string) {
    const [h, m] = time.split(":").map(Number);
    const date = new Date();
    date.setHours(h, m);

    return date
        .toLocaleTimeString("en-GB", {
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
        })
        .replace("am", "AM")
        .replace("pm", "PM");
}

function formatDate(dateStr?: string | null) {
    if (!dateStr) return null;

    const d = new Date(dateStr);

    return d.toLocaleDateString("en-GB", {
        weekday: "short",
        day: "numeric",
        month: "short",
        year: "numeric",
    });
}

/* ---------- Component ---------- */

export function SlotSection({
    slots,
    bookingDraft,
    selectSlot,
}: any) {

    const selectedDate = bookingDraft.date;
    const selectedTimeFrom = bookingDraft.timeFrom;
    const selectedTimeTo = bookingDraft.timeTo;

    return (
        <div className="rounded-2xl border bg-white p-6 shadow-sm space-y-6">

            {/* ---------- Selected Summary ---------- */}
            <div className="rounded-xl bg-gray-100 border border-[#A8F3D6] p-4">

                <p className="text-xs uppercase tracking-wide font-semibold text-gray-800 mb-2">
                    Selected Schedule
                </p>

                {selectedDate ? (
                    <div className="flex items-center justify-between rounded-xl border border-white/10 px-4 py-3 text-sm">

                        <div className="flex items-center gap-4 text-gray-800">

                            <div className="flex items-center gap-2">
                                <Calendar size={14} className="text-gray-800" />
                                <span className="font-medium">
                                    {formatDate(selectedDate)}
                                </span>
                            </div>

                            {selectedTimeFrom && selectedTimeTo ? (
                                <div className="flex items-center gap-2">
                                    <Clock size={14} className="text-gray-800" />
                                    <span className="font-medium">
                                        {formatTime12h(selectedTimeFrom)} –{" "}
                                        {formatTime12h(selectedTimeTo)}
                                    </span>
                                </div>
                            ) : (
                                <span className="text-white/50 text-xs">
                                    Select a time slot
                                </span>
                            )}

                        </div>
                    </div>
                ) : (
                    <p className="text-xs text-gray-500">
                        Please choose a date first.
                    </p>
                )}
            </div>

            {/* ---------- Title ---------- */}
            <p className="text-md text-center font-medium text-gray-700">
                Choose your time slot
            </p>

            {slots.length === 0 ? (
                /* ---------- NO SLOTS STATE ---------- */
                <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-gray-300 bg-gray-50 p-8 text-center">
                    <ClockIcon className="h-8 w-8 text-gray-400 mb-3" />

                    <p className="text-sm font-medium text-gray-700">
                        No slots available
                    </p>

                    <p className="mt-1 text-xs text-gray-500 max-w-xs">
                        All operators are fully booked for this day.
                        Try selecting a different date.
                    </p>
                </div>
            ) : (
                <>
                    {/* ---------- SLOT GRID ---------- */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {slots.map((slot: any) => {
                            const isSelected =
                                bookingDraft.timeFrom === slot.startTime &&
                                bookingDraft.timeTo === slot.endTime;

                            return (
                                <button
                                    key={`${slot.startTime}-${slot.endTime}`}
                                    onClick={() => selectSlot(slot)}
                                    className={[
                                        "flex items-center gap-3 rounded-xl border px-4 py-3 transition text-sm",
                                        isSelected
                                            ? "border-[#0B2E28] bg-[#A8F3D6]/30"
                                            : "hover:border-black",
                                    ].join(" ")}
                                >
                                    <Clock
                                        size={16}
                                        className={
                                            isSelected
                                                ? "text-[#0B2E28]"
                                                : "text-gray-500"
                                        }
                                    />

                                    <span className="font-medium text-gray-700">
                                        {formatTime12h(slot.startTime)} –{" "}
                                        {formatTime12h(slot.endTime)}
                                    </span>
                                </button>
                            );
                        })}
                    </div>

                    <p className="text-xs text-gray-500 text-center mt-3">
                        Your selected time will be reserved for 10 minutes after continuing.
                    </p>
                </>
            )}
        </div>
    );
}