import jwt from 'jsonwebtoken';
import { NextRequest } from 'next/server';

export interface JWTPayload {
  userId: string;
  email: string;
  iat: number;
  exp: number;
}

export function verifyToken(request: NextRequest): string {
  const authHeader = request.headers.get('authorization');
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new Error('No token provided');
  }

  const token = authHeader.substring(7);
  
  try {
    const decoded = jwt.verify(
      token, 
      process.env.JWT_SECRET || 'fallback-secret'
    ) as JWTPayload;
    
        return decoded.userId;
  } catch {
    throw new Error('Invalid token');
  }
}

export function generateToken(payload: { userId: string; email: string }): string {
  return jwt.sign(
    payload,
    process.env.JWT_SECRET || 'fallback-secret',
    { expiresIn: '7d' }
  );
}

export function createAuthResponse(errorMessage: string, status: number = 401) {
  return Response.json(
    { error: errorMessage },
    { status }
  );
}
