import { headers } from "next/headers";
import { ProfileKecamatanService } from "@/lib/prisma-service/profilekecamatanService";
import ArtikelDetailComp from "@/components/kecamatan/DetailArticle";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Detail Artikel",
    description: "Baca Artikel Menarik dari Kecamatan Anda",
  };
}

type Props = {
  params: { title: string };
};

export default async function DetailArticlePage({ params }: Props) {
  const title = params.title;
  const headersList = headers();
  const host = headersList.get("host") || "";
  const subdomain = host.split(".")[0];
  const kecamatan =
    await ProfileKecamatanService.getKecamatanProfileBySubdomain(subdomain);
  return (
    <div>
      <div>
        <ArtikelDetailComp title={title} />
      </div>
    </div>
  );
}
