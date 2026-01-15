export default function AdminDashboard() {
    return (
        <div className="space-y-6">
            <h2 className="text-xl font-semibold">Overview</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="rounded-lg bg-green-500 p-6 text-white">
                    <p className="text-sm">Total Bookings</p>
                    <p className="text-2xl font-semibold">—</p>
                </div>

                <div className="rounded-lg bg-blue-500 p-6 text-white">
                    <p className="text-sm">Subscriptions</p>
                    <p className="text-2xl font-semibold">—</p>
                </div>

                <div className="rounded-lg bg-orange-500 p-6 text-white">
                    <p className="text-sm">Revenue</p>
                    <p className="text-2xl font-semibold">—</p>
                </div>
            </div>
        </div>
    );
}
