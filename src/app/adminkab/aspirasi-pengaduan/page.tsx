import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/auth";
import { redirect } from "next/navigation";
import { Metadata } from "next";
import AspirasiPengaduanManagerKab from "@/components/AdminKab/AspirasiPengaduan";

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
      <h1 className="text-2xl font-bold mb-4 text-gray-700">
        Aspirasi dan Pengaduan
      </h1>
      {/* komponen yang menampilkan prodfile dari desa cipeundeuy */}
      <AspirasiPengaduanManagerKab />
    </div>
  );
}
