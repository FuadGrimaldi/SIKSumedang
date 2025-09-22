"use client";

import Image from "next/image";
import { useEffect, useState, useCallback } from "react";
import Swal from "sweetalert2";
import {
  MapPin,
  Phone,
  Mail,
  Globe,
  Camera,
  Edit3,
  Save,
  X,
  Search,
} from "lucide-react";
import { form } from "framer-motion/client";

export interface Kecamatan {
  id: number;
  subdomain: string;
  nama_kecamatan: string;
  alamat: string;
  telepon: string;
  email: string;
  website?: string | null;
  foto_kantor: string;
  visi: string;
  misi: string;
  sejarah: string;
  deskripsi: string;
  gmaps_embed_url: string;
  created_at: Date;
  updated_at: Date;
}

export default function ProfileKecManagerKec({
  kecamatanId,
}: {
  kecamatanId: number;
}) {
  const [kecamatan, setKecamatan] = useState<Kecamatan | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [editing, setEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchKecamatan = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/kecamatan/${kecamatanId}`);
      const data = await res.json();

      if (data.error) {
        console.error("Error fetching kecamatan:", data.error);
        setKecamatan(null);
      } else {
        setKecamatan(data);
      }
    } catch (error) {
      console.error("Fetch error:", error);
      setKecamatan(null);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Gagal memuat data kecamatan",
      });
    }
    setLoading(false);
  }, [kecamatanId]);

  useEffect(() => {
    fetchKecamatan();
  }, [fetchKecamatan]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!kecamatan) return;

    setSubmitting(true);
    const formData = new FormData(e.currentTarget);
    if (!formData.get("subdomain")) {
      formData.append("subdomain", kecamatan.subdomain);
    }

    try {
      const res = await fetch(`/api/kecamatan/${kecamatanId}`, {
        method: "PUT",
        body: formData,
      });

      if (res.ok) {
        await fetchKecamatan();
        setEditing(false);
        Swal.fire({
          position: "top",
          icon: "success",
          title: "Profil kecamatan berhasil diperbarui!",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        const errorData = await res.json();
        Swal.fire({
          icon: "error",
          title: "Error",
          text:
            "Gagal memperbarui kecamatan: " +
            (errorData.error || "Unknown error"),
        });
        throw new Error(errorData.error || "Gagal memperbarui kecamatan");
      }
    } catch (error) {
      console.error("Submit error:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Terjadi kesalahan saat menyimpan data",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-gradient-to-r from-green-600 to-green-500 p-6 rounded-xl shadow-lg">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Globe className="w-6 h-6" />
            Profil Kecamatan
          </h2>
          <p className="text-green-100 mt-1">
            Kelola data profil kecamatan Anda
          </p>
        </div>
        <button
          onClick={() => setEditing(!editing)}
          className={`px-6 py-3 font-semibold rounded-lg shadow flex items-center gap-2 transition-colors ${
            editing
              ? "bg-gray-500 text-white hover:bg-gray-600"
              : "bg-white text-green-600 hover:bg-gray-50"
          }`}
        >
          {editing ? (
            <>
              <X className="w-5 h-5" /> Batal
            </>
          ) : (
            <>
              <Edit3 className="w-5 h-5" /> Edit Profil
            </>
          )}
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
          <span className="ml-3 text-gray-600">Memuat data...</span>
        </div>
      ) : !kecamatan ? (
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <Globe className="mx-auto w-16 h-16 text-gray-300 mb-4" />
          <h3 className="text-lg font-semibold text-gray-600 mb-2">
            Data kecamatan tidak ditemukan
          </h3>
          <p className="text-gray-500">Silakan cek kembali subdomain ID</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow p-6">
          {editing ? (
            // ================= FORM EDIT =================
            <form onSubmit={handleSubmit} encType="multipart/form-data">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Kiri */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">
                    Informasi Dasar
                  </h3>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Subdomain *
                    </label>
                    <input
                      type="text"
                      name="subdomain"
                      defaultValue={kecamatan.subdomain}
                      className="w-full px-4 py-2 border rounded-lg"
                      required
                      disabled
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nama Kecamatan *
                    </label>
                    <input
                      type="text"
                      name="nama_kecamatan"
                      defaultValue={kecamatan.nama_kecamatan}
                      className="w-full px-4 py-2 border rounded-lg"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Alamat *
                    </label>
                    <textarea
                      name="alamat"
                      defaultValue={kecamatan.alamat}
                      className="w-full px-4 py-2 border rounded-lg"
                      rows={3}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Telepon *
                    </label>
                    <input
                      type="tel"
                      name="telepon"
                      defaultValue={kecamatan.telepon}
                      className="w-full px-4 py-2 border rounded-lg"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      defaultValue={kecamatan.email}
                      className="w-full px-4 py-2 border rounded-lg"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Website
                    </label>
                    <input
                      type="url"
                      name="website"
                      defaultValue={kecamatan.website || ""}
                      className="w-full px-4 py-2 border rounded-lg"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Foto Kantor
                    </label>
                    <input
                      type="file"
                      name="foto_kantor"
                      accept="image/*"
                      className="w-full px-4 py-2 border rounded-lg"
                    />
                    {kecamatan.foto_kantor && (
                      <div className="mt-2">
                        <Image
                          src={kecamatan.foto_kantor}
                          width={200}
                          height={120}
                          alt="Foto Kantor"
                          className="rounded-lg border"
                        />
                      </div>
                    )}
                  </div>
                </div>

                {/* Kanan */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">
                    Informasi Detail
                  </h3>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Visi *
                    </label>
                    <textarea
                      name="visi"
                      defaultValue={kecamatan.visi}
                      className="w-full px-4 py-2 border rounded-lg"
                      placeholder="Visi"
                      rows={3}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Misi *
                    </label>
                    <textarea
                      name="misi"
                      defaultValue={kecamatan.misi}
                      className="w-full px-4 py-2 border rounded-lg"
                      placeholder="Misi"
                      rows={3}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Sejarah *
                    </label>
                    <textarea
                      name="sejarah"
                      defaultValue={kecamatan.sejarah}
                      className="w-full px-4 py-2 border rounded-lg"
                      placeholder="Sejarah"
                      rows={4}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Deskripsi *
                    </label>
                    <textarea
                      name="deskripsi"
                      defaultValue={kecamatan.deskripsi}
                      className="w-full px-4 py-2 border rounded-lg"
                      placeholder="Deskripsi"
                      rows={4}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Gmaps *
                    </label>
                    <input
                      type="url"
                      name="gmaps_embed_url"
                      defaultValue={kecamatan.gmaps_embed_url}
                      className="w-full px-4 py-2 border rounded-lg"
                      placeholder="https://www.google.com/maps/embed?pb=..."
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-6 border-t pt-6">
                <button
                  type="button"
                  onClick={() => setEditing(false)}
                  className="px-6 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg flex items-center gap-2"
                  disabled={submitting}
                >
                  <X className="w-4 h-4" /> Batal
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg flex items-center gap-2 disabled:opacity-50"
                  disabled={submitting}
                >
                  {submitting ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  ) : (
                    <Save className="w-4 h-4" />
                  )}
                  {submitting ? "Menyimpan..." : "Simpan"}
                </button>
              </div>
            </form>
          ) : (
            // ================= VIEW MODE =================
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                {kecamatan.foto_kantor ? (
                  <Image
                    src={kecamatan.foto_kantor}
                    width={400}
                    height={250}
                    alt="Foto Kantor"
                    className="rounded-lg border w-full object-cover"
                  />
                ) : (
                  <div className="w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center">
                    <Camera className="w-10 h-10 text-gray-400" />
                  </div>
                )}
              </div>
              <div className="space-y-3">
                <h3 className="text-xl font-bold text-gray-800">
                  {kecamatan.nama_kecamatan}
                </h3>
                <p className="flex items-center text-gray-600">
                  <MapPin className="w-4 h-4 mr-2" /> {kecamatan.alamat}
                </p>
                <p className="flex items-center text-gray-600">
                  <Phone className="w-4 h-4 mr-2" /> {kecamatan.telepon}
                </p>
                <p className="flex items-center text-gray-600">
                  <Mail className="w-4 h-4 mr-2" /> {kecamatan.email}
                </p>
                {kecamatan.website && (
                  <p className="flex items-center text-gray-600">
                    <Globe className="w-4 h-4 mr-2" /> {kecamatan.website}
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
