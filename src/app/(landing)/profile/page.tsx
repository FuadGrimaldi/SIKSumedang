import { headers } from "next/headers";
import { ProfileKecamatanService } from "@/lib/prisma-service/profilekecamatanService";
import ProfileComp from "@/components/kecamatan/Profile";

export default async function ProfilePage() {
  const headersList = headers();
  const host = headersList.get("host") || "";
  const subdomain = host.split(".")[0];
  const kecamatan =
    await ProfileKecamatanService.getKecamatanProfileBySubdomain(subdomain);
  console.log(kecamatan);
  return (
    <div>
      <div>
        <ProfileComp kecamatanId={kecamatan?.id} />
      </div>
    </div>
  );
}
