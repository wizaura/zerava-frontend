type SelectInputProps = {
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    children: React.ReactNode;
};

export default function SelectInput({
    label,
    value,
    onChange,
    children,
}: SelectInputProps) {
    return (
        <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
                {label}
            </label>
            <select
                value={value}
                onChange={onChange}
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
            >
                {children}
            </select>
        </div>
    );
}
