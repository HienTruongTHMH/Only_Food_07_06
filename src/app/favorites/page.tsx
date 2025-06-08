"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Heart, Lock, UserPlus, LogIn } from "lucide-react";
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
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const router = useRouter();

  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const token = localStorage.getItem('authToken');
        
        if (!token) {
          setIsAuthenticated(false);
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

        setIsAuthenticated(true);
        
        // Fetch from API
        const response = await fetch('/api/favorites', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          if (response.status === 401) {
            localStorage.removeItem('authToken');
            setIsAuthenticated(false);
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

  const handleLoginRedirect = () => {
    router.push('/login');
  };

  const handleRegisterRedirect = () => {
    router.push('/register');
  };

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

  // Render login required message for unauthenticated users
  const renderLoginRequired = () => (
    <div className="text-center py-16">
      <div className="max-w-md mx-auto">
        <div className="w-24 h-24 mx-auto mb-6 bg-orange-100 rounded-full flex items-center justify-center">
          <Lock className="w-12 h-12 text-orange-500" />
        </div>
        
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Login Required
        </h2>
        
        <p className="text-gray-600 text-lg mb-2">
          You need to be logged in to save your favorite recipes.
        </p>
        
        <p className="text-gray-500 mb-8">
          Create an account or login to start building your personal recipe collection!
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={handleLoginRedirect}
            className="flex items-center justify-center px-6 py-3 bg-orange-500 text-white rounded-xl hover:bg-orange-600 transition-colors font-medium"
          >
            <LogIn className="w-5 h-5 mr-2" />
            Login
          </button>
          
          <button
            onClick={handleRegisterRedirect}
            className="flex items-center justify-center px-6 py-3 bg-white text-orange-500 border-2 border-orange-500 rounded-xl hover:bg-orange-50 transition-colors font-medium"
          >
            <UserPlus className="w-5 h-5 mr-2" />
            Create Account
          </button>
        </div>
        
        <div className="mt-8 p-4 bg-blue-50 rounded-lg">
          <div className="flex items-start">
            <Heart className="w-5 h-5 text-blue-500 mt-0.5 mr-3 flex-shrink-0" />
            <div className="text-left">
              <h3 className="font-medium text-blue-900 mb-1">Why create an account?</h3>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Save unlimited favorite recipes</li>
                <li>• Access your favorites from any device</li>
                <li>• Get personalized recipe recommendations</li>
                <li>• Never lose your recipe collection</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Render empty favorites for authenticated users
  const renderEmptyFavorites = () => (
    <div className="text-center py-16">
      <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
        <Heart className="w-12 h-12 text-gray-400" />
      </div>
      
      <h2 className="text-2xl font-bold text-gray-900 mb-4">
        No favorites yet
      </h2>
      
      <p className="text-gray-600 text-lg mb-2">
        You haven't added any recipes to your favorites.
      </p>
      
      <p className="text-gray-500 mb-8">
        Browse our recipes and click the heart icon to save your favorites!
      </p>
      
      <button
        onClick={() => router.push('/')}
        className="px-6 py-3 bg-orange-500 text-white rounded-xl hover:bg-orange-600 transition-colors font-medium"
      >
        Browse Recipes
      </button>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex items-center mb-8">
        <Heart className="w-8 h-8 text-orange-500 mr-3" />
        <h1 className="text-3xl font-bold text-gray-900">Favorite Recipes</h1>
      </div>

      {/* Show different content based on authentication status and favorites */}
      {isAuthenticated === false ? (
        renderLoginRequired()
      ) : favorites.length === 0 ? (
        renderEmptyFavorites()
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