import HeadSection from "@/components/HeadSection";
import PopularCategories from "@/components/PopularCategories";
import SuperDelicious from "@/components/SuperDelicious";
import SweetTooth from "@/components/SweetTooth";

export default function Home() {
  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
      <HeadSection />
      <PopularCategories />
      <SuperDelicious />
      <SweetTooth />
    </main>
  );
}