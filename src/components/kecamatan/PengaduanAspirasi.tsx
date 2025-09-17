"use client";
import React, { useState, useEffect } from "react";
import Breadcrumb from "../Breadchumb/Breadchumb";
import {
  MessageCircle,
  FileText,
  Inbox,
  Send,
  User,
  Mail,
  Phone,
  AlertCircle,
  CheckCircle,
  Clock,
} from "lucide-react";
import { motion } from "framer-motion";
import LaporCard from "../Card/LaporCard";

interface PengaduanAspirasi {
  id: number;
  desa_id: number;
  name: string;
  email: string;
  no_telp: string;
  pesan: string;
  kategori: string;
  status: string;
  created_at: Date;
  updated_at: Date;
}

interface StatusCount {
  pending: number;
  approved: number;
  rejected: number;
}

interface FormData {
  name: string;
  email: string;
  no_telp: string;
  pesan: string;
  kategori: string;
}

interface Stats {
  total: number;
  pengaduan: number;
  aspirasi: number;
  pengaduanStatus: StatusCount;
  aspirasiStatus: StatusCount;
}

interface PengaduanAspirasiProps {
  kecamatanId?: number;
  nama_kecamatan?: string;
}

const PengaduanAspirasiComp = ({
  kecamatanId,
  nama_kecamatan,
}: PengaduanAspirasiProps) => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [stats, setStats] = useState<Stats>({
    total: 0,
    pengaduan: 0,
    aspirasi: 0,
    pengaduanStatus: { pending: 0, approved: 0, rejected: 0 },
    aspirasiStatus: { pending: 0, approved: 0, rejected: 0 },
  });
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [submitSuccess, setSubmitSuccess] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    no_telp: "",
    pesan: "",
    kategori: "pengaduan",
  });
  // Fetch statistics
  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `/api/pengaduan-aspirasi/subdomain/${kecamatanId}`
        );
        if (response.ok) {
          const data: PengaduanAspirasi[] = await response.json();

          const pengaduanItems = data.filter(
            (item) => item.kategori === "pengaduan"
          );
          const aspirasiItems = data.filter(
            (item) => item.kategori === "aspirasi"
          );

          const countStatus = (items: PengaduanAspirasi[]): StatusCount => ({
            pending: items.filter((i) => i.status === "pending").length,
            approved: items.filter((i) => i.status === "approved").length,
            rejected: items.filter((i) => i.status === "rejected").length,
          });

          setStats({
            total: data.length,
            pengaduan: pengaduanItems.length,
            aspirasi: aspirasiItems.length,
            pengaduanStatus: countStatus(pengaduanItems),
            aspirasiStatus: countStatus(aspirasiItems),
          });
        }
      } catch (err) {
        console.error("Error fetching stats:", err);
        setStats({
          total: 0,
          pengaduan: 0,
          aspirasi: 0,
          pengaduanStatus: { pending: 0, approved: 0, rejected: 0 },
          aspirasiStatus: { pending: 0, approved: 0, rejected: 0 },
        });
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [kecamatanId]);

  // Handle form input changes
  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async () => {
    setSubmitting(true);
    setError(null);

    try {
      const response = await fetch("/api/pengaduan-aspirasi", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          kecamatan_id: kecamatanId,
        }),
      });

      if (response.ok) {
        setSubmitSuccess(true);
        setFormData({
          name: "",
          email: "",
          no_telp: "",
          pesan: "",
          kategori: "",
        });

        // Refresh stats
        const statsResponse = await fetch(
          `/api/pengaduan-aspirasi/subdomain/${kecamatanId}`
        );
        if (statsResponse.ok) {
          const data: PengaduanAspirasi[] = await statsResponse.json();
          const pengaduanCount = data.filter(
            (item) => item.kategori === "pengaduan"
          ).length;
          const aspirasiCount = data.filter(
            (item) => item.kategori === "aspirasi"
          ).length;

          setStats({
            total: data.length,
            pengaduan: pengaduanCount,
            aspirasi: aspirasiCount,
            pengaduanStatus: stats.pengaduanStatus,
            aspirasiStatus: stats.aspirasiStatus,
          });
        }

        setTimeout(() => setSubmitSuccess(false), 5000);
      } else {
        throw new Error("Failed to submit");
      }
    } catch (err) {
      setError("Gagal mengirim pengaduan/aspirasi. Silakan coba lagi.");
    } finally {
      setSubmitting(false);
    }
  };

  const statsCards = [
    {
      title: "Total Kotak Masuk",
      value: stats.total,
      icon: <Inbox className="w-8 h-8" />,
      color: "bg-blue-500",
      lightColor: "bg-blue-50 ",
    },
    {
      title: "Pengaduan",
      value: stats.pengaduan,
      icon: <AlertCircle className="w-8 h-8" />,
      color: "bg-red-500",
      lightColor: "bg-red-50 ",
      status: stats.pengaduanStatus,
    },
    {
      title: "Aspirasi",
      value: stats.aspirasi,
      icon: <MessageCircle className="w-8 h-8" />,
      color: "bg-green-500",
      lightColor: "bg-green-50 ",
      status: stats.aspirasiStatus,
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
              { to: "#", label: "Pengaduan dan Aspirasi" },
            ]}
          />
          {/* Header */}
          <div className="relative mb-12">
            <h1 className="text-2xl lg:text-4xl font-bold text-white">
              Pengaduan & Aspirasi
            </h1>
            <p className="text-white text-sm lg:text-lg mt-1 mb-2 font-medium">
              Berikan pengaduan dan aspirasi Anda kepada kami
            </p>
            <div className="lg:w-96 w-full h-1 bg-blue-600 rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Floating Content */}
      <div className="relative -mt-48 px-[31px] lg:px-[100px] py-2">
        <div className="bg-white rounded-2xl border py-12 px-3 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="">
              <div className="container mx-auto px-4">
                <div className="mb-6 w-full border-b-2 border-gray-200">
                  <div className="mb-6 text-center max-w-xl mx-auto">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-black mb-4">
                      Dashboard Pengaduan & Aspirasi Kecamatan {nama_kecamatan}
                    </h2>
                    <p className="text-base text-gray-600 dark:text-gray-400">
                      Silahkan ajukan pengaduan dan aspirasi dengan isi form di
                      bawah ini.
                    </p>
                  </div>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="w-full"
                >
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    {statsCards.map((card, index) => (
                      <motion.div
                        key={card.title}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className={`${card.lightColor} rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col h-full`}
                      >
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex-1">
                            <div className="text-gray-600 dark:text-gray-400 text-sm font-medium mb-1">
                              {card.title}
                            </div>
                            <div className="text-3xl font-bold text-gray-900 dark:text-white">
                              {loading ? (
                                <div className="animate-pulse bg-gray-300 dark:bg-gray-700 h-8 w-12 rounded"></div>
                              ) : (
                                card.value
                              )}
                            </div>
                          </div>
                          <div
                            className={`flex-shrink-0 ${card.color} text-white p-3 rounded-lg flex items-center justify-center`}
                          >
                            {card.icon}
                          </div>
                        </div>

                        {/* Jika ada status breakdown */}
                        {card.status && (
                          <div className="flex flex-col gap-1 mt-auto">
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-gray-600 dark:text-gray-400">
                                Pending:
                              </span>
                              <span className="font-semibold">
                                {card.status.pending}
                              </span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-gray-600 dark:text-gray-400">
                                Approved:
                              </span>
                              <span className="font-semibold">
                                {card.status.approved}
                              </span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-gray-600 dark:text-gray-400">
                                Rejected:
                              </span>
                              <span className="font-semibold">
                                {card.status.rejected}
                              </span>
                            </div>
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </div>

                  {/* Success Message */}
                  {submitSuccess && (
                    <motion.div
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mb-6 p-4 bg-green-100 dark:bg-green-900/20 border border-green-400 text-green-700 dark:text-green-400 rounded-lg flex items-center gap-2"
                    >
                      <CheckCircle className="w-5 h-5" />
                      <span>Pengaduan/Aspirasi berhasil dikirim!</span>
                    </motion.div>
                  )}
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mb-6 p-4 bg-red-100 dark:bg-red-900/20 border border-red-400 text-red-700 dark:text-red-400 rounded-lg flex items-center gap-2"
                    >
                      <AlertCircle className="w-5 h-5" />
                      <span>{error}</span>
                    </motion.div>
                  )}

                  {/* Form */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8"
                  >
                    <div className="mb-6">
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                        Form Pengaduan dan Aspirasi
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        Sampaikan pengaduan atau aspirasi Anda untuk kemajuan
                        desa
                      </p>
                    </div>

                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Name Field */}
                        <div>
                          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            <User className="w-4 h-4" />
                            Nama Lengkap
                          </label>
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#C0B099] focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors"
                            placeholder="Masukkan nama lengkap"
                          />
                        </div>

                        {/* Phone Field */}
                        <div>
                          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            <Phone className="w-4 h-4" />
                            Nomor Telepon
                          </label>
                          <input
                            type="tel"
                            name="no_telp"
                            value={formData.no_telp}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#C0B099] focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors"
                            placeholder="Contoh: 08123456789"
                          />
                        </div>
                      </div>

                      {/* Email Field */}
                      <div>
                        <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          <Mail className="w-4 h-4" />
                          Email
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#C0B099] focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors"
                          placeholder="nama@email.com"
                        />
                      </div>

                      {/* Category Field */}
                      <div>
                        <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          <FileText className="w-4 h-4" />
                          Kategori
                        </label>
                        <select
                          name="kategori"
                          value={formData.kategori}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#C0B099] focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors"
                        >
                          <option value="pengaduan">Pengaduan</option>
                          <option value="aspirasi">Aspirasi</option>
                        </select>
                      </div>

                      {/* Message Field */}
                      <div>
                        <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          <MessageCircle className="w-4 h-4" />
                          Pesan
                        </label>
                        <textarea
                          name="pesan"
                          value={formData.pesan}
                          onChange={handleInputChange}
                          required
                          rows={6}
                          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#C0B099] focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors resize-vertical"
                          placeholder="Tuliskan pengaduan atau aspirasi Anda secara detail..."
                        />
                      </div>

                      {/* Submit Button */}
                      <div className="flex justify-end">
                        <motion.button
                          type="submit"
                          onClick={handleSubmit}
                          whileHover={{ scale: submitting ? 1 : 1.02 }}
                          whileTap={{ scale: submitting ? 1 : 0.98 }}
                          className="flex items-center gap-2 px-8 py-3 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white font-medium rounded-lg transition-colors duration-200 disabled:cursor-not-allowed"
                        >
                          {submitting ? (
                            <>
                              <Clock className="w-4 h-4 animate-spin" />
                              Mengirim...
                            </>
                          ) : (
                            <>
                              <Send className="w-4 h-4" />
                              Kirim{" "}
                              {formData.kategori === "pengaduan"
                                ? "Pengaduan"
                                : "Aspirasi"}
                            </>
                          )}
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="w-full mt-8"
                >
                  <LaporCard />
                </motion.div>
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

export default PengaduanAspirasiComp;
