type TextInputProps = {
    label: string;
    placeholder?: string;
    value: string;
    min?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    type?: string;
};

export default function TextInput({
    label,
    placeholder,
    value,
    onChange,
    type = "text",
}: TextInputProps) {
    return (
        <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
                {label}
            </label>
            <input
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
            />
        </div>
    );
}
