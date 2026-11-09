import { ReactNode } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { FloatingWhatsApp } from "../ui/FloatingWhatsApp";
import StickyMobileCTABar from "../StickyMobileCTA";
import { OrganizationSchema } from "../OrganizationSchema";

interface LayoutProps {
  children: ReactNode;
  productWhatsAppText?: string;
  /** Names the product for the mobile order bar's label and click tracking. */
  productName?: string;
}

export function Layout({ children, productWhatsAppText, productName }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-950">
      <OrganizationSchema />
      <Navbar />
      <main className="flex-1 pb-20 md:pb-0">
        {children}
      </main>
      <Footer />
      <FloatingWhatsApp productWhatsAppText={productWhatsAppText} />
      <StickyMobileCTABar productWhatsAppText={productWhatsAppText} productName={productName} />
    </div>
  );
}
