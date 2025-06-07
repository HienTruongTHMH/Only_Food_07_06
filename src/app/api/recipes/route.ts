import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/recipes - Get all recipes with pagination and filtering
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    const sortBy = searchParams.get('sortBy') || 'createdAt'; // createdAt, title, views
    const order = searchParams.get('order') || 'desc'; // asc, desc

    const skip = (page - 1) * limit;

    // Build where clause
    const where: any = {
      isPublished: true,
    };

    if (category) {
      where.category = category;
    }

    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { tags: { has: search } },
      ];
    }

    // Get recipes with pagination
    const [recipes, total] = await Promise.all([
      prisma.recipe.findMany({
        where,
        skip,
        take: limit,
        orderBy: { [sortBy]: order },
        select: {
          id: true,
          title: true,
          slug: true,
          image: true,
          prepTime: true,
          servings: true,
          category: true,
          difficulty: true,
          calories: true,
          tags: true,
          createdAt: true,
          _count: {
            select: {
              favorites: true,
              comments: true,
              reviews: true,
            }
          }
        }
      }),
      prisma.recipe.count({ where })
    ]);

    return NextResponse.json({
      recipes,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      }
    });

  } catch (error) {
    console.error('Get recipes error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST /api/recipes - Create new recipe (Admin only for now)
export async function POST(request: NextRequest) {
  try {
    const {
      title,
      image,
      prepTime,
      servings,
      category,
      ingredients,
      instructions,
      difficulty,
      calories,
      tags
    } = await request.json();

    // Basic validation
    if (!title || !image || !prepTime || !servings || !category || !ingredients || !instructions) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Generate slug from title
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    const recipe = await prisma.recipe.create({
      data: {
        title,
        slug,
        image,
        prepTime: parseInt(prepTime),
        servings: parseInt(servings),
        category,
        ingredients,
        instructions,
        difficulty: difficulty || 'Dễ',
        calories: calories ? parseInt(calories) : null,
        tags: tags || [],
      }
    });

    return NextResponse.json({
      message: 'Recipe created successfully',
      recipe
    }, { status: 201 });

  } catch (error) {
    console.error('Create recipe error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
