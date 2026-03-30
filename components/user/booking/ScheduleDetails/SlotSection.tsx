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

            {/* ---------- Title ---------- */}
            <p className="text-md text-center font-medium text-gray-700">
                Choose your arrival window
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

            {/* ---------- Selected Summary ---------- */}
            <div className="p-4">

                <p className="text-xs uppercase tracking-wide font-semibold text-gray-800 mb-2">
                    Selected Schedule
                </p>

                {selectedDate ? (
                    <div className="w-full rounded-2xl border border-white/10 bg-eco-black px-6 py-5 backdrop-blur-md">

                        <div className="flex flex-col md:flex-row md:items-center md:justify-around gap-4">

                            {/* Selected Date */}
                            <div className="flex items-center gap-3">
                                <div className="bg-white/10 p-2 rounded-lg">
                                    <Calendar size={16} className="text-white" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-xs text-white/60">Selected Date</span>
                                    <span className="text-sm font-semibold text-white">
                                        {formatDate(selectedDate)}
                                    </span>
                                </div>
                            </div>

                            {/* Divider */}
                            <div className="hidden md:block h-10 w-px bg-white/10" />

                            {/* Arrival Window */}
                            {selectedTimeFrom && selectedTimeTo ? (
                                <div className="flex items-center gap-3">
                                    <div className="bg-white/10 p-2 rounded-lg">
                                        <Clock size={16} className="text-white" />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-xs text-white/60">Arrival Window</span>
                                        <span className="text-sm font-semibold text-white">
                                            {formatTime12h(selectedTimeFrom)} – {formatTime12h(selectedTimeTo)}
                                        </span>
                                    </div>
                                </div>
                            ) : (
                                <div className="text-xs text-white/50">
                                    Select a time slot
                                </div>
                            )}

                        </div>

                        {/* Bottom Info */}
                        <div className="mt-4 text-xs text-center text-white/60 border-t border-white/10 pt-3">
                            Our technician will arrive within your selected time window.
                        </div>
                    </div>
                ) : (
                    <p className="text-xs text-gray-500">
                        Please choose a date first.
                    </p>
                )}
            </div>
        </div>
    );
}