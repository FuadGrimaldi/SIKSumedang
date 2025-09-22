import { Metadata } from "next";
import "../globals.css";
import DashboardLayoutClient from "./rootLayoutAdminKec";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/auth";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { ProfileKecamatanService } from "@/lib/prisma-service/profilekecamatanService";

export const metadata: Metadata = {
  title: "Selamat Datang di Website Kami!",
  description:
    "Website Resmi Kecamatan - Informasi, Berita, dan Layanan Masyarakat",
};

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headersList = headers();
  const host = headersList.get("host") || "";
  const subdomain = host.split(".")[0];
  const kecamatan =
    await ProfileKecamatanService.getKecamatanProfileBySubdomain(subdomain);
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }
  if (session.user.kecamatanId !== null) {
    redirect("/");
  }
  return <DashboardLayoutClient>{children}</DashboardLayoutClient>;
}
