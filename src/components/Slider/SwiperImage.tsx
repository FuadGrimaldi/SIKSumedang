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

const ImageSwiper = () => {
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000); // Simulate a 1-second loading time
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center lg:h-[550px] h-64">
        <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-16 w-16"></div>
      </div>
    );
  }
  // Sample data - replace with your actual data
  const destinations = [
    {
      id: 1,
      title: "Hajat Lembur",
      description:
        "Hajat Lembur merupakan sebuah tradisi syukuran masyarakat Sunda sebagai ungkapan rasa syukur kepada Sang Pencipta atas limpahan rezeki, keselamatan, dan keharmonisan hidup dalam komunitas",
      image: "/assets/rancakalong/hajat-lembur.jpg",
      location: `Rancakalong, Sumedang, Jawa Barat`,
      category: "tradisi",
      rating: 4.8,
      slug: "hajat-lembur",
    },
    {
      id: 2,
      title: "Ngalaksa",
      description:
        "upacara tradisional masyarakat Sunda yang dilaksanakan berhubungan dengan kesuburan lahan pertanian. Upacara ini merupakan ungkapan kepercayaan lokal masyarakatnya terhadap Nyi Pohaci dan Karuhun (roh-roh nenek moyang).",
      image: "/assets/rancakalong/Ngalaksa.jpg",
      location: `Rancakalong, Sumedang, Jawa Barat`,
      category: "Budaya",
      rating: 4.6,
      slug: "budaya",
    },
    {
      id: 3,
      title: "Geo Teater",
      description:
        "Geotheater Rancakalong menjadi destinasi wisata unggulan di Sumedang, yang diproyeksikan menjadi pusat budaya Sunda di Sumedang. Keberadaan Geotheater Rancakalong ditunjang dengan adanya exit Tol Cisumdawu yang tak jauh dari lokasi yaitu exit tol pamulihan.",
      image: "/assets/rancakalong/geoteater.jpg",
      location: `Rancakalong, sumedang, Jawa Barat`,
      category: "kesenian",
      rating: 4.7,
      slug: "geo-teater",
    },
    {
      id: 4,
      title: "Reak",
      description:
        "Seni reak buhun sudah ada sejak ratusan tahun lalu di Dusun Pasir, Desa Rancakalong, dan dianggap sebagai warisan leluhur yang masih dijaga hingga kini. Reak merupakan seni pertunjukkan yang menyatu dengan kuda, music renggong, dan ekspresi bunyi-bunyian khas. Nama Reak sendiri berasal dari ungkapan rame di eak-eak yang menggambarkan suasana ramai di jalan saat pertunjukkan berlangsung.",
      image: "/assets/rancakalong/reak.jpg",
      location: `Rancakalong, Sumedang, Jawa Barat`,
      category: "tradisi",
      rating: 4.5,
      slug: "tradisi-reak",
    },
    {
      id: 5,
      title: "Tarawangsa",
      description:
        "Tarawangsa telah menjadi salah satu ikon budaya Desa Rancakalong yang telah dikenal di kancahinternasional. Asal usul kesenian tarawangsa yang terdiri dari jentreng (semacam kacapi siter) dan ek-ek (semacam rebab, yang banyak dikenal dengan nama tarawangsa) secara historis memiliki beragam versi terkait awal mula kemunculannya. Menurut Pupung Sumpena (salah satu tokoh budaya) yang merupakan seorang praktisi tarawangsa, menyebutkan bahwa secara historis tarawangsa memang berasal dari Rancakalong,",
      image: "/assets/rancakalong/tarawangsa.jpg",
      location: `Rancakalong, Sumedang, Jawa Barat`,
      category: "tradisi",
      rating: 4.9,
      slug: "tradisi-tarawangsa",
    },
    {
      id: 6,
      title: "Desa Wisata Rancakalong",
      description:
        "Desa Wisata Rancakalong di Sumedang adalah sebuah destinasi yang memukau, menyajikan pesona alam pedesaan yang memesona dan kehidupan masyarakat yang kaya akan budaya. Terletak di tengah-tengah lanskap berbukit yang hijau, desa ini menawarkan pengalaman yang autentik bagi para pengunjung yang ingin merasakan kehidupan pedesaan yang damai dan tradisional.",
      image: "/assets/rancakalong/desa-wisata.png",
      location: `Rancakalong, Sumedang, Jawa Barat`,
      category: "Wisata",
      rating: 4.4,

      slug: "desa-wisata",
    },
  ];

  return (
    <div className="w-screen px-[31px] lg:px-[100px]">
      {/* Swiper */}
      <Swiper
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={"auto"}
        coverflowEffect={{
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
            slidesPerView: 1,
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
            slidesPerView: 1,
            spaceBetween: 15,
          },
        }}
      >
        {destinations.map((destination) => (
          <SwiperSlide key={destination.id} className="w-full mx-auto">
            <DestinationCard destination={destination} />
          </SwiperSlide>
        ))}

        {/* Custom Navigation Buttons */}
        <div className="swiper-button-prev-custom absolute left-1 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300 cursor-pointer group">
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
        <div className="swiper-button-next-custom absolute right-1 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300 cursor-pointer group">
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
    </div>
  );
};

export default ImageSwiper;
