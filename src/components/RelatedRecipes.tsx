import { getRelatedRecipes } from "@/data/recipe-service";
import FoodCard from "@/components/FoodCard";

interface RelatedRecipesProps {
  currentRecipeId: string;
}

export default async function RelatedRecipes({ currentRecipeId }: RelatedRecipesProps) {
  const relatedRecipes = await getRelatedRecipes(currentRecipeId);

  if (relatedRecipes.length === 0) {
    return null;
  }

  return (
    <section className="mt-12">
      <h2 className="text-2xl font-bold mb-6">Món ăn liên quan</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {relatedRecipes.map((recipe) => (
          <FoodCard
            key={recipe.id}
            id={recipe.id}
            title={recipe.title}
            image={recipe.image}
            prepTime={recipe.prepTime}
            servings={recipe.servings}
            category={recipe.category}
          />
        ))}
      </div>
    </section>
  );
}