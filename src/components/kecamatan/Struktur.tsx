import React from "react";
import Breadcrumb from "../Breadchumb/Breadchumb";
import Image from "next/image";
import { BookOpen, Eye, FunctionSquare } from "lucide-react";

interface strukturProps {
  subdomain?: string;
  nama_kecamatan?: string;
}

const StrukturComp = ({ subdomain, nama_kecamatan }: strukturProps) => {
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
              { to: "#", label: "Struktur Organisasi & Tupoksi" },
            ]}
          />
          {/* Header */}
          <div className="relative mb-12">
            <h1 className="text-2xl lg:text-4xl font-bold text-white">
              Struktur Organisasi & Tupoksi
            </h1>
            <p className="text-white text-sm lg:text-lg mt-1 mb-2 font-medium">
              Kecamatan {nama_kecamatan}
            </p>
            <div className="w-80 h-1 bg-blue-600 rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Floating Content */}
      <div className="relative -mt-48 px-[31px] lg:px-[100px] py-2">
        <div className="bg-white rounded-2xl border py-12 px-3 lg:px-8">
          <div className="max-w-5xl mx-auto h-auto">
            <div className="">
              <Image
                src={"/assets/default/struktur-kec.jpg"}
                alt="struktur-kecamatan"
                width={400}
                height={400}
                unoptimized
                className="mx-auto w-full h-auto object-cover rounded-lg"
              />
            </div>
            <div className="bg-white rounded-xl transition-shadow duration-300 py-4">
              <div className="flex items-center mb-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                  <Eye className="w-4 h-4 text-blue-600" />
                </div>
                <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">
                  Tugas Pokok
                </h2>
              </div>
              <div className="pl-12">
                <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                  Bertugas membantu Bupati dalam merumuskan, menetapkan,
                  mengoordinasikan, dan membina pelaksanaan kegiatan
                  pemerintahan, pembangunan, serta pelayanan masyarakat di
                  tingkat kecamatan.
                </p>
              </div>
            </div>
            <div className="bg-white rounded-xl transition-shadow duration-300 py-4">
              <div className="flex items-center mb-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                  <FunctionSquare className="w-4 h-4 text-blue-600" />
                </div>
                <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">
                  Fungsi Utama
                </h2>
              </div>
              <div className="pl-12">
                <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                  1. Perencanaan & Pelaporan – menyusun rencana, program,
                  anggaran, serta laporan kegiatan kecamatan.
                  <br />
                  2. Koordinasi Program & Kegiatan – mengoordinasikan
                  pelaksanaan urusan pemerintahan, pembangunan, dan pelayanan
                  publik.
                  <br />
                  3. Kebijakan Teknis – menetapkan petunjuk teknis, SOP layanan,
                  serta kebijakan administrasi, kepegawaian, kearsipan, dan aset
                  daerah di tingkat kecamatan.
                  <br />
                  4. Pemerintahan Umum – menyelenggarakan urusan pemerintahan
                  umum, ketenteraman dan ketertiban, penegakan Perda/Perbup,
                  serta koordinasi dengan instansi terkait.
                  <br />
                  5. Pemberdayaan Masyarakat – membina partisipasi masyarakat,
                  pengembangan ekonomi, serta kelembagaan sosial.
                  <br />
                  6. Pelayanan Publik – menyelenggarakan pelayanan administrasi
                  kependudukan, pertanahan, perizinan tertentu, dan layanan umum
                  lainnya.
                  <br />
                  7. Pembinaan Desa/Kelurahan – membina dan mengawasi
                  penyelenggaraan pemerintahan desa/kelurahan sesuai aturan.
                  <br />
                  8. Pemeliharaan Sarana & Fasilitasi Layanan Umum –
                  mengoordinasikan prasarana dan fasilitas pelayanan publik di
                  wilayah kecamatan.
                  <br />
                  9. Fungsi Tambahan – melaksanakan urusan pemerintahan
                  kabupaten yang tidak ditangani perangkat daerah lain di
                  kecamatan.
                  <br />
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              <div
                className={`bg-white hover:bg-blue-500 border border-gray-200 rounded-2xl p-6 transition-all duration-300 transform hover:scale-105 hover:shadow-lg group cursor-pointer`}
              >
                {/* Icon with animated background */}
                <div
                  className={`w-12 h-12 bg-white hover:bg-gray-100 rounded-full flex items-center justify-center transition-all duration-300`}
                >
                  <BookOpen className="w-7 h-7 text-blue-500 group-hover:text-blue-700 transition-colors duration-300" />
                </div>

                {/* Content */}
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-white transition-colors duration-300">
                    PERBUP Kab.Sumedang Nomor 197 Tahun 2021
                  </h3>
                  <p className="text-gray-600 group-hover:text-white text-sm leading-relaxed line-clamp-2">
                    Peraturan Bupati ini tentang Uraian Tugas Jabatan Struktural
                    Pada Kecamatan. Muatannya berisi Ketentuan Umum, Tugas Umum
                    Jabatan, Tugas Pokok dan Uraian Tugas, Ketentuan Penutup
                  </p>
                </div>

                {/* Link */}
                <a
                  href={
                    "https://peraturan.bpk.go.id/Details/218482/perbup-kab-sumedang-no-197-tahun-2021"
                  }
                  className="inline-flex items-center text-blue-500 font-medium text-sm group-hover:text-white transition-colors duration-300"
                >
                  Selengkapnya
                  <svg
                    className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform duration-300"
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

export default StrukturComp;
