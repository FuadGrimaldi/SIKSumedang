"use client";
import React, { useState, useEffect, useCallback } from "react";
import Breadcrumb from "../Breadchumb/Breadchumb";
import { motion } from "framer-motion";
import { Acara } from "@/types/Acara";
import CardNews from "../Card/NewsCard";
import { BlogCard } from "../Card/CardAcaraLanding";

interface LayananProps {
  nama_kecamatan?: string;
  kecamatanId?: number;
}

const ITEMS_PER_PAGE = 6;

const AcaraComp = ({ nama_kecamatan, kecamatanId }: LayananProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [acara, setAcara] = useState<Acara[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalItems, setTotalItems] = useState(0);
  const [error, setError] = useState<string | null>(null);

  // Fetch acara by kecamatan_id with pagination
  const fetchAcara = useCallback(async () => {
    if (!kecamatanId) return;

    setLoading(true);
    setError(null);
    try {
      const res = await fetch(
        `/api/acara/subdomain/${kecamatanId}?page=${currentPage}&limit=${ITEMS_PER_PAGE}`
      );
      if (!res.ok) throw new Error("Gagal memuat artikel");

      const data = await res.json();
      const sortedAcara = data.items.sort(
        (a: Acara, b: Acara) =>
          new Date(b.waktu).getTime() - new Date(a.waktu).getTime()
      );
      setAcara(sortedAcara);
      setTotalItems(data.total);
    } catch (err) {
      console.error("Error fetching acara:", err);
      setError("Gagal memuat artikel");
      setAcara([]);
      setTotalItems(0);
    } finally {
      setLoading(false);
    }
  }, [kecamatanId, currentPage]);

  // Fetch data ketika kecamatanId atau page berubah
  useEffect(() => {
    if (kecamatanId) {
      fetchAcara();
    } else {
      setLoading(false);
      setAcara([]);
      setTotalItems(0);
    }
  }, [kecamatanId, currentPage, fetchAcara]);

  // Initialize page from URL on component mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      const pageParam = urlParams.get("page");
      if (pageParam) {
        const pageNum = parseInt(pageParam);
        if (!isNaN(pageNum) && pageNum > 0) {
          setCurrentPage(pageNum);
        }
      }
    }
  }, []);

  // Function to update URL with page param
  const updateURL = useCallback((page: number) => {
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      if (page === 1) {
        url.searchParams.delete("page");
      } else {
        url.searchParams.set("page", page.toString());
      }
      window.history.pushState({}, "", url.toString());
    }
  }, []);

  // Update URL ketika page berubah
  useEffect(() => {
    updateURL(currentPage);
  }, [currentPage, updateURL]);

  // Handle page change
  const handlePageChange = useCallback(
    (page: number) => {
      const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
      if (page >= 1 && page <= totalPages) {
        setCurrentPage(page);
      }
    },
    [totalItems]
  );

  // Generate page numbers for pagination
  const getPageNumbers = useCallback(() => {
    const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
    const pageNumbers: number[] = [];
    const maxVisiblePages = 3;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      let start = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
      const end = Math.min(totalPages, start + maxVisiblePages - 1);

      if (end - start + 1 < maxVisiblePages) {
        start = Math.max(1, end - maxVisiblePages + 1);
      }

      for (let i = start; i <= end; i++) {
        pageNumbers.push(i);
      }
    }

    return pageNumbers;
  }, [totalItems, currentPage]);

  // Calculate pagination values
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;

  return (
    <div className="relative bg-white">
      {/* Hero Section */}
      <div
        className="relative overflow-hidden"
        style={{
          backgroundImage: 'url("/assets/background/bg-hero-3.jpg")',
          backgroundRepeat: "repeat",
          backgroundSize: "contain",
          backgroundPosition: "center",
          height: "450px",
        }}
      >
        <div className="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>

        <div className="relative z-10 flex flex-col w-full h-full pt-[100px] px-[31px] lg:px-[100px] py-2 text-white">
          <Breadcrumb
            links={[
              { to: "/", label: "Home" },
              { to: "#", label: "Acara" },
            ]}
          />
          <div className="relative mb-12">
            <h1 className="text-2xl lg:text-4xl font-bold text-white">Acara</h1>
            <p className="text-white text-sm lg:text-lg mt-1 mb-2 font-medium">
              Acara Kecamatan {nama_kecamatan}
            </p>
            <div className="lg:w-72 w-full h-1 bg-blue-600 rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Floating Content */}
      <div className="relative -mt-48 px-[31px] lg:px-[100px] py-2">
        <div className="bg-white rounded-2xl border pb-12 pt-8 px-3 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-black mb-4 text-center">
                Kalender Wisata Seni dan Budaya {nama_kecamatan} Sumedang
              </h2>
              <p className="text-base text-gray-600 mb-8 text-center">
                KAWILANG Menyajikan informasi terkini seputar acara dan kegiatan
                menarik di Kecamatan {nama_kecamatan}. Temukan berbagai acara
                budaya, seni, dan komunitas yang dapat Anda ikuti atau kunjungi.
              </p>
              {loading ? (
                <div className="w-full max-w-7xl mx-auto px-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[...Array(6)].map((_, i) => (
                      <div key={i} className="animate-pulse">
                        <div className="bg-gray-200 rounded-3xl h-40 w-full"></div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : acara.length === 0 ? (
                <>
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
                        Belum Ada Acara
                      </h3>
                      <p className="text-gray-500">
                        Tidak ada Acara yang tersedia untuk kecamatan ini saat
                        ini.
                      </p>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {/* Artikel */}
                  <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="w-full grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
                  >
                    {acara.map((acara) => (
                      <BlogCard key={acara.id} acara={acara} />
                    ))}
                  </motion.div>
                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="flex flex-col items-center space-y-4 mt-16">
                      <div className="flex items-center justify-center space-x-2">
                        {/* Previous Button */}
                        <button
                          onClick={() => handlePageChange(currentPage - 1)}
                          disabled={currentPage === 1}
                          className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white transition-colors"
                        >
                          <svg
                            className="w-4 h-4 mr-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M15 19l-7-7 7-7"
                            />
                          </svg>
                          Previous
                        </button>

                        {/* Page Numbers */}
                        <div className="flex space-x-1">
                          {getPageNumbers().map((pageNum) => (
                            <button
                              key={pageNum}
                              onClick={() => handlePageChange(pageNum)}
                              className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                                currentPage === pageNum
                                  ? "bg-blue-600 text-white shadow-sm"
                                  : "text-gray-700 bg-white border border-gray-300 hover:bg-gray-50"
                              }`}
                            >
                              {pageNum}
                            </button>
                          ))}
                        </div>

                        {/* Next Button */}
                        <button
                          onClick={() => handlePageChange(currentPage + 1)}
                          disabled={currentPage === totalPages}
                          className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white transition-colors"
                        >
                          Next
                          <svg
                            className="w-4 h-4 ml-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </button>
                      </div>

                      {/* Page Info */}
                      <div className="text-sm text-gray-600">
                        Showing {startIndex + 1} to{" "}
                        {Math.min(startIndex + ITEMS_PER_PAGE, totalItems)} of{" "}
                        {totalItems} Acara
                      </div>
                    </div>
                  )}
                </>
              )}
              <div className="mt-16 text-center">
                <div className="inline-flex items-center space-x-2 text-gray-400">
                  <div className="w-8 h-px bg-gray-600"></div>
                  <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
                  <div className="w-8 h-px bg-gray-600"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AcaraComp;
