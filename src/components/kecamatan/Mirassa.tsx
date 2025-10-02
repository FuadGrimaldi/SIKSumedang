import React from "react";
import {
  FileText,
  Users,
  BarChart3,
  Database,
  ArrowRight,
  CheckCircle,
  Upload,
  Link,
  Settings,
} from "lucide-react";
import Image from "next/image";
import Breadcrumb from "../Breadchumb/Breadchumb";
interface SippadesProps {
  nama_kecamatan?: string;
}

const MirassaComp = ({ nama_kecamatan }: SippadesProps) => {
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
              { to: "#", label: "MIRASSA-RINSO KESGA" },
            ]}
          />
          {/* Header */}
          <div className="relative mb-12">
            <h1 className="text-2xl lg:text-4xl font-bold text-white">
              MIRASSA
            </h1>
            <p className="text-white text-sm lg:text-lg mt-1 mb-2 font-medium">
              Mikanyaah Rakyat Rancakalong sangkan Sehat Salawasna
            </p>
            <div className="w-80 h-1 bg-blue-600 rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Floating Content */}
      <div className="relative -mt-48 px-[31px] lg:px-[100px] py-2">
        <div className="bg-white rounded-2xl border py-12 px-3 lg:px-8 shadow-xl">
          <div className="max-w-5xl mx-auto">
            {/* Logo and Title Section */}
            <div className="flex flex-col lg:flex-row items-center lg:items-start mb-12 gap-6">
              {/* Logo */}
              <div className="flex justify-center lg:justify-start">
                <Image
                  src={"/assets/logo-fix/mirassa.png"}
                  alt="SIPPAdes Logo"
                  width={120}
                  height={120}
                  unoptimized
                  className="object-contain w-28 h-28 lg:w-40 lg:h-40"
                />
                <Image
                  src={"/assets/logo-fix/rinso-kesga.png"}
                  alt="SIPPAdes Logo"
                  width={120}
                  height={120}
                  unoptimized
                  className="object-contain w-28 h-28 lg:w-40 lg:h-40"
                />
              </div>

              {/* Title & Description */}
              <div className="text-center lg:text-left lg:pt-8 pt-0">
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
                  MIRASSA Melalui RINSO KESGA
                </h2>
                <p className="text-xl text-gray-600 mb-2">
                  Mikanyaah Rakyat Rancakalong sangkan Sehat Salawasna melalui
                  RINSO KESGA
                </p>
                <p className="text-lg text-blue-600 font-semibold">
                  Pemerintah Kecamatan {nama_kecamatan || "Rancakalong"}
                </p>
              </div>
            </div>

            {/* About Section */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-8 mb-12">
              <div className="flex items-center mb-6">
                <FileText className="w-8 h-8 text-blue-600 mr-3" />
                <h3 className="text-2xl font-bold text-gray-800">
                  Tentang MIRASSA melalui RINSO KESGA
                </h3>
              </div>
              <p className="text-gray-700 leading-relaxed mb-6">
                MIRASSA (Mikanyaah Rakyat Rancakalong Sangkan Sehat Salawasna)
                melalui RINSO KESGA adalah inovasi pelayanan kesehatan
                masyarakat berupa skrining deteksi dini penyakit menular maupun
                tidak menular, serta cek kesehatan gratis secara roadshow dengan
                sistem jemput bola di seluruh wilayah Puskesmas Rancakalong.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Program ini bertujuan meningkatkan derajat kesehatan masyarakat
                melalui pendekatan promotif, preventif, kuratif, dan
                rehabilitatif, serta mendorong kemandirian masyarakat dalam
                menjaga kesehatan dengan melibatkan lintas program dan sektor.
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <BarChart3 className="w-6 h-6 text-green-600" />
                </div>
                <h4 className="text-lg font-semibold text-gray-800 mb-3">
                  Akses Kesehatan Gratis
                </h4>
                <p className="text-gray-600">
                  Memberikan layanan cek kesehatan tanpa biaya kepada
                  masyarakat, termasuk deteksi dini penyakit menular dan tidak
                  menular.
                </p>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <h4 className="text-lg font-semibold text-gray-800 mb-3">
                  Pendekatan Holistik
                </h4>
                <p className="text-gray-600">
                  Mengintegrasikan aspek promotif, preventif, kuratif, dan
                  rehabilitatif dalam satu program terpadu untuk masyarakat.
                </p>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <Settings className="w-6 h-6 text-purple-600" />
                </div>
                <h4 className="text-lg font-semibold text-gray-800 mb-3">
                  Roadshow Interaktif
                </h4>
                <p className="text-gray-600">
                  Format roadshow yang tidak hanya pemeriksaan, tetapi juga
                  edukasi, konsultasi langsung, dan pemberdayaan masyarakat
                  berbasis komunitas.
                </p>
              </div>
            </div>

            {/* Benefits Section */}
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  Manfaat RINSO KESGA
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-1 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">
                      Memfasilitasi deteksi dini penyakit untuk percepatan
                      penanganan dan pengobatan.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-1 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">
                      Meningkatkan pengetahuan masyarakat tentang pola hidup
                      sehat dan pencegahan penyakit.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-1 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">
                      Mengurangi beban ekonomi masyarakat terkait biaya
                      kesehatan.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-1 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">
                      Mendorong partisipasi aktif masyarakat dalam menjaga
                      kesehatan komunitas.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl p-6 text-white">
                <h4 className="text-xl font-bold mb-4">Dampak Inovasi</h4>
                <p className="mb-6">
                  Inovasi MIRASSA melalui RINSO KESGA berkontribusi pada
                  penurunan angka kematian ibu dan bayi, peningkatan deteksi
                  dini penyakit, serta peningkatan kualitas hidup masyarakat di
                  Kecamatan Rancakalong.
                </p>
                <div className="bg-white/20 rounded-lg p-4">
                  <p className="text-sm">
                    <strong>Puskesmas Rancakalong</strong>
                    <br />
                    Skrining Roadshow Cek Kesehatan Gratis
                  </p>
                </div>
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

export default MirassaComp;
