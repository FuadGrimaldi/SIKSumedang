import { headers } from "next/headers";
import { ProfileKecamatanService } from "@/lib/prisma-service/profilekecamatanService";
import ArtikelComp from "@/components/kecamatan/AllArtikel";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Artikel Kecamatan",
    description: "Kumpulan Artikel Menarik dari Kecamatan Anda",
  };
}

export default async function ArtikelPage() {
  const headersList = headers();
  const host = headersList.get("host") || "";
  const subdomain = host.split(".")[0];
  const kecamatan =
    await ProfileKecamatanService.getKecamatanProfileBySubdomain(subdomain);
  return (
    <div>
      <div>
        <ArtikelComp
          nama_kecamatan={kecamatan?.nama_kecamatan}
          kecamatanId={Number(kecamatan?.id)}
        />
      </div>
    </div>
  );
}
