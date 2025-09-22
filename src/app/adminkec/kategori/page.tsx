import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/auth";
import { redirect } from "next/navigation";
import { Metadata } from "next";
import KategoriManagerKec from "@/components/AdminKec/Kategori";

export const metadata: Metadata = {
  title: "Kategori Kecamatan",
  description: "Kategori kecamatan",
};

export default async function KategoriPage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
    return null;
  }
  return (
    <div className="container min-h-screen">
      <div className="text-2xl font-bold mb-4 text-gray-800">
        Kategori & Sub Kategori
      </div>
      {/* komponen yang menampilkan prodfile dari desa cipeundeuy */}
      <KategoriManagerKec kecamatanId={Number(session.user.kecamatanId)} />
    </div>
  );
}
