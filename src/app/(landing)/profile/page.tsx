import { headers } from "next/headers";
import { ProfileKecamatanService } from "@/lib/prisma-service/profilekecamatanService";
import ProfileComp from "@/components/kecamatan/Profile";

import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Profil Kecamatan",
    description: "Informasi Lengkap tentang Kecamatan Anda",
  };
}

export default async function ProfilePage() {
  const headersList = headers();
  const host = headersList.get("host") || "";
  const subdomain = host.split(".")[0];
  const kecamatan =
    await ProfileKecamatanService.getKecamatanProfileBySubdomain(subdomain);
  return (
    <div>
      <div>
        <ProfileComp kecamatanId={kecamatan?.id} />
      </div>
    </div>
  );
}
