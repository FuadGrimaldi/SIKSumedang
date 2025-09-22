import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/auth";
import { redirect } from "next/navigation";
import { Metadata } from "next";
import KomentarManagerKec from "@/components/AdminKec/Komentar";

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
      <div className="text-2xl font-bold mb-4 text-gray-700">Komentar</div>
      {/* komponen yang menampilkan prodfile dari desa cipeundeuy */}
      <KomentarManagerKec kecamatanId={Number(session.user.kecamatanId)} />
    </div>
  );
}
