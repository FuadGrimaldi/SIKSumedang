import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/auth";
import { redirect } from "next/navigation";
import { Metadata } from "next";
import VideoManagerKab from "@/components/AdminKab/Video";

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
      <h1 className="text-2xl font-bold mb-4 text-gray-800">Video</h1>
      {/* komponen yang menampilkan prodfile dari desa cipeundeuy */}
      <VideoManagerKab />
    </div>
  );
}
