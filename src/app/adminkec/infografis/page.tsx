import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/auth";
import { redirect } from "next/navigation";
import { Metadata } from "next";
import InfografisManagerKec from "@/components/AdminKec/Infografis";

export const metadata: Metadata = {
  title: "Infografis Kecamatan",
  description: "Infografis kecamatan",
};

export default async function InfografisPage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
    return null;
  }
  return (
    <div className="container min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Infografis</h1>
      {/* komponen yang menampilkan prodfile dari desa cipeundeuy */}
      <InfografisManagerKec kecamatanId={Number(session.user.kecamatanId)} />
    </div>
  );
}
