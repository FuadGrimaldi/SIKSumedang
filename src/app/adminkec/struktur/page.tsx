import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/auth";
import { redirect } from "next/navigation";
import { Metadata } from "next";
import ProfileKecManagerKec from "@/components/AdminKec/Profile";
import OfficialManagerKec from "@/components/AdminKec/Struktur";

export const metadata: Metadata = {
  title: "Struktur Kecamatan",
  description: "Halaman struktur kecamatan",
};

export default async function StrukturPage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
    return null;
  }
  return (
    <div className="container min-h-screen">
      <div className="text-2xl font-bold mb-4 text-gray-800">Struktur</div>
      {/* komponen yang menampilkan prodfile dari desa cipeundeuy */}
      <OfficialManagerKec kecamatanId={Number(session.user.kecamatanId)} />
    </div>
  );
}
