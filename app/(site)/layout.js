import SmoothScrollProvider from "@/context/SmoothScrollProvider";
import { ContactModalProvider } from "@/context/ContactModalContext";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function SiteLayout({ children }) {
  return (
    <SmoothScrollProvider>
      <ContactModalProvider>
        <div className="site-body">
          <a href="#main-content" className="skip-link">
            Skip to content
          </a>
          <Header />
          <main id="main-content">{children}</main>
          <Footer />
        </div>
      </ContactModalProvider>
    </SmoothScrollProvider>
  );
}
