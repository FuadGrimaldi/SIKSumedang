"use client";

import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Autoplay,
  EffectCoverflow,
} from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import Image from "next/image";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";

type Infografis = {
  id: number;
  kecamatan_id: number;
  title: string;
  gambar_path: string;
};

interface InfographicSliderProps {
  infografis?: Infografis[];
}

const InfographicSlider = ({ infografis }: InfographicSliderProps) => {
  const swiperRef = useRef<SwiperType>();

  if (!infografis || infografis.length === 0) {
    return (
      <div className={`infographic-slider bg-white  border border-gray-200`}>
        {/* Header Section */}
        <div className="flex items-center justify-between p-4 bg-blue-500 rounded-t-xl">
          <div>
            <h4 className="text-xl lg:text-2xl font-bold text-white mb-2">
              Infografis Kecamatan
            </h4>
            <p className="text-sm text-white">
              Informasi penting dalam bentuk visual yang mudah dipahami
            </p>
          </div>
        </div>
        <div className="p-6 text-center text-gray-500">
          Tidak ada infografis tersedia saat ini.
        </div>
      </div>
    );
  }

  return (
    <div className={`infographic-slider bg-white  border border-gray-200`}>
      {/* Header Section */}
      <div className="flex items-center justify-between p-4 bg-blue-500 rounded-t-xl">
        <div>
          <h4 className="text-xl lg:text-2xl font-bold text-white mb-2">
            Infografis Kecamatan
          </h4>
          <p className="text-sm text-white">
            Informasi penting dalam bentuk visual yang mudah dipahami
          </p>
        </div>
      </div>

      {/* Swiper Slider */}
      <div className="relative">
        <Swiper
          onBeforeInit={(swiper) => {
            swiperRef.current = swiper;
          }}
          modules={[Navigation, Pagination, Autoplay, EffectCoverflow]}
          spaceBetween={20}
          slidesPerView={1}
          effect="coverflow"
          coverflowEffect={{
            rotate: 15,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
          }}
          pagination={{
            clickable: true,
            bulletClass: "swiper-pagination-bullet custom-bullet",
            bulletActiveClass:
              "swiper-pagination-bullet-active custom-bullet-active",
          }}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          loop={infografis.length > 1}
          breakpoints={{
            640: { slidesPerView: 1, spaceBetween: 10 },
            768: { slidesPerView: 1, spaceBetween: 10 },
            1024: { slidesPerView: 1, spaceBetween: 10 },
          }}
          className="infographic-swiper"
        >
          {infografis.map((item) => (
            <SwiperSlide key={item.id}>
              <div className="group relative bg-white rounded-b-md overflow-hidden">
                {/* Image Container */}
                <div className="relative h-[420px] overflow-hidden ">
                  <Image
                    src={item.gambar_path}
                    alt={item.title}
                    fill
                    unoptimized
                    className="object-contain group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Pagination */}
        <div className="flex justify-center mt-6">
          <div className="swiper-pagination !relative !bottom-0"></div>
        </div>
      </div>

      {/* View All Link */}
      {/* Bottom Section */}
      <div className="flex items-center justify-between p-4">
        {/* Read More Button */}
        <a
          href={`/#`}
          className="inline-flex items-center px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 hover:border-blue-300 transition-all duration-200 group/btn"
        >
          Infografis Lainnya
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
    </div>
  );
};

export default InfographicSlider;
