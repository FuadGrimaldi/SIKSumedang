import { headers } from "next/headers";
import { ProfileKecamatanService } from "@/lib/prisma-service/profilekecamatanService";
import VisiMisiComp from "@/components/kecamatan/VisiMisi";
import type { Metadata } from "next";
import SippadesComp from "@/components/kecamatan/Sippades";
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "SIPPAdes - Sistem Informasi Perencanaan Penganggaran Desa",
    description:
      "Dengan SIPPAdes, desa Anda dapat merencanakan dan mengelola anggaran secara efisien.",
  };
}

export default async function SippadesPage() {
  const headersList = headers();
  const host = headersList.get("host") || "";
  const subdomain = host.split(".")[0];
  const kecamatan =
    await ProfileKecamatanService.getKecamatanProfileBySubdomain(subdomain);
  return (
    <div>
      <div>
        <SippadesComp nama_kecamatan={kecamatan?.nama_kecamatan} />
      </div>
    </div>
  );
}
