"use client";
import { useState, useEffect } from "react";
import {
  Menu,
  X,
  ChevronDown,
  Home,
  User,
  Settings,
  BarChart3,
  FileText,
  BookOpen,
  Calendar,
  Newspaper,
  ArrowBigLeft,
  ArrowBigRightIcon,
  ArrowRight,
  Building,
  ClipboardPen,
  Minus,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface Kategori {
  id: number;
  nama_kategori: string;
}

export default function NavGuest({
  subdomain,
  kecamatanId,
}: {
  subdomain: string | null;
  kecamatanId: number | null;
}) {
  const [kategoris, setKategoris] = useState<Kategori[]>([]);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleDropdown = (dropdown) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  const menuItems = [
    { name: "Beranda", href: "/", icon: Home },
    {
      name: "Acara",
      icon: Calendar,
      href: "/acara",
    },
    {
      name: "Artikel",
      icon: Newspaper,
      href: "/artikel",
    },
    {
      name: "Profil",
      icon: Building,
      submenu: [
        { name: "Profile", href: "/profile" },
        { name: "Visi Misi", href: "/visi-misi" },
        { name: "Struktur organisasi & tupoksi", href: "/struktur" },
      ],
    },
    {
      name: "Layanan",
      icon: ClipboardPen,
      submenu: [
        { name: "Daftar Layanan", href: "/layanan" },
        { name: "SIPPAdes", href: "/sippades" },
        {
          name: "Data Desa Cantik",
          href: `https://e-officedesa.sumedangkab.go.id/dashboard_desa_cantik/kecamatan/${kecamatanId}`,
        },
        // { name: "Lapor!", href: "/pengaduan" },
        { name: "Pengaduan dan Aspirasi", href: "/pengaduan-aspirasi" },
      ],
    },
    // {
    //   name: "Statistik Desa",
    //   icon: BarChart3,
    //   submenu: [
    //     {
    //       name: "Desa Cantik",
    //       href: `https://e-officedesa.sumedangkab.go.id/dashboard_desa_cantik/desa/`,
    //     },
    //     {
    //       name: "E-Sakip Desa",
    //       href: `https://e-officedesa.sumedangkab.go.id/dashboard_sakip/desa/`,
    //     },
    //     {
    //       name: "Desa Simpatik",
    //       href: `https://e-officedesa.sumedangkab.go.id/dashboard_simpatik/desa/`,
    //     },
    //     { name: "Status SDGS", href: "/sdgs" },
    //   ],
    // },

    {
      name: "Publikasi",
      icon: FileText,
      submenu: [
        { name: "Berita & Informasi", href: "/berita" },
        { name: "Galeri", href: "/galeri" },
        { name: "Video", href: "/video" },
        { name: "Informasi Lainnya", href: "/informasi-tambahan" },
      ],
    },
  ];

  return (
    <>
      {/* Navbar */}
      <div
        className={`fixed w-full mx-auto z-30 transition-all duration-300 ${
          isScrolled
            ? "backdrop-blur-md bg-black/60 shadow-lg"
            : "backdrop-blur-sm bg-black/0"
        }`}
      >
        <div className="px-[31px] lg:px-[100px] mx-auto w-full ">
          <div className="flex  items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <div className="w-16 h-16 flex items-center justify-center">
                <Image
                  src="/assets/logo-fix/logo-sumedang-500.png"
                  alt="Logo Sumedang"
                  width={60}
                  height={60}
                  className="object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-gray-100 text-lg leading-tight">
                  Kecamatan
                </span>
                <span className="text-sm text-gray-50 leading-tight">
                  Rancakalong
                </span>
              </div>
            </div>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center space-x-1">
              {menuItems.map((item, index) => (
                <div key={index} className="relative group">
                  {item.submenu ? (
                    <div className="relative">
                      <button className="flex items-center px-4 py-2 text-white hover:text-gray-100 hover:backdrop-blur-sm hover:bg-gray-600/60 rounded-lg transition-all duration-200 group">
                        <span className="font-medium text-[16px]">
                          {item.name}
                        </span>
                        <ChevronDown className="ml-1 h-4 w-4 transition-transform group-hover:rotate-180" />
                      </button>
                      <div className="absolute top-full left-0 mt-2 w-52 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0">
                        <div className="bg-gray-900/90 backdrop-blur-2xl rounded-xl shadow-xl py-2 mt-2">
                          {item.submenu.map((subitem, subindex) => (
                            <Link
                              key={subindex}
                              href={subitem.href}
                              className="block text-[16px] px-4 py-3 text-white hover:text-gray-100 hover:backdrop-blur-md hover:bg-gray-600/60 transition-colors duration-200 font-medium"
                            >
                              {subitem.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <a
                      href={item.href}
                      className="flex items-center text-[16px] px-4 py-2 text-white hover:text-gray-100 hover:backdrop-blur-sm hover:bg-gray-600/60 rounded-lg transition-all duration-200 font-medium"
                    >
                      {item.name}
                    </a>
                  )}
                </div>
              ))}
            </div>
            <div className="lg:hidden ">
              <button
                onClick={toggleMobileMenu}
                className="p-2 rounded-lg bg-gray-50 font-medium text-gray-900 hover:text-white hover:bg-blue-500 transition-all duration-200"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-opacity duration-300 bg-white${
          isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <div
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={toggleMobileMenu}
        />

        {/* Sidebar */}
        <div
          className={`fixed top-0 right-0 h-full w-80 max-w-[85vw] transform transition-transform duration-300 ease-in-out ${
            isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="h-full bg-white/95 backdrop-blur-md shadow-2xl ">
            {/* Sidebar Header */}
            <div className="flex items-center justify-between border-b px-4 border-gray-200/60 bg-gray-100">
              {/* Logo */}
              <div className="flex items-center space-x-1">
                <div className="w-16 h-16 flex items-center justify-center">
                  <Image
                    src="/assets/logo-fix/logo-sumedang-500.png"
                    alt="Logo Sumedang"
                    width={60}
                    height={60}
                    className="object-contain"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-gray-900 text-lg leading-tight">
                    Kecamatan
                  </span>
                  <span className="text-sm text-gray-700 leading-tight">
                    Rancakalong
                  </span>
                </div>
              </div>
              <div className="bg-white/95 backdrop-blur-md rounded-lg">
                <button
                  onClick={toggleMobileMenu}
                  className="p-2 rounded-lg text-gray-800 hover:text-white hover:bg-gray-100"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Mobile Menu Items */}
            <div className="flex-1 overflow-y-auto py-4">
              <div className="space-y-2 px-4">
                {menuItems.map((item, index) => {
                  const IconComponent = item.icon;
                  return (
                    <div key={index}>
                      {item.submenu ? (
                        <div>
                          <button
                            onClick={() => toggleDropdown(`mobile-${index}`)}
                            className="w-full flex items-center justify-between px-4 py-3 text-white hover:text-gray-100 hover:bg-blue-50 rounded-lg transition-all duration-200"
                          >
                            <div className="flex items-center space-x-3 text-gray-900">
                              <IconComponent size={20} />
                              <span className="font-medium ">{item.name}</span>
                            </div>
                            <ChevronDown
                              className={`h-4 w-4 transition-transform text-gray-900${
                                activeDropdown === `mobile-${index}`
                                  ? "rotate-180"
                                  : ""
                              }`}
                            />
                          </button>
                          <div
                            className={`overflow-hidden transition-all duration-200 ${
                              activeDropdown === `mobile-${index}`
                                ? "max-h-96 opacity-100"
                                : "max-h-0 opacity-0"
                            }`}
                          >
                            <div className="pl-6 pr-4 py-2 space-y-1">
                              {item.submenu.map((subitem, subindex) => (
                                <a
                                  key={subindex}
                                  href={subitem.href}
                                  className="flex items-center gap-2 px-4 py-2 text-gray-900 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                                  onClick={toggleMobileMenu}
                                >
                                  <Minus className="h-5 w-5" />
                                  {subitem.name}
                                </a>
                              ))}
                            </div>
                          </div>
                        </div>
                      ) : (
                        <a
                          href={item.href}
                          className="flex items-center space-x-3 px-4 py-3 text-gray-900 hover:text-gray-700 hover:bg-blue-50 rounded-lg transition-all duration-200"
                          onClick={toggleMobileMenu}
                        >
                          <IconComponent size={20} />
                          <span className="font-medium">{item.name}</span>
                        </a>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
