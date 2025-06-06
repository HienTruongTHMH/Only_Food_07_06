import { Recipe, Category } from '@/types/recipe';
import recipeData from './recipes.json';

export const categories: Category[] = recipeData.categories;
export const recipes: Recipe[] = recipeData.recipes.map(recipe => ({
  ...recipe,
  image: recipe.src // Chuyển đổi từ 'src' sang 'image'
}));

// Helper functions để lấy data
export const getRecipesByCategory = (categoryId: string): Recipe[] => {
  return recipes.filter(recipe => recipe.category === categoryId);
};

export const getRecipeById = (id: string): Recipe | undefined => {
  return recipes.find(recipe => recipe.id === id);
};

export const getRecipeBySlug = (slug: string): Recipe | undefined => {
  return recipes.find(recipe => recipe.id === slug);
};

export const getFeaturedRecipes = (): Recipe[] => {
  return recipes.slice(0, 3);
};

export const getDessertRecipes = (): Recipe[] => {
  return recipes.filter(recipe => recipe.category === 'trang-mieng').slice(0, 3);
};