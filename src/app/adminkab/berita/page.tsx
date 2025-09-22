import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/auth";
import { redirect } from "next/navigation";
import { Metadata } from "next";
import BeritaManagerKab from "@/components/AdminKab/Berita";

export const metadata: Metadata = {
  title: "Berita Kecamatan",
  description: "Berita dan Pengumuman kecamatan",
};

export default async function BeritaPage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
    return null;
  }
  return (
    <div className="container min-h-screen">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">
        Berita dan Pengumuman
      </h1>
      {/* komponen yang menampilkan prodfile dari desa cipeundeuy */}
      <BeritaManagerKab />
    </div>
  );
}
