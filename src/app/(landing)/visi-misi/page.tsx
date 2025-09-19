import { headers } from "next/headers";
import { ProfileKecamatanService } from "@/lib/prisma-service/profilekecamatanService";
import VisiMisiComp from "@/components/kecamatan/VisiMisi";
import type { Metadata } from "next";
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Visi dan Misi Kecamatan",
    description: "Visi dan Misi dari Kecamatan Anda",
  };
}

export default async function Home() {
  const headersList = headers();
  const host = headersList.get("host") || "";
  const subdomain = host.split(".")[0];
  const kecamatan =
    await ProfileKecamatanService.getKecamatanProfileBySubdomain(subdomain);
  return (
    <div>
      <div>
        <VisiMisiComp
          visi={kecamatan?.visi}
          misi={kecamatan?.misi}
          nama_kecamatan={kecamatan?.nama_kecamatan}
        />
      </div>
    </div>
  );
}
