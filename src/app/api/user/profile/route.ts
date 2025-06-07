import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

// GET /api/user/profile - Get user profile
export async function GET(request: NextRequest) {
  try {
    const userId = verifyToken(request);

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        fullName: true,
        username: true,
        avatar: true,
        createdAt: true,
        updatedAt: true,
        _count: {
          select: {
            favorites: true,
            comments: true,
            reviews: true,
          }
        }
      }
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ user });

  } catch (error) {
    console.error('Get profile error:', error);
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }
}

// PUT /api/user/profile - Update user profile
export async function PUT(request: NextRequest) {
  try {
    const userId = verifyToken(request);
    const { fullName, email } = await request.json();

    // Validate input
    if (!fullName || !email) {
      return NextResponse.json(
        { error: 'Full name and email are required' },
        { status: 400 }
      );
    }

    // Check if email is already taken by another user
    const existingUser = await prisma.user.findFirst({
      where: {
        email,
        NOT: {
          id: userId
        }
      }
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'Email already taken' },
        { status: 409 }
      );
    }

    // Update user
    const user = await prisma.user.update({
      where: { id: userId },
      data: {
        fullName,
        email,
        updatedAt: new Date()
      },
      select: {
        id: true,
        email: true,
        fullName: true,
        username: true,
        avatar: true,
        createdAt: true,
        updatedAt: true,
      }
    });

    return NextResponse.json({
      message: 'Profile updated successfully',
      user
    });

  } catch (error) {
    console.error('Update profile error:', error);
    return NextResponse.json(
      { error: 'Unauthorized or server error' },
      { status: 401 }
    );
  }
}
