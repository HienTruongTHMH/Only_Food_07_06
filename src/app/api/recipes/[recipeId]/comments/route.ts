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

// GET /api/recipes/[recipeId]/comments - Get comments for a recipe
export async function GET(
  request: NextRequest,
  { params }: { params: { recipeId: string } }
) {
  try {
    const { recipeId } = await params;

    const comments = await prisma.comment.findMany({
      where: { recipeId },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true, // You might want to exclude this for privacy
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json({ comments });

  } catch (error) {
    console.error('Get comments error:', error);
    return NextResponse.json(
      { error: 'Server error' },
      { status: 500 }
    );
  }
}

// POST /api/recipes/[recipeId]/comments - Add comment to recipe
export async function POST(
  request: NextRequest,
  { params }: { params: { recipeId: string } }
) {
  try {
    const userId = verifyToken(request);
    const { recipeId } = await params;
    const { content } = await request.json();

    if (!content || content.trim().length === 0) {
      return NextResponse.json(
        { error: 'Comment content is required' },
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

    // Create comment
    const comment = await prisma.comment.create({
      data: {
        content: content.trim(),
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
      message: 'Comment added successfully',
      comment
    }, { status: 201 });

  } catch (error) {
    console.error('Add comment error:', error);
    return NextResponse.json(
      { error: 'Unauthorized or server error' },
      { status: 401 }
    );
  }
}
