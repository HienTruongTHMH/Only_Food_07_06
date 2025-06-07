import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { prisma } from '@/lib/prisma';

// Helper function to verify JWT token
function verifyToken(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new Error('No token provided');
  }

  const token = authHeader.substring(7);
  const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret') as { userId: string };
  return decoded.userId;
}

// GET /api/recipes/[recipeId]/reviews - Get reviews for a recipe
export async function GET(
  request: NextRequest,
  { params }: { params: { recipeId: string } }
) {
  try {
    const { recipeId } = await params;

    const reviews = await prisma.review.findMany({
      where: { recipeId },
      include: {
        user: {
          select: {
            id: true,
            name: true,
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    // Calculate average rating
    const avgRating = reviews.length > 0 
      ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
      : 0;

    return NextResponse.json({ 
      reviews,
      averageRating: Math.round(avgRating * 10) / 10, // Round to 1 decimal
      totalReviews: reviews.length
    });

  } catch (error) {
    console.error('Get reviews error:', error);
    return NextResponse.json(
      { error: 'Server error' },
      { status: 500 }
    );
  }
}

// POST /api/recipes/[recipeId]/reviews - Add review to recipe
export async function POST(
  request: NextRequest,
  { params }: { params: { recipeId: string } }
) {
  try {
    const userId = verifyToken(request);
    const { recipeId } = await params;
    const { rating, comment } = await request.json();

    // Validate input
    if (rating === undefined || rating < 1 || rating > 5) {
      return NextResponse.json(
        { error: 'Rating must be between 1 and 5' },
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

    // Check if user already reviewed this recipe
    const existingReview = await prisma.review.findUnique({
      where: {
        userId_recipeId: {
          userId,
          recipeId
        }
      }
    });

    if (existingReview) {
      return NextResponse.json(
        { error: 'You have already reviewed this recipe' },
        { status: 409 }
      );
    }

    // Create review
    const review = await prisma.review.create({
      data: {
        rating,
        comment: comment?.trim() || null,
        userId,
        recipeId
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
          }
        }
      }
    });

    return NextResponse.json({
      message: 'Review added successfully',
      review
    }, { status: 201 });

  } catch (error) {
    console.error('Add review error:', error);
    return NextResponse.json(
      { error: 'Unauthorized or server error' },
      { status: 401 }
    );
  }
}

// PUT /api/recipes/[recipeId]/reviews - Update user's review
export async function PUT(
  request: NextRequest,
  { params }: { params: { recipeId: string } }
) {
  try {
    const userId = verifyToken(request);
    const { recipeId } = await params;
    const { rating, comment } = await request.json();

    // Validate input
    if (rating === undefined || rating < 1 || rating > 5) {
      return NextResponse.json(
        { error: 'Rating must be between 1 and 5' },
        { status: 400 }
      );
    }

    // Find existing review
    const existingReview = await prisma.review.findUnique({
      where: {
        userId_recipeId: {
          userId,
          recipeId
        }
      }
    });

    if (!existingReview) {
      return NextResponse.json(
        { error: 'Review not found' },
        { status: 404 }
      );
    }

    // Update review
    const review = await prisma.review.update({
      where: {
        userId_recipeId: {
          userId,
          recipeId
        }
      },
      data: {
        rating,
        comment: comment?.trim() || null,
        updatedAt: new Date()
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
          }
        }
      }
    });

    return NextResponse.json({
      message: 'Review updated successfully',
      review
    });

  } catch (error) {
    console.error('Update review error:', error);
    return NextResponse.json(
      { error: 'Unauthorized or server error' },
      { status: 401 }
    );
  }
}
