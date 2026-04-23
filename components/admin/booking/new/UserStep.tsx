"use client";

import { useEffect, useState } from "react";
import api from "@/lib/user/axios";
import toast from "react-hot-toast";
import {
  Mail,
  User,
  Phone,
  MapPin,
  Car,
  Clipboard,
} from "lucide-react";

/* ---------------- HELPERS ---------------- */
function isLikelyReg(reg: string) {
  return /^[A-Z0-9 ]{5,8}$/.test(reg);
}

export default function AdminUserStep({
  bookingDraft,
  setBookingDraft,
  onNext,
}: any) {
  const [email, setEmail] = useState(bookingDraft.email || "");
  const [foundUser, setFoundUser] = useState<any>(null);
  const [reg, setReg] = useState(bookingDraft.registrationNumber || "");
  const [regLoading, setRegLoading] = useState(false);

  /* ---------------- EMAIL SEARCH ---------------- */
  useEffect(() => {
    if (!email || !email.includes("@")) return;

    const timeout = setTimeout(async () => {
      try {
        const res = await api.get(`/admin/users/by-email?email=${email}`);
        const user = res.data;

        if (user) {
          setFoundUser(user);

          setBookingDraft((d: any) => ({
            ...d,

            /* 🔹 USER */
            userId: user.id,
            name: d.name || user.fullName || "",
            email: user.email || email,
            phone: d.phone || user.phone || "",

            /* 🔹 ADDRESS */
            address: d.address || user.address || "",
            postcode: d.postcode || user.postcode || "",
            houseNumber: d.houseNumber || user.houseNumber || "",

            /* 🔹 VEHICLE */
            registrationNumber:
              d.registrationNumber || user.registrationNumber || "",
            make: d.make || user.make || "",
            model: d.model || user.model || "",
            colour: d.colour || user.colour || "",
            parkingInstructions:
              d.parkingInstructions || user.parkingInstructions || "",

            /* 🔥 SERVICE AUTO-SELECT (IMPORTANT) */
            serviceId: user.serviceId || null,
            vehicleCategoryId: user.vehicleCategoryId || null,
          }));
          setReg(user.registrationNumber)
        } else {
          setFoundUser(null);

          setBookingDraft((d: any) => ({
            ...d,
            userId: null,
            email,
          }));
        }
      } catch (err) {
        console.error("User lookup failed", err);
      }
    }, 800);

    return () => clearTimeout(timeout);
  }, [email]);

  /* ---------------- VEHICLE LOOKUP ---------------- */
  async function lookupVehicle(reg: string) {
    if (!isLikelyReg(reg)) return;

    try {
      setRegLoading(true);

      const res = await api.post("/vehicle/lookup", {
        registrationNumber: reg,
      });

      setBookingDraft((d: any) => ({
        ...d,
        make: res.data.make || "",
        model: res.data.model || "",
        colour: res.data.colour || "",
      }));
    } finally {
      setRegLoading(false);
    }
  }

  useEffect(() => {
    if (!reg) return;

    const timer = setTimeout(() => {
      lookupVehicle(reg);
    }, 1500);

    return () => clearTimeout(timer);
  }, [reg]);

  /* ---------------- VALIDATION ---------------- */
  function validateAndContinue() {
    if (!bookingDraft.name?.trim())
      return toast.error("Enter customer name");

    if (!bookingDraft.email?.includes("@"))
      return toast.error("Enter valid email");

    if (!bookingDraft.phone?.trim())
      return toast.error("Enter phone number");

    if (!isLikelyReg(bookingDraft.registrationNumber || ""))
      return toast.error("Enter valid registration");

    if (!bookingDraft.make?.trim())
      return toast.error("Vehicle make missing");

    if (!bookingDraft.model?.trim())
      return toast.error("Vehicle model missing");

    if (!bookingDraft.colour?.trim())
      return toast.error("Vehicle colour missing");

    // 🔥 INFO (not error)
    if (!foundUser) {
      toast.success("New user will be created");
    }

    onNext();
  }

  /* ---------------- UI ---------------- */
  return (
    <div className="border border-gray-200 rounded-2xl p-3 md:p-6 bg-white space-y-8">

      {/* HEADER */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900">
          Customer & Vehicle Details
        </h2>
        <p className="text-xs text-gray-500">
          Fill details to proceed booking
        </p>
      </div>

      {/* CUSTOMER */}
      <Section title="Customer">

        <Input
          label="Email"
          icon={<Mail size={16} />}
          value={email}
          onChange={setEmail}
        />

        {foundUser && (
          <p className="text-xs text-green-600">Existing user found ✔</p>
        )}

        {!foundUser && email && (
          <p className="text-xs text-yellow-600">
            New user will be created
          </p>
        )}

        <Grid>
          <Input
            label="Name"
            icon={<User size={16} />}
            value={bookingDraft.name}
            onChange={(v: string) =>
              setBookingDraft((d: any) => ({ ...d, name: v }))
            }
          />

          <Input
            label="Phone"
            icon={<Phone size={16} />}
            value={bookingDraft.phone}
            onChange={(v: string) =>
              setBookingDraft((d: any) => ({ ...d, phone: v }))
            }
          />
        </Grid>

      </Section>

      {/* VEHICLE */}
      <Section title="Vehicle">

        <Input
          label="Registration"
          icon={<Car size={16} />}
          value={reg}
          onChange={(v: string) => {
            const val = v.toUpperCase();
            setReg(val);

            setBookingDraft((d: any) => ({
              ...d,
              registrationNumber: val,
            }));
          }}
        />

        {regLoading && (
          <p className="text-xs text-gray-400">Fetching vehicle...</p>
        )}

        <Grid>
          <Input
            label="Make"
            value={bookingDraft.make}
            onChange={(v: string) =>
              setBookingDraft((d: any) => ({ ...d, make: v }))
            }
          />

          <Input
            label="Model"
            value={bookingDraft.model}
            onChange={(v: string) =>
              setBookingDraft((d: any) => ({ ...d, model: v }))
            }
          />

          <Input
            label="Colour"
            value={bookingDraft.colour}
            onChange={(v: string) =>
              setBookingDraft((d: any) => ({ ...d, colour: v }))
            }
          />
        </Grid>

      </Section>

      {/* ACCESS */}
      <Section title="Access">
        <div>
          <label className="text-xs text-gray-500">
            Parking Instructions
          </label>

          <div className="flex items-start border rounded-xl px-3 py-2 mt-1 bg-gray-50">
            <Clipboard size={16} className="text-gray-400 mr-2 mt-1" />
            <textarea
              rows={3}
              value={bookingDraft.parkingInstructions ?? ""}
              onChange={(e) =>
                setBookingDraft((d: any) => ({
                  ...d,
                  parkingInstructions: e.target.value,
                }))
              }
              className="w-full bg-transparent outline-none text-sm"
            />
          </div>
        </div>
      </Section>

      {/* ACTION */}
      <div className="flex justify-end">
        <button
          onClick={validateAndContinue}
          className="bg-[#0B2E28] text-white px-6 py-2 rounded-full text-sm"
        >
          Continue →
        </button>
      </div>

    </div>
  );
}

/* ---------------- UI HELPERS ---------------- */

function Section({ title, children }: any) {
  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold text-gray-800">{title}</h3>
      {children}
    </div>
  );
}

function Grid({ children }: any) {
  return <div className="grid grid-cols-1 md:grid-cols-2 gap-4">{children}</div>;
}

function Input({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  disabled = false,
}: any) {
  return (
    <div>
      <label className="mb-1 block text-xs font-medium text-gray-600">
        {label}
      </label>
      <input
        type={type}
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        className={`w-full rounded-xl border px-4 py-3 text-sm ${disabled
            ? "bg-gray-100 text-gray-500 cursor-not-allowed"
            : ""
          }`}
      />
    </div>
  );
}