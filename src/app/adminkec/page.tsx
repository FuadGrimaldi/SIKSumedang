import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/auth";
import { redirect } from "next/navigation";
import Dashboard from "@/components/AdminKec/Dashboard";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Dashboard Kecamatan",
    description: "Dashboard resmi kecamatan",
  };
}

export default async function Home() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
  }
  const kecamatanId = session.user.kecamatanId;
  return (
    <div>
      <Dashboard kecamatanId={Number(kecamatanId)} />
    </div>
  );
}
