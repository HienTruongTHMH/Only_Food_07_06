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
    
    // Tìm kiếm trong title
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
            // Tìm kiếm trong ingredients nếu có
            ingredients: {
              hasSome: searchTerm.split(' ')
            }
          }
        ]
      },
      take: 10, // Giới hạn 10 kết quả
      orderBy: {
        createdAt: 'desc'
      }
    });

    console.log(`Search for "${searchTerm}" found ${recipes.length} results`);
    return NextResponse.json(recipes);
  } catch (error) {
    console.error('Search API error:', error);
    return NextResponse.json(
      { error: 'Lỗi khi tìm kiếm' },
      { status: 500 }
    );
  }
}