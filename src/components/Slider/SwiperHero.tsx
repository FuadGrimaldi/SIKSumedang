// components/DestinationSwiper.js
"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  EffectCoverflow,
  Pagination,
  Autoplay,
  Navigation,
} from "swiper/modules";
import DestinationCard from "../Card/HeroSwiperCard";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Link from "next/link";

const DestinationSwiper = () => {
  // Sample data - replace with your actual data
  const destinations = [
    {
      id: 1,
      title: "Curug Cipeuteuy",
      description:
        "Air terjun eksotis dengan ketinggian 50 meter yang dikelilingi hutan tropis. Tempat yang sempurna untuk menikmati keindahan alam dan udara segar pegunungan.",
      image:
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      location: `sumedang, Jawa Barat`,
      category: "Air Terjun",
      rating: 4.8,
      price: 15000,
      features: ["Kolam Renang Alami", "Trekking"],
      slug: "curug-cipeuteuy",
    },
    {
      id: 2,
      title: "Kampung Wisata Budaya",
      description:
        "Kampung tradisional yang melestarikan budaya Sunda dengan berbagai atraksi budaya, kerajinan tangan, dan kuliner khas daerah yang autentik.",
      image:
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      location: `sumedang, Jawa Barat`,
      category: "Budaya",
      rating: 4.6,
      price: 25000,
      features: ["Workshop Kerajinan", "Pertunjukan Budaya"],
      slug: "kampung-wisata-budaya",
    },
    {
      id: 3,
      title: "Gunung Tampomas",
      description:
        "Gunung dengan pemandangan spektakuler dan jalur pendakian yang menantang. Cocok untuk para pecinta alam dan adventure yang mencari pengalaman mendaki.",
      image:
        "https://images.unsplash.com/photo-1571115764595-644a1f56a55c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      location: `sumedang, Jawa Barat`,
      category: "Gunung",
      rating: 4.7,
      price: null,
      features: ["Hiking Trail", "Sunrise View"],
      slug: "gunung-tampomas",
    },
    {
      id: 4,
      title: "Danau Situ Gede",
      description:
        "Danau alami yang tenang dengan pemandangan indah, ideal untuk rekreasi keluarga, memancing, atau sekadar menikmati ketenangan alam.",
      image:
        "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      location: `sumedang, Jawa Barat`,
      category: "Danau",
      rating: 4.5,
      price: 10000,
      features: ["Perahu Kayuh", "Area Piknik"],
      slug: "danau-situ-gede",
    },
    {
      id: 5,
      title: "Kebun Teh Ciater",
      description:
        "Perkebunan teh yang luas dengan pemandangan hijau membentang, dilengkapi dengan tur edukasi dan cafe dengan view panorama pegunungan.",
      image:
        "https://images.unsplash.com/photo-1563532659-4b1c2b9dc1a1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      location: `sumedang, Jawa Barat`,
      category: "Agrowisata",
      rating: 4.9,
      price: 20000,
      features: ["Tea Tasting", "Photo Spot"],
      slug: "kebun-teh-ciater",
    },
    {
      id: 6,
      title: "Pasar Tradisional",
      description:
        "Pasar tradisional dengan berbagai produk lokal, makanan khas, dan kerajinan tangan. Tempat terbaik untuk merasakan kehidupan lokal yang autentik.",
      image:
        "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      location: `sumedang, Jawa Barat`,
      category: "Kuliner",
      rating: 4.4,
      price: null,
      features: ["Makanan Lokal", "Oleh-oleh"],
      slug: "pasar-tradisional",
    },
  ];

  return (
    <div className="w-screen px-0">
      {/* Swiper */}
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={"auto"}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
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
        modules={[EffectCoverflow, Pagination, Autoplay, Navigation]}
        className="destination-swiper"
        breakpoints={{
          320: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          640: {
            slidesPerView: "auto",
            spaceBetween: 10,
          },
          768: {
            slidesPerView: "auto",
            spaceBetween: 12,
          },
          1024: {
            slidesPerView: 2,
            spaceBetween: 15,
          },
        }}
      >
        {destinations.map((destination) => (
          <SwiperSlide key={destination.id} className="w-full">
            <DestinationCard destination={destination} />
          </SwiperSlide>
        ))}

        {/* Custom Navigation Buttons */}
        <div className="swiper-button-prev-custom absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300 cursor-pointer group">
          <svg
            className="w-5 h-5 group-hover:scale-110 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </div>
        <div className="swiper-button-next-custom absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300 cursor-pointer group">
          <svg
            className="w-5 h-5 group-hover:scale-110 transition-transform"
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
        </div>
      </Swiper>

      {/* View All Button */}
      <div className="text-center mt-8">
        <Link
          href="/destinasi"
          className="inline-flex items-center bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-full font-semibold hover:bg-white/30 transition-all duration-300 transform hover:scale-105"
        >
          Lihat Semua Destinasi
          <svg
            className="w-4 h-4 ml-2"
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
        </Link>
      </div>
    </div>
  );
};

export default DestinationSwiper;
