
import { LandingHeader } from "@/components/landing";
import LandingFooter from "@/components/landing/layouts/footer/LandingFooter";
import WhatsAppFloating from "@/components/ui/whatsapp/WhatsAppFloating";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <LandingHeader />
      <WhatsAppFloating />
      <main>{children}</main>
      <LandingFooter />
    </>
  );
}
