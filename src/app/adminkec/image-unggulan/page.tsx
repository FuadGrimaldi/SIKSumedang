import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/auth";
import { redirect } from "next/navigation";
import { Metadata } from "next";
import FotoDepanManagerKec from "@/components/AdminKec/ImageFront";

export const metadata: Metadata = {
  title: "Foto Unggulan Kecamatan",
  description: "Halaman untuk foto depan kecamatan",
};

export default async function FotoUnggulanPage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
    return null;
  }
  return (
    <div className="container min-h-screen">
      <div className="text-2xl font-bold mb-4 text-black">Foto Unggulan</div>
      {/* komponen yang menampilkan prodfile dari desa cipeundeuy */}
      <FotoDepanManagerKec kecamatanId={Number(session.user.kecamatanId)} />
    </div>
  );
}
