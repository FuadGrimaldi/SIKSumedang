import HeroSection from "@/components/Landing/Hero";
import News from "@/components/News/News";
import { headers } from "next/headers";
import { ProfileKecamatanService } from "@/lib/prisma-service/profilekecamatanService";
import LaporCard from "@/components/Card/LaporCard";
import HeroImage from "@/components/Landing/HeroImage";
import Kawilang from "@/components/kecamatan/Kawilang";
import KategoriComp from "@/components/Landing/Kategori";
import { Metadata } from "next";

export default async function Home() {
  const headersList = headers();
  const host = headersList.get("host") || "";
  const subdomain = host.split(".")[0];
  const kecamatan =
    await ProfileKecamatanService.getKecamatanProfileBySubdomain(subdomain);
  return (
    <div>
      <div>
        <HeroImage
          subdomain={kecamatan?.nama_kecamatan || ""}
          kecamatanId={Number(kecamatan?.id)}
        />
      </div>
      <div className="px-[31px] lg:px-[100px] py-8 bg-gray-100  ">
        <KategoriComp kecamatanId={Number(kecamatan?.id)} />
      </div>
      <div className="px-[31px] lg:px-[100px] py-8 bg-gray-50  ">
        <Kawilang kecamatanId={Number(kecamatan?.id)} />
      </div>
      <div className="px-[31px] lg:px-[100px] py-8 bg-gray-50  ">
        <News kecamatanId={Number(kecamatan?.id)} />
      </div>
      <div className="px-[31px] lg:px-[100px] py-8 bg-gray-50">
        <LaporCard />
      </div>
    </div>
  );
}
