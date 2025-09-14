import HeroSection from "@/components/Landing/Hero";
import News from "@/components/News/News";
import { headers } from "next/headers";
import { ProfileKecamatanService } from "@/lib/prisma-service/profilekecamatanService";
import LaporCard from "@/components/Card/LaporCard";
import LayananCard from "@/components/Card/LayananCard";
import GalleryCard from "@/components/Card/GalleryCard";
export default async function Home() {
  const headersList = headers();
  const host = headersList.get("host") || "";
  const subdomain = host.split(".")[0];
  const kecamatan =
    await ProfileKecamatanService.getKecamatanProfileBySubdomain(subdomain);
  return (
    <div>
      <div>
        <HeroSection subdomain={kecamatan?.nama_kecamatan || ""} />
      </div>
      <div className="px-[31px] lg:px-[100px] py-8 bg-gray-50  ">
        <News kecamatanId={Number(kecamatan?.id)} />
      </div>
      <div className="px-[31px] lg:px-[100px] py-2 bg-gray-200">
        <LayananCard kecamatanId={Number(kecamatan?.id)} />
      </div>
      <div className="px-[31px] lg:px-[100px] py-2 bg-gray-50 pt-[50px]">
        <GalleryCard kecamatanId={Number(kecamatan?.id)} />
      </div>
      <div className="px-[31px] lg:px-[100px] py-8 bg-gray-50">
        <LaporCard />
      </div>
    </div>
  );
}
