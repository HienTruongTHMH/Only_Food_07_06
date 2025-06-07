"use client";

import { useState } from "react";
import FoodCard from "./FoodCard";
import { Recipe } from "@/types/recipe";
import { useRecentViews } from "@/contexts/RecentViewsContext";

interface LastRecipesProps {
  recipes: Recipe[];
}

export default function LastRecipes({ recipes }: LastRecipesProps) {
  const [showMore, setShowMore] = useState(false);
  const { recentViews } = useRecentViews();

  // Combine recent views with recipes, with recent views at the top
  const combinedRecipes = [
    ...recentViews.map(view => ({
      id: view.id,
      title: view.title,
      slug: view.slug,
      image: view.image,
      prepTime: view.prepTime,
      servings: view.servings,
      category: view.category,
      difficulty: view.difficulty,
      isRecentView: true
    })),
    ...recipes.filter(recipe => !recentViews.some(view => view.id === recipe.id))
  ];

  // Hiển thị 4 món đầu tiên, hoặc tất cả nếu showMore = true
  const displayCount = showMore ? combinedRecipes.length : 4;
  const displayRecipes = combinedRecipes.slice(0, displayCount);

  const handleLoadMore = () => {
    setShowMore(!showMore);
  };

  if (combinedRecipes.length === 0) {
    return (
      <section className="mt-12">
        <h2 className="text-2xl font-bold mb-6">Latest Recipes</h2>
        <div className="text-center py-8">
          <p className="text-gray-500">Chưa có công thức nào được tải lên.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="mt-12">
      <h2 className="text-2xl font-bold mb-6">Latest Recipes</h2>
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {displayRecipes.map((recipe, index) => (
          <div key={recipe.id} className="relative">
            {(recipe as any).isRecentView && index < recentViews.length && (
              <div className="absolute -top-2 -right-2 z-10 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                Xem gần đây
              </div>
            )}
            <FoodCard
              id={recipe.id}
              title={recipe.title}
              image={recipe.image}
              prepTime={recipe.prepTime}
              servings={recipe.servings}
              category={recipe.category}
            />
          </div>
        ))}
      </div>

      {combinedRecipes.length > 4 && (
        <div className="flex justify-center mt-8">
          <button
            className="border border-black text-black px-10 py-2 rounded-md hover:bg-gray-200 transition-colors"
            onClick={handleLoadMore}
          >
            {showMore ? "Show Less" : "Load More"}
          </button>
        </div>
      )}
    </section>
  );
}
