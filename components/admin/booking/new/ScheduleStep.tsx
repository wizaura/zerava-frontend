"use client";

import ScheduleStep from "./ScheduleDetails/ScheduleStep";
import toast from "react-hot-toast";
import adminApi from "@/lib/admin/axios";

export default function AdminScheduleStep({
  bookingDraft,
  setBookingDraft,
  onBack,
  onContinue,
}: any) {

  async function handleContinueWrapper() {
    if (!bookingDraft.userId) {
      toast.error("Please select a user first");
      return;
    }

    if (!bookingDraft.servicePriceId) {
      toast.error("Please select a service");
      return;
    }

    if (!bookingDraft.date) {
      toast.error("Please select a date");
      return;
    }

    if (!bookingDraft.timeFrom || !bookingDraft.timeTo) {
      toast.error("Please select a slot");
      return;
    }

    try {
      // 🔥 ADMIN LOCK (different from user)
      const res = await adminApi.post("/admin/bookings/lock", {
        userId: bookingDraft.userId,
        email: bookingDraft.email,

        serviceSlotId: bookingDraft.serviceSlotId,
        templateId: bookingDraft.templateId,
        isTemplate: bookingDraft.isTemplate,
        operatorId: bookingDraft.operatorId,

        date: bookingDraft.date,
        timeFrom: bookingDraft.timeFrom,
        timeTo: bookingDraft.timeTo,

        postcode: bookingDraft.postcode,
      });

      setBookingDraft((d: any) => ({
        ...d,
        lockId: res.data.lockId,
        serviceSlotId: res.data.serviceSlotId,
        userId: res.data.userId,
      }));

      onContinue();

    } catch (err: any) {
      toast.error(
        err?.response?.data?.message ||
        "Slot unavailable. Please choose another."
      );
    }
  }

  return (
    <div className="border border-gray-200 rounded-2xl p-6 bg-white space-y-8">

      <div>
        <h2 className="text-xl font-semibold">
          Schedule Booking
        </h2>
      </div>

      <ScheduleStep
        bookingDraft={bookingDraft}
        setBookingDraft={setBookingDraft}
        onBack={onBack}
        onContinue={handleContinueWrapper}
      />

    </div>
  );
}