import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

// GET /api/favorites - Get user's favorites
export async function GET(request: NextRequest) {
  try {
    const userId = verifyToken(request);

    const favorites = await prisma.favorite.findMany({
      where: { userId },
      include: {
        recipe: {
          select: {
            id: true,
            title: true,
            slug: true,
            image: true,
            prepTime: true,
            servings: true,
            category: true,
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json({ favorites });

  } catch (error) {
    console.error('Get favorites error:', error);
    return NextResponse.json(
      { error: 'Unauthorized or server error' },
      { status: 401 }
    );
  }
}

// POST /api/favorites - Add recipe to favorites
export async function POST(request: NextRequest) {
  try {
    const userId = verifyToken(request);
    const { recipeId } = await request.json();

    if (!recipeId) {
      return NextResponse.json(
        { error: 'Recipe ID is required' },
        { status: 400 }
      );
    }

    // Check if recipe exists
    const recipe = await prisma.recipe.findUnique({
      where: { id: recipeId }
    });

    if (!recipe) {
      return NextResponse.json(
        { error: 'Recipe not found' },
        { status: 404 }
      );
    }

    // Check if already favorited
    const existingFavorite = await prisma.favorite.findUnique({
      where: {
        userId_recipeId: {
          userId,
          recipeId
        }
      }
    });

    if (existingFavorite) {
      return NextResponse.json(
        { error: 'Recipe already in favorites' },
        { status: 409 }
      );
    }

    // Add to favorites
    const favorite = await prisma.favorite.create({
      data: {
        userId,
        recipeId
      },
      include: {
        recipe: {
          select: {
            id: true,
            title: true,
            slug: true,
            image: true,
            prepTime: true,
            servings: true,
            category: true,
          }
        }
      }
    });

    return NextResponse.json({
      message: 'Recipe added to favorites',
      favorite
    }, { status: 201 });

  } catch (error) {
    console.error('Add favorite error:', error);
    return NextResponse.json(
      { error: 'Unauthorized or server error' },
      { status: 401 }
    );
  }
}

// DELETE /api/favorites - Remove recipe from favorites
export async function DELETE(request: NextRequest) {
  try {
    const userId = verifyToken(request);
    const { searchParams } = new URL(request.url);
    const recipeId = searchParams.get('recipeId');

    if (!recipeId) {
      return NextResponse.json(
        { error: 'Recipe ID is required' },
        { status: 400 }
      );
    }

    // Find and delete favorite
    const favorite = await prisma.favorite.findUnique({
      where: {
        userId_recipeId: {
          userId,
          recipeId
        }
      }
    });

    if (!favorite) {
      return NextResponse.json(
        { error: 'Favorite not found' },
        { status: 404 }
      );
    }

    await prisma.favorite.delete({
      where: {
        userId_recipeId: {
          userId,
          recipeId
        }
      }
    });

    return NextResponse.json({
      message: 'Recipe removed from favorites'
    });

  } catch (error) {
    console.error('Remove favorite error:', error);
    return NextResponse.json(
      { error: 'Unauthorized or server error' },
      { status: 401 }
    );
  }
}
