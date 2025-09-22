import { headers } from "next/headers";
import { ProfileKecamatanService } from "@/lib/prisma-service/profilekecamatanService";
import BeritaComp from "@/components/kecamatan/AllBerita";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Berita Kecamatan",
    description: "Kumpulan Berita Menarik dari Kecamatan Anda",
  };
}

export default async function BeritaPage() {
  const headersList = headers();
  const host = headersList.get("host") || "";
  const subdomain = host.split(".")[0];
  const kecamatan =
    await ProfileKecamatanService.getKecamatanProfileBySubdomain(subdomain);
  return (
    <div>
      <div>
        <BeritaComp
          nama_kecamatan={kecamatan?.nama_kecamatan}
          kecamatanId={Number(kecamatan?.id)}
        />
      </div>
    </div>
  );
}
