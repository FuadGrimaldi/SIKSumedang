// components/DestinationSwiper.tsx
"use client";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  EffectCoverflow,
  Pagination,
  Autoplay,
  Navigation,
} from "swiper/modules";
import DestinationCard from "../Card/HeroSwiperCard";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Image from "next/image";

export interface FrontImage {
  id: number;
  kecamatan_id: number;
  title: string;
  lokasi: string;
  gambar_path: string;
  created_at: string;
  updated_at: string;
}

interface DestinationSwiperProps {
  kecamatanId: number; // biar bisa dynamic
}

const DestinationSwiper = ({ kecamatanId }: DestinationSwiperProps) => {
  const [loading, setLoading] = useState(true);
  const [images, setImages] = useState<FrontImage[]>([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await fetch(`/api/foto-unggulan/subdomain/${kecamatanId}`);
        if (!res.ok) throw new Error("Gagal mengambil data");
        const data: FrontImage[] = await res.json();
        setImages(data);
      } catch (error) {
        console.error("Error fetch images:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, [kecamatanId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center lg:h-[550px] h-64">
        <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-16 w-16"></div>
      </div>
    );
  }

  if (images.length === 0) {
    return (
      <div className="w-screen px-[31px] lg:px-[100px]">
        <div className="relative group rounded-2xl shadow-xl overflow-hidden">
          {/* Image */}
          <div className="relative lg:h-[550px] h-64 w-full">
            <Image
              src="/assets/default/front-image.jpg"
              alt="Default Image"
              fill
              unoptimized={true}
              className="object-cover transform transition-transform duration-500 group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />

            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>

            {/* Content inside image */}
            <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
              {/* Location */}
              <div className="flex items-center lg:text-sm text-[10px] lg:mb-2 mb-1 opacity-90">
                <svg
                  className="w-4 h-4 mr-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <span>Kabupaten Sumedang</span>
              </div>

              {/* Title */}
              <h3 className="lg:text-lg text-sm font-bold lg:mb-2 mb-0 group-hover:text-yellow-400 transition-colors">
                Pesona Sumedang
              </h3>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-screen px-[31px] lg:px-[100px]">
      <Swiper
        grabCursor={true}
        slidesPerView={1}
        pagination={{ clickable: true, dynamicBullets: true }}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        navigation={{
          nextEl: ".swiper-button-next-custom",
          prevEl: ".swiper-button-prev-custom",
        }}
        loop={true}
        modules={[Pagination, Autoplay, Navigation]}
        className="destination-swiper"
        breakpoints={{
          320: { slidesPerView: 1, spaceBetween: 10 },
          640: { slidesPerView: 1, spaceBetween: 10 },
          768: { slidesPerView: 1, spaceBetween: 12 },
          1024: { slidesPerView: 1, spaceBetween: 15 },
        }}
      >
        {images.map((img) => (
          <SwiperSlide key={img.id} className="w-full mx-auto">
            <DestinationCard
              destination={{
                id: img.id,
                title: img.title,
                description: "", // API tidak ada deskripsi
                image: img.gambar_path,
                location: img.lokasi,
                category: "",
                rating: 0,
                slug: "",
              }}
            />
          </SwiperSlide>
        ))}
        {/* Custom Navigation Buttons */}{" "}
        <div className="swiper-button-prev-custom absolute left-1 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300 cursor-pointer group">
          {" "}
          <svg
            className="w-5 h-5 group-hover:scale-110 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {" "}
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />{" "}
          </svg>{" "}
        </div>{" "}
        <div className="swiper-button-next-custom absolute right-1 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300 cursor-pointer group">
          {" "}
          <svg
            className="w-5 h-5 group-hover:scale-110 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {" "}
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />{" "}
          </svg>{" "}
        </div>
      </Swiper>
    </div>
  );
};

export default DestinationSwiper;
