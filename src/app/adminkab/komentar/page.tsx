import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/auth";
import { redirect } from "next/navigation";
import { Metadata } from "next";
import KomentarManagerKab from "@/components/AdminKab/Komentar";

export const metadata: Metadata = {
  title: "Komentar Kecamatan",
  description: "Komentar kecamatan",
};

export default async function KomentarPage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
    return null;
  }
  return (
    <div className="container min-h-screen">
      <h1 className="text-2xl font-bold mb-4 text-gray-700">Komentar</h1>
      {/* komponen yang menampilkan prodfile dari desa cipeundeuy */}
      <KomentarManagerKab />
    </div>
  );
}
