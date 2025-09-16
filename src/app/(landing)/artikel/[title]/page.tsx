import { headers } from "next/headers";
import { ProfileKecamatanService } from "@/lib/prisma-service/profilekecamatanService";
import ProfileComp from "@/components/kecamatan/Profile";
import DetailArticle from "@/components/kecamatan/DetailArticle";

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
        <DetailArticle title={title} />
      </div>
    </div>
  );
}
