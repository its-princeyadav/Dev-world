import SmoothScrollProvider from "@/lib/SmoothScrollProvider";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function SiteLayout({ children }) {
  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <SmoothScrollProvider>
        <Navbar />
        <main id="main-content" className="flex-1 flex flex-col">
          {children}
        </main>
        <Footer />
      </SmoothScrollProvider>
    </>
  );
}
