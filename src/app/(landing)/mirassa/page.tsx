import { headers } from "next/headers";
import { ProfileKecamatanService } from "@/lib/prisma-service/profilekecamatanService";
import type { Metadata } from "next";
import MirassaComp from "@/components/kecamatan/Mirassa";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Mirassa - Mikanyaah Rakyat Rancakalong sangkan Sehat Salawasna",
    description:
      "Dengan Mirassa, Kecamatan Anda dapat meningkatkan kesejahteraan masyarakat secara menyeluruh.",
  };
}

export default async function MirassaPage() {
  const headersList = headers();
  const host = headersList.get("host") || "";
  const subdomain = host.split(".")[0];
  const kecamatan =
    await ProfileKecamatanService.getKecamatanProfileBySubdomain(subdomain);
  return (
    <div>
      <div>
        <MirassaComp nama_kecamatan={kecamatan?.nama_kecamatan} />
      </div>
    </div>
  );
}
