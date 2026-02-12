export function Input({
    label,
    value,
    onChange,
    type = "text",
    placeholder,
}: any) {
    return (
        <div>
            <label className="block mb-1 text-xs font-medium text-gray-600">
                {label}
            </label>
            <input
                type={type}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className="w-full rounded border px-3 py-2 text-sm
                    focus:outline-none focus:ring-2 focus:ring-electric-teal"
            />
        </div>
    );
}
