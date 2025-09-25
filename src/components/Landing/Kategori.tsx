"use client";
import React, { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { KategoriArtikel } from "@/types/kategoriArtikel";
import {
  Earth,
  Newspaper,
  Users,
  MapPin,
  Calendar,
  FileText,
  Camera,
  Music,
} from "lucide-react";

export interface KategoriProps {
  kecamatanId: number;
}

// Icons mapping for different categories
const categoryIcons: { [key: string]: any } = {
  default: Earth,
  berita: Newspaper,
  politik: Users,
  ekonomi: MapPin,
  budaya: Music,
  olahraga: Calendar,
  teknologi: FileText,
  kesehatan: Camera,
};

export default function KategoriComp({ kecamatanId }: KategoriProps) {
  const [kategori, setKategori] = useState<KategoriArtikel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchKategori = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(
        `/api/articles/kategori/subdomain/${kecamatanId}`
      );
      if (!res.ok) throw new Error("Failed to fetch kategori");

      const data = await res.json();
      const filteredData = data.filter(
        (a: KategoriArtikel) =>
          a.nama.toLowerCase() !== "pengumuman" &&
          a.nama.toLowerCase() !== "berita"
      );
      setKategori(filteredData);
    } catch (err) {
      console.error("Error fetching kategori:", err);
      setError("Gagal memuat kategori");
      setKategori([]);
    } finally {
      setLoading(false);
    }
  }, [kecamatanId]);

  useEffect(() => {
    if (kecamatanId) {
      fetchKategori();
    } else {
      setLoading(false);
    }
  }, [fetchKategori, kecamatanId]);

  const getIconForCategory = (categoryName: string) => {
    const name = categoryName.toLowerCase();
    return categoryIcons[name] || categoryIcons.default;
  };

  if (loading) {
    return (
      <div className="w-full max-w-7xl mx-auto px-4">
        <div className="flex justify-center items-center min-h-[200px]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <span className="ml-3 text-gray-500">Memuat berita...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full max-w-7xl mx-auto px-4">
        <div className="bg-red-50 border border-red-200 rounded-2xl p-6 text-center">
          <p className="text-red-600 font-medium">{error}</p>
        </div>
      </div>
    );
  }

  if (kategori.length === 0) {
    return (
      <div className="w-full max-w-7xl mx-auto lg:px-4 px-0">
        {/* Header Section */}
        <div className="text-center mb-8">
          <p className="text-gray-600 max-w-2xl mx-auto">
            Jelajahi berbagai kategori artikel yang mencerminkan kekayaan budaya
            dan informasi Sunda
          </p>
        </div>

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
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              Belum Ada Kategori
            </h3>
            <p className="text-gray-500">
              Tidak ada Kategori yang tersedia untuk kecamatan ini saat ini.
            </p>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center space-x-2 text-gray-400">
            <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
            <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
            <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
            <span className="text-sm font-medium ml-2">
              Warisan Budaya Sunda
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto lg:px-4 px-0">
      {/* Header Section */}
      <div className="text-center mb-8">
        <p className="text-gray-600 max-w-2xl mx-auto">
          Jelajahi berbagai kategori artikel yang mencerminkan kekayaan budaya
          dan informasi Sunda
        </p>
      </div>

      {/* Category Grid */}
      <div className="space-y-6">
        {/* First rows with full grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {kategori
            .slice(0, Math.floor(kategori.length / 4) * 4)
            .map((kat, index) => {
              const IconComponent = getIconForCategory(kat.nama);
              return (
                <Link key={kat.id} href={`/artikel?kategori_id=${kat.id}`}>
                  <div className="bg-white hover:bg-blue-500 border border-gray-200 rounded-2xl px-4 py-3 transition-all duration-300 transform hover:scale-105 hover:shadow-lg group cursor-pointer flex items-center space-x-3">
                    {/* Icon */}
                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110">
                      <IconComponent className="w-7 h-7 text-gray-600 group-hover:text-blue-600" />
                    </div>
                    {/* Nama kategori */}
                    <h3 className="text-base font-semibold text-gray-800 group-hover:text-white transition-colors duration-300">
                      {kat.nama}
                    </h3>
                  </div>
                </Link>
              );
            })}
        </div>

        {/* Remaining items centered */}
        {kategori.length % 4 !== 0 && (
          <div className="flex justify-center">
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 ">
              {kategori
                .slice(Math.floor(kategori.length / 4) * 4)
                .map((kat, index) => {
                  const IconComponent = getIconForCategory(kat.nama);

                  return (
                    <Link key={kat.id} href={`/artikel?kategori_id=${kat.id}`}>
                      <div className="bg-white hover:bg-blue-500 border border-gray-200 rounded-2xl px-4 py-3 transition-all duration-300 transform hover:scale-105 hover:shadow-lg group cursor-pointer flex items-center space-x-3">
                        {/* Icon */}
                        <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110">
                          <IconComponent className="w-7 h-7 text-gray-600 group-hover:text-blue-600" />
                        </div>
                        {/* Nama kategori */}
                        <h3 className="lg:text-base text-md font-semibold text-gray-800 group-hover:text-white transition-colors duration-300">
                          {kat.nama}
                        </h3>
                      </div>
                    </Link>
                  );
                })}
            </div>
          </div>
        )}
      </div>

      {/* Decorative Elements */}
      <div className="mt-16 text-center">
        <div className="inline-flex items-center space-x-2 text-gray-400">
          <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
          <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
          <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
          <span className="text-sm font-medium ml-2">Warisan Budaya Sunda</span>
        </div>
      </div>
    </div>
  );
}
