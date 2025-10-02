import { headers } from "next/headers";
import { ProfileKecamatanService } from "@/lib/prisma-service/profilekecamatanService";
import type { Metadata } from "next";
import SiperahuComp from "@/components/kecamatan/Siperahu";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Siperahu - Sistem Penilaian Kinerja Paruh Waktu",
    description:
      "Dengan Siperahu, Kecamatan Anda dapat menilai kinerja paruh waktu secara efektif.",
  };
}

export default async function SipperahuPage() {
  const headersList = headers();
  const host = headersList.get("host") || "";
  const subdomain = host.split(".")[0];
  const kecamatan =
    await ProfileKecamatanService.getKecamatanProfileBySubdomain(subdomain);
  return (
    <div>
      <div>
        <SiperahuComp nama_kecamatan={kecamatan?.nama_kecamatan} />
      </div>
    </div>
  );
}
