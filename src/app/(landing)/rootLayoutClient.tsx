import NavGuest from "@/components/Navbar/NavbarGuest";
import FooterGuest from "@/components/Footer/FooterGuest";

export default function RootLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <NavGuest desaId={321} subdomain={"cipeundeuy"} username={"admin"} />
      <div className="bg-gradient-to-br from-emerald-50 via-blue-50 to-purple-50">
        {children}
      </div>
      <FooterGuest />
    </>
  );
}
