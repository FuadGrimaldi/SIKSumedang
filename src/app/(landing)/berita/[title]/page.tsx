import { headers } from "next/headers";
import { ProfileKecamatanService } from "@/lib/prisma-service/profilekecamatanService";
import BeritaDetailComp from "@/components/kecamatan/DetailBerita";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Detail Berita",
    description: "Baca Berita Menarik dari Kecamatan Anda",
  };
}

type Props = {
  params: { title: string };
};

export default async function DetailBeritaPage({ params }: Props) {
  const title = params.title;
  const headersList = headers();
  const host = headersList.get("host") || "";
  const subdomain = host.split(".")[0];
  const kecamatan =
    await ProfileKecamatanService.getKecamatanProfileBySubdomain(subdomain);
  return (
    <div>
      <div>
        <BeritaDetailComp title={title} />
      </div>
    </div>
  );
}
