import React from "react";
import Breadcrumb from "../Breadchumb/Breadchumb";
import AllInfografis from "../Card/CardInfografis";

interface InfografisProps {
  kecamatanId: number;
  nama_kecamatan?: string;
}

const InfografisComp = ({ kecamatanId, nama_kecamatan }: InfografisProps) => {
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
              { to: "#", label: "Infografis" },
            ]}
          />
          {/* Header */}
          <div className="relative mb-12">
            <h1 className="text-2xl lg:text-4xl font-bold text-white">
              Infografis
            </h1>
            <p className="text-white text-sm lg:text-lg mt-1 mb-2 font-medium">
              Infografis Kecamatan {nama_kecamatan}
            </p>
            <div className="w-80 h-1 bg-blue-600 rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Floating Content */}
      <div className="relative -mt-48 px-[31px] lg:px-[100px] py-2">
        <div className="bg-white rounded-2xl border py-12 px-3 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <div>
              <AllInfografis kecamatan_id={kecamatanId} />
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

export default InfografisComp;
