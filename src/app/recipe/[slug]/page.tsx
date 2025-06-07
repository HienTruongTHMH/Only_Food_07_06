import { notFound } from "next/navigation";
import { getRecipeBySlug } from "@/data/recipe-service";
import RecipeHeader from "@/components/recipe/RecipeHeader";
import RecipeImage from "@/components/recipe/RecipeImage";
import RecipeDescription from "@/components/recipe/RecipeDescription";
import CommentsSection from "@/components/recipe/RecipeComments";
import RelatedRecipes from "@/components/recipe/RelatedRecipes";
import RecipeViewTracker from "@/components/recipe/RecipeViewTracker";

interface RecipePageProps {
  params: {
    slug: string;
  };
}

export default async function RecipePage({ params }: RecipePageProps) {
  try {
    const { slug } = await params;
    const recipe = await getRecipeBySlug(params.slug);
    if (!recipe) {
      notFound();
    } 
    if (!recipe) {
      notFound();
    }

    return (
      <div className="max-w-5xl mx-auto px-4 py-8">
        <RecipeHeader recipe={recipe} />
        <RecipeImage recipe={recipe} />
        <RecipeDescription recipe={recipe} />
        <CommentsSection />
        <RelatedRecipes />
      </div>
    );
  } catch (error) {
    console.error('Error loading recipe:', error);
    notFound();
  }
}