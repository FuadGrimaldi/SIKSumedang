import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/auth";
import { redirect } from "next/navigation";
import { Metadata } from "next";
import SubKategoriManagerKec from "@/components/AdminKec/SubKategori";

export const metadata: Metadata = {
  title: "Sub Kategori Kecamatan",
  description: "Sub Kategori kecamatan",
};

export default async function SubKategoriPage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
    return null;
  }
  return (
    <div className="container min-h-screen">
      <div className="text-2xl font-bold mb-4 text-gray-700">Sub Kategori</div>
      {/* komponen yang menampilkan prodfile dari desa cipeundeuy */}
      <SubKategoriManagerKec kecamatanId={Number(session.user.kecamatanId)} />
    </div>
  );
}
