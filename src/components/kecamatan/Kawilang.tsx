"use client";
import React from "react";
import { Acara } from "@/types/Acara";
import { useState, useEffect, useCallback } from "react";
import { BlogCard } from "../Card/CardAcaraLanding";

interface AllBeritaProps {
  kecamatanId: number;
}

const Kawilang = ({ kecamatanId }: AllBeritaProps) => {
  const [acara, setAcara] = useState<Acara[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch acara by desa_id
  const fetchAcara = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // Gunakan endpoint khusus untuk desa dengan filter
      const res = await fetch(`/api/acara/subdomain/${kecamatanId}`);

      if (!res.ok) {
        throw new Error("Failed to fetch acara");
      }

      const data = await res.json();

      if (data.error) {
        setError(data.error);
        setAcara([]);
      } else {
        // Sort by published_at descending
        const sortedAcara = data.items
          .sort(
            (a: Acara, b: Acara) =>
              new Date(b.waktu).getTime() - new Date(a.waktu).getTime()
          )
          .filter(
            (acara: Acara) =>
              acara.status_acara === ("published" as Acara["status_acara"])
          );

        setAcara(sortedAcara);
      }
    } catch (error) {
      console.error("Error fetching acara:", error);
      setError("Gagal memuat acara");
      setAcara([]);
    } finally {
      setLoading(false);
    }
  }, [kecamatanId]);

  // Fetch acara when kecamatanId changes
  useEffect(() => {
    if (kecamatanId) {
      fetchAcara();
    } else {
      setLoading(false);
    }
  }, [kecamatanId, fetchAcara]);

  // Loading state
  if (loading) {
    return (
      <section className="pb-16">
        <div className="container mx-auto">
          <div className="text-center mb-6 w-full">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-black mb-4">
              Kawilang
            </h2>
            <p className="text-base text-gray-600">
              Kalender Wisata Seni dan Budaya di Kecamatan Rancakalong Sumedang
            </p>
          </div>
          <div className="flex justify-center items-center min-h-[200px]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <span className="ml-3 text-gray-500">Memuat Acara...</span>
          </div>
        </div>
      </section>
    );
  }
  // Get first 3 articles for main display
  const displayedKawilang = acara.slice(0, 8);

  return (
    <section>
      <div className="container mx-auto">
        <div className="text-center mb-6 w-full">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-black mb-4">
            Kawilang
          </h2>
          <p className="text-base text-gray-600">
            Kalender Wisata Seni dan Budaya Kecamatan Rancakalong Sumedang
          </p>
        </div>

        {!loading && displayedKawilang.length === 0 ? (
          // No articles state
          <div className="text-center py-4">
            <div className="w-full bg-gray-50 rounded-lg p-8 inline-block">
              <svg
                className="w-16 h-16 text-gray-400 mx-auto mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3v8m0 0V9a2 2 0 00-2-2H9m10 13a2 2 0 01-2-2V7a2 2 0 00-2-2H9a2 2 0 00-2 2v10a2 2 0 01-2 2h10z"
                />
              </svg>
              <h2 className="text-lg font-semibold text-gray-700 mb-2">
                Belum Ada Acara
              </h2>
              <p className="text-gray-500">
                Tidak ada acara yang tersedia untuk kecamatan ini saat ini.
              </p>
            </div>
          </div>
        ) : (
          <>
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="w-full mb-0 space-y-6 bg-white p-4 rounded-t-2xl border border-gray-200">
                <div>
                  <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    {displayedKawilang.map((acara) => (
                      <BlogCard key={acara.id} acara={acara} />
                    ))}
                  </div>
                  {/* Read More Button */}
                  <div className="mt-8">
                    <a
                      href={`/acara/`}
                      className="inline-flex items-center px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 hover:border-blue-300 transition-all duration-200 group/btn"
                    >
                      Lihat Semua Acara
                      <svg
                        className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform duration-200"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </a>
                  </div>
                  {/* Show All Button */}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Kawilang;
