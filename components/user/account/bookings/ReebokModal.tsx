"use client";

import { useEffect, useState } from "react";
import api from "@/lib/user/axios";
import toast from "react-hot-toast";
import { X, CreditCard } from "lucide-react";
import CalendarSection from "./ReebokCalendar";
import SlotSection from "./ReebokSlot";
import { userApi } from "@/lib/user/user.api";
import { PostcodeSection } from "./PostcodeSection";

export default function RebookModal({ booking, onClose }: any) {
  const [loading, setLoading] = useState(false);
  const [slots, setSlots] = useState<any[]>([]);
  const [profile, setProfile] = useState<any>(null);

  const [serviceDays, setServiceDays] = useState<number[] | null>(null);
  const [zoneChecked, setZoneChecked] = useState(false);
  const [slotLoading, setSlotLoading] = useState(false);
  const [services, setServices] = useState<any[]>([]);

  /* ---------------- ADDRESS STATE ---------------- */
  const [postcode, setPostcode] = useState("");
  const [address, setAddress] = useState("");
  const [houseNumber, setHouseNumber] = useState("");

  /* ---------------- DRAFT ---------------- */
  const [draft, setDraft] = useState<any>({
    date: null,
    timeFrom: null,
    timeTo: null,
    serviceSlotId: null,
    templateId: null,
    operatorId: null,
    isTemplate: false,
    serviceId: null,
    houseNumber: "",
  });

  /* ---------------- LOAD PROFILE ---------------- */
  useEffect(() => {
    async function loadProfile() {
      try {
        const res = await userApi.getProfile();
        setProfile(res.data);

        setPostcode(res.data.postcode || booking?.postcode || "");
        setAddress(res.data.address || booking?.address || "");
        setAddress(res.data.houseNumber || booking?.houseNumber || "");
        setDraft((d: any) => ({
          ...d,
          serviceId: res.data.serviceId || booking?.serviceId,
        }));
      } catch {
        toast("Please login");
      }
    }
    loadProfile();
  }, []);

  /* ---------------- EFFECTIVE DATA ---------------- */
  const effectiveData = {
    vehicleCategoryId:
      profile?.vehicleCategoryId || booking?.vehicleCategoryId,
  };

  /* ---------------- CHECK POSTCODE ZONE ---------------- */
  useEffect(() => {
    if (!postcode) return;

    const outward = postcode.toUpperCase().split(" ")[0];

    api.get(`/service-zones/check/${outward}`)
      .then((res) => {
        if (!res.data.available) {
          setZoneChecked(false);
          setServiceDays(null);
          return;
        }

        setZoneChecked(true);
        setServiceDays(res.data.serviceDays);
      })
      .catch(() => {});
  }, [postcode]);

  /* ---------------- LOAD SERVICES ---------------- */
  useEffect(() => {
    api.get("/services")
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
    (s) => s.id === draft.serviceId
  );

  const selectedCategory = selectedService?.prices.find(
    (p: any) =>
      p.vehicleCategory.id === effectiveData.vehicleCategoryId
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
    if (!zoneChecked || !postcode) return;

    try {
      setSlotLoading(true);

      const res = await api.post("/availability/check", {
        date,
        postcode: postcode.toUpperCase().trim(),
        serviceDuration: selectedPrice?.duration || 60,
      });

      setSlots(res.data.slots || []);
    } catch {
      toast.error("Failed to load slots");
      setSlots([]);
    } finally {
      setSlotLoading(false);
    }
  }

  /* ---------------- DATE / SERVICE CHANGE ---------------- */
  useEffect(() => {
    if (!draft.date || !postcode || !zoneChecked) return;

    setSlots([]);
    fetchSlots(draft.date);
  }, [draft.date, postcode, zoneChecked, draft.serviceId]);

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
        postcode,
      });

      const bookingRes = await api.post("/bookings/rebook", {
        lockId: lockRes.data.lockId,
        serviceSlotId: lockRes.data.serviceSlotId,
        servicePriceId: selectedPrice?.id,
        timeFrom: draft.timeFrom,
        timeTo: draft.timeTo,
        postcode,
        address,
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

  if (!booking) return null;

  return (
    <div
      className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-3xl max-h-[90vh] bg-white rounded-3xl shadow-xl flex flex-col"
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

          {/* 🔥 KEEP OLD UI + ADD NEW FUNCTIONALITY */}

          <div className="rounded-2xl border bg-gray-50 p-5 space-y-4">
            <p className="text-sm font-semibold text-gray-800">
              Booking Details
            </p>

            {/* SERVICE SELECT */}
            <div>
              <p className="text-gray-500 text-xs">Service</p>
              <select
                value={draft.serviceId || ""}
                onChange={(e) => {
                  setDraft((d: any) => ({
                    ...d,
                    serviceId: e.target.value,
                    timeFrom: null,
                    timeTo: null,
                  }));
                }}
                className="w-full mt-1 border rounded-lg px-3 py-2 text-sm"
              >
                {services
                  .filter((s) =>
                    s.prices.some(
                      (p: any) =>
                        p.vehicleCategory.id === effectiveData.vehicleCategoryId
                    )
                  )
                  .map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name}
                    </option>
                  ))}
              </select>
            </div>

            {/* VEHICLE (UNCHANGED) */}
            <div className="text-sm">
              <p className="text-gray-500 text-xs">Vehicle</p>
              <p className="font-medium">
                {profile?.make || booking?.vehicleMake}{" "}
                {profile?.model || booking?.vehicleModel}{" "}
                ({profile?.registrationNumber || booking?.registrationNumber} - {profile?.colour || booking?.colour})
              </p>
            </div>
          </div>

          {/* 🔥 POSTCODE + ADDRESS */}
          <PostcodeSection
            postcode={postcode}
            setPostcode={setPostcode}
            address={address}
            setAddress={setAddress}
            houseNumber={houseNumber}
            setHouseNumber={setHouseNumber}
            bookingDraft={draft}
            setBookingDraft={setDraft}
          />

          {!zoneChecked && (
            <p className="text-sm text-red-500">
              Service not available in your postcode
            </p>
          )}

          {/* CALENDAR + SLOT */}
          <div className="grid md:grid-cols-2 gap-4">
            <CalendarSection
              serviceDays={serviceDays || booking?.serviceDays}
              selectedDate={draft.date}
              selectDate={(date: string) =>
                setDraft((d: any) => ({
                  ...d,
                  date,
                  timeFrom: null,
                  timeTo: null,
                }))
              }
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