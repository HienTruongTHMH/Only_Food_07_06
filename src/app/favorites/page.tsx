"use client";

import { useState, useEffect } from "react";
import FoodCard from "@/components/FoodCard";
import { Recipe } from "@/types/recipe";

export default function FavoritePage() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Lấy dữ liệu từ localStorage hoặc API
    const loadFavorites = () => {
      try {
        const favoritesData = localStorage.getItem("favorites");
        if (favoritesData) {
          const parsed = JSON.parse(favoritesData);
          // Đảm bảo parsed là array
          if (Array.isArray(parsed)) {
            setRecipes(parsed);
          } else {
            setRecipes([]);
          }
        } else {
          setRecipes([]);
        }
      } catch (error) {
        console.error("Error loading favorites:", error);
        setRecipes([]);
      } finally {
        setLoading(false);
      }
    };

    loadFavorites();
  }, []);

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-center">
          <p>Đang tải...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Món ăn yêu thích</h1>

      {recipes.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            Chưa có món ăn yêu thích nào.
          </p>
          <p className="text-gray-400 mt-2">
            Hãy thêm một số món ăn vào danh sách yêu thích!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {recipes.map((recipe) => (
            <FoodCard
              key={recipe.id}
              id={recipe.id}
              title={recipe.title}
              image={recipe.image}
              prepTime={recipe.prepTime}
              servings={recipe.servings}
            />
          ))}
        </div>
      )}
    </div>
  );
}