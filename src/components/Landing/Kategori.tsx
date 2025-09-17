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
      const filteredData = data.filter((a: KategoriArtikel) => a.id !== 8);
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
    }
  }, [fetchKategori, kecamatanId]);

  const getIconForCategory = (categoryName: string) => {
    const name = categoryName.toLowerCase();
    return categoryIcons[name] || categoryIcons.default;
  };

  if (loading) {
    return (
      <div className="w-full max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-gray-200 rounded-3xl h-32 w-full"></div>
            </div>
          ))}
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
                <Link key={kat.id} href={`/artikel/${kat.nama.toLowerCase()}`}>
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
                    <Link
                      key={kat.id}
                      href={`/artikel/${kat.nama.toLowerCase()}`}
                    >
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
