import { headers } from "next/headers";
import { ProfileKecamatanService } from "@/lib/prisma-service/profilekecamatanService";
import PengaduanAspirasiComp from "@/components/kecamatan/PengaduanAspirasi";

export default async function PengaduanAspirasiPage() {
  const headersList = headers();
  const host = headersList.get("host") || "";
  const subdomain = host.split(".")[0];
  const kecamatan =
    await ProfileKecamatanService.getKecamatanProfileBySubdomain(subdomain);
  console.log(kecamatan);
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
