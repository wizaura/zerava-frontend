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

  /* ---------------- EFFECTIVE DATA ---------------- */
  const effectiveData = {
    serviceId: profile?.serviceId || booking?.serviceId,
    vehicleCategoryId:
      profile?.vehicleCategoryId || booking?.vehicleCategoryId,

    make: profile?.make || booking?.vehicleMake,
    model: profile?.model || booking?.vehicleModel,
    registrationNumber:
      profile?.registrationNumber || booking?.registrationNumber,
    colour: profile?.colour || booking?.vehicleColour,

    postcode: profile?.postcode || booking?.postcode,
    address: profile?.address || booking?.address,

    parkingInstructions:
      profile?.parkingInstructions || booking?.parkingInstructions,
  };

  /* ---------------- CHECK POSTCODE ZONE ---------------- */
  useEffect(() => {
    if (!effectiveData?.postcode) return;

    const outward = effectiveData.postcode
      .toUpperCase()
      .trim()
      .split(" ")[0];

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
  }, [effectiveData.postcode]);

  /* ---------------- LOAD SERVICES ---------------- */
  useEffect(() => {
    api
      .get("/services")
      .then((res) => setServices(res.data.services || []))
      .catch(() => {});
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

  /* ---------------- SERVICE + PRICE ---------------- */
  const selectedService = services.find(
    (s) => s.id === effectiveData.serviceId
  );

  const selectedCategory = selectedService?.prices.find(
    (p: any) => p.vehicleCategory.id === effectiveData.vehicleCategoryId
  )?.vehicleCategory;

  const selectedPrice = selectedService?.prices.find(
    (p: any) =>
      p.vehicleCategory.id === effectiveData.vehicleCategoryId
  );

  const amount = selectedPrice?.price || 0;

  const formattedAmount = new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
  }).format(amount / 100);

  /* ---------------- FETCH SLOTS ---------------- */
  async function fetchSlots(date: string) {
    if (!zoneChecked || !effectiveData.postcode) return;

    try {
      setSlotLoading(true);

      const res = await api.post("/availability/check", {
        date,
        postcode: effectiveData.postcode.toUpperCase().trim(),
      });

      setSlots(res.data.slots || []);
    } catch {
      toast.error("Failed to load slots");
      setSlots([]);
    } finally {
      setSlotLoading(false);
    }
  }

  /* ---------------- DATE CHANGE ---------------- */
  useEffect(() => {
    if (!draft.date || !effectiveData.postcode || !zoneChecked) return;

    setSlots([]);
    fetchSlots(draft.date);
  }, [draft.date, effectiveData.postcode, zoneChecked]);

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

      const lockRes = await api.post("/bookings/lock", {
        serviceSlotId: draft.serviceSlotId,
        templateId: draft.templateId,
        isTemplate: draft.isTemplate,
        operatorId: draft.operatorId,
        date: draft.date,
        timeFrom: draft.timeFrom,
        timeTo: draft.timeTo,
        postcode: effectiveData.postcode,
      });

      const bookingRes = await api.post("/bookings/rebook", {
        lockId: lockRes.data.lockId,
        serviceSlotId: lockRes.data.serviceSlotId,
        servicePriceId: selectedPrice?.id,
        timeFrom: draft.timeFrom,
        timeTo: draft.timeTo,
      });

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

  if (!profile && !booking) {
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
        <div className="flex justify-between items-center px-6 py-4 border-b">
          <h2 className="text-lg font-semibold">Rebook Service</h2>
          <button onClick={onClose}>
            <X />
          </button>
        </div>

        {/* BODY */}
        <div className="overflow-y-auto px-6 py-6 space-y-6">
          <div className="rounded-2xl border bg-gray-50 p-5 space-y-4">
            <p className="text-sm font-semibold text-gray-800">
              Booking Details
            </p>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-500 text-xs">Service</p>
                <p className="font-medium">
                  {selectedService?.name || booking?.serviceName || "—"}
                </p>
              </div>

              <div>
                <p className="text-gray-500 text-xs">Vehicle Size</p>
                <p className="font-medium">
                  {selectedCategory?.name || "—"}
                </p>
              </div>

              <div>
                <p className="text-gray-500 text-xs">Vehicle</p>
                <p className="font-medium">
                  {effectiveData.make || "—"} {effectiveData.model || ""}
                </p>
                <p className="text-xs text-gray-400">
                  {effectiveData.registrationNumber || "—"} (
                  {effectiveData.colour || "—"})
                </p>
              </div>

              <div>
                <p className="text-gray-500 text-xs">Postcode</p>
                <p className="font-medium">
                  {effectiveData.postcode || "—"}
                </p>
              </div>

              <div>
                <p className="text-gray-500 text-xs">Address</p>
                <p className="font-medium">
                  {effectiveData.address || "—"}
                </p>
              </div>
            </div>

            {effectiveData.parkingInstructions && (
              <div>
                <p className="text-gray-500 text-xs">Parking Instructions</p>
                <p className="text-sm">
                  {effectiveData.parkingInstructions}
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
            <CalendarSection
              serviceDays={serviceDays || booking?.serviceDays}
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

            <SlotSection
              slots={slots}
              bookingDraft={draft}
              selectSlot={selectSlot}
              loading={slotLoading}
            />
          </div>

          {draft.date && !slotLoading && slots.length === 0 && (
            <p className="text-sm text-gray-500">
              No available slots for this date
            </p>
          )}
        </div>

        {/* FOOTER */}
        <div className="p-6 border-t">
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