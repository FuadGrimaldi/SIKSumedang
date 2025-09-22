import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/auth";
import { redirect } from "next/navigation";
import { Metadata } from "next";
import BeritaManagerKec from "@/components/AdminKec/Berita";

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
      <div className="text-2xl font-bold mb-4 text-gray-800">
        Berita dan Pengumuman
      </div>
      {/* komponen yang menampilkan prodfile dari desa cipeundeuy */}
      <BeritaManagerKec
        kecamatanId={Number(session.user.kecamatanId)}
        userId={Number(session.user.id)}
      />
    </div>
  );
}
