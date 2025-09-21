import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/auth";
import { redirect } from "next/navigation";
import { Metadata } from "next";
import AcaraManagerKec from "@/components/AdminKec/Acara";

export const metadata: Metadata = {
  title: "Acara Kecamatan",
  description: "Kalender acara kecamatan",
};

export default async function AcaraPage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
    return null;
  }
  return (
    <div className="container min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Acara</h1>
      {/* komponen yang menampilkan prodfile dari desa cipeundeuy */}
      <AcaraManagerKec
        kecamatanId={Number(session.user.kecamatanId)}
        userId={Number(session.user.id)}
      />
    </div>
  );
}
