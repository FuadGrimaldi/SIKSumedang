import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/auth";
import { redirect } from "next/navigation";
import { Metadata } from "next";
import UserManagerKab from "@/components/AdminKab/User";

export const metadata: Metadata = {
  title: "User Kecamatan",
  description: "User kecamatan",
};

export default async function UserPage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
    return null;
  }
  return (
    <div className="container min-h-screen">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">User</h1>
      {/* komponen yang menampilkan prodfile dari desa cipeundeuy */}
      <UserManagerKab />
    </div>
  );
}
