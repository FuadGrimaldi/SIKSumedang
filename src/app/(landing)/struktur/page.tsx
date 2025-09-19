import { headers } from "next/headers";
import { ProfileKecamatanService } from "@/lib/prisma-service/profilekecamatanService";
import StrukturComp from "@/components/kecamatan/Struktur";

import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Struktur Kecamatan",
    description: "Struktur Organisasi dan Tupoksi di Kecamatan Anda",
  };
}

export default async function StruturPage() {
  const headersList = headers();
  const host = headersList.get("host") || "";
  const subdomain = host.split(".")[0];
  const kecamatan =
    await ProfileKecamatanService.getKecamatanProfileBySubdomain(subdomain);
  return (
    <div>
      <div>
        <StrukturComp
          subdomain={subdomain}
          nama_kecamatan={kecamatan?.nama_kecamatan}
        />
      </div>
    </div>
  );
}
