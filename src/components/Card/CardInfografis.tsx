"use client";

import Image from "next/image";
import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Infografis = {
  id: number;
  kecamatan_id: number;
  title: string;
  gambar_path: string;
};

interface InfografisProps {
  kecamatan_id: number;
}

const ITEMS_PER_PAGE = 6;

const AllInfografis = ({ kecamatan_id }: InfografisProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [infografis, setInfografis] = useState<Infografis[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<Infografis | null>(null);

  // Fetch data
  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/infografis/subdomain/${kecamatan_id}`);
      if (!res.ok) throw new Error("Gagal fetch data");

      const data = await res.json();

      setInfografis(data);
      setError(null);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [kecamatan_id]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Pagination
  const totalItems = infografis.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedData = infografis.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Loading state
  if (loading) {
    return (
      <div>
        <p className="text-base text-gray-600 mb-8 text-center">
          Berikut adalah kumpulan infografis yang menampilkan data, informasi,
          dan visualisasi terkait Kecamatan ini. Silakan klik gambar untuk
          melihat detail lebih jelas.
        </p>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="relative w-full h-48 bg-gray-200 animate-pulse rounded-xl"
            ></div>
          ))}
        </div>
      </div>
    );
  }

  // No data state
  if (infografis.length === 0) {
    return (
      <div>
        <p className="text-base text-gray-600 mb-8 text-center">
          Berikut adalah kumpulan infografis yang menampilkan data, informasi,
          dan visualisasi terkait Kecamatan ini. Silakan klik gambar untuk
          melihat detail lebih jelas.
        </p>
        <div className="text-center py-12">
          <div className="bg-gray-50 rounded-lg p-8 inline-block">
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
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              Belum Ada Infografis
            </h3>
            <p className="text-gray-500">
              Tidak ada foto yang tersedia untuk desa ini saat ini.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section>
      <p className="text-base text-gray-600 mb-8 text-center">
        Berikut adalah kumpulan infografis yang menampilkan data, informasi, dan
        visualisasi terkait Kecamatan ini. Silakan klik gambar untuk melihat
        detail lebih jelas.
      </p>
      {/* Grid */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="grid grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {paginatedData.map((item) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="relative bg-white shadow-md hover:shadow-lg rounded-xl overflow-hidden cursor-pointer group"
            onClick={() => setSelectedImage(item)}
          >
            <div className="relative w-full lg:h-[350px] h-[200px]">
              <Image
                src={item.gambar_path}
                alt={item.title}
                fill
                unoptimized
                className="object-cover transition-transform duration-300 group-hover:scale-110"
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
              />
            </div>
            <div className="bg-black/50 p-2 pt-4 text-white text-sm truncate transition-colors duration-300 group-hover:bg-black/70">
              {item.title}
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center space-x-2 mt-6">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Prev
          </button>
          {Array.from({ length: totalPages }).map((_, idx) => {
            const pageNum = idx + 1;
            return (
              <button
                key={pageNum}
                onClick={() => handlePageChange(pageNum)}
                className={`px-3 py-1 border rounded ${
                  currentPage === pageNum
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-700"
                }`}
              >
                {pageNum}
              </button>
            );
          })}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="relative max-w-4xl max-h-full mt-[100px]"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 text-white bg-black/50 rounded-full p-2"
              >
                ✕
              </button>
              <Image
                src={selectedImage.gambar_path}
                alt={selectedImage.title}
                width={1000}
                height={800}
                unoptimized
                className="object-contain h-[500px] w-auto"
              />
              <div className="text-center text-white mt-4">
                <h3 className="text-xl font-bold">{selectedImage.title}</h3>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default AllInfografis;
