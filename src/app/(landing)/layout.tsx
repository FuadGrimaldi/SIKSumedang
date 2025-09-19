import { Metadata } from "next";
import "../globals.css";
import RootLayoutClient from "./rootLayoutClient";

export const metadata: Metadata = {
  title: "Selamat Datang di Website Kami!",
  description:
    "Website Resmi Kecamatan Rancakalong - Informasi, Berita, dan Layanan Masyarakat",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <RootLayoutClient>{children}</RootLayoutClient>;
}
