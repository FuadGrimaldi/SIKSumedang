import { headers } from "next/headers";
import { ProfileKecamatanService } from "@/lib/prisma-service/profilekecamatanService";
import PengaduanAspirasiComp from "@/components/kecamatan/PengaduanAspirasi";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Pengaduan dan Aspirasi",
    description: "Sampaikan Pengaduan dan Aspirasi Anda ke Kecamatan",
  };
}

export default async function PengaduanAspirasiPage() {
  const headersList = headers();
  const host = headersList.get("host") || "";
  const subdomain = host.split(".")[0];
  const kecamatan =
    await ProfileKecamatanService.getKecamatanProfileBySubdomain(subdomain);
  return (
    <div>
      <div>
        <PengaduanAspirasiComp
          nama_kecamatan={kecamatan?.nama_kecamatan}
          kecamatanId={kecamatan?.id}
        />
      </div>
    </div>
  );
}
