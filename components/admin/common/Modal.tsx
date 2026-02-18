export function Modal({
    title,
    children,
    onClose,
}: {
    title: string;
    children: React.ReactNode;
    onClose: () => void;
}) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="flex w-full max-w-3xl max-h-[90vh] flex-col rounded-2xl bg-white shadow-xl">

                {/* HEADER */}
                <div className="flex items-center justify-between border-b px-6 py-4">
                    <h2 className="text-lg font-semibold">{title}</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-800"
                    >
                        ✕
                    </button>
                </div>

                {/* BODY (Scrollable) */}
                <div className="flex-1 overflow-y-auto px-6 py-6">
                    {children}
                </div>
            </div>
        </div>
    );
}
