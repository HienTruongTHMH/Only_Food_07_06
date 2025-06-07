import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/recipes/[recipeId] - Get recipe by ID or slug
export async function GET(
  request: NextRequest,
  { params }: { params: { recipeId: string } }
) {
  try {
    const { recipeId } = params;
    
    // Try to find by ID first, then by slug
    let recipe = await prisma.recipe.findFirst({
      where: {
        OR: [
          { id: recipeId },
          { slug: recipeId }
        ]
      },
      include: {
        _count: {
          select: {
            favorites: true,
            comments: true,
            reviews: true,
          }
        }
      }
    });

    if (!recipe) {
      return NextResponse.json(
        { error: 'Recipe not found' },
        { status: 404 }
      );
    }

    // Track view - increment view count (you can implement this later)
    // For now, we'll just return the recipe
    
    return NextResponse.json({ recipe });

  } catch (error) {
    console.error('Get recipe error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// PUT /api/recipes/[recipeId] - Update recipe (Admin only)
export async function PUT(
  request: NextRequest,
  { params }: { params: { recipeId: string } }
) {
  try {
    const { recipeId } = params;
    const updateData = await request.json();

    // Generate new slug if title is being updated
    if (updateData.title) {
      updateData.slug = updateData.title
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .replace(/(^-|-$)/g, '');
    }

    const recipe = await prisma.recipe.update({
      where: { id: recipeId },
      data: updateData
    });

    return NextResponse.json({
      message: 'Recipe updated successfully',
      recipe
    });

  } catch (error) {
    console.error('Update recipe error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// DELETE /api/recipes/[recipeId] - Delete recipe (Admin only)
export async function DELETE(
  request: NextRequest,
  { params }: { params: { recipeId: string } }
) {
  try {
    const { recipeId } = params;

    await prisma.recipe.delete({
      where: { id: recipeId }
    });

    return NextResponse.json({
      message: 'Recipe deleted successfully'
    });

  } catch (error) {
    console.error('Delete recipe error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
