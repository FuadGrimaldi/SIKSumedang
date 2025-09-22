import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/auth";
import { redirect } from "next/navigation";
import { Metadata } from "next";
import AspirasiPengaduanManagerKec from "@/components/AdminKec/AspirasiPengaduan";

export const metadata: Metadata = {
  title: "Aspirasi Pengaduan Kecamatan",
  description: "Aspirasi Pengaduan kecamatan",
};

export default async function AspirasiPengaduanPage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
    return null;
  }
  return (
    <div className="container min-h-screen">
      <div className="text-gray-700 text-2xl font-bold mb-4">
        Aspirasi dan Pengaduan
      </div>
      {/* komponen yang menampilkan prodfile dari desa cipeundeuy */}
      <AspirasiPengaduanManagerKec
        kecamatanId={Number(session.user.kecamatanId)}
      />
    </div>
  );
}
