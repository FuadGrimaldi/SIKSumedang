import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/auth";
import { redirect } from "next/navigation";

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
  console.log("session:", session);
  console.log("Session:", kecamatanId);
  return (
    <div>
      <div>{/* content */}</div>
    </div>
  );
}
