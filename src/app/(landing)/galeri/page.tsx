import { headers } from "next/headers";
import { ProfileKecamatanService } from "@/lib/prisma-service/profilekecamatanService";
import GaleriComp from "@/components/kecamatan/Galeri";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Galeri Kecamatan",
    description: "Kumpulan Galeri Menarik dari Kecamatan Anda",
  };
}

export default async function GaleryPage() {
  const headersList = headers();
  const host = headersList.get("host") || "";
  const subdomain = host.split(".")[0];
  const kecamatan =
    await ProfileKecamatanService.getKecamatanProfileBySubdomain(subdomain);
  return (
    <div>
      <div>
        <GaleriComp
          kecamatanId={Number(kecamatan?.id) || 48}
          nama_kecamatan={kecamatan?.nama_kecamatan}
        />
      </div>
    </div>
  );
}
