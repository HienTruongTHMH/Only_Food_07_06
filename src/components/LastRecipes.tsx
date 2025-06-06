"use client";

import { useState } from "react";
import FoodCard from "./FoodCard";
import { Recipe } from "@/types/recipe";

interface LastRecipesProps {
  recipes: Recipe[];
}

export default function LastRecipes({ recipes }: LastRecipesProps) {
  const [showMore, setShowMore] = useState(false);

  // Hiển thị 4 món đầu tiên, hoặc tất cả nếu showMore = true
  const displayCount = showMore ? recipes.length : 4;
  const displayRecipes = recipes.slice(0, displayCount);

  const handleLoadMore = () => {
    setShowMore(!showMore);
  };

  if (recipes.length === 0) {
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
        {displayRecipes.map((recipe) => (
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

      {recipes.length > 4 && (
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
