import FeaturedEvents from "@/components/home/FeaturedEvents";
import HeroSection from "@/components/home/HeroSection";
export const dynamic = "force-dynamic";

export default function Home() {
  return (
      <div className="">
        <HeroSection />
        <FeaturedEvents />
      </div>

  );
}