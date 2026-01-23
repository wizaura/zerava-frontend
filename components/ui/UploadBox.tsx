type Props = {
    label: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    preview?: string | null;
};

export default function UploadBox({ label, onChange, preview }: Props) {
    return (
        <label className="border-2 border-dashed rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer">
            {preview ? (
                <img
                    src={preview}
                    className="h-40 w-full object-cover rounded-lg"
                />
            ) : (
                <>
                    <span className="text-gray-500">Click to upload</span>
                    <span className="text-sm text-gray-400">{label}</span>
                </>
            )}
            <input type="file" hidden onChange={onChange} />
        </label>
    );
}
