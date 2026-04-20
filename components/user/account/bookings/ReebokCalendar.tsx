"use client";

import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

type Props = {
  serviceDays: number[] | null;
  selectedDate: string | null;
  selectDate: (date: string) => void;
};

export default function RebookCalendar({
  serviceDays,
  selectedDate,
  selectDate,
}: Props) {

  function isAllowedDate(date: Date) {
    if (!serviceDays) return true;

    const jsDay = date.getDay(); // 0–6
    const dbDay = jsDay === 0 ? 7 : jsDay;

    return serviceDays.includes(dbDay);
  }

  const today = new Date();
  const maxDate = new Date();
  maxDate.setDate(today.getDate() + 30);

  return (
    <div className="rounded-2xl border border-gray-200 p-4 bg-gray-50">

      <DayPicker
        mode="single"
        selected={selectedDate ? new Date(selectedDate) : undefined}
        onSelect={(date) => {
          if (!date) return;

          const localDate = [
            date.getFullYear(),
            String(date.getMonth() + 1).padStart(2, "0"),
            String(date.getDate()).padStart(2, "0"),
          ].join("-");

          selectDate(localDate);
        }}
        disabled={[
          { before: today },
          { after: maxDate },
          (date) => !isAllowedDate(date),
        ]}
        className="mx-auto"
        styles={{
          caption: { textAlign: "center", fontWeight: 600 },
          day: {
            borderRadius: "10px",
            height: "40px",
            width: "40px",
          },
        }}
        modifiersClassNames={{
          selected: "bg-electric-teal text-black font-bold",
          today: "border border-electric-teal",
        }}
      />

    </div>
  );
}