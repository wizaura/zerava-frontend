"use client";

import { useEffect, useState } from "react";
import AdminUserStep from "./UserStep";
import AdminServiceStep from "./Service";
import AdminScheduleStep from "./ScheduleStep";
import ReviewStep from "./ReviewStep";
import adminApi from "@/lib/admin/axios";
import toast from "react-hot-toast";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export type BookingDraft = {
  userId: string | null;
  name: string;
  email: string;
  phone: string;
  houseNumber: string | null;

  servicePriceId: string | null;
  serviceName: string | null;
  basePrice: number | null;

  addOns: any[];
  addOnDurationMin: number;

  serviceDurationMin: number;

  postcode: string;
  address: string;

  date: string | null;
  timeFrom: string | null;
  timeTo: string | null;

  serviceSlotId: string | null;
  templateId: string | null;
  isTemplate: boolean;
  operatorId: string | null;

  lockId: string | null;
};

export default function AdminBookingNew() {
  const [step, setStep] = useState(1);

  const [services, setServices] = useState<any[]>([]);
  const [vehicleCategories, setVehicleCategories] = useState<any[]>([]);
  const [addOns, setAddOns] = useState<any[]>([]);
  const [loadingData, setLoadingData] = useState(true);
  const router = useRouter();

  const [bookingDraft, setBookingDraft] = useState<BookingDraft>({
    userId: null,
    name: "",
    email: "",
    phone: "",

    servicePriceId: null,
    serviceName: null,
    basePrice: null,

    addOns: [],
    addOnDurationMin: 0,

    serviceDurationMin: 0,

    postcode: "",
    address: "",

    date: "",
    timeFrom: "",
    timeTo: "",
    houseNumber: "",

    serviceSlotId: null,
    templateId: null,
    isTemplate: false,
    operatorId: null,

    lockId: null,
  });

  useEffect(() => {
    async function loadData() {
      try {
        setLoadingData(true);

        const res = await adminApi.get("/admin/services/full");

        setServices(res.data.services);
        setAddOns(res.data.addOns);
        setVehicleCategories(res.data.vehicleCategories);

      } catch {
        toast.error("Failed to load booking data");
      } finally {
        setLoadingData(false);
      }
    }

    loadData();
  }, []);

  if (loadingData) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-400">
        Loading booking system...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white rounded-2xl text-eco-black p-2 md:p-6">

      <div className="max-w-5xl mx-auto space-y-8">

        <div className="flex items-center justify-between mb-6">

          {/* 🔙 BACK */}
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-sm text-gray-600 hover:text-black transition"
          >
            <ArrowLeft size={16} />
            Back
          </button>

          {/* 🧾 TITLE */}
          <h1 className="text-2xl md:text-3xl font-semibold text-center flex-1">
            Manual Booking
          </h1>

          {/* EMPTY (to balance layout) */}
          <div className="w-[60px]" />

        </div>

        {/* Step Indicator */}
        <div className="text-sm text-gray-600">
          Step {step} of 4
        </div>

        {step === 1 && (
          <AdminUserStep
            bookingDraft={bookingDraft}
            setBookingDraft={setBookingDraft}
            onNext={() => setStep(2)}
          />
        )}

        {step === 2 && (
          <AdminServiceStep
            services={services}
            vehicleCategories={vehicleCategories}
            addOns={addOns}
            bookingDraft={bookingDraft}
            setBookingDraft={setBookingDraft}
            onBack={() => setStep(1)}
            onContinue={() => setStep(3)}
          />
        )}

        {step === 3 && (
          <AdminScheduleStep
            bookingDraft={bookingDraft}
            setBookingDraft={setBookingDraft}
            onBack={() => setStep(2)}
            onContinue={() => setStep(4)}
          />
        )}

        {step === 4 && (
          <ReviewStep
            bookingDraft={bookingDraft}
            onBack={() => setStep(3)}
          />
        )}

      </div>
    </div>
  );
}