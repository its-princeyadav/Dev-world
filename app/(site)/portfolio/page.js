import PageHero from "@/components/sections/PageHero";
import PortfolioGrid from "@/components/sections/PortfolioGrid";
import CtaBand from "@/components/sections/CtaBand";

export const metadata = {
  title: "Portfolio",
  description:
    "Explore products Dev World has designed, built, and scaled across fintech, healthtech, logistics, and more.",
};

export default function PortfolioPage() {
  return (
    <>
      <PageHero
        eyebrow="Portfolio"
        title="Products we've helped bring to life"
        description="A selection of the platforms, apps, and systems our team has designed and shipped."
      />
      <PortfolioGrid />
      <CtaBand />
    </>
  );
}
