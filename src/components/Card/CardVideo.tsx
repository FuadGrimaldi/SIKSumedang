"use client";

import Image from "next/image";
import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, X } from "lucide-react";

interface AllVideoData {
  kecamatanId: number;
}

export interface Video {
  id: number;
  desa_id: number;
  title: string;
  deskripsi: string;
  embed_url: string;
  categori: string;
  uploaded_at: Date;
  created_at: Date;
  updated_at: Date;
  thumbnail?: string; // ditambah
}

const ITEMS_PER_PAGE = 6;

const AllVideo = ({ kecamatanId }: AllVideoData) => {
  const [currentPage, setCurrentPage] = useState(1);
  // const [agendaData, setAgendaData] = useState<Agenda[]>([]);
  const [videosData, setVideosData] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<any>(null);

  const getYouTubeId = (url: string): string | null => {
    try {
      const parsedUrl = new URL(url);

      // short link youtu.be
      if (parsedUrl.hostname.includes("youtu.be")) {
        return parsedUrl.pathname.slice(1);
      }

      // standard watch?v=
      if (parsedUrl.hostname.includes("youtube.com")) {
        if (parsedUrl.searchParams.get("v")) {
          return parsedUrl.searchParams.get("v");
        }

        // embed link
        if (parsedUrl.pathname.startsWith("/embed/")) {
          return parsedUrl.pathname.split("/embed/")[1];
        }
      }

      return null;
    } catch (e) {
      return null;
    }
  };

  const handleVideoClick = (video) => {
    setSelectedVideo(video);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedVideo(null);
  };

  const featuredVideo = videosData[0]; // First video as featured

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

  // Update URL when page changes
  useEffect(() => {
    updateURL(currentPage);
  }, [currentPage, updateURL]);

  // Fetch agenda data from API
  const fetchVideos = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Fallback to general endpoint if specific doesn't exist
      const fallbackResponse = await fetch(
        `/api/videos/subdomain/${kecamatanId}`
      );
      if (!fallbackResponse.ok) {
        throw new Error("Failed to fetch agenda data");
      }
      const allData = await fallbackResponse.json();
      // Tambahkan thumbnail jika belum ada, berdasarkan embed_url atau url
      allData.forEach((video: any) => {
        const youtubeId = getYouTubeId(video.embed_url || video.url);
        if (youtubeId && !video.thumbnail) {
          video.thumbnail = `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`;
        }
      });

      setVideosData(allData);
    } catch (err: any) {
      setError(err.message);
      console.error("Error fetching agenda:", err);
      setVideosData([]);
    } finally {
      setLoading(false);
    }
  }, [kecamatanId]);

  // Fetch agendas when kecamatanId changes
  useEffect(() => {
    if (kecamatanId) {
      fetchVideos();
    } else {
      setLoading(false);
    }
  }, [kecamatanId, fetchVideos]);

  // Handle page change
  const handlePageChange = useCallback(
    (page: number) => {
      const totalPages = Math.ceil(videosData.length / ITEMS_PER_PAGE);
      if (page >= 1 && page <= totalPages) {
        setCurrentPage(page);
      }
    },
    [videosData.length]
  );

  // Generate page numbers for pagination
  const getPageNumbers = useCallback(() => {
    const totalPages = Math.ceil(videosData.length / ITEMS_PER_PAGE);
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
  }, [videosData.length, currentPage]);

  // Reset to page 1 when agenda data changes
  useEffect(() => {
    if (videosData.length > 0) {
      const totalPages = Math.ceil(videosData.length / ITEMS_PER_PAGE);
      if (currentPage > totalPages) {
        setCurrentPage(1);
      }
    }
  }, [videosData.length, currentPage]);

  // Calculate pagination values
  const totalPages = Math.ceil(videosData.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentItems = videosData.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  // Format waktu function
  const formatWaktu = (waktu: Date | string) => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "Asia/Jakarta",
      timeZoneName: "short",
    };

    const date = typeof waktu === "string" ? new Date(waktu) : waktu;

    // Check if date is valid
    if (isNaN(date.getTime())) {
      return "Waktu tidak valid";
    }

    return date.toLocaleString("id-ID", options).replace(/\./g, ":");
  };

  // Loading state
  if (loading) {
    return (
      <div>
        <p className="text-base text-gray-600 mb-8 text-center">
          Anda dapat menonton video dokumentasi, informasi, dan kegiatan di
          rancakalong secara langsung melalui halaman ini.
        </p>
        <div className="relative w-full lg:h-96 h-48 bg-gray-200 animate-pulse rounded-xl mb-8"></div>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className="relative w-full lg:h-64 h-48 bg-gray-200 animate-pulse rounded-xl"
            ></div>
          ))}
        </div>
      </div>
    );
  }

  // No data state
  if (currentItems.length === 0) {
    return (
      <div>
        <p className="text-base text-gray-600 mb-8 text-center">
          Anda dapat menonton video dokumentasi, informasi, dan kegiatan di
          rancakalong secara langsung melalui halaman ini.
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
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              Belum Ada Video
            </h3>
            <p className="text-gray-500">
              Tidak ada video yang tersedia untuk desa ini saat ini.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section>
      <div>
        <p className="text-base text-gray-600 mb-8 text-center">
          Anda dapat menonton video dokumentasi, informasi, dan kegiatan di
          rancakalong secara langsung melalui halaman ini.
        </p>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto">
              {/* Featured Video Section - Full Width */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-6"
              >
                <div
                  className="relative w-full h-96 rounded-2xl overflow-hidden cursor-pointer group shadow-xl"
                  onClick={() => handleVideoClick(featuredVideo)}
                >
                  <Image
                    src={
                      featuredVideo.thumbnail ||
                      "/assets/default/image-not-available.jpg"
                    }
                    alt={featuredVideo.title}
                    width={800}
                    height={450}
                    priority
                    unoptimized
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-30 transition-all duration-300" />

                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-red-600 rounded-full p-6 shadow-2xl group-hover:bg-red-500 transition-colors duration-300"
                    >
                      <Play
                        className="lg:w-12 lg:h-12 w-4 h-4 text-white ml-1"
                        fill="white"
                      />
                    </motion.div>
                  </div>

                  <div className="absolute top-4 left-4">
                    <span className="inline-block bg-red-600 text-white text-sm px-3 py-1 rounded-full font-medium">
                      {featuredVideo.categori}
                    </span>
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="bg-gradient-to-t from-black to-transparent absolute inset-0 -z-10" />
                    <h2 className="lg:text-2xl text-xl font-bold text-white mb-2">
                      {featuredVideo.title}
                    </h2>
                    <p className="text-gray-200 text-sm mb-2">
                      {featuredVideo.deskripsi}
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Video Cards Grid */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {currentItems.slice(1).map((video, index) => (
                  <motion.div
                    key={video.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="bg-white shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 rounded-xl overflow-hidden border border-gray-100 cursor-pointer group"
                    onClick={() => handleVideoClick(video)}
                  >
                    <div className="relative w-full h-48">
                      <Image
                        src={
                          video.thumbnail ||
                          "/assets/default/image-not-available.jpg"
                        }
                        width={400}
                        height={225}
                        alt={video.title}
                        priority
                        unoptimized
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300" />

                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          className="bg-red-600 rounded-full p-4 shadow-xl"
                        >
                          <Play
                            className="w-8 h-8 text-white ml-0.5"
                            fill="white"
                          />
                        </motion.div>
                      </div>

                      <div className="absolute top-3 left-3">
                        <span className="inline-block bg-red-600 text-white text-xs px-2 py-1 rounded-full font-medium">
                          {video.categori}
                        </span>
                      </div>
                    </div>

                    <div className="p-4">
                      <h3 className="text-lg font-bold mb-2 text-gray-800 line-clamp-2 group-hover:text-red-600 transition-colors duration-300">
                        {video.title}
                      </h3>

                      {video.deskripsi && (
                        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                          {video.deskripsi}
                        </p>
                      )}

                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <div className="flex items-center">
                          <Play className="w-3 h-3 mr-1" />
                          <span>Watch now</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {/* Modal for Video Player */}
              <AnimatePresence>
                {isModalOpen && selectedVideo && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4"
                    onClick={closeModal}
                  >
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.8, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="relative w-full max-w-4xl bg-black rounded-2xl overflow-hidden"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <button
                        onClick={closeModal}
                        className="absolute top-4 right-4 z-10 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-2 rounded-full transition-all duration-200"
                      >
                        <X className="w-6 h-6" />
                      </button>

                      <div
                        className="relative w-full"
                        style={{ paddingBottom: "56.25%" }}
                      >
                        <iframe
                          className="absolute inset-0 w-full h-full"
                          src={`https://www.youtube.com/embed/${getYouTubeId(
                            selectedVideo.embed_url
                          )}?autoplay=1`}
                          title={selectedVideo.title}
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      </div>

                      <div className="p-6 bg-gray-900 text-white">
                        <h3 className="text-xl font-bold mb-2">
                          {selectedVideo.title}
                        </h3>
                        <p className="text-gray-300 text-sm mb-3">
                          {selectedVideo.description}
                        </p>
                        <div className="flex items-center justify-between text-sm text-gray-400">
                          <span className="bg-red-600 text-white px-2 py-1 rounded-full text-xs">
                            {selectedVideo.category}
                          </span>
                          <div className="flex items-center space-x-4">
                            <span>{selectedVideo.duration}</span>
                            <span>{selectedVideo.views}</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>

        {/* Enhanced Pagination */}
        {totalPages > 1 && (
          <div className="flex flex-col items-center space-y-4 mt-8">
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
              {Math.min(startIndex + ITEMS_PER_PAGE, videosData.length)} of{" "}
              {videosData.length} agenda
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default AllVideo;
