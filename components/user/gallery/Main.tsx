"use client";

import { useEffect, useState } from "react";
import { getGallery } from "@/lib/user/gallery.api";
import { Sparkles } from "lucide-react";
import BeforeAfterCard from "@/components/ui/BeforeAterCard";
import api from "@/lib/user/axios";

type GalleryItem = {
  id: string;
  title: string;
  beforeImage: string;
  afterImage: string;
  service: {
    id: string;
    name: string;
  };
};

type Service = {
  id: string;
  name: string;
};

export default function BeforeAfterSection() {

  const [filters, setFilters] = useState<Service[]>([]);
  const [active, setActive] = useState<string | null>(null);

  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);

  /* ================================
     LOAD SERVICES (FILTER BUTTONS)
  ================================ */

  useEffect(() => {

    async function loadServices() {
      try {
        const res = await api.get("/gallery/services");
        setFilters(res.data);
      } catch (err) {
        console.error("Failed to load services", err);
      }
    }

    loadServices();

  }, []);

  /* ================================
     LOAD GALLERY ITEMS
  ================================ */

  useEffect(() => {

    setLoading(true);

    getGallery(active ?? undefined)
      .then(setItems)
      .catch(() => setItems([]))
      .finally(() => setLoading(false));

  }, [active]);

  return (
    <section className="bg-white py-24">

      <div className="mx-auto max-w-7xl px-6 text-center">

        {/* TITLE */}
        <h2 className="text-3xl font-semibold text-gray-900">
          Before & After
        </h2>

        {/* FILTER BUTTONS */}
        <div className="mt-6 flex justify-center gap-3 flex-wrap">

          {/* ALL */}
          <button
            onClick={() => setActive(null)}
            className={`rounded-full px-5 py-2 text-sm font-medium transition
            ${
              active === null
                ? "bg-emerald-500 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            All
          </button>

          {/* SERVICE FILTERS */}
          {filters.map((service) => (
            <button
              key={service.id}
              onClick={() => setActive(service.id)}
              className={`rounded-full px-5 py-2 text-sm font-medium transition
              ${
                active === service.id
                  ? "bg-emerald-500 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {service.name}
            </button>
          ))}

        </div>

        {/* GALLERY CONTENT */}
        <div className="mt-20">

          {loading ? (
            <p className="text-gray-400">Loading...</p>

          ) : items.length === 0 ? (

            <div className="flex flex-col items-center gap-4 text-gray-400">
              <Sparkles className="h-10 w-10" />
              <p className="text-sm">Gallery coming soon</p>
            </div>

          ) : (

            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">

              {items.map((item) => (
                <BeforeAfterCard key={item.id} item={item} />
              ))}

            </div>

          )}

        </div>

      </div>

    </section>
  );
}