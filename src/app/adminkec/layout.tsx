import { Metadata } from "next";
import "../globals.css";
import DashboardLayoutClient from "./rootLayoutAdminKab";

export const metadata: Metadata = {
  title: "Selamat Datang di Website Kami!",
  description:
    "Website Resmi Kecamatan - Informasi, Berita, dan Layanan Masyarakat",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <DashboardLayoutClient>{children}</DashboardLayoutClient>;
}
