import { Navbar } from "@/components/navbar";
import FAQ from "@/sections/faq";
import CTA from "@/sections/cta";
import Footer from "@/sections/footer";

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="h-1"></div>
      <div className="pointer-events-none fixed inset-0 -z-10" />
      <Navbar />

      {children}

      <div className="px-4 xl:px-0 max-w-6xl mx-auto py-16">
        <FAQ />
      </div>

      <div className="px-4 xl:px-0 max-w-6xl mx-auto py-16">
        <CTA />
      </div>

      <Footer />
    </>
  );
}
