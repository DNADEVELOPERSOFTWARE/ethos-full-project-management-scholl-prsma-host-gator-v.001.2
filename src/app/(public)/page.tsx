

import WhatsAppFloating from "@/components/ui/whatsapp/WhatsAppFloating";
import { Hero, About, Benefits, Highlights, FAQ, CTA, Contact } from "@/components/landing";
import LandingFooter from "@/components/landing/layouts/footer/LandingFooter"
export default function PublicHomePage() {
  return (
    <>
  
      <WhatsAppFloating />
      <Hero />
      <About />
      <Benefits />  
      <Highlights />
      <FAQ />
      <CTA />
      <Contact />
    
    </>
  );
}
