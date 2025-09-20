import NavGuest from "@/components/Navbar/NavbarGuest";
import FooterGuest from "@/components/Footer/FooterGuest";
import { Metadata } from "next";
import { headers } from "next/headers";
import { ProfileKecamatanService } from "@/lib/prisma-service/profilekecamatanService";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `SID Kecamatan `,
    description: "Website resmi kecamatan",
  };
}

export default async function RootLayoutAdminKec({
  children,
}: {
  children: React.ReactNode;
}) {
  const headersList = headers();
  const host = headersList.get("host") || "";
  const subdomain = host.split(".")[0];
  const kecamatan =
    await ProfileKecamatanService.getKecamatanProfileBySubdomain(subdomain);
  return (
    <>
      <NavGuest
        kecamatanId={Number(kecamatan?.id)}
        subdomain={kecamatan?.nama_kecamatan || null}
      />
      <div className="bg-gradient-to-br from-emerald-50 via-blue-50 to-purple-50">
        {children}
      </div>
      <FooterGuest />
    </>
  );
}
