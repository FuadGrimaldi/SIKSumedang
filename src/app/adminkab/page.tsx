import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/auth";
import { redirect } from "next/navigation";
import DashboardKab from "@/components/AdminKab/Dashboard";

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
  return (
    <div>
      <DashboardKab />
    </div>
  );
}
