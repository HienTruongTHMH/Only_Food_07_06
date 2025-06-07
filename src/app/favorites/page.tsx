"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import FoodCard from "@/components/FoodCard";
import { Recipe } from "@/types/recipe";

interface FavoriteRecipe {
  id: string;
  recipe: Recipe;
  createdAt: string;
}

export default function FavoritePage() {
  const [favorites, setFavorites] = useState<FavoriteRecipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const token = localStorage.getItem('authToken');
        
        if (!token) {
          // User not logged in, try to load from localStorage as fallback
          const favoritesData = localStorage.getItem("favorites");
          if (favoritesData) {
            const parsed = JSON.parse(favoritesData);
            if (Array.isArray(parsed)) {
              // Convert old format to new format
              setFavorites(parsed.map((recipe: Recipe) => ({
                id: `local-${recipe.id}`,
                recipe,
                createdAt: new Date().toISOString()
              })));
            }
          }
          setLoading(false);
          return;
        }

        // Fetch from API
        const response = await fetch('/api/favorites', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          if (response.status === 401) {
            localStorage.removeItem('authToken');
            router.push('/login');
            return;
          }
          throw new Error('Failed to load favorites');
        }

        const data = await response.json();
        setFavorites(data.favorites || []);
      } catch (error) {
        console.error("Error loading favorites:", error);
        setError("Failed to load favorites. Please try again.");
        
        // Fallback to localStorage
        try {
          const favoritesData = localStorage.getItem("favorites");
          if (favoritesData) {
            const parsed = JSON.parse(favoritesData);
            if (Array.isArray(parsed)) {
              setFavorites(parsed.map((recipe: Recipe) => ({
                id: `local-${recipe.id}`,
                recipe,
                createdAt: new Date().toISOString()
              })));
            }
          }
        } catch (fallbackError) {
          console.error("Fallback error:", fallbackError);
        }
      } finally {
        setLoading(false);
      }
    };

    loadFavorites();
  }, [router]);

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading favorites...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-center">
          <p className="text-red-500 text-lg">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Món ăn yêu thích</h1>

      {favorites.length === 0 ? (
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
          {favorites.map((favorite) => (
            <FoodCard
              key={favorite.id}
              id={favorite.recipe.id}
              title={favorite.recipe.title}
              image={favorite.recipe.image}
              prepTime={favorite.recipe.prepTime}
              servings={favorite.recipe.servings}
            />
          ))}
        </div>
      )}
    </div>
  );
}