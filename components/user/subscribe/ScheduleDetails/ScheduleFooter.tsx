export function ScheduleFooter({
    onBack,
    onContinue,
    locking,
}: any) {
    return (
        <div className="flex justify-between pt-6">
            <button
                onClick={onBack}
                className="rounded-full border px-6 py-2 text-sm"
            >
                ← Previous
            </button>

            <button
                disabled={locking}
                onClick={onContinue}
                className="rounded-full px-8 py-2 text-sm text-white bg-black"
            >
                {locking ? "Locking..." : "Continue →"}
            </button>
        </div>
    );
}