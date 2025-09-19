import { headers } from "next/headers";
import { ProfileKecamatanService } from "@/lib/prisma-service/profilekecamatanService";
import AcaraDetailComp from "@/components/kecamatan/DetailAcara";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Kawilang - Detail Acara",
    description: "Kunjungi dan Ikuti Acara Menarik di Kecamatan Rancakalong",
  };
}

type Props = {
  params: { title: string };
};

export default async function DetailAcaraPage({ params }: Props) {
  const title = params.title;
  const headersList = headers();
  const host = headersList.get("host") || "";
  const subdomain = host.split(".")[0];
  const kecamatan =
    await ProfileKecamatanService.getKecamatanProfileBySubdomain(subdomain);
  return (
    <div>
      <div>
        <AcaraDetailComp
          title={title}
          nama_kecamatan={kecamatan?.nama_kecamatan}
        />
      </div>
    </div>
  );
}
