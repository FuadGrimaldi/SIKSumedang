import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/auth";
import { redirect } from "next/navigation";
import { Metadata } from "next";
import ProfileKecManagerKec from "@/components/AdminKec/Profile";

export const metadata: Metadata = {
  title: "Profile Kecamatan",
  description: "Halaman profile kecamatan",
};

export default async function ProfileAdminKec() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
    return null;
  }
  return (
    <div className="container min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Profile</h1>
      {/* komponen yang menampilkan prodfile dari desa cipeundeuy */}
      <ProfileKecManagerKec kecamatanId={Number(session.user.kecamatanId)} />
    </div>
  );
}
