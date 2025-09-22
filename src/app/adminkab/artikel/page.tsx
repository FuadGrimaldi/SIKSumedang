import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/auth";
import { redirect } from "next/navigation";
import { Metadata } from "next";
import ArtikelManagerKab from "@/components/AdminKab/Artikel";

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
      <h1 className="text-2xl font-bold mb-4 text-black">Artikel</h1>
      {/* komponen yang menampilkan prodfile dari desa cipeundeuy */}
      <ArtikelManagerKab />
    </div>
  );
}
