import Image from "next/image";
import React from "react";
import { getRecipesByCategory } from "@/data/recipe-service";
import Link from "next/link";

interface RelatedRecipesProps {
  currentRecipeId: string;
  category: string;
}

const RelatedRecipes = async ({ currentRecipeId, category }: RelatedRecipesProps) => {
  // Lấy tất cả recipes cùng category
  const allRecipes = await getRecipesByCategory(category);

  // Lọc bỏ recipe hiện tại và chỉ lấy 8 recipes đầu tiên
  const relatedRecipes = allRecipes
    .filter((recipe) => recipe.id !== currentRecipeId)
    .slice(0, 8);

  if (relatedRecipes.length === 0) {
    return null;
  }

  return (
    <section className="mt-12">
      <h2 className="text-2xl font-bold mb-6">Related Categories</h2>
      <div className="w-full grid grid-cols-4 space-y-8 space-x-5">
        {relatedRecipes.map((recipe) => (
          <Link href={`/recipe/${recipe.id}`} key={recipe.id}>
            <div className="flex flex-col gap-1 cursor-pointer">
              <div className="relative h-[150px] w-full rounded-lg overflow-hidden">
                <Image
                  src={recipe.image}
                  alt={recipe.title}
                  fill
                  objectFit="cover"
                  className="hover:scale-110 transition-all duration-700"
                />
              </div>
              <p className="text-left font-medium">{recipe.title}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default RelatedRecipes;