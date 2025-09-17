import { headers } from "next/headers";
import { ProfileKecamatanService } from "@/lib/prisma-service/profilekecamatanService";
import AcaraComp from "@/components/kecamatan/AllAcara";

export default async function AcaraPage() {
  const headersList = headers();
  const host = headersList.get("host") || "";
  const subdomain = host.split(".")[0];
  const kecamatan =
    await ProfileKecamatanService.getKecamatanProfileBySubdomain(subdomain);
  return (
    <div>
      <div>
        <AcaraComp
          nama_kecamatan={kecamatan?.nama_kecamatan}
          kecamatanId={Number(kecamatan?.id)}
        />
      </div>
    </div>
  );
}
