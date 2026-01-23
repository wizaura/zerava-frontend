type TextAreaProps = {
    label: string;
    placeholder?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
};

export default function TextArea({
    label,
    placeholder,
    value,
    onChange,
}: TextAreaProps) {
    return (
        <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
                {label}
            </label>
            <textarea
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="w-full min-h-[120px] rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
            />
        </div>
    );
}
