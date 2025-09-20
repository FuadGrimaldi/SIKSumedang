import { headers } from "next/headers";
import { ProfileKecamatanService } from "@/lib/prisma-service/profilekecamatanService";
import type { Metadata } from "next";
import LoginComp from "@/components/Auth/Login";
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Login",
    description: "Login untuk mengakses dashboard",
  };
}

export default async function LoginPage() {
  const headersList = headers();
  const host = headersList.get("host") || "";
  const subdomain = host.split(".")[0];
  const kecamatan =
    await ProfileKecamatanService.getKecamatanProfileBySubdomain(subdomain);
  return (
    <div>
      <div>
        <LoginComp kecamatanId={Number(kecamatan?.id)} />
      </div>
    </div>
  );
}
