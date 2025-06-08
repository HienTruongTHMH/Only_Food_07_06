import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');
    
    if (!query || query.trim().length === 0) {
      return NextResponse.json([]);
    }

    const searchTerm = query.trim();
    
    // Search in title and ingredients
    const recipes = await prisma.recipe.findMany({
      where: {
        OR: [
          {
            title: {
              contains: searchTerm,
              mode: 'insensitive'
            }
          },
          {
            // Search in category
            category: {
              contains: searchTerm,
              mode: 'insensitive'
            }
          },
          {
            // Search in ingredients array
            ingredients: {
              hasSome: searchTerm.split(' ')
            }
          },
          {
            // Search in tags array
            tags: {
              hasSome: searchTerm.split(' ')
            }
          }
        ]
      },
      take: 15, // Limit to 15 results
      orderBy: {
        createdAt: 'desc'
      }
    });

    console.log(`Search for "${searchTerm}" found ${recipes.length} results`);
    return NextResponse.json(recipes);
  } catch (error) {
    console.error('Search API error:', error);
    return NextResponse.json(
      { error: 'Error while searching' },
      { status: 500 }
    );
  }
}