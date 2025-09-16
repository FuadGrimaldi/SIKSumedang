"use client";
import React from "react";
import { useState, useCallback, useEffect } from "react";
import Breadcrumb from "../Breadchumb/Breadchumb";
import { Kecamatan } from "@/types/kecamatan";
import {
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
  Twitter,
  User,
} from "lucide-react";
import Image from "next/image";

interface profileProps {
  kecamatanId?: number;
}

const ProfileComp = ({ kecamatanId }: profileProps) => {
  const [profile, setProfile] = useState<Kecamatan | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const fetchProfile = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/kecamatan/${kecamatanId}`);
      if (!res.ok) {
        throw new Error("Failed to fetch profile");
      }
      const data = await res.json();
      setProfile(data);
    } catch (error) {
      console.error("Error fetching profile:", error);
      setError("Gagal memuat profile");
      setProfile(null);
    } finally {
      setLoading(false);
    }
  }, [kecamatanId]);
  useEffect(() => {
    if (kecamatanId) {
      fetchProfile();
    }
  }, [kecamatanId, fetchProfile]);
  console.log("Profile component kecamatanId:", profile);
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
              { to: "#", label: "Profile" },
            ]}
          />
          {/* Header */}
          <div className="relative mb-12">
            <h1 className="text-2xl lg:text-4xl font-bold text-white">
              Profile
            </h1>
            <p className="text-white text-sm lg:text-lg mt-1 mb-2 font-medium">
              Profile Kecamatan {profile?.nama_kecamatan}
            </p>
            <div className="w-80 h-1 bg-blue-600 rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Floating Content */}
      <div className="relative -mt-48 px-[31px] lg:px-[100px] py-2">
        <div className="bg-white rounded-2xl border pb-12 lg:pt-12 pt-6 px-3 lg:px-8">
          <div className="max-w-5xl mx-auto h-auto">
            <div className="">
              <div className="rounded-lg overflow-hidden border border-gray-200 mb-8">
                <h1 className="lg:text-3xl text-2xl font-bold text-gray-800 p-6 border-b border-gray-200">
                  Kecamatan{" "}
                  {profile?.nama_kecamatan || "loading..mencari kontak"}
                </h1>
                <p className="text-gray-600 text-sm lg:text-base p-6 leading-relaxed">
                  {profile?.sejarah || "loading..mencari kontak"}
                </p>
              </div>
              {/* Contact Info Cards */}
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 px-6 py-2 rounded-xl border border-blue-200 hover:shadow-lg transition-shadow">
                  <div className="flex items-center mb-4">
                    <div className="bg-blue-500 p-3 rounded-full">
                      <Phone className="w-4 h-4 text-white" />
                    </div>
                    <h3 className="ml-4 text-lg font-semibold text-gray-800">
                      Telepon
                    </h3>
                  </div>
                  <p className="text-gray-600">
                    {profile?.telepon || "loading..mencari kontak"}
                  </p>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-blue-100 px-6 py-2  rounded-xl border border-blue-200 hover:shadow-lg transition-shadow">
                  <div className="flex items-center mb-4">
                    <div className="bg-blue-500 p-3 rounded-full">
                      <Mail className="w-4 h-4 text-white" />
                    </div>
                    <h3 className="ml-4 text-lg font-semibold text-gray-800">
                      Email
                    </h3>
                  </div>
                  <p className="text-gray-600">
                    {profile?.email || "loading..mencari kontak"}
                  </p>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-blue-100 px-6 py-2 rounded-xl border border-blue-200 hover:shadow-lg transition-shadow">
                  <div className="flex items-center mb-4">
                    <div className="bg-blue-500 p-3 rounded-full">
                      <MapPin className="w-4 h-4 text-white" />
                    </div>
                    <h3 className="ml-4 text-lg font-semibold text-gray-800">
                      Alamat
                    </h3>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {profile?.alamat || "loading..mencari kontak"}
                  </p>
                </div>
              </div>

              {/* Main Content Grid */}
              <div className="grid lg:grid-cols-2 gap-8">
                {/* Map and Social Media */}
                <div className="space-y-6">
                  {/* Map */}
                  <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
                    <div className="bg-gray-400 p-4">
                      <h3 className="text-xl font-bold text-white flex items-center">
                        <MapPin className="w-5 h-5 mr-2" />
                        Lokasi Kantor Desa
                      </h3>
                    </div>
                    <div className="p-6">
                      <div className="rounded-lg overflow-hidden border border-gray-200 mb-4">
                        <iframe
                          src={
                            profile?.gmaps_embed_url ||
                            "loading..mencari lokasi"
                          }
                          width="100%"
                          height="300"
                          style={{ border: 0 }}
                          allowFullScreen={true}
                          loading="lazy"
                          referrerPolicy="no-referrer-when-downgrade"
                          title="Lokasi Kantor Desa"
                        />
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-gray-800 mb-2">
                          {profile?.nama_kecamatan || "loading..mencari kontak"}
                        </h4>
                        <p className="text-gray-600 text-sm">
                          {profile?.alamat || "loading..mencari kontak"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="border-t pt-4">
                  <h4 className="font-semibold text-gray-800 mb-3">
                    Jam Pelayanan
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Senin - Jumat</span>
                      <span className="font-medium">08:00 - 16:00</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Sabtu</span>
                      <span className="font-medium">08:00 - 12:00</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Minggu</span>
                      <span className="font-medium text-red-500">Tutup</span>
                    </div>
                  </div>
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

export default ProfileComp;
