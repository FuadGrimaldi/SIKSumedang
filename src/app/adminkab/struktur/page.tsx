import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/auth";
import { redirect } from "next/navigation";
import { Metadata } from "next";
import OfficialManagerKab from "@/components/AdminKab/Struktur";

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
      <h1 className="text-2xl font-bold mb-4 text-gray-800">Struktur</h1>
      {/* komponen yang menampilkan prodfile dari desa cipeundeuy */}
      <OfficialManagerKab />
    </div>
  );
}
