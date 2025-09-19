import { headers } from "next/headers";
import { ProfileKecamatanService } from "@/lib/prisma-service/profilekecamatanService";
import LayananComp from "@/components/kecamatan/AllLayanan";
import type { Metadata } from "next";
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Layanan Kecamatan",
    description: "Kumpulan Layanan dari Kecamatan Anda",
  };
}

export default async function LayananPage() {
  const headersList = headers();
  const host = headersList.get("host") || "";
  const subdomain = host.split(".")[0];
  const kecamatan =
    await ProfileKecamatanService.getKecamatanProfileBySubdomain(subdomain);
  return (
    <div>
      <div>
        <LayananComp nama_kecamatan={kecamatan?.nama_kecamatan} />
      </div>
    </div>
  );
}
