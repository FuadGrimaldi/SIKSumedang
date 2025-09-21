import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/auth";
import { redirect } from "next/navigation";
import { Metadata } from "next";
import GalleryManagerKec from "@/components/AdminKec/Gallery";

export const metadata: Metadata = {
  title: "Gallery Kecamatan",
  description: "Gallery kecamatan",
};

export default async function GalleryPage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
    return null;
  }
  return (
    <div className="container min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Gallery</h1>
      {/* komponen yang menampilkan prodfile dari desa cipeundeuy */}
      <GalleryManagerKec kecamatanId={Number(session.user.kecamatanId)} />
    </div>
  );
}
