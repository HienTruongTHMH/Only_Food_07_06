import { Recipe, Category } from '@/types/recipe';
import { prisma } from '@/lib/prisma';

// Get all categories
export async function getCategories(): Promise<Category[]> {
  const categories = await prisma.category.findMany();
  return categories;
}

// Get all recipes
export async function getRecipes(): Promise<Recipe[]> {
  const recipes = await prisma.recipe.findMany({
    orderBy: { createdAt: 'desc' }
  });
  return recipes;
}

// Get recipe by slug/id
export async function getRecipeBySlug(slug: string): Promise<Recipe | null> {
  const recipe = await prisma.recipe.findUnique({
    where: { id: slug }
  });
  return recipe;
}

// Get recipes by category
export async function getRecipesByCategory(categoryId: string): Promise<Recipe[]> {
  const recipes = await prisma.recipe.findMany({
    where: { category: categoryId },
    orderBy: { createdAt: 'desc' }
  });
  return recipes;
}

// Get featured recipes (first 3)
export async function getFeaturedRecipes(): Promise<Recipe[]> {
  const recipes = await prisma.recipe.findMany({
    take: 3,
    orderBy: { createdAt: 'desc' }
  });
  return recipes;
}

// Get dessert recipes
export async function getDessertRecipes(): Promise<Recipe[]> {
  const recipes = await prisma.recipe.findMany({
    where: { category: 'trang-mieng' },
    take: 3,
    orderBy: { createdAt: 'desc' }
  });
  return recipes;
}