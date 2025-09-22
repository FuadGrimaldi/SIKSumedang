import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/auth";
import { redirect } from "next/navigation";
import { Metadata } from "next";
import AcaraManagerKec from "@/components/AdminKec/Acara";
import VideoManagerKec from "@/components/AdminKec/Video";

export const metadata: Metadata = {
  title: "Video Kecamatan",
  description: "Video kecamatan",
};

export default async function VideoPage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
    return null;
  }
  return (
    <div className="container min-h-screen">
      <div className="text-2xl font-bold mb-4 text-gray-800">Video</div>
      {/* komponen yang menampilkan prodfile dari desa cipeundeuy */}
      <VideoManagerKec kecamatanId={Number(session.user.kecamatanId)} />
    </div>
  );
}
