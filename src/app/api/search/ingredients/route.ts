import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const { ingredients } = await request.json();
    
    if (!ingredients || !Array.isArray(ingredients) || ingredients.length === 0) {
      return NextResponse.json([]);
    }

    // Convert ingredients to lowercase for better matching
    const searchIngredients = ingredients.map(ingredient => ingredient.toLowerCase());
    
    console.log(`Searching recipes with ingredients: ${searchIngredients.join(', ')}`);

    // Search for recipes that contain any of the selected ingredients
    const recipes = await prisma.recipe.findMany({
      where: {
        OR: searchIngredients.map(ingredient => ({
          OR: [
            {
              // Search in ingredients array
              ingredients: {
                hasSome: [ingredient]
              }
            },
            {
              // Search in title (case insensitive)
              title: {
                contains: ingredient,
                mode: 'insensitive'
              }
            },
            {
              // Search in category
              category: {
                contains: ingredient,
                mode: 'insensitive'
              }
            },
            {
              // Search in tags array
              tags: {
                hasSome: [ingredient]
              }
            }
          ]
        }))
      },
      take: 20, // Limit to 20 results
      orderBy: {
        createdAt: 'desc'
      }
    });

    // Sort by relevance (recipes with more matching ingredients first)
    const recipesWithScore = recipes.map(recipe => {
      const matchingIngredients = searchIngredients.filter(ingredient => 
        recipe.ingredients?.some(recipeIngredient => 
          recipeIngredient.toLowerCase().includes(ingredient)
        ) ||
        recipe.title.toLowerCase().includes(ingredient) ||
        recipe.category.toLowerCase().includes(ingredient) ||
        recipe.tags?.some(tag => 
          tag.toLowerCase().includes(ingredient)
        )
      );
      
      return {
        ...recipe,
        matchScore: matchingIngredients.length
      };
    });

    // Sort by match score (descending)
    const sortedRecipes = recipesWithScore
      .sort((a, b) => b.matchScore - a.matchScore)
      .map(({ matchScore, ...recipe }) => recipe); // Remove matchScore from final result

    console.log(`Found ${sortedRecipes.length} recipes matching ingredients`);
    return NextResponse.json(sortedRecipes);
    
  } catch (error) {
    console.error('Ingredient search API error:', error);
    return NextResponse.json(
      { error: 'Error searching recipes by ingredients' },
      { status: 500 }
    );
  }
}