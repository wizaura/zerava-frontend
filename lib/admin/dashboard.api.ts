import adminApi from "./axios";

export async function downloadAllBookingsCsv() {
    const res = await adminApi.get("/admin/bookings/export-csv", {
        responseType: "blob",
    });

    const url = window.URL.createObjectURL(new Blob([res.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "bookings.csv");
    document.body.appendChild(link);
    link.click();
}

export async function downloadTodaysBookingsExcel() {
    const res = await adminApi.get(
        "/admin/bookings/export/today-excel",
        { responseType: "blob" },
    );

    const url = window.URL.createObjectURL(new Blob([res.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "todays-bookings.xlsx");
    document.body.appendChild(link);
    link.click();
}

export async function sendCustomerInvite(email: string) {
    return adminApi.post("/admin/invite", { email });
}

