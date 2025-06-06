import HeadSection from "@/components/HeadSection";
import SuperDelicious from "@/components/SuperDelicious";
import SweetTooth from "@/components/SweetTooth";
import PopularCategories from "@/components/PopularCategories";
import EmailSendSection from "@/components/EmailSendSection";
import CollectionSections from "@/components/CollectionSections";
import LastRecipes from "@/components/LastRecipes";
import { getFeaturedRecipes, getDessertRecipes, getRecipes } from "@/data/recipe-service";

export default async function HomePage() {
  const featuredRecipes = await getFeaturedRecipes();
  const dessertRecipes = await getDessertRecipes();
  const allRecipes = await getRecipes();

  return (
    <main>
      <div className="max-w-6xl mx-auto px-4 py-8">
        <HeadSection />
        <SuperDelicious recipes={featuredRecipes} />
        <SweetTooth recipes={dessertRecipes} />
        <PopularCategories />
      </div>
      <EmailSendSection />
      <div className="max-w-6xl mx-auto px-4 py-8">
        <CollectionSections />
        <LastRecipes recipes={allRecipes} />
      </div>
    </main>
  );
}