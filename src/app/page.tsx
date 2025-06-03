import HeadSection from "@/components/HeadSection";
import SuperDelicious from "@/components/SuperDelicious";
import SweetTooth from "@/components/SweetTooth";
import PopularCategories from "@/components/PopularCategories";
import EmailSendSection from "@/components/EmailSendSection";
import CollectionSections from "@/components/CollectionSections";
import LastRecipes from "@/components/LastRecipes";

export default function HomePage() {
  return (
    <main>
      <div className="max-w-6xl mx-auto px-4 py-8">
        <HeadSection />
        <SuperDelicious />
        <SweetTooth />
        <PopularCategories />
      </div>
      <EmailSendSection />
      <div className="max-w-6xl mx-auto px-4 py-8">
        <CollectionSections />
        <LastRecipes />
      </div>
    </main>
  );
}