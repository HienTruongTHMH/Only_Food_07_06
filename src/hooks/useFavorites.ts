"use client";

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';

interface Recipe {
  id: string;
  title: string;
  slug: string;
  image: string;
  prepTime: number;
  servings: number;
  category: string;
}

interface Favorite {
  id: string;
  userId: string;
  recipeId: string;
  createdAt: string;
  recipe: Recipe;
}

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [loading, setLoading] = useState(false);
  const { user, token } = useAuth();

  // Fetch user's favorites
  const fetchFavorites = async () => {
    if (!user || !token) return;

    setLoading(true);
    try {
      const response = await fetch('/api/favorites', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setFavorites(data.favorites);
      }
    } catch (error) {
      console.error('Error fetching favorites:', error);
    } finally {
      setLoading(false);
    }
  };

  // Add recipe to favorites
  const addToFavorites = async (recipeId: string): Promise<boolean> => {
    if (!user || !token) return false;

    try {
      const response = await fetch('/api/favorites', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ recipeId }),
      });

      if (response.ok) {
        await fetchFavorites(); // Refresh favorites list
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error adding to favorites:', error);
      return false;
    }
  };

  // Remove recipe from favorites
  const removeFromFavorites = async (recipeId: string): Promise<boolean> => {
    if (!user || !token) return false;

    try {
      const response = await fetch(`/api/favorites?recipeId=${recipeId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        await fetchFavorites(); // Refresh favorites list
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error removing from favorites:', error);
      return false;
    }
  };

  // Check if recipe is favorited
  const isFavorited = (recipeId: string): boolean => {
    return favorites.some(fav => fav.recipeId === recipeId);
  };

  // Toggle favorite status
  const toggleFavorite = async (recipeId: string): Promise<boolean> => {
    if (isFavorited(recipeId)) {
      return await removeFromFavorites(recipeId);
    } else {
      return await addToFavorites(recipeId);
    }
  };

  // Load favorites when user changes
  useEffect(() => {
    if (user && token) {
      fetchFavorites();
    } else {
      setFavorites([]);
    }
  }, [user, token]);

  return {
    favorites,
    loading,
    addToFavorites,
    removeFromFavorites,
    isFavorited,
    toggleFavorite,
    refetchFavorites: fetchFavorites,
  };
};
