import Hero from "@/components/Hero";
import SignatureShowcase from "@/components/SignatureShowcase";
import BrandPillars from "@/components/BrandPillars";
import MenuExplorer from "@/components/MenuExplorer";
import SliceStudio from "@/components/SliceStudio";
import Ambience from "@/components/Ambience";
import Reviews from "@/components/Reviews";
import Reservation from "@/components/Reservation";

export default function HomePage() {
  return (
    <>
      <Hero />
      <SignatureShowcase />
      <BrandPillars />
      <MenuExplorer />
      <SliceStudio />
      <Ambience />
      <Reviews />
      <Reservation />
    </>
  );
}
