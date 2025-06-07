"use client";

import { useEffect } from 'react';
import { useRecentViews } from '@/contexts/RecentViewsContext';
import { Recipe } from '@/types/recipe';

interface RecipeViewTrackerProps {
  recipe: Recipe;
}

export default function RecipeViewTracker({ recipe }: RecipeViewTrackerProps) {
  const { addToRecentViews } = useRecentViews();

  useEffect(() => {
    // Track view when component mounts
    addToRecentViews({
      id: recipe.id,
      title: recipe.title,
      image: recipe.image,
      prepTime: recipe.prepTime,
      servings: recipe.servings,
      category: recipe.category,
      difficulty: recipe.difficulty || 'Dễ',
      slug: recipe.slug || recipe.id,
    });
  }, [recipe, addToRecentViews]);

  // This component doesn't render anything
  return null;
}
