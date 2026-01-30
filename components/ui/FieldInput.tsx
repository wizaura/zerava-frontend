export default function Field({
    label,
    value,
    disabled,
    onChange,
    className = "",
}: {
    label: string;
    value?: string;
    disabled?: boolean;
    onChange?: (v: string) => void;
    className?: string;
}) {
    return (
        <div className={className}>
            <label className="mb-2 block text-sm font-medium text-gray-600">
                {label}
            </label>

            <input
                value={value || ""}
                disabled={disabled}
                onChange={(e) => onChange?.(e.target.value)}
                className="
                    w-full rounded-xl border px-4 py-3 text-sm
                    disabled:bg-gray-100 disabled:text-gray-500
                    focus:border-electric-teal focus:outline-none
                "
            />
        </div>
    );
}
