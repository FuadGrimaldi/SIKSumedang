import React from "react";
import Breadcrumb from "../Breadchumb/Breadchumb";
import ServiceCard from "../Card/LayananCard";

interface LayananProps {
  nama_kecamatan?: string;
  kecamatanId?: number;
}

const LayananComp = ({ nama_kecamatan, kecamatanId }: LayananProps) => {
  const services = [
    {
      icon: "CardSim",
      title: "Layanan E-KTP, KK, Pindah, dan Lainnya",
      description:
        "Layanan administrasi kependudukan untuk kemudahan akses warga",
      link: "#",
    },
    {
      icon: "/assets/logo-fix/super-app-tahu.png",
      title: "Aplikasi Tahu Sumedang",
      description:
        "Aplikasi layanan publik terpadu untuk kemudahan akses informasi dan layanan di Sumedang",
      link: "https://tahu.sumedangkab.go.id/",
    },
    {
      icon: "MessageCircleCode",
      title: "Layanan Aspirasi dan Pengaduan Masyarakat",
      description:
        "Sampaikan aspirasi dan pengaduan Anda dengan mudah melalui layanan online kami",
      link: "/pengaduan-aspirasi",
    },
    {
      icon: "LineChart",
      title: "Dashboard Data Desa",
      description:
        "Akses data statistik dan informasi penting tentang desa Anda secara transparan",
      link: `https://e-officedesa.sumedangkab.go.id/dashboard_desa_cantik/kecamatan/${kecamatanId}`,
    },
  ];
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
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>

        {/* Breadcrumb */}
        <div className="relative z-10 flex flex-col w-full h-full pt-[100px] px-[31px] lg:px-[100px] py-2 text-white">
          <Breadcrumb
            links={[
              { to: "/", label: "Home" },
              { to: "#", label: "Layanan" },
            ]}
          />
          {/* Header */}
          <div className="relative mb-12">
            <h1 className="text-2xl lg:text-4xl font-bold text-white">
              Layanan
            </h1>
            <p className="text-white text-sm lg:text-lg mt-1 mb-2 font-medium">
              Layanan Kecamatan {nama_kecamatan}
            </p>
            <div className="lg:w-72 w-full h-1 bg-blue-600 rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Floating Content */}
      <div className="relative -mt-48 px-[31px] lg:px-[100px] py-2">
        <div className="bg-white rounded-2xl border py-12 px-3 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <div>
              {/* Cards Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {services.map((service, index) => (
                  <ServiceCard
                    key={index}
                    icon={service.icon}
                    title={service.title}
                    description={service.description}
                    link={service.link}
                  />
                ))}
              </div>
            </div>

            {/* Decorative Element */}
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
  );
};

export default LayananComp;
