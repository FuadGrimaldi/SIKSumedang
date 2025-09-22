import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/auth";
import { redirect } from "next/navigation";
import { Metadata } from "next";
import AcaraManagerKec from "@/components/AdminKec/Acara";
import ArtikelManagerKec from "@/components/AdminKec/Artikel";

export const metadata: Metadata = {
  title: "Artikel Kecamatan",
  description: "Artikel kecamatan",
};

export default async function ArtikelPage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
    return null;
  }
  return (
    <div className="container min-h-screen">
      <div className="text-2xl font-bold mb-4 text-gray-700">Artikel</div>
      {/* komponen yang menampilkan prodfile dari desa cipeundeuy */}
      <ArtikelManagerKec
        kecamatanId={Number(session.user.kecamatanId)}
        userId={Number(session.user.id)}
      />
    </div>
  );
}
