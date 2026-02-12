export function Modal({
    title,
    children,
    onClose,
}: any) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="w-full max-w-md rounded-xl bg-white p-6 space-y-4">
                <div className="flex justify-between items-center">
                    <h3 className="font-medium text-lg">{title}</h3>
                    <button onClick={onClose}>✕</button>
                </div>
                {children}
            </div>
        </div>
    );
}
