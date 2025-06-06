import FoodCard from "./FoodCard";
import { getDessertRecipes } from "@/data/recipes";

export default function SweetTooth() {
  const dessertRecipes = getDessertRecipes();

  return (
    <section className="mt-8 sm:mt-12">
      <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Món tráng miệng</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
        {dessertRecipes.map((recipe) => (
          <FoodCard 
            key={recipe.id} 
            src={recipe.image}
            title={recipe.title}
            slug={recipe.id}
          />
        ))}
      </div>
    </section>
  );
}