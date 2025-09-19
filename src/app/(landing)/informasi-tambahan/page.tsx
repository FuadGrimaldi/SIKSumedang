import { headers } from "next/headers";
import { ProfileKecamatanService } from "@/lib/prisma-service/profilekecamatanService";
import InfografisComp from "@/components/kecamatan/AllInfografis";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Infografis Kecamatan",
    description: "Kumpulan Infografis Menarik dari Kecamatan Anda",
  };
}

export default async function InfografisPage() {
  const headersList = headers();
  const host = headersList.get("host") || "";
  const subdomain = host.split(".")[0];
  const kecamatan =
    await ProfileKecamatanService.getKecamatanProfileBySubdomain(subdomain);
  return (
    <div>
      <div>
        <InfografisComp
          nama_kecamatan={kecamatan?.nama_kecamatan}
          kecamatanId={Number(kecamatan?.id) || 48}
        />
      </div>
    </div>
  );
}
