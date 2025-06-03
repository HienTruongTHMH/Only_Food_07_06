import RecipeHeader from "@/components/recipe/RecipeHeader";
import RecipeImage from "@/components/recipe/RecipeImage";
import RelatedRecipes from "@/components/recipe/RelatedRecipes";
import CommentsSection from "@/components/recipe/RecipeComments";
import RecipeDescription from "@/components/recipe/RecipeDescription";

export default function RecipePage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <RecipeHeader />
      <RecipeImage />
      <RecipeDescription />
      <CommentsSection />
      <RelatedRecipes />
    </div>
  );
}