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

const SiperahuComp = ({ nama_kecamatan }: SippadesProps) => {
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
              { to: "#", label: "SIPERAHU" },
            ]}
          />
          {/* Header */}
          <div className="relative mb-12">
            <h1 className="text-2xl lg:text-4xl font-bold text-white">
              SIPERAHU
            </h1>
            <p className="text-white text-sm lg:text-lg mt-1 mb-2 font-medium">
              Sistem Penilaian Kinerja Paruh Waktu
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
                  src={"/assets/logo-fix/siperahu.png"}
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
                  SIPERAHU
                </h2>
                <p className="text-xl text-gray-600 mb-2">
                  Sistem Penilaian Kinerja Paruh Waktu
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
                  Tentang SIPERAHU
                </h3>
              </div>
              <p className="text-gray-700 leading-relaxed mb-6">
                SIPERAHU (Sistem Penilaian Kinerja Paruh Waktu) adalah sebuah
                inovasi yang memanfaatkan teknologi digital sederhana seperti
                Google Forms dan Google Spreadsheet untuk merekap absensi dan
                laporan kinerja pegawai P3K Paruh Waktu yang dilaksanakan selama
                5 hari kerja.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Sistem ini dirancang agar tim penilai dan pimpinan dapat
                mengetahui data absensi serta laporan kinerja masing-masing
                pegawai secara digital, sekaligus menjadi bahan evaluasi untuk
                perbaikan kinerja serta memberikan umpan balik yang konstruktif.
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <BarChart3 className="w-6 h-6 text-green-600" />
                </div>
                <h4 className="text-lg font-semibold text-gray-800 mb-3">
                  Absensi & Laporan Terpusat
                </h4>
                <p className="text-gray-600">
                  Merekam absensi dan laporan kinerja pegawai P3K Paruh Waktu
                  dalam satu sistem digital yang terintegrasi.
                </p>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <h4 className="text-lg font-semibold text-gray-800 mb-3">
                  Akses Digital
                </h4>
                <p className="text-gray-600">
                  Pegawai dan tim penilai dapat mengisi serta mengakses
                  informasi secara cepat melalui Google Form yang terhubung ke
                  spreadsheet.
                </p>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <Settings className="w-6 h-6 text-purple-600" />
                </div>
                <h4 className="text-lg font-semibold text-gray-800 mb-3">
                  Teknologi Sederhana
                </h4>
                <p className="text-gray-600">
                  Menggunakan Google Forms dan Google Spreadsheet sehingga mudah
                  digunakan dan diakses oleh semua pegawai.
                </p>
              </div>
            </div>

            {/* Workflow Section */}
            <div className="bg-gray-50 rounded-xl p-8 mb-12">
              <div className="flex items-center mb-6">
                <ArrowRight className="w-8 h-8 text-green-600 mr-3" />
                <h3 className="text-2xl font-bold text-gray-800">
                  Alur Pengisian SIPERAHU
                </h3>
              </div>

              <div className="space-y-6">
                {/* Step 1 */}
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                    1
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800 mb-2">
                      Link dan Identitas
                    </h4>
                    <p className="text-gray-600">
                      Pegawai P3K Paruh Waktu menerima tautan Google Form,
                      kemudian mengisi nama, jabatan, dan nomor WhatsApp aktif.
                    </p>
                    <div className="flex items-center mt-2">
                      <Link className="w-4 h-4 text-blue-600 mr-2" />
                      <span className="text-sm text-blue-600">
                        Akses melalui Google Forms
                      </span>
                    </div>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold">
                    2
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800 mb-2">
                      Pengisian Formulir
                    </h4>
                    <p className="text-gray-600">
                      Pegawai mengisi pertanyaan sesuai arahan yang tertera
                      dalam formulir Google Form dengan benar dan lengkap.
                    </p>
                    <div className="flex items-center mt-2">
                      <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                      <span className="text-sm text-green-600">
                        Sesuai instruksi dalam form
                      </span>
                    </div>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold">
                    3
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800 mb-2">
                      Penilaian Perilaku
                    </h4>
                    <p className="text-gray-600">
                      Setelah pengisian formulir utama, pegawai diarahkan untuk
                      melakukan penilaian perilaku rekan kerja sesuai instruksi.
                    </p>
                  </div>
                </div>

                {/* Step 4 */}
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold">
                    4
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800 mb-2">
                      Upload Dokumentasi
                    </h4>
                    <p className="text-gray-600">
                      Unggah file dokumentasi penilaian kinerja sebagai bukti
                      dan penguatan data laporan kinerja.
                    </p>
                    <div className="flex items-center mt-2">
                      <Upload className="w-4 h-4 text-indigo-600 mr-2" />
                      <span className="text-sm text-indigo-600">
                        Upload file dokumentasi
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Benefits Section */}
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  Manfaat SIPERAHU
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-1 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">
                      Rekap absensi dan laporan kinerja pegawai P3K Paruh Waktu
                      secara digital
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-1 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">
                      Akses cepat bagi pimpinan dan tim penilai dalam evaluasi
                      kinerja pegawai
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-1 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">
                      Memudahkan pemberian umpan balik dan intervensi yang tepat
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-1 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">
                      Meningkatkan transparansi dan akuntabilitas penilaian
                      kinerja pegawai
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl p-6 text-white">
                <h4 className="text-xl font-bold mb-4">
                  Sistem Penilaian Terpadu
                </h4>
                <p className="mb-6">
                  SIPERAHU tidak hanya merekap absensi dan laporan kinerja,
                  tetapi juga memberikan dasar evaluasi untuk perbaikan kinerja
                  pegawai P3K Paruh Waktu di Kecamatan Rancakalong.
                </p>
                <div className="bg-white/20 rounded-lg p-4">
                  <p className="text-sm">
                    <strong>Pemerintah Kecamatan Rancakalong</strong>
                    <br />
                    Sistem Penilaian Kinerja Paruh Waktu
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

export default SiperahuComp;
