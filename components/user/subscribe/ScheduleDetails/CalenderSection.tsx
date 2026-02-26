import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

type Props = {
    serviceDays: number[] | null;
    selectedDate: string | null;
    selectDate: (date: string) => void;
};

export function CalendarSection({
    serviceDays,
    selectedDate,
    selectDate,
}: Props) {

    function isAllowedDate(date: Date) {
        if (!serviceDays) return false;

        const jsDay = date.getDay(); // 0–6
        const dbDay = jsDay === 0 ? 7 : jsDay;

        return serviceDays.includes(dbDay);
    }

    const today = new Date();
    const maxDate = new Date();
    maxDate.setDate(today.getDate() + 30);

    return (
        <div className="rounded-2xl border p-8 flex justify-center">
            <DayPicker
                mode="single"
                selected={
                    selectedDate ? new Date(selectedDate) : undefined
                }
                onSelect={(date) => {
                    if (!date) return;

                    // 🔥 IMPORTANT: Avoid UTC shifting
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
                modifiers={{
                    active: (date) => isAllowedDate(date),
                }}
                modifiersClassNames={{
                    selected:
                        "bg-electric-teal text-white font-bold mx-auto",
                    active:
                        "active-day text-electric-teal font-bold",
                    today:
                        "text-mobility-green bg-electric-teal/30 font-bold",
                }}
                styles={{
                    caption: {
                        fontSize: "1.5rem",
                        fontWeight: 600,
                        marginBottom: "1.5rem",
                        textAlign: "center",
                    },
                    nav_button: {
                        color: "#38D6C4",
                    },
                    head_cell: {
                        fontSize: "0.9rem",
                        fontWeight: 500,
                        color: "#9CA3AF",
                        paddingBottom: "0.75rem",
                    },
                    table: {
                        width: "100%",
                        margin: "0 auto",
                    },
                    cell: {
                        padding: "0.75rem",
                    },
                    day: {
                        width: "7.75rem",
                        height: "7.75rem",
                        fontSize: "1.25rem",
                        borderRadius: "1rem",
                        margin: "0 auto",
                    },
                }}
            />
        </div>
    );
}