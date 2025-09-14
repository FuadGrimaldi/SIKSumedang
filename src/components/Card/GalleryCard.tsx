"use client";

import Image from "next/image";
import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GalleryItem } from "@/types/gallery";

interface GaleriProps {
  kecamatanId: number;
}

const GalleryCard = ({ kecamatanId }: GaleriProps) => {
  const [galleryItems, setGalleryData] = useState<GalleryItem[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 6;
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);
  // Fetch gallery data from API
  const fetchGalleryData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `/api/gallery/subdomain/${kecamatanId}?page=${currentPage}&limit=${ITEMS_PER_PAGE}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch gallery data");
      }

      const data = await response.json();
      setGalleryData(data.items);
      setTotalItems(data.total);
    } catch (err: any) {
      setError(err.message);
      console.error("Error fetching gallery:", err);
      setGalleryData([]);
      setTotalItems(0);
    } finally {
      setLoading(false);
    }
  }, [kecamatanId, currentPage]);

  useEffect(() => {
    if (kecamatanId) {
      fetchGalleryData();
    } else {
      setGalleryData([]);
      setTotalItems(0);
      setLoading(false);
    }
  }, [fetchGalleryData, kecamatanId]);

  // Handle image click for lightbox
  const handleImageClick = (item: GalleryItem) => {
    setSelectedImage(item);
  };
  // Close lightbox
  const closeLightbox = () => {
    setSelectedImage(null);
  };

  // Loading state
  if (loading) {
    return (
      <div className="container">
        <div className="text-right mb-[35px]">
          <h1 className="lg:text-4xl text-2xl font-bold text-gray-800 mb-4">
            Galeri dan Infografis
          </h1>
          <p className="text-base text-gray-600 lg:w-[50%] w-[75%] justify-self-end">
            Temukan berbagai foto dan infografis menarik serta informasi penting
            dari kegiatan dan peristiwa di Kecamatan.
          </p>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
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

  if (galleryItems.length === 0) {
    return (
      <div className="container">
        <div className="text-right mb-[35px]">
          <h1 className="lg:text-4xl text-3xl font-bold text-gray-800 mb-4">
            Galeri dan Infografis
          </h1>
          <p className="text-base text-gray-600 lg:w-[50%] w-[75%] justify-self-end">
            Temukan berbagai foto dan infografis menarik serta informasi penting
            dari kegiatan dan peristiwa di Kecamatan.
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
              Belum Ada Galery
            </h3>
            <p className="text-gray-500">
              Tidak ada galeri yang tersedia untuk kecamatan ini saat ini.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Header Section */}
      <div className="text-right mb-[35px]">
        <h1 className="lg:text-4xl text-3xl font-bold text-gray-800 mb-4">
          Galeri dan Infografis
        </h1>
        <p className="text-base text-gray-600 lg:w-[50%] w-[75%] justify-self-end">
          Temukan berbagai foto dan infografis menarik serta informasi penting
          dari kegiatan dan peristiwa di Kecamatan.
        </p>
      </div>

      {/* Cards Grid */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full grid grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {galleryItems.slice(0, 8).map((item, index) => (
          <motion.div
            key={`${item.id}-${index}`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="group relative bg-white shadow-lg hover:shadow-xl hover:-translate-y-1 rounded-xl overflow-hidden cursor-pointer transition-all duration-300"
            onClick={() => handleImageClick(item)}
          >
            <div className="relative w-full lg:h-64 h-48">
              <Image
                src={item.image_url}
                alt={item.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
              />
            </div>

            {/* Overlay Gradient + Title */}
            <div className="absolute inset-0 flex items-end">
              <div className="w-full h-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:h-1/2 group-hover:opacity-100 transition-all duration-500 ease-in-out"></div>
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white opacity-0 translate-y-5 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-in-out">
                <h3 className="lg:text-lg text-[10px] font-bold line-clamp-2">
                  {item.title}
                </h3>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              className="relative max-w-4xl max-h-full"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={closeLightbox}
                className="absolute top-4 right-4 text-white bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-70 transition-colors z-10"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              <div className="relative">
                <Image
                  src={selectedImage.image_url}
                  alt={selectedImage.title}
                  width={600}
                  height={400}
                  className="object-contain"
                />

                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6 text-white">
                  <h3 className="text-xl font-bold mb-2">
                    {selectedImage.title}
                  </h3>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GalleryCard;
