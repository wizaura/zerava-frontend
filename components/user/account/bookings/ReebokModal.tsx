"use client";

import { useEffect, useState } from "react";
import api from "@/lib/user/axios";
import toast from "react-hot-toast";
import { X, CreditCard } from "lucide-react";
import CalendarSection from "./ReebokCalendar";
import SlotSection from "./ReebokSlot";
import { userApi } from "@/lib/user/user.api";

export default function RebookModal({ booking, onClose }: any) {
  const [loading, setLoading] = useState(false);
  const [slots, setSlots] = useState<any[]>([]);
  const [profile, setProfile] = useState<any>(null);

  const [serviceDays, setServiceDays] = useState<number[] | null>(null);
  const [zoneChecked, setZoneChecked] = useState(false);
  const [slotLoading, setSlotLoading] = useState(false);
  const [services, setServices] = useState<any[]>([]);

  const [draft, setDraft] = useState<any>({
    date: null,
    timeFrom: null,
    timeTo: null,
    serviceSlotId: null,
    templateId: null,
    operatorId: null,
    isTemplate: false,
  });

  /* ---------------- LOAD PROFILE ---------------- */
  useEffect(() => {
    async function loadProfile() {
      try {
        const res = await userApi.getProfile();
        setProfile(res.data);
      } catch {
        toast.error("Failed to load profile");
      }
    }
    loadProfile();
  }, []);

  /* ---------------- CHECK POSTCODE ZONE ---------------- */
  useEffect(() => {
    if (!profile?.postcode) return;

    const outward = profile.postcode.toUpperCase().trim().split(" ")[0];

    async function checkZone() {
      try {
        const res = await api.get(`/service-zones/check/${outward}`);

        if (!res.data.available) {
          setZoneChecked(false);
          setServiceDays(null);
          return;
        }

        setZoneChecked(true);
        setServiceDays(res.data.serviceDays);
      } catch {
        toast.error("Failed to check service availability");
      }
    }

    checkZone();
  }, [profile]);

  useEffect(() => {
    api.get("/services")
      .then((res) => setServices(res.data.services || []))
      .catch(() => { });
  }, []);

  /* ---------------- DEFAULT DATE ---------------- */
  useEffect(() => {
    if (!booking) return;

    const d = new Date(booking.date);
    d.setDate(d.getDate() + 28);

    const localDate = [
      d.getFullYear(),
      String(d.getMonth() + 1).padStart(2, "0"),
      String(d.getDate()).padStart(2, "0"),
    ].join("-");

    setDraft((prev: any) => ({
      ...prev,
      date: localDate,
    }));
  }, [booking]);

  const selectedService = services.find(
    (s) => s.id === profile.serviceId
  );

  const selectedCategory = selectedService?.prices.find(
    (p: any) => p.vehicleCategory.id === profile.vehicleCategoryId
  )?.vehicleCategory;

  const selectedPrice = selectedService?.prices.find(
    (p: any) =>
      p.vehicleCategory.id === profile.vehicleCategoryId
  );

  const amount = selectedPrice?.price || 0;

  const formattedAmount = new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
  }).format(amount / 100);

  /* ---------------- FETCH SLOTS ---------------- */
  async function fetchSlots(date: string) {
    if (!zoneChecked) return;

    try {
      setSlotLoading(true);

      const res = await api.post("/availability/check", {
        date,
        postcode: profile.postcode.toUpperCase().trim(),
      });

      console.log(res, 'res')

      setSlots(res.data.slots || []);
    } catch {
      toast.error("Failed to load slots");
      setSlots([]);
    } finally {
      setSlotLoading(false);
    }
  }

  /* ---------------- DATE CHANGE EFFECT ---------------- */
  useEffect(() => {
    if (!draft.date || !profile || !zoneChecked) return;

    // reset slot before fetching
    setSlots([]);

    fetchSlots(draft.date);
  }, [draft.date, profile, zoneChecked]);

  /* ---------------- SELECT SLOT ---------------- */
  function selectSlot(slot: any) {
    const op = slot.availableOperators?.[0];
    if (!op) return;

    setDraft((d: any) => ({
      ...d,
      timeFrom: slot.startTime,
      timeTo: slot.endTime,
      operatorId: op.operatorId,
      templateId: op.templateId,
      isTemplate: op.isTemplate,
      serviceSlotId: op.serviceSlotId || null,
    }));
  }

  /* ---------------- HANDLE REBOOK ---------------- */
  async function handleRebook() {
    if (!zoneChecked) {
      return toast.error("Service not available in your postcode");
    }

    if (!draft.date || !draft.timeFrom) {
      return toast.error("Please select date and time");
    }

    try {
      setLoading(true);

      // 🔹 1. Create lock
      const lockRes = await api.post("/bookings/lock", {
        serviceSlotId: draft.serviceSlotId,
        templateId: draft.templateId,
        isTemplate: draft.isTemplate,
        operatorId: draft.operatorId,
        date: draft.date,
        timeFrom: draft.timeFrom,
        timeTo: draft.timeTo,
        postcode: profile.postcode,
      });

      // 🔹 2. Create booking (NEW API)
      const bookingRes = await api.post("/bookings/rebook", {
        lockId: lockRes.data.lockId,
        serviceSlotId: lockRes.data.serviceSlotId,
        servicePriceId: selectedPrice?.id,
        timeFrom: draft.timeFrom,
        timeTo: draft.timeTo,
      });

      // 🔹 3. Payment
      const session = await api.post("/payments/create-session", {
        bookingId: bookingRes.data.bookingId,
      });

      window.location.href = session.data.url;

    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Rebook failed");
    } finally {
      setLoading(false);
    }
  }

  /* ---------------- GUARD ---------------- */
  if (!booking) return null;

  if (!profile) {
    return (
      <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-xl text-sm text-gray-500">
          Loading your details...
        </div>
      </div>
    );
  }

  return (
    <div
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-3xl max-h-[90vh] rounded-3xl bg-white shadow-xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >

        {/* HEADER */}
        <div className="flex justify-between items-center px-6 py-4 border-b shrink-0">
          <h2 className="text-lg font-semibold">Rebook Service</h2>
          <button onClick={onClose}><X /></button>
        </div>

        {/* BODY */}
        <div className="overflow-y-auto px-6 py-6 space-y-6">

          <div className="rounded-2xl border bg-gray-50 p-5 space-y-4">

            <p className="text-sm font-semibold text-gray-800">
              Booking Details
            </p>

            <div className="grid grid-cols-2 gap-4 text-sm">

              {/* SERVICE */}
              <div>
                <p className="text-gray-500 text-xs">Service</p>
                <p className="font-medium">
                  {selectedService?.name || booking.serviceName || "—"}
                </p>
              </div>

              {/* CATEGORY */}
              <div>
                <p className="text-gray-500 text-xs">Vehicle Size</p>
                <p className="font-medium">
                  {selectedCategory?.name || "—"}
                </p>
              </div>

              {/* VEHICLE */}
              <div>
                <p className="text-gray-500 text-xs">Vehicle</p>
                <p className="font-medium">
                  {profile?.make} {profile?.model}
                </p>
                <p className="text-xs text-gray-400">
                  {profile?.registrationNumber} ({profile.colour})
                </p>
              </div>

              {/* POSTCODE */}
              <div>
                <p className="text-gray-500 text-xs">Postcode</p>
                <p className="font-medium">
                  {profile?.postcode}
                </p>
              </div>

              {/* ADDRESS */}
              <div>
                <p className="text-gray-500 text-xs">Address</p>
                <p className="font-medium">
                  {profile?.address}
                </p>
              </div>

            </div>

            {/* PARKING */}
            {profile?.parkingInstructions && (
              <div>
                <p className="text-gray-500 text-xs">Parking Instructions</p>
                <p className="text-sm">
                  {profile.parkingInstructions}
                </p>
              </div>
            )}

          </div>

          {!zoneChecked && (
            <p className="text-sm text-red-500">
              Service not available in your postcode
            </p>
          )}

          <div className="grid md:grid-cols-2 gap-4">

            {/* CALENDAR */}
            <CalendarSection
              serviceDays={serviceDays || booking.serviceDays}
              selectedDate={draft.date}
              selectDate={(date: string) => {
                setDraft((d: any) => ({
                  ...d,
                  date,
                  timeFrom: null,
                  timeTo: null,
                }));
              }}
            />

            {/* SLOT */}
            <SlotSection
              slots={slots}
              bookingDraft={draft}
              selectSlot={selectSlot}
              loading={slotLoading}
            />
          </div>

          {/* EMPTY STATE */}
          {draft.date && !slotLoading && slots.length === 0 && (
            <p className="text-sm text-gray-500">
              No available slots for this date
            </p>
          )}

        </div>

        {/* FOOTER */}
        <div className="p-6 border-t shrink-0">
          <button
            onClick={handleRebook}
            disabled={loading}
            className="w-full bg-electric-teal text-black py-3 rounded-full flex items-center justify-center gap-2 font-semibold"
          >
            <CreditCard size={16} />
            {loading
              ? "Processing..."
              : `Continue to Payment ${formattedAmount}`}
          </button>
        </div>

      </div>
    </div>
  );
}