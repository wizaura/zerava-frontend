"use client";

import ServiceAndAddOnsStep from "@/components/user/booking/Service";

export default function AdminServiceStep(props: any) {
  return (
    <div className="border border-gray-200 rounded-2xl p-6 bg-white space-y-8">

      <div>
        <h2 className="text-xl font-semibold">
          Service & Vehicle Selection
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Choose service, vehicle size and optional add-ons
        </p>
      </div>

      <ServiceAndAddOnsStep {...props} />

    </div>
  );
}