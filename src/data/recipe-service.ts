import { Recipe, Category } from '@/types/recipe';
import { prisma } from '@/lib/prisma';

// Get all categories
export async function getCategories(): Promise<Category[]> {
  try {
    console.log('🔍 getCategories: Fetching categories...');
    const categories = await prisma.category.findMany();
    console.log('✅ getCategories: Found', categories.length, 'categories');
    return categories;
  } catch (error) {
    console.error('❌ getCategories error:', error);
    return [];
  }
}

// Get all recipes
export async function getRecipes(): Promise<Recipe[]> {
  const recipes = await prisma.recipe.findMany({
    orderBy: { createdAt: 'desc' }
  });
  return recipes;
}

// Search recipes
export async function searchRecipes(searchTerm: string): Promise<Recipe[]> {
  try {
    console.log(`🔍 searchRecipes: Searching for "${searchTerm}"`);
    
    if (!searchTerm || searchTerm.trim().length === 0) {
      return [];
    }

    const term = searchTerm.trim().toLowerCase();
    
    const recipes = await prisma.recipe.findMany({
      where: {
        OR: [
          {
            title: {
              contains: term,
              mode: 'insensitive'
            }
          },
          {
            ingredients: {
              hasSome: [term]
            }
          },
          {
            category: {
              contains: term,
              mode: 'insensitive'
            }
          }
        ]
      },
      take: 20, // Giới hạn 20 kết quả
      orderBy: [
        {
          // Ưu tiên những món có tên chứa từ khóa
          title: 'asc'
        },
        {
          createdAt: 'desc'
        }
      ]
    });

    console.log(`✅ searchRecipes: Found ${recipes.length} recipes`);
    return recipes;
  } catch (error) {
    console.error('❌ searchRecipes error:', error);
    return [];
  }
}

// Get recipe by slug/id
export async function getRecipeBySlug(slug: string): Promise<Recipe | null> {
  console.log(`🔍 getRecipeBySlug: Searching for recipe with slug: ${slug}`);
  
  try {
    // Tìm theo slug hoặc id
    let recipe = await prisma.recipe.findUnique({ where: { id: slug } });
    
    // Nếu không tìm thấy theo slug, thử tìm theo id
    if (!recipe) {
      recipe = await prisma.recipe.findUnique({ where: { slug } });
    }
    
    if (!recipe) {
      console.log(`❌ getRecipeBySlug: Recipe not found for slug: ${slug}`);
      return null;
    }

    console.log(`✅ getRecipeBySlug: Found recipe: ${recipe.title}`);
    
    return {
      id: recipe.id,
      title: recipe.title,
      image: recipe.image,
      ingredients: recipe.ingredients || [],
      instructions: recipe.instructions || [],
      prepTime: recipe.prepTime || 30,
      servings: recipe.servings || 4,
      category: recipe.category || '',
      slug: recipe.slug || recipe.id,
      createdAt: recipe.createdAt
    };
  } catch (error) {
    console.error('❌ getRecipeBySlug error:', error);
    return null;
  }
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
  try {
    console.log('🔍 getFeaturedRecipes: Fetching featured recipes...');
    const recipes = await prisma.recipe.findMany({
      take: 3,
      orderBy: { createdAt: 'desc' }
    });
    console.log('✅ getFeaturedRecipes: Found', recipes.length, 'recipes');
    return recipes;
  } catch (error) {
    console.error('❌ getFeaturedRecipes error:', error);
    return [];
  }
}

// Get dessert recipes
export async function getDessertRecipes(): Promise<Recipe[]> {
  try {
    console.log('🔍 getDessertRecipes: Fetching dessert recipes...');
    const recipes = await prisma.recipe.findMany({
      where: { category: 'trang-mieng' },
      take: 3,
      orderBy: { createdAt: 'desc' }
    });
    console.log('✅ getDessertRecipes: Found', recipes.length, 'recipes');
    return recipes;
  } catch (error) {
    console.error('❌ getDessertRecipes error:', error);
    return [];
  }
}

export async function getPopularRecipes(): Promise<Recipe[]> {
  try {
    console.log('🔍 getPopularRecipes: Fetching popular recipes...');
    const recipes = await prisma.recipe.findMany({
      take: 6,
      orderBy: { createdAt: 'desc' }
    });
    console.log('✅ getPopularRecipes: Found', recipes.length, 'recipes');
    return recipes;
  } catch (error) {
    console.error('❌ getPopularRecipes error:', error);
    return [];
  }
}